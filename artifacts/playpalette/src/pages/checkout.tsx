import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, CheckCircle2, TicketPercent } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { productById } from "@/lib/products";
import { useStore } from "@/lib/store";
import {
  GOOGLE_SHEET_WEBAPP_URL,
  RAZORPAY_KEY_ID,
  STORE_NAME,
  STORE_THEME_COLOR,
  WHATSAPP_NUMBER,
} from "@/lib/config";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
}

const emptyForm: FormState = { name: "", phone: "", email: "", address: "", city: "", pincode: "" };

interface ReferralResult {
  valid: boolean;
  discountType?: string;
  discountValue?: number;
  discount?: number;
  finalAmount?: number;
  message?: string;
}

type ReferralState =
  | { status: "checking" }
  | { status: "valid"; discount: number; finalAmount: number }
  | { status: "invalid"; message: string }
  | null;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function sendOrderToSheet(fields: Record<string, string>) {
  if (!GOOGLE_SHEET_WEBAPP_URL) return;
  try {
    // Apps Script web apps don't send CORS headers, so the response is
    // opaque — fire-and-forget is the standard pattern here.
    await fetch(GOOGLE_SHEET_WEBAPP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields).toString(),
    });
  } catch {
    // Never block the order on sheet logging.
  }
}

// The referral code is validated by Apps Script (the only source of truth —
// codes are never checked or stored in this frontend). GET responses from
// Apps Script are CORS-readable, unlike the POST above.
// commit=true increments the code's UsageCount; use it only when the order
// is actually placed.
async function validateReferral(code: string, total: number, commit: boolean): Promise<ReferralResult> {
  if (!GOOGLE_SHEET_WEBAPP_URL) {
    return { valid: false, message: "Code verification isn't available right now." };
  }
  try {
    const url =
      `${GOOGLE_SHEET_WEBAPP_URL}?action=validate` +
      `&code=${encodeURIComponent(code)}&total=${total}&commit=${commit ? 1 : 0}`;
    const res = await fetch(url);
    return (await res.json()) as ReferralResult;
  } catch {
    return { valid: false, message: "Couldn't verify the code right now." };
  }
}

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ id: string; saved: number; waUrl?: string } | null>(null);
  const [referralCode, setReferralCode] = useState("");
  const [referral, setReferral] = useState<ReferralState>(null);
  const [, navigate] = useLocation();

  const items = cart
    .map((item) => ({ ...item, product: productById(item.id) }))
    .filter((item) => item.product);

  const itemsSummary = items
    .map((item) => `${item.product!.name} x${item.qty}`)
    .join(", ");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const displayTotal = referral?.status === "valid" ? referral.finalAmount : cartTotal;

  const applyReferral = async () => {
    const code = referralCode.trim().toUpperCase();
    if (!code || referral?.status === "checking") return;
    setReferral({ status: "checking" });
    const result = await validateReferral(code, cartTotal, false);
    if (result.valid && typeof result.finalAmount === "number") {
      setReferral({
        status: "valid",
        discount: result.discount ?? cartTotal - result.finalAmount,
        finalAmount: result.finalAmount,
      });
    } else {
      setReferral({ status: "invalid", message: result.message || "Invalid referral code." });
    }
  };

  const finishOrder = (orderId: string, saved: number, waUrl?: string) => {
    clearCart();
    setPlacedOrder({ id: orderId, saved, waUrl });
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || items.length === 0) return;
    setSubmitting(true);

    // Re-validate the code at order time (authoritative, increments usage).
    // An invalid or unverifiable code never blocks the order — the customer
    // simply pays the full price.
    const code = referralCode.trim().toUpperCase();
    let discount = 0;
    let finalTotal = cartTotal;
    if (code) {
      const result = await validateReferral(code, cartTotal, true);
      if (result.valid && typeof result.finalAmount === "number") {
        discount = result.discount ?? cartTotal - result.finalAmount;
        finalTotal = result.finalAmount;
        setReferral({ status: "valid", discount, finalAmount: finalTotal });
      } else {
        setReferral({ status: "invalid", message: result.message || "Invalid referral code." });
      }
    }

    const orderId = `PP-${Date.now().toString(36).toUpperCase()}`;
    const baseFields = {
      orderId,
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      items: itemsSummary,
      total: String(cartTotal),
      referralCode: discount > 0 ? code : code ? `${code} (invalid)` : "",
      discount: String(discount),
      finalAmount: String(finalTotal),
    };

    if (RAZORPAY_KEY_ID && (await loadRazorpayScript()) && window.Razorpay) {
      await sendOrderToSheet({ ...baseFields, payment: "Pending — Razorpay opened" });
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: finalTotal * 100, // paise
        currency: "INR",
        name: STORE_NAME,
        description: itemsSummary,
        prefill: { name: form.name, contact: form.phone, email: form.email },
        notes: { orderId, address: `${form.address}, ${form.city} ${form.pincode}` },
        theme: { color: STORE_THEME_COLOR },
        handler: (response: { razorpay_payment_id: string }) => {
          void sendOrderToSheet({
            ...baseFields,
            payment: `PAID — ${response.razorpay_payment_id}`,
          });
          finishOrder(orderId, discount);
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });
      rzp.open();
      return;
    }

    // No Razorpay key configured yet — record the order and hand off to WhatsApp.
    // Fire-and-forget: awaiting the sheet request would use up the tap gesture
    // browsers require for window.open (its response is opaque anyway).
    void sendOrderToSheet({ ...baseFields, payment: "To collect (WhatsApp)" });
    const referralLines =
      discount > 0
        ? `*Referral Code:* ${code}%0A*Discount:* ₹${discount}%0A*Final Amount:* ₹${finalTotal}%0A`
        : "";
    const message =
      `Hello! I just placed order ${orderId} on PlayPalette 🎨%0A%0A` +
      `*Items:* ${encodeURIComponent(itemsSummary)}%0A` +
      `*Total:* ₹${cartTotal}%0A` +
      referralLines +
      `%0A*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `*Address:* ${encodeURIComponent(`${form.address}, ${form.city} - ${form.pincode}`)}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    const waWindow = window.open(waUrl, "_blank");
    finishOrder(orderId, discount, waUrl);
    if (!waWindow) {
      // Popup blocked (common on phones and in-app browsers) — take this tab
      // to WhatsApp instead; the back button returns to the success page.
      setTimeout(() => {
        window.location.href = waUrl;
      }, 1200);
    }
  };

  if (placedOrder) {
    return (
      <div className="relative w-full bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-20 flex items-center">
          <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <CheckCircle2 className="w-20 h-20 text-accent mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-4">
                Order placed! 🎉
              </h1>
              <p className="text-xl text-muted-foreground font-body mb-2">
                Your order ID is <span className="font-bold text-foreground">{placedOrder.id}</span>.
              </p>
              {placedOrder.saved > 0 && (
                <p className="text-lg font-bold text-accent mb-2">
                  Your referral code saved you ₹{placedOrder.saved} 🎊
                </p>
              )}
              <p className="text-muted-foreground font-body mb-10">
                {placedOrder.waUrl
                  ? "WhatsApp should open with your order details — if it didn't, tap the green button below to send them to us."
                  : "We'll confirm your order and delivery details shortly. Questions? Ping us on WhatsApp any time."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={placedOrder.waUrl ?? `https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-5 h-5" />
                  {placedOrder.waUrl ? "Send Order on WhatsApp" : "Chat with us"}
                </a>
                <Link href="/shop" className="px-8 py-4 rounded-full font-heading font-bold text-lg text-foreground border-2 border-border hover:border-primary hover:text-primary transition-colors text-center">
                  Keep Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">
            <span className="gradient-text">Checkout</span>
          </h1>
          <p className="text-muted-foreground font-body mb-10">
            Tell us where to send the colours 🎨
          </p>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-card/40 rounded-[2rem]">
              <div className="text-7xl mb-6">🧺</div>
              <p className="text-xl font-bold font-heading text-foreground mb-6">Your cart is empty</p>
              <button
                onClick={() => navigate("/shop")}
                className="gradient-btn text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg"
              >
                Browse Kits
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-card/40 rounded-3xl p-6 md:p-8 border border-border space-y-5">
                <h2 className="font-extrabold font-heading text-2xl text-foreground">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="font-bold text-sm text-foreground">Full Name *</span>
                    <input
                      required value={form.name} onChange={update("name")}
                      placeholder="e.g. Priya Shah"
                      className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-bold text-sm text-foreground">Phone (WhatsApp) *</span>
                    <input
                      required value={form.phone} onChange={update("phone")}
                      type="tel" pattern="[0-9+ -]{10,15}" placeholder="10-digit mobile number"
                      className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="font-bold text-sm text-foreground">Email (optional)</span>
                  <input
                    value={form.email} onChange={update("email")}
                    type="email" placeholder="For your payment receipt"
                    className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-bold text-sm text-foreground">Full Address *</span>
                  <textarea
                    required value={form.address} onChange={update("address")}
                    rows={3} placeholder="House / flat, street, landmark"
                    className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none resize-none"
                  />
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <label className="block">
                    <span className="font-bold text-sm text-foreground">City *</span>
                    <input
                      required value={form.city} onChange={update("city")}
                      placeholder="e.g. Surat"
                      className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="font-bold text-sm text-foreground">Pincode *</span>
                    <input
                      required value={form.pincode} onChange={update("pincode")}
                      pattern="[0-9]{6}" placeholder="6-digit pincode"
                      className="mt-2 w-full rounded-2xl border-2 border-border bg-white px-4 py-3 font-body focus:border-primary focus:outline-none"
                    />
                  </label>
                </div>
              </div>

              <div className="bg-card/50 rounded-3xl p-6 md:p-8 border border-border h-fit lg:sticky lg:top-28">
                <h2 className="font-extrabold font-heading text-2xl text-foreground mb-6">Your Order</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="text-2xl">{item.product!.emoji}</span>
                      <span className="flex-1 font-body text-sm text-foreground">
                        {item.product!.name} <span className="text-muted-foreground">× {item.qty}</span>
                      </span>
                      <span className="font-bold text-sm">₹{item.product!.price * item.qty}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <label className="block mb-1">
                    <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      <TicketPercent className="w-4 h-4 text-primary" /> Referral / Coupon Code (Optional)
                    </span>
                    <div className="mt-2 flex gap-2">
                      <input
                        value={referralCode}
                        onChange={(e) => {
                          setReferralCode(e.target.value.toUpperCase());
                          setReferral(null);
                        }}
                        placeholder="e.g. PLAY10"
                        className="min-w-0 flex-1 rounded-2xl border-2 border-border bg-white px-4 py-2.5 font-body uppercase tracking-wide focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={applyReferral}
                        disabled={!referralCode.trim() || referral?.status === "checking"}
                        className="px-5 py-2.5 rounded-2xl bg-foreground text-white font-bold text-sm hover:bg-primary transition-colors disabled:opacity-50"
                      >
                        {referral?.status === "checking" ? "…" : "Apply"}
                      </button>
                    </div>
                  </label>
                  {referral?.status === "valid" && (
                    <p className="text-sm font-bold text-accent mt-2">✓ Referral code applied</p>
                  )}
                  {referral?.status === "invalid" && (
                    <p className="text-sm font-bold text-red-500 mt-2">
                      {referral.message}
                      <span className="block font-medium text-muted-foreground">
                        You can still place your order at the regular price.
                      </span>
                    </p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6 space-y-2">
                  {referral?.status === "valid" ? (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Original Price</span>
                        <span className="font-bold line-through text-muted-foreground">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-bold text-accent">− ₹{referral.discount}</span>
                      </div>
                      <div className="flex justify-between text-lg">
                        <span className="font-bold">Final Price</span>
                        <span className="font-extrabold text-primary">₹{referral.finalAmount}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-extrabold text-primary">₹{displayTotal}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="gradient-btn text-white w-full px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing…</>
                  ) : RAZORPAY_KEY_ID ? (
                    "Pay Securely"
                  ) : (
                    <><FaWhatsapp className="w-5 h-5" /> Place Order on WhatsApp</>
                  )}
                </button>
                <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  {RAZORPAY_KEY_ID
                    ? "Payments secured by Razorpay"
                    : "We confirm every order personally on WhatsApp"}
                </p>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
