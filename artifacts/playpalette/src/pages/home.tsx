import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Pricing from "@/components/sections/Pricing";
import Features from "@/components/sections/Features";
import InsideKit from "@/components/sections/InsideKit";
import HowItWorks from "@/components/sections/HowItWorks";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import BulkOrders from "@/components/sections/BulkOrders";
import About from "@/components/sections/About";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/sections/FloatingButtons";

export default function Home() {
  return (
    <div className="relative w-full bg-white">
      <Navbar />
      <main>
        <Hero />
        <Pricing />
        <Features />
        <InsideKit />
        <HowItWorks />
        <FeaturedProducts />
        <Gallery />
        <Testimonials />
        <BulkOrders />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
