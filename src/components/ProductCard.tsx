import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "../data/products";
import Img from "./Img";
import WhatsAppButton from "./WhatsAppButton";
import { buildProductOrderLink } from "../lib/whatsapp";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const waUrl = buildProductOrderLink(product.titleWithVariant, 1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between interactive-card ${className}`}
    >
      <div>
        {/* Top Badges & Tag */}
        <div className="flex items-start justify-between gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase"
            style={{
              backgroundColor: `${product.accent}15`,
              color: product.accentTextDark ? "#855800" : product.accent,
            }}
          >
            {product.type}
          </span>
          <span className="font-script text-xl text-pureliva-brown">
            {product.tagline}
          </span>
        </div>

        {/* Bowl Image Container with soft shadow and hover rotation */}
        <Link
          to={`/products/${product.slug}`}
          className="block relative w-full h-52 sm:h-56 my-2 flex items-center justify-center overflow-visible"
          aria-label={`View ${product.name} details`}
        >
          {/* Accent glow on hover */}
          <div
            className="absolute w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: product.accent }}
          />

          {/* Shadow Ellipse under bowl */}
          <div className="absolute bottom-2 w-32 h-5 bg-black/10 rounded-full blur-sm group-hover:scale-90 group-hover:opacity-40 transition-all duration-300 pointer-events-none" />

          {/* Floating Bowl image */}
          <div className="relative z-10 w-44 h-44 transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-3">
            <Img
              src={product.images.bowl}
              alt={`${product.name} ready to eat bowl`}
              transparent
              className="w-full h-full object-contain filter drop-shadow-sm"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>Net Wt. {product.netWeight}</span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              {product.nutrients[1]?.label}: {product.nutrients[1]?.per100g}g
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-pureliva-heading group-hover:text-pureliva-green transition-colors">
            <Link to={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-pureliva-body line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
        <Link
          to={`/products/${product.slug}`}
          className="flex-1 py-2.5 px-3 text-xs font-semibold text-pureliva-green bg-pureliva-green/5 hover:bg-pureliva-green/10 rounded-xl transition-colors flex items-center justify-center gap-1"
        >
          <span>View Details</span>
          <ArrowUpRight size={14} />
        </Link>
        <WhatsAppButton
          href={waUrl}
          text="Order"
          size="sm"
          className="flex-1"
          ariaLabel={`Order ${product.name} on WhatsApp`}
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;

