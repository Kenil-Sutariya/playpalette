import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { productById } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const { toast } = useToast();

  const items = wishlist
    .map((id) => productById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="relative w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-2">
            Your <span className="text-primary">Wishlist</span> ❤️
          </h1>
          <p className="text-muted-foreground font-body mb-10">
            {items.length > 0
              ? "Kits your little artist has an eye on"
              : "Tap the heart on any kit to save it here."}
          </p>

          {items.length === 0 ? (
            <div className="text-center py-20 bg-card/40 rounded-[2rem]">
              <div className="text-7xl mb-6">💛</div>
              <p className="text-xl font-bold font-heading text-foreground mb-6">No favourites yet</p>
              <Link
                href="/shop"
                className="gradient-btn text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg inline-flex items-center gap-2"
              >
                Explore Kits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`bg-gradient-to-br ${product.color} p-8 rounded-[2rem] shadow-sm relative overflow-hidden border border-white/50`}
                >
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 hover:scale-110 transition-transform z-10"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                  </button>

                  <div className="text-8xl text-center mb-6">{product.emoji}</div>

                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg">
                    <h3 className="text-2xl font-bold font-heading text-foreground mb-2">{product.name}</h3>
                    <p className="text-primary font-bold text-lg mb-4">
                      ₹{product.price} <span className="text-sm text-muted-foreground font-medium">for 10 kits</span>
                    </p>
                    <button
                      onClick={() => {
                        addToCart(product.id);
                        toast({ title: `${product.name} added to cart 🎨` });
                      }}
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-white font-bold hover:bg-primary transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
