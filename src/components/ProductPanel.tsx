import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../data/products";
import Img from "./Img";
import WhatsAppButton from "./WhatsAppButton";
import { buildProductOrderLink } from "../lib/whatsapp";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductPanelProps {
  product: Product;
  index: number;
}

export const ProductPanel: React.FC<ProductPanelProps> = ({ product, index }) => {
  const waUrl = buildProductOrderLink(product.titleWithVariant, 1);

  return (
    <div
      className="relative w-full max-w-4xl min-h-[520px] bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-100 shadow-soft-lg flex flex-col justify-between overflow-hidden"
      style={{
        boxShadow: `0 20px 40px -15px ${product.accent}20`,
      }}
    >
      {/* Background soft ambient tint */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 -mr-20 -mt-20"
        style={{ backgroundColor: product.accent }}
      />

      {/* Tilted Pack Front Card in Corner */}
      <div className="absolute top-6 right-6 hidden sm:block pointer-events-none z-10">
        <div className="w-20 h-28 md:w-24 md:h-32 rounded-xl shadow-md overflow-hidden rotate-6 border-2 border-white bg-white">
          <Img
            src={product.images.packFront}
            alt={`${product.name} pack front preview`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Header section of panel */}
      <div className="relative z-10 max-w-lg">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: `${product.accent}20`,
              color: product.accentTextDark ? "#855800" : product.accent,
            }}
          >
            {product.type}
          </span>
          <span className="font-script text-2xl text-pureliva-brown">
            {product.tagline}
          </span>
        </div>

        <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-pureliva-heading">
          {product.name}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-pureliva-body leading-relaxed line-clamp-3">
          {product.description}
        </p>
      </div>

      {/* Middle: Content Grid (Key stats + Floating Bowl) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
        {/* Key stats: 3 items */}
        <div className="md:col-span-5 grid grid-cols-3 md:grid-cols-1 gap-3">
          {product.keyStats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-gray-50/80 rounded-2xl border border-gray-100 flex flex-col justify-center"
            >
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-base sm:text-lg font-bold text-pureliva-heading font-mono mt-0.5">
                {stat.value}
              </span>
              <span className="text-[10px] text-pureliva-body font-light">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Floating bowl image */}
        <div className="md:col-span-7 flex flex-col items-center justify-center relative">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
            {/* Shadow ellipse */}
            <div className="absolute bottom-4 w-44 h-6 bg-black/15 rounded-full blur-md" />
            <div className="relative z-10 w-full h-full flex items-center justify-center animate-float">
              <Img
                src={product.images.bowl}
                alt={`${product.name} transparent bowl presentation`}
                transparent
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-pureliva-muted">
          <Sparkles size={14} className="text-pureliva-brown" />
          <span>Net Wt. 100g · Resealable Zipper Pack</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-pureliva-green bg-pureliva-green/10 hover:bg-pureliva-green/15 transition-colors flex items-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowRight size={15} />
          </Link>

          <WhatsAppButton
            href={waUrl}
            text="Order on WhatsApp"
            size="md"
            ariaLabel={`Order ${product.name} on WhatsApp`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;

