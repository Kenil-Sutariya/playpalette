import Navbar from "@/components/sections/Navbar";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/sections/FloatingButtons";

export default function FAQPage() {
  return (
    <div className="relative w-full bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20">
        <FAQ />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
