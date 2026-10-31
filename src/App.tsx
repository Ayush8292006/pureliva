import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import PageTransition from "./components/PageTransition";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

// Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import BulkExport from "./pages/BulkExport";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export const App: React.FC = () => {
  const location = useLocation();

  // Initialize Lenis smooth scroll
  useLenis();

  // Check sessionStorage for first load intro animation
  const [showPreloader, setShowPreloader] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("pureliva_intro_seen") !== "true";
    } catch {
      return true;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-white text-pureliva-body selection:bg-pureliva-green selection:text-white">
      {/* First-load Intro Animation (Only shown once per session) */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Top Green Scroll Progress Bar */}
      <ScrollProgress />

      {/* Custom Desktop Interactive Cursor */}
      <CustomCursor />

      {/* Scroll to Top on route change */}
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar />

      {/* Animated Route Viewports */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/products"
              element={
                <PageTransition>
                  <Products />
                </PageTransition>
              }
            />
            <Route
              path="/products/:slug"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/bulk-export"
              element={
                <PageTransition>
                  <BulkExport />
                </PageTransition>
              }
            />
            <Route
              path="/order"
              element={
                <PageTransition>
                  <Order />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export default App;

