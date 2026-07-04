import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import { products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";

export default function FeaturedProducts() {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const { toast } = useToast();

  return (
    <section id="featured-products" className="py-24 bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-6">
            Featured <span className="text-accent">Collections</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            Explore our most loved themes. Every kit is an adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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

              <div className="text-8xl text-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {product.emoji}
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold font-heading text-foreground mb-2">{product.name}</h3>
                <p className="text-primary font-bold text-lg mb-4">
                  ₹{product.price} <span className="text-sm text-muted-foreground font-medium">for 10 kits</span>
                </p>
                <button
                  onClick={() => {
                    addToCart(product.id);
                    toast({
                      title: `${product.name} added to cart 🎨`,
                      description: "Open your cart when you're ready to checkout.",
                    });
                  }}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-foreground text-white font-bold hover:bg-primary transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block gradient-btn text-white px-10 py-4 rounded-full font-heading font-bold text-lg shadow-lg"
          >
            Visit the Shop →
          </Link>
        </div>
      </div>
    </section>
  );
}
