import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        href="tel:9723094760"
        className="w-14 h-14 bg-white text-primary rounded-full shadow-xl flex items-center justify-center border border-border hover:bg-primary hover:text-white transition-colors"
      >
        <Phone className="w-6 h-6" />
      </motion.a>

      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
        href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
        target="_blank"
        rel="noreferrer"
        className="relative w-16 h-16 bg-[#25D366] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75 group-hover:animate-none"></div>
        <FaWhatsapp className="w-8 h-8 relative z-10" />
      </motion.a>
    </div>
  );
}
