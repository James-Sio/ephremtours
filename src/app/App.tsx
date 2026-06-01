import { Routes, Route } from "react-router";
import { Navigation } from "./components/Navigation";
import { FloatingContact } from "./components/FloatingContact";
import { ScrollToTop } from "./components/ScrollToTop";
import { Loader } from "./components/Loader";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";
import { CustomCursor } from "./components/CustomCursor";

import { Home } from "./pages/Home";
import { ServicesPage } from "./pages/ServicesPage";
import { PackagesPage } from "./pages/PackagesPage";
import { PackageDetailPage } from "./pages/PackageDetailPage";
import { GalleryPage } from "./pages/GalleryPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PartnershipPage } from "./pages/PartnershipPage";
import { CarHirePage } from "./pages/CarHirePage";

export default function App() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Toaster richColors position="top-right" offset={16} mobileOffset={16} />
      <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-sky-50 to-white flex flex-col overflow-x-clip">
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/car-hire" element={<CarHirePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/partnership" element={<PartnershipPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContact />
        <ScrollToTop />
      </div>
    </>
  );
}