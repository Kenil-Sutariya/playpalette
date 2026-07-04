import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Heart, Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useStore } from "@/lib/store";
import { WHATSAPP_NUMBER } from "@/lib/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { cartCount, wishlist } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onHome = location === "/";
  // Hash sections live on the home page; from other pages, link back home first.
  const hashHref = (hash: string) => (onHome ? hash : `/${hash}`);

  const navLinks = [
    { name: "Home", href: hashHref("#home") },
    { name: "Shop", href: "/shop", route: true },
    { name: "Products", href: hashHref("#products") },
    { name: "Birthday Gifts", href: hashHref("#bulk") },
    { name: "Schools", href: hashHref("#bulk") },
    { name: "About", href: hashHref("#about") },
    { name: "FAQ", href: hashHref("#faq") },
    { name: "Contact", href: hashHref("#contact") },
  ];

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%2C%20I%20would%20like%20to%20order%20PlayPalette%20Paint%20Kits.`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glassmorphism py-3 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className="text-3xl font-accent font-bold gradient-text tracking-wide">
              PlayPalette
            </span>
            <span className="text-2xl">🎨</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-body font-semibold text-foreground hover:text-primary transition-colors text-[15px]"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-body font-semibold text-foreground hover:text-primary transition-colors text-[15px]"
                >
                  {link.name}
                </a>
              ),
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative cursor-pointer text-foreground hover:text-red-500 transition-colors"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative cursor-pointer text-foreground hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </Link>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="text-green-500 hover:text-green-600 transition-colors"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <Link
              href="/shop"
              className="gradient-btn text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm shadow-md"
            >
              Buy Now
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:hidden z-50">
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) =>
                link.route ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading font-bold text-2xl text-foreground"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-heading font-bold text-2xl text-foreground"
                  >
                    {link.name}
                  </a>
                ),
              )}
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="font-heading font-bold text-2xl text-foreground flex items-center gap-3"
              >
                Wishlist
                {wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </nav>
            <div className="mt-8 flex flex-col gap-4 pb-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-lg font-bold text-green-500"
              >
                <FaWhatsapp className="w-6 h-6" /> Order on WhatsApp
              </a>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="gradient-btn text-white px-6 py-3 rounded-full font-heading font-semibold text-center text-lg w-full"
              >
                Buy Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
