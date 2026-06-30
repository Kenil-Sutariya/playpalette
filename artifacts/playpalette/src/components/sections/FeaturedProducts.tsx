import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const products = [
  { name: "Animal Kit", emoji: "🦁", color: "from-orange-100 to-amber-50" },
  { name: "Dinosaur Kit", emoji: "🦕", color: "from-green-100 to-emerald-50" },
  { name: "Princess Kit", emoji: "👑", color: "from-pink-100 to-rose-50" },
  { name: "Vehicle Kit", emoji: "🚗", color: "from-blue-100 to-cyan-50" },
  { name: "Alphabet Kit", emoji: "🔤", color: "from-purple-100 to-fuchsia-50" },
  { name: "Ocean Kit", emoji: "🐠", color: "from-cyan-100 to-teal-50" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-card/30">
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
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`bg-gradient-to-br ${product.color} p-8 rounded-[2rem] shadow-sm relative group overflow-hidden border border-white/50`}
            >
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white hover:text-red-500 transition-colors z-10">
                <Heart className="w-5 h-5" />
              </div>
              
              <div className="text-8xl text-center mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {product.emoji}
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 text-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-2xl font-bold font-heading text-foreground mb-2">{product.name}</h3>
                <p className="text-primary font-bold text-lg mb-4">₹599 <span className="text-sm text-muted-foreground font-medium">for 10 kits</span></p>
                <a
                  href={`https://wa.me/919723094760?text=Hello%2C%20I%20want%20to%20order%20the%20${product.name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block w-full py-3 rounded-full bg-foreground text-white font-bold hover:bg-primary transition-colors"
                >
                  Add to Cart
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
