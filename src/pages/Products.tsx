import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { Leaf, ShieldCheck, Sparkles, Filter } from "lucide-react";

export const Products: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const filterOptions = ["All", "Roasted & Salted", "Raw"];

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedFilter === "All") return true;
    return product.type === selectedFilter;
  });

  return (
    <>
      <Helmet>
        <title>Our Natural Seeds | Pureliva Foods</title>
        <meta
          name="description"
          content="Explore Pureliva's complete range of 100% natural, farm-sourced seeds: Flax Seeds, Chia Seeds, Sunflower Seeds, Pumpkin Seeds, and 6-in-1 Seed Mix. Order via WhatsApp."
        />
        <link rel="canonical" href="https://purelivafoods.com/products" />
      </Helmet>

      <div className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Pure Seeds Range"
            title="Farm-Fresh Natural Seeds"
            subtitle="Carefully cleaned, sorted and packaged in resealable 100g zipper packs. Zero chemicals, zero shortcuts."
            align="center"
          />

          {/* Filter Chips with Framer Motion layout */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <span className="text-xs uppercase font-semibold text-gray-400 mr-2 hidden sm:flex items-center gap-1">
              <Filter size={13} /> Filter:
            </span>
            {filterOptions.map((option) => {
              const isActive = selectedFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedFilter(option)}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-soft"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="filter-active-pill"
                      className="absolute inset-0 bg-pureliva-green rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Product Grid with Animated Layout */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom Trust Guarantee */}
          <div className="mt-20 p-8 rounded-3xl bg-pureliva-cream border border-stone-200/60 max-w-4xl mx-auto text-center space-y-3">
            <div className="flex items-center justify-center gap-6 text-pureliva-green">
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                <Leaf size={16} /> 100% Vegetarian
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                <ShieldCheck size={16} /> FSSAI Approved
              </span>
              <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold">
                <Sparkles size={16} /> Resealable Freshness
              </span>
            </div>
            <p className="text-xs sm:text-sm text-pureliva-body leading-relaxed max-w-2xl mx-auto">
              All Pureliva seed packs come with airtight resealable zippers to lock in maximum crunch, nutrient density, and natural aromatics after every opening.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

