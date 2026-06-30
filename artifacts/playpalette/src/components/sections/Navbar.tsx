import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "Birthday Gifts", href: "#bulk" },
    { name: "Schools", href: "#bulk" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glassmorphism py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 z-50">
            <span className="text-3xl font-accent font-bold gradient-text tracking-wide">
              PlayPalette
            </span>
            <span className="text-2xl">🎨</span>
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-body font-semibold text-foreground hover:text-primary transition-colors text-[15px]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <div className="relative cursor-pointer hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>
            <a
              href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
              target="_blank"
              rel="noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <a
              href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
              target="_blank"
              rel="noreferrer"
              className="gradient-btn text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm shadow-md"
            >
              Buy Now
            </a>
          </div>

          <button
            className="lg:hidden z-50 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading font-bold text-2xl text-foreground"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-lg font-bold text-green-500"
              >
                <FaWhatsapp className="w-6 h-6" /> Order on WhatsApp
              </a>
              <a
                href="https://wa.me/919723094760?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits."
                target="_blank"
                rel="noreferrer"
                className="gradient-btn text-white px-6 py-3 rounded-full font-heading font-semibold text-center text-lg w-full"
              >
                Buy Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
