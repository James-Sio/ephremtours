import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { Services } from "./components/Services";
import { Packages } from "./components/Packages";
import { Gallery } from "./components/Gallery";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { CTA } from "./components/CTA";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { FloatingContact } from "./components/FloatingContact";
import { ScrollToTop } from "./components/ScrollToTop";
import { Loader } from "./components/Loader";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Loader />
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
        <Navigation />
        <Hero />
        <Features />
        <Services />
        <Packages />
        <Gallery />
        <About />
        <Testimonials />
        <CTA />
        <Contact />
        <Footer />
        <FloatingContact />
        <ScrollToTop />
      </div>
    </>
  );
}