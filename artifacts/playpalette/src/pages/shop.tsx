import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, ShoppingCart, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/sections/FloatingButtons";
import PaintingLion from "@/components/PaintingLion";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export default function Shop() {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { toast } = useToast();

  const handleAdd = (name: string, id: string) => {
    addToCart(id);
    toast({
      title: `${name} added to cart 🎨`,
      description: "Open your cart when you're ready to checkout.",
    });
  };

  return (
    <div className="relative w-full bg-white">
      <Navbar />
      <main>
        {/* Shop hero with the painting animation */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />
          <div className="absolute bottom-0 right-10 w-80 h-80 bg-secondary/30 rounded-full blur-3xl -z-10 mix-blend-multiply" />

          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex-1 text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20">
                  <Sparkles className="w-4 h-4" /> The PlayPalette Shop
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold font-heading leading-[1.1] mb-6 tracking-tight text-foreground">
                  Pick a Kit, <span className="gradient-text">Paint a World</span>
                </h1>
                <p className="text-lg md:text-xl font-body text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Every box has 10 POP figurines, paints and brushes — everything
                  little hands need for hours of screen-free fun.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 text-sm font-semibold text-muted-foreground">
                  <span className="flex items-center gap-2"><Truck className="w-5 h-5 text-accent" /> Fast Delivery</span>
                  <span className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-accent" /> 100% Non-Toxic</span>
                  <span className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-secondary" /> Brushes Included</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex-1 w-full max-w-md"
              >
                <PaintingLion />
                <p className="text-center text-sm font-semibold text-muted-foreground mt-2">
                  Watch the magic — that's what your kid gets to do!
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product grid */}
        <section className="py-16 bg-card/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">
                  All <span className="text-accent">Collections</span>
                </h2>
                <p className="text-muted-foreground font-body mt-2">
                  ₹599 per box · 10 kits inside · free brushes & paints
                </p>
              </div>
              <Link
                href="/cart"
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Go to cart →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  className={`bg-gradient-to-br ${product.color} p-8 rounded-[2rem] shadow-sm relative group overflow-hidden border border-white/50`}
                >
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    className={`absolute top-4 right-4 w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10 ${
                      isWishlisted(product.id)
                        ? "bg-white text-red-500"
                        : "bg-white/50 hover:bg-white hover:text-red-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                  </button>

                  <div className="text-8xl text-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                    {product.emoji}
                  </div>

                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.tagline}</p>
                    <p className="text-primary font-bold text-lg mb-4">
                      ₹{product.price} <span className="text-sm text-muted-foreground font-medium">for 10 kits</span>
                    </p>
                    <button
                      onClick={() => handleAdd(product.name, product.id)}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-white font-bold hover:bg-primary transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
