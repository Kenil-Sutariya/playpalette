import { motion } from "framer-motion";

export default function InsideKit() {
  return (
    <section className="py-24 bg-gradient-to-b from-card to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-8">
              What's Inside The <span className="text-primary">Box?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Everything your little artist needs is included. No extra shopping required.
            </p>

            <div className="space-y-6">
              {[
                { count: "10", label: "POP Figurines", desc: "Cute, detailed shapes ready to paint." },
                { count: "30", label: "Color Pots", desc: "3 colors per kit, vibrant and safe." },
                { count: "10", label: "Brushes", desc: "Perfectly sized for little hands." },
                { count: "1", label: "Premium Box", desc: "Beautiful packaging, perfect for gifting." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                  className="flex items-center gap-6 p-4 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl shrink-0">
                    {item.count}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold font-heading text-foreground">{item.label}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-secondary/20 blur-[100px] rounded-full -z-10" />
            <img
              src="/dinosaur-kit.png"
              alt="PlayPalette Kit Contents"
              className="w-full h-auto rounded-[2rem] shadow-2xl border-8 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500"
            />
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-border transform rotate-6">
              <p className="font-accent font-bold text-xl text-primary flex items-center gap-2">
                ✨ Ready to Gift!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
