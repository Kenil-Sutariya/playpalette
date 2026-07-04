import { Link } from "wouter";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { productById } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function Cart() {
  const { cart, setQty, removeFromCart, cartTotal, cartCount } = useStore();

  return (
    <div className="relative w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">
            Your <span className="gradient-text">Cart</span>
          </h1>
          <p className="text-muted-foreground font-body mb-10">
            {cartCount > 0 ? `${cartCount} box${cartCount > 1 ? "es" : ""} of creativity, ready to go` : "Nothing here yet — let's fix that!"}
          </p>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-card/40 rounded-[2rem]">
              <div className="text-7xl mb-6">🛒</div>
              <p className="text-xl font-bold font-heading text-foreground mb-6">Your cart is feeling lonely</p>
              <Link
                href="/shop"
                className="gradient-btn text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Browse Kits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => {
                  const product = productById(item.id);
                  if (!product) return null;
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-4 md:gap-6 bg-card/40 rounded-3xl p-4 md:p-6 border border-border"
                    >
                      <div className={`w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center text-4xl md:text-5xl`}>
                        {product.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold font-heading text-lg md:text-xl text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">₹{product.price} · 10 kits per box</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => setQty(item.id, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => setQty(item.id, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-lg text-foreground">₹{product.price * item.qty}</p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-muted-foreground hover:text-red-500 transition-colors mt-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-card/50 rounded-3xl p-6 md:p-8 border border-border h-fit lg:sticky lg:top-28">
                <h2 className="font-extrabold font-heading text-2xl text-foreground mb-6">Order Summary</h2>
                <div className="space-y-3 text-foreground font-body">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-bold text-accent">FREE</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-extrabold text-primary">₹{cartTotal}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="gradient-btn text-white w-full mt-8 px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg flex items-center justify-center gap-2"
                >
                  Checkout <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/shop"
                  className="block text-center mt-4 text-primary font-bold hover:underline underline-offset-4"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
