import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const waUrl = buildWhatsAppLink("Hello Pureliva, I would like to inquire about your natural seeds.");

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            className="mr-3 bg-pureliva-green text-white text-xs font-medium py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap pointer-events-none hidden sm:block"
          >
            Order on WhatsApp
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-pureliva-green rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-glow transition-all duration-300 relative animate-pulse-glow"
      >
        <WhatsAppIcon size={30} fill="#FFFFFF" />
        <span className="sr-only">Chat with Pureliva on WhatsApp</span>
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;

