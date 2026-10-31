import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import Img from "./Img";
import WhatsAppButton from "./WhatsAppButton";
import { buildProductOrderLink } from "../lib/whatsapp";
import { Zap, Shield, Flame } from "lucide-react";

export const NutritionBars: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>(PRODUCTS[0].slug);
  const activeProduct = PRODUCTS.find((p) => p.slug === activeSlug) || PRODUCTS[0];

  const getNutrientVal = (labelMatch: string): number => {
    const item = activeProduct.nutrients.find((n) =>
      n.label.toLowerCase().includes(labelMatch.toLowerCase())
    );
    if (!item) return 0;
    return typeof item.per100g === "number" ? item.per100g : parseFloat(item.per100g) || 0;
  };

  const protein = getNutrientVal("Protein");
  const fibre = getNutrientVal("Fibre");
  const energy = getNutrientVal("Energy");

  // Benchmarks for bar visualization (max reference values for scaling)
  const proteinPercent = Math.min(100, Math.round((protein / 35) * 100));
  const fibrePercent = Math.min(100, Math.round((fibre / 30) * 100));
  const energyPercent = Math.min(100, Math.round((energy / 650) * 100));

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 shadow-soft">
      {/* Product tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {PRODUCTS.map((prod) => {
          const isActive = prod.slug === activeSlug;
          return (
            <button
              key={prod.slug}
              type="button"
              onClick={() => setActiveSlug(prod.slug)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 relative ${
                isActive
                  ? "text-white shadow-md font-semibold scale-105"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{
                backgroundColor: isActive ? prod.accent : undefined,
                color: isActive && prod.accentTextDark ? "#1A1A1A" : undefined,
              }}
            >
              {prod.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeProduct.slug}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          {/* Left: Bowl Image with shadow and floating animation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Soft shadow ellipse */}
              <div
                className="absolute bottom-6 w-48 h-8 rounded-full blur-md opacity-35"
                style={{ backgroundColor: activeProduct.accent }}
              />

              {/* Floating Bowl image */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center p-4"
              >
                <Img
                  src={activeProduct.images.bowl}
                  alt={`${activeProduct.name} bowl`}
                  transparent
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </motion.div>
            </div>

            <span className="font-script text-2xl text-pureliva-brown mt-2">
              "{activeProduct.tagline}"
            </span>
            <h3 className="font-heading text-2xl font-bold text-pureliva-heading mt-1">
              {activeProduct.name}
            </h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">
              {activeProduct.type} · 100g Pack
            </p>
          </div>

          {/* Right: Nutrition breakdown & animated bars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">
                <span>Macronutrient Profile</span>
                <span>Per 100g</span>
              </div>
              <p className="text-sm text-pureliva-body">{activeProduct.description}</p>
            </div>

            {/* Protein bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-pureliva-heading flex items-center gap-2">
                  <Shield size={16} className="text-pureliva-green" /> Plant Protein
                </span>
                <span className="font-mono font-bold text-pureliva-heading">
                  {protein} g
                </span>
              </div>
              <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${proteinPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: activeProduct.accent }}
                />
              </div>
              <div className="text-[11px] text-gray-400 text-right">
                approx. {Math.round((protein / 54) * 100)}% of typical daily protein requirement
              </div>
            </div>

            {/* Dietary Fibre bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-pureliva-heading flex items-center gap-2">
                  <Zap size={16} className="text-amber-600" /> Dietary Fibre
                </span>
                <span className="font-mono font-bold text-pureliva-heading">
                  {fibre} g
                </span>
              </div>
              <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fibrePercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                  className="h-full rounded-full bg-amber-500"
                />
              </div>
              <div className="text-[11px] text-gray-400 text-right">
                vital for gut wellness & digestive regularity
              </div>
            </div>

            {/* Energy bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-pureliva-heading flex items-center gap-2">
                  <Flame size={16} className="text-red-500" /> Sustained Energy
                </span>
                <span className="font-mono font-bold text-pureliva-heading">
                  {energy} kcal
                </span>
              </div>
              <div className="h-3.5 w-full bg-gray-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${energyPercent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  className="h-full rounded-full bg-emerald-600"
                />
              </div>
              <div className="text-[11px] text-gray-400 text-right">
                clean calories with slow-burning natural goodness
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
              <div className="text-xs text-gray-500">
                Ingredients: <span className="font-medium text-pureliva-heading">{activeProduct.ingredients}</span>
              </div>
              <WhatsAppButton
                href={buildProductOrderLink(activeProduct.titleWithVariant, 1)}
                text={`Order ${activeProduct.name}`}
                size="sm"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NutritionBars;

