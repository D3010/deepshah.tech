import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { Experience } from "@/components/sections/Experience";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <About />
        <TechMarquee />
        <Projects />
        <Experience />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
