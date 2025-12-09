import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechMarquee } from "@/components/TechMarquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { DetailPanel } from "@/components/DetailPanel";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { cn } from "@/lib/utils";

const Index = () => {
  const { isOpen } = useDetailPanel();

  useEffect(() => {
    // Initialize dark mode by default
    const stored = localStorage.getItem("theme");
    if (!stored) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add(stored);
    }

    // Handle hash navigation when coming from different page
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
        className={cn(
          "transition-all duration-300 ease-out",
          isOpen && "md:mr-[50%] lg:mr-[45%] xl:mr-[40%] opacity-100"
        )}
      >
        <Hero />
        <TechMarquee />
        <FeaturedWork />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <DetailPanel />
    </div>
  );
};

export default Index;
