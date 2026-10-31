import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import Img from "./Img";
import WhatsAppButton from "./WhatsAppButton";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { useScrollDirection } from "../hooks/useScrollDirection";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollDirection, isTop } = useScrollDirection();
  const location = useLocation();

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isVisible = isTop || scrollDirection === "up";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isTop
            ? "bg-transparent py-4 sm:py-5"
            : "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Pureliva Foods Home">
            <Img
              src="/images/brand/logo"
              alt="Pureliva Foods Logo"
              transparent
              priority
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-100/80 shadow-soft">
            {SITE_CONFIG.navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-pureliva-green text-white font-semibold"
                      : "text-pureliva-heading hover:text-pureliva-green hover:bg-pureliva-green/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop WhatsApp CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            <WhatsAppButton
              href={buildWhatsAppLink("Hello Pureliva, I want to order natural seeds.")}
              size="sm"
            />
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <WhatsAppButton
              href={buildWhatsAppLink("Hello Pureliva, I want to order natural seeds.")}
              size="sm"
              text="Order"
              className="px-3 py-1.5 text-xs"
            />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-pureliva-heading hover:bg-gray-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden"
          >
            <div className="space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-pureliva-brown">
                Menu
              </span>
              <nav className="flex flex-col space-y-2">
                {SITE_CONFIG.navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center justify-between text-2xl font-heading font-semibold py-3 border-b border-gray-100 ${
                          isActive ? "text-pureliva-green" : "text-pureliva-heading"
                        }`
                      }
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={18} className="text-pureliva-brown/60" />
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Bottom Mobile Drawer Details */}
            <div className="space-y-4 pt-6 border-t border-gray-100">
              <div className="text-xs text-pureliva-body leading-relaxed">
                <p className="font-semibold text-pureliva-heading">Pureliva Foods by Patidar Enterprises</p>
                <p>Khandwa, Madhya Pradesh – 450001</p>
                <p className="mt-1 font-mono text-[11px] text-pureliva-green">FSSAI Lic. {SITE_CONFIG.fssaiNumber}</p>
              </div>

              <WhatsAppButton
                href={buildWhatsAppLink("Hello Pureliva, I want to order natural seeds.")}
                text="Order on WhatsApp (+91 97531 64155)"
                fullWidth
                size="md"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

