import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-6 py-2 rounded-full bg-white border-2 border-primary text-primary font-bold text-lg mb-8 shadow-sm">
              Made in India 🇮🇳
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-foreground mb-8">
              Our <span className="text-primary">Story</span>
            </h2>
            
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-border text-left">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                Founded by <strong className="text-foreground">Kenil Sutariya</strong> and <strong className="text-foreground">Kishan Sapariya</strong>, PlayPalette was born out of a simple observation: children today spend too much time staring at screens.
              </p>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                We wanted to create something that would bring back the joy of hands-on creativity. Something tactile, messy, colorful, and real. Our Plaster of Paris paint kits are designed to spark imagination, develop motor skills, and give parents a breather—knowing their kids are engaged in a safe, constructive activity.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-8 border-t border-border">
                <div>
                  <div className="text-3xl mb-2">📵</div>
                  <div className="font-bold text-foreground">Screen-Free</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🌿</div>
                  <div className="font-bold text-foreground">100% Safe</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="font-bold text-foreground">Creative</div>
                </div>
                <div>
                  <div className="text-3xl mb-2">🇮🇳</div>
                  <div className="font-bold text-foreground">Local</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
