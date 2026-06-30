import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";

export default function BulkOrders() {
  return (
    <section id="bulk" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary via-orange-400 to-secondary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <PartyPopper className="absolute top-10 left-10 w-24 h-24 text-white/20 -rotate-12" />
          <PartyPopper className="absolute bottom-10 right-10 w-32 h-32 text-white/20 rotate-12" />

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm mb-6 border border-white/30 uppercase tracking-wider">
              Bulk Orders Available
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold font-heading mb-6 leading-tight">
              Perfect for Birthday Parties, Schools & Events!
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 text-white/90">
              Give a gift that sparks creativity. Special pricing for bulk orders of 10+ kits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">Individual</h3>
                <p className="text-3xl font-extrabold mb-2">₹599</p>
                <p className="text-sm text-white/80">10 Kits Box</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-white text-foreground transform md:-translate-y-4 shadow-xl">
                <h3 className="font-bold text-xl mb-2 text-primary">Birthday Pack</h3>
                <p className="text-3xl font-extrabold mb-2">₹999</p>
                <p className="text-sm text-muted-foreground">20 Kits Pack (Save 20%)</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-xl mb-2">School Pack</h3>
                <p className="text-3xl font-extrabold mb-2">Quote</p>
                <p className="text-sm text-white/80">50+ Kits (Best Value)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20bulk%20order."
                target="_blank"
                rel="noreferrer"
                className="bg-white text-primary px-10 py-5 rounded-full font-extrabold text-xl shadow-xl hover:scale-105 transition-transform w-full sm:w-auto"
              >
                Get Bulk Quote
              </a>
              <p className="text-lg font-bold">
                Or Call Kenil: <br className="sm:hidden" />
                <a href="tel:9723094760" className="underline decoration-2 underline-offset-4">9723094760</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
