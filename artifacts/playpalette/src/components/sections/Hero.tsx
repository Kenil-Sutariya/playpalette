import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/30 rounded-full blur-3xl -z-10 mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl -z-10 mix-blend-multiply" />

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20"
            >
              <span>✨</span> Premium DIY Kids Activity
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold font-heading leading-[1.1] mb-6 tracking-tight text-foreground">
              Keep Kids Away <br className="hidden lg:block" />
              From <span className="gradient-text">Screens</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-body text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0">
              Let Creativity Take Over — 10 DIY Paint Kits, Brushes Included, Screen-Free Fun!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center lg:justify-start">
              <a
                href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
                target="_blank"
                rel="noreferrer"
                className="gradient-btn text-white px-8 py-4 rounded-full font-heading font-bold text-lg shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Shop Now 🛒
              </a>
              <button className="px-8 py-4 rounded-full font-heading font-bold text-lg text-foreground border-2 border-border hover:border-primary hover:text-primary transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Watch Demo <Play className="w-5 h-5 fill-current" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-12 pt-8 border-t border-border flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 text-sm font-semibold text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-secondary text-xl">★</span>
                <span>10,000+ Happy Kids</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary text-xl">★</span>
                <span>500+ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent text-xl">✓</span>
                <span>100% Safe Materials</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10 mix-blend-overlay" />
              <img
                src="/hero-image.png"
                alt="Child painting PlayPalette figurine"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-4xl shadow-xl z-20"
            >
              🎨
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent rounded-full flex items-center justify-center text-3xl shadow-xl z-20"
            >
              🖌️
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
