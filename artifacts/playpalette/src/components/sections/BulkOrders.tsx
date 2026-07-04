import { motion } from "framer-motion";
import { PartyPopper, GraduationCap, Cake } from "lucide-react";

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
              Bulk Orders for Parties & Schools
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 text-white/90">
              Give a gift that sparks creativity. Special pricing for bulk orders of 10+ kits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
              <div className="bg-white rounded-[2rem] p-8 text-foreground shadow-xl flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Cake className="w-7 h-7 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  For Birthday Parties
                </span>
                <h3 className="font-bold font-heading text-2xl mb-3">
                  The Party Favor Kids Actually Love
                </h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Skip the goodie-bag scramble — paint kits double as the party
                  activity and the take-home gift. Kids stay happily busy, and
                  ordering is as easy as one WhatsApp message.
                </p>
                <a
                  href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20birthday%20party%20bulk%20order."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-center bg-primary text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform"
                >
                  Get Party Quote
                </a>
              </div>

              <div className="bg-white rounded-[2rem] p-8 text-foreground shadow-xl flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5">
                  <GraduationCap className="w-7 h-7 text-accent" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                  For Schools & Events
                </span>
                <h3 className="font-bold font-heading text-2xl mb-3">
                  Creative Fun for the Whole Classroom
                </h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  Classroom-ready quantities with 100% safe, non-toxic
                  materials. Special bulk pricing for educators — perfect for
                  art periods, activity days, and school events.
                </p>
                <a
                  href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20get%20a%20quote%20for%20a%20school%20or%20event%20bulk%20order."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-center bg-accent text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform"
                >
                  Get School Quote
                </a>
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
