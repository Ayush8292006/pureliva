import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import Img from "../components/Img";
import WhatsAppButton from "../components/WhatsAppButton";
import QuantityStepper from "../components/QuantityStepper";
import NutritionTable from "../components/NutritionTable";
import ProductCard from "../components/ProductCard";
import { buildProductOrderLink } from "../lib/whatsapp";
import {
  ShieldCheck,
  Leaf,
  Sparkles,
  Layers,
  AlertTriangle,
  ArrowLeft,
  RotateCw,
  Check,
} from "lucide-react";

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find((p) => p.slug === slug);

  // Gallery view state: "bowl" | "pack-front" | "pack-back"
  const [galleryTab, setGalleryTab] = useState<"bowl" | "pack-front" | "pack-back">("bowl");
  // Pack 3D flip state: front (0deg) vs back (180deg)
  const [isPackFlipped, setIsPackFlipped] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center center", transform: "scale(1)" });

  // Reset tab and quantity when slug changes
  useEffect(() => {
    setGalleryTab("bowl");
    setIsPackFlipped(false);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="pt-36 pb-24 min-h-screen bg-white text-center flex flex-col items-center justify-center px-4">
        <h1 className="font-heading text-4xl font-bold text-pureliva-heading mb-4">
          Product Not Found
        </h1>
        <p className="text-pureliva-body mb-6 max-w-md">
          The natural seed product you're looking for might have been updated or moved.
        </p>
        <Link
          to="/products"
          className="px-6 py-3 rounded-2xl bg-pureliva-green text-white font-semibold text-sm hover:bg-pureliva-green-hover transition-colors"
        >
          View All Products
        </Link>
      </div>
    );
  }

  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);
  const waUrl = buildProductOrderLink(product.titleWithVariant, quantity);

  // Desktop hover zoom handler
  const handleMouseMoveZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.4)",
    });
  };

  const handleMouseLeaveZoom = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} – ${product.tagline} | Pureliva Foods`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://purelivafoods.com/products/${product.slug}`} />
      </Helmet>

      <div
        className="pt-28 pb-24 bg-white"
        style={{
          // Apply product accent colour as CSS variable for accents
          ["--product-accent" as string]: product.accent,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-pureliva-muted hover:text-pureliva-green transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>

          {/* Main Product Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Image Gallery & 3D Pack Flip */}
            <div className="lg:col-span-6 space-y-6">
              {/* Gallery View Container */}
              <div
                onMouseMove={handleMouseMoveZoom}
                onMouseLeave={handleMouseLeaveZoom}
                className="relative w-full h-[400px] sm:h-[460px] bg-pureliva-cream/70 rounded-3xl p-6 sm:p-8 flex items-center justify-center overflow-hidden border border-stone-200/60 shadow-soft cursor-crosshair group"
              >
                {/* Ambient glow in product accent */}
                <div
                  className="absolute inset-0 opacity-15 blur-3xl pointer-events-none"
                  style={{ backgroundColor: product.accent }}
                />

                <AnimatePresence mode="wait">
                  {galleryTab === "bowl" ? (
                    /* 1. Transparent Bowl with floating animation and soft shadow */
                    <motion.div
                      key="bowl-view"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center transition-transform duration-200 ease-out"
                      style={zoomStyle}
                    >
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-6 bg-black/15 rounded-full blur-md pointer-events-none" />
                      <Img
                        src={product.images.bowl}
                        alt={`${product.name} fresh bowl`}
                        transparent
                        priority
                        className="w-full h-full object-contain filter drop-shadow-lg"
                      />
                    </motion.div>
                  ) : (
                    /* 2. 3D Pack Card with Flip Animation */
                    <motion.div
                      key="pack-view"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 perspective-1000 flex items-center justify-center"
                    >
                      <div
                        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                          isPackFlipped ? "rotate-y-180" : ""
                        }`}
                        style={zoomStyle}
                      >
                        {/* Front Face */}
                        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-soft-lg bg-white border border-stone-200">
                          <Img
                            src={product.images.packFront}
                            alt={`${product.name} packaging front`}
                            priority
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Back Face */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-soft-lg bg-white border border-stone-200">
                          <Img
                            src={product.images.packBack}
                            alt={`${product.name} packaging back`}
                            priority
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Flip control overlay if in pack view */}
                {galleryTab !== "bowl" && (
                  <button
                    type="button"
                    onClick={() => setIsPackFlipped(!isPackFlipped)}
                    className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-pureliva-heading text-xs font-semibold shadow-md hover:bg-white flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCw size={14} className={isPackFlipped ? "rotate-180 transition-transform" : ""} />
                    <span>Flip to {isPackFlipped ? "Front" : "Back (Nutrition)"}</span>
                  </button>
                )}

                <div className="absolute bottom-4 left-4 z-10 text-[11px] text-gray-400 font-medium hidden sm:block pointer-events-none">
                  Hover to zoom
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="flex items-center justify-center gap-4">
                {/* Bowl Thumbnail */}
                <button
                  type="button"
                  onClick={() => setGalleryTab("bowl")}
                  className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    galleryTab === "bowl"
                      ? "border-pureliva-green shadow-md scale-105"
                      : "border-stone-200 hover:border-gray-300 opacity-70"
                  }`}
                >
                  <Img
                    src={product.images.bowl}
                    alt={`${product.name} bowl thumb`}
                    transparent
                    className="w-full h-full object-contain"
                  />
                </button>

                {/* Pack Front Thumbnail */}
                <button
                  type="button"
                  onClick={() => {
                    setGalleryTab("pack-front");
                    setIsPackFlipped(false);
                  }}
                  className={`w-20 h-20 rounded-2xl border-2 p-1 bg-white flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    galleryTab !== "bowl" && !isPackFlipped
                      ? "border-pureliva-green shadow-md scale-105"
                      : "border-stone-200 hover:border-gray-300 opacity-70"
                  }`}
                >
                  <Img
                    src={product.images.packFront}
                    alt={`${product.name} pack front thumb`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>

                {/* Pack Back Thumbnail */}
                <button
                  type="button"
                  onClick={() => {
                    setGalleryTab("pack-back");
                    setIsPackFlipped(true);
                  }}
                  className={`w-20 h-20 rounded-2xl border-2 p-1 bg-white flex items-center justify-center overflow-hidden transition-all duration-200 ${
                    galleryTab !== "bowl" && isPackFlipped
                      ? "border-pureliva-green shadow-md scale-105"
                      : "border-stone-200 hover:border-gray-300 opacity-70"
                  }`}
                >
                  <Img
                    src={product.images.packBack}
                    alt={`${product.name} pack back thumb`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Information, Quantity & Ordering */}
            <div className="lg:col-span-6 space-y-6">
              {/* Badges & Tagline */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
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
                    "{product.tagline}"
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                    Premium Quality
                  </span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-pureliva-heading">
                  {product.name}
                </h1>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                  <span>Net Weight: <strong className="text-pureliva-heading">{product.netWeight}</strong></span>
                  <span>•</span>
                  <span>SKU: <span className="font-mono">{product.sku}</span></span>
                </div>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-pureliva-body leading-relaxed font-light">
                {product.description}
              </p>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-xs font-medium text-pureliva-heading">
                  <Leaf size={16} className="text-pureliva-green shrink-0" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-pureliva-heading">
                  <ShieldCheck size={16} className="text-pureliva-green shrink-0" />
                  <span>No Additives</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-pureliva-heading">
                  <Sparkles size={16} className="text-pureliva-green shrink-0" />
                  <span>Plant Based</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-pureliva-heading">
                  <Layers size={16} className="text-pureliva-green shrink-0" />
                  <span>Resealable Zipper</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Ingredients:
                </span>
                <p className="text-sm font-medium text-pureliva-heading">
                  {product.ingredients}
                </p>
              </div>

              {/* Storage Instructions */}
              <div className="p-4 rounded-2xl bg-pureliva-cream border border-stone-200/60 text-xs sm:text-sm text-pureliva-body leading-relaxed">
                <strong className="text-pureliva-heading block mb-0.5">Storage Instructions:</strong>
                {product.storage}
              </div>

              {/* Allergen Caution Box */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-3">
                <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Allergen Advice:</span>
                  {product.allergen}
                </div>
              </div>

              {/* Desktop Stepper & WhatsApp Order CTA */}
              <div className="hidden sm:flex items-center gap-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Quantity
                  </span>
                  <QuantityStepper
                    value={quantity}
                    onChange={setQuantity}
                    min={1}
                    max={10}
                  />
                </div>

                <div className="flex-1 pt-4">
                  <WhatsAppButton
                    href={waUrl}
                    text={`Order ${quantity > 1 ? `${quantity} x ` : ""}on WhatsApp`}
                    fullWidth
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full Nutritional Information Table */}
          <div className="mt-20">
            <div className="max-w-3xl mb-8">
              <span className="text-xs uppercase font-semibold text-pureliva-green tracking-widest">
                Comprehensive Nutrition
              </span>
              <h2 className="font-heading text-3xl font-bold text-pureliva-heading mt-1">
                Nutrient Composition & ICMR %RDA
              </h2>
              <p className="text-sm text-pureliva-body mt-2">
                All nutrients analyzed as per national testing protocols. Per serve calculated from {product.servingSizeGrams}g portion.
              </p>
            </div>

            <NutritionTable product={product} />
          </div>

          {/* "You May Also Like" (Related Products) */}
          <div className="mt-24 pt-16 border-t border-gray-100">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-pureliva-heading text-center mb-10">
              You May Also Like
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar for Ordering */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex items-center gap-3 shadow-lg">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            size="sm"
            min={1}
            max={10}
          />
          <WhatsAppButton
            href={waUrl}
            text={`Order ${quantity} on WhatsApp`}
            size="sm"
            className="flex-1"
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

