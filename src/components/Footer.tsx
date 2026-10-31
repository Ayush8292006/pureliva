import React from "react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";
import { PRODUCTS } from "../data/products";
import Img from "./Img";
import WaveDivider from "./WaveDivider";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { MapPin, Mail, Phone, Instagram, ShieldCheck, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-pureliva-green text-white selection:bg-pureliva-brown selection:text-white">
      {/* Curved wave transition at top */}
      <WaveDivider fillColor="#0B3D1E" height={60} className="-mt-14" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-800/60">
          {/* Brand & About Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block" aria-label="Pureliva Foods">
              <Img
                src="/images/brand/logo-white"
                alt="Pureliva Foods White Logo"
                transparent
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Pureliva Foods is a premium natural seeds brand by Patidar Enterprises, Khandwa, Madhya Pradesh. Grounded in generational farming heritage, delivering honest, farm-fresh nutrition to your daily wellness routine.
            </p>

            {/* FSSAI Chip */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 bg-white text-pureliva-heading px-3.5 py-1.5 rounded-2xl shadow-sm">
                <Img
                  src="/images/brand/fssai-logo.png"
                  alt="FSSAI Licensed"
                  className="h-6 w-auto object-contain"
                />
                <div className="text-[11px] leading-tight font-medium">
                  <span className="block text-gray-400 uppercase font-semibold tracking-wider text-[9px]">FSSAI License</span>
                  <span className="font-mono font-bold text-pureliva-green">{SITE_CONFIG.fssaiNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-lg font-semibold text-emerald-200">Explore</h4>
            <ul className="space-y-2 text-sm text-emerald-100/75">
              {SITE_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products List */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-semibold text-emerald-200">Our Natural Seeds</h4>
            <ul className="space-y-2 text-sm text-emerald-100/75">
              {PRODUCTS.map((prod) => (
                <li key={prod.slug}>
                  <Link
                    to={`/products/${prod.slug}`}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                      style={{ backgroundColor: prod.accent }}
                    />
                    <span>{prod.name} (100g)</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg font-semibold text-emerald-200">Connect With Us</h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-emerald-100/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={17} className="text-pureliva-brown shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={17} className="text-pureliva-brown shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppIcon size={17} className="text-whatsapp shrink-0" fill="currentColor" />
                <a
                  href={buildWhatsAppLink("Hello Pureliva, I have a query.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5 pt-1">
                <Instagram size={17} className="text-pink-400 shrink-0" />
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium"
                >
                  {SITE_CONFIG.instagramHandle}
                </a>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-emerald-200/60 leading-tight">
              Packed & Marketed by <span className="font-semibold text-emerald-100">{SITE_CONFIG.parentCompany}</span>, Khandwa.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <p>{SITE_CONFIG.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-emerald-100/70">
              Honest Nutrition from Indian Soil
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

