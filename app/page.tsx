import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Projects } from "@/components/sections/Projects";
import { Capabilities } from "@/components/sections/Capabilities";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SmoothScroll } from "@/components/effects/SmoothScroll";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <TechMarquee />
        <Projects />
        <Capabilities />
        <Process />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Fixed grain — sits above sections, below interactive UI */}
      <div className="noise-overlay" aria-hidden />
    </>
  );
}
