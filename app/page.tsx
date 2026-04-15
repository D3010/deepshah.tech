import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { KonamiEasterEgg } from "@/components/effects/KonamiEasterEgg";

function Divider() {
  return (
    <div aria-hidden className="container-page">
      <div className="divider-gradient" />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <KonamiEasterEgg />
      <Navbar />

      <main id="main" className="relative">
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Testimonials />
        <Divider />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
