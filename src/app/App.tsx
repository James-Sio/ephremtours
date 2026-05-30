import { Routes, Route } from "react-router";
import { Navigation } from "./components/Navigation";
import { FloatingContact } from "./components/FloatingContact";
import { ScrollToTop } from "./components/ScrollToTop";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";

import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { PackagesPage } from "./pages/PackagesPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  return (
    <>
      <Loader />
      <Toaster richColors position="top-right" />
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact />
        <ScrollToTop />
      </div>
    </>
  );
}