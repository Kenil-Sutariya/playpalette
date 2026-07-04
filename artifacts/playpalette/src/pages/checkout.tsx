import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";
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

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [, navigate] = useLocation();

  const items = cart
    .map((item) => ({ ...item, product: productById(item.id) }))
    .filter((item) => item.product);

  const itemsSummary = items
    .map((item) => `${item.product!.name} x${item.qty}`)
    .join(", ");

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const finishOrder = (orderId: string) => {
    clearCart();
    setPlacedOrderId(orderId);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || items.length === 0) return;
    setSubmitting(true);

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
    };

    if (RAZORPAY_KEY_ID && (await loadRazorpayScript()) && window.Razorpay) {
      await sendOrderToSheet({ ...baseFields, payment: "Pending — Razorpay opened" });
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: cartTotal * 100, // paise
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
          finishOrder(orderId);
        },
        modal: { ondismiss: () => setSubmitting(false) },
      });
      rzp.open();
      return;
    }

    // No Razorpay key configured yet — record the order and hand off to WhatsApp.
    await sendOrderToSheet({ ...baseFields, payment: "To collect (WhatsApp)" });
    const message =
      `Hello! I just placed order ${orderId} on PlayPalette 🎨%0A%0A` +
      `*Items:* ${encodeURIComponent(itemsSummary)}%0A` +
      `*Total:* ₹${cartTotal}%0A%0A` +
      `*Name:* ${encodeURIComponent(form.name)}%0A` +
      `*Phone:* ${encodeURIComponent(form.phone)}%0A` +
      `*Address:* ${encodeURIComponent(`${form.address}, ${form.city} - ${form.pincode}`)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    finishOrder(orderId);
  };

  if (placedOrderId) {
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
                Your order ID is <span className="font-bold text-foreground">{placedOrderId}</span>.
              </p>
              <p className="text-muted-foreground font-body mb-10">
                We'll confirm your order and delivery details shortly.
                Questions? Ping us on WhatsApp any time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/shop" className="gradient-btn text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg">
                  Keep Shopping
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 rounded-full font-heading font-bold text-lg text-green-600 border-2 border-green-500 hover:bg-green-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FaWhatsapp className="w-5 h-5" /> Chat with us
                </a>
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
                <div className="border-t border-border pt-4 flex justify-between text-lg mb-6">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-primary">₹{cartTotal}</span>
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
