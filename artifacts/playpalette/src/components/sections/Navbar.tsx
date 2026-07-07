import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Home,
  Puzzle,
  Gift,
  GraduationCap,
  Users,
  HelpCircle,
  Mail,
} from "lucide-react";
import { useStore } from "@/lib/store";

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

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const onHome = location === "/";
  // Hash sections live on the home page; from other pages, link back home first.
  const hashHref = (hash: string) => (onHome ? hash : `/${hash}`);

  // Desktop navigation links (unchanged).
  const navLinks = [
    { name: "Home", href: hashHref("#home") },
    { name: "Shop", href: "/shop", route: true },
    { name: "Products", href: hashHref("#products") },
    { name: "Birthday Gifts", href: hashHref("#bulk") },
    { name: "Schools", href: hashHref("#bulk") },
    { name: "About", href: hashHref("#about") },
    { name: "FAQ", href: "/faq", route: true },
    { name: "Contact", href: hashHref("#contact") },
  ];

  // Mobile menu grid — edit labels/icons/links here. `route: true` uses SPA
  // routing (wouter); otherwise the href is a home-page section anchor.
  const mobileMenuItems = [
    { name: "Home", icon: Home, href: hashHref("#home") },
    { name: "Shop", icon: ShoppingCart, href: "/shop", route: true },
    { name: "Products", icon: Puzzle, href: hashHref("#products") },
    { name: "Birthday Gifts", icon: Gift, href: hashHref("#bulk") },
    { name: "Schools", icon: GraduationCap, href: hashHref("#bulk") },
    { name: "About", icon: Users, href: hashHref("#about") },
    { name: "FAQ", icon: HelpCircle, href: "/faq", route: true },
    { name: "Contact", icon: Mail, href: hashHref("#contact") },
  ];

  const menuItemClass =
    "flex items-center gap-2 rounded-full bg-card/70 border border-card-border px-3 py-3.5 font-body font-semibold text-sm text-foreground transition-colors hover:bg-card active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* ============ Mobile navbar (below lg) ============ */}
      <div className="lg:hidden px-3 pt-3">
        <div
          className={`bg-white rounded-[1.75rem] border border-black/5 px-4 py-3 flex items-center justify-between transition-shadow duration-300 ${
            scrolled || mobileMenuOpen ? "shadow-md" : "shadow-sm"
          }`}
        >
          <Link href="/" className="flex items-center gap-1.5" onClick={() => setMobileMenuOpen(false)}>
            <span className="text-2xl font-accent font-bold gradient-text tracking-wide">
              PlayPalette
            </span>
            <span className="text-xl">🎨</span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/cart"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => setMobileMenuOpen(false)}
              className="relative w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ShoppingCart className="w-[22px] h-[22px]" aria-hidden />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className="ml-1 w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden />
              ) : (
                <Menu className="w-5 h-5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-2 bg-white rounded-[1.75rem] border border-black/5 shadow-lg p-4">
                <div className="grid grid-cols-2 gap-3">
                  {mobileMenuItems.map((item) =>
                    item.route ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={menuItemClass}
                      >
                        <item.icon className="w-[18px] h-[18px] shrink-0 text-primary" aria-hidden />
                        <span className="truncate">{item.name}</span>
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={menuItemClass}
                      >
                        <item.icon className="w-[18px] h-[18px] shrink-0 text-primary" aria-hidden />
                        <span className="truncate">{item.name}</span>
                      </a>
                    ),
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-center px-1">
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-red-500 transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Heart className="w-4 h-4 text-red-500" aria-hidden />
                    Wishlist
                    {wishlist.length > 0 && (
                      <span className="min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* ============ Desktop navbar (lg and up, unchanged) ============ */}
      <div
        className={`hidden lg:block transition-all duration-300 ${
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

          <nav className="flex items-center gap-7">
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

          <div className="flex items-center gap-5">
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
            <Link
              href="/shop"
              className="gradient-btn text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm shadow-md"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
