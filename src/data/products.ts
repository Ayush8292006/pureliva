export interface NutrientItem {
  label: string;
  per100g: number | string;
  unit: string;
  rda?: number; // % RDA based on ICMR 2020 2000 kcal diet
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  titleWithVariant: string;
  tagline: string;
  type: "Roasted & Salted" | "Raw";
  sku: string;
  netWeight: string;
  accent: string;
  accentTextDark: boolean; // true for yellow
  servingsPerPack: string;
  servingSizeGrams: number;
  ingredients: string;
  description: string;
  storage: string;
  allergen: string;
  keyStats: {
    label: string;
    value: string;
    detail: string;
  }[];
  nutrients: NutrientItem[];
  images: {
    bowl: string;
    packFront: string;
    packBack: string;
  };
}

export function calculatePerServe(per100gVal: number | string, servingGrams: number): string {
  if (typeof per100gVal === "string") {
    if (per100gVal.startsWith("<")) {
      return per100gVal;
    }
    const num = parseFloat(per100gVal);
    if (isNaN(num)) return per100gVal;
    return (Math.round(((num * servingGrams) / 100) * 10) / 10).toFixed(1);
  }
  return (Math.round(((per100gVal * servingGrams) / 100) * 10) / 10).toFixed(1);
}

export const PRODUCTS: Product[] = [
  {
    id: "flax-seeds",
    slug: "flax-seeds",
    name: "Flax Seeds",
    titleWithVariant: "Flax Seeds – Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-FLX-100",
    netWeight: "100 g",
    accent: "#B5652A",
    accentTextDark: false,
    servingsPerPack: "About 3 per pack",
    servingSizeGrams: 30,
    ingredients: "Roasted Flax Seeds & Iodised Salt",
    description: "Crunchy roasted flax seeds, lightly salted. Naturally rich in fibre and plant protein — sprinkle on salads, raita, oats or enjoy straight from the pack.",
    storage: "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Dietary Fibre", value: "27.2g", detail: "Per 100g" },
      { label: "Plant Protein", value: "18.1g", detail: "Per 100g" },
      { label: "Energy", value: "585.7 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 585.7, unit: "kcal", rda: 29.3 },
      { label: "Protein", per100g: 18.1, unit: "g", rda: 33.5 },
      { label: "Total Carbohydrate", per100g: 34.5, unit: "g", rda: 26.5 },
      { label: "Dietary Fibre", per100g: 27.2, unit: "g", rda: 90.7 },
      { label: "Total Sugars", per100g: 1.5, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 41.7, unit: "g", rda: 62.2 },
      { label: "Saturated Fat", per100g: 3.1, unit: "g", rda: 14.1 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 492, unit: "mg", rda: 24.6 },
      { label: "Potassium", per100g: 785, unit: "mg", rda: 22.4 },
      { label: "Calcium", per100g: 232, unit: "mg", rda: 23.2 },
      { label: "Iron", per100g: 5.1, unit: "mg", rda: 26.8 },
    ],
    images: {
      bowl: "/images/products/flax-seeds-bowl",
      packFront: "/images/products/flax-seeds-pack-front",
      packBack: "/images/products/flax-seeds-pack-back",
    },
  },
  {
    id: "seed-mix",
    slug: "seed-mix",
    name: "Seed Mix",
    titleWithVariant: "Seed Mix – Roasted & Salted (100g)",
    tagline: "Power Seed Blend",
    type: "Roasted & Salted",
    sku: "PUR-MIX-100",
    netWeight: "100 g",
    accent: "#7A0F2E",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients: "Chia Seeds, Pumpkin Seeds, Sunflower Seeds, Flax Seeds, Sesame Seeds, Watermelon Seeds, Iodised Salt",
    description: "A power blend of six seeds, roasted and lightly salted. One handful, many nutrients — the perfect everyday healthy snack.",
    storage: "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "6 Super Seeds", value: "100%", detail: "All-in-one" },
      { label: "Plant Protein", value: "20.8g", detail: "Per 100g" },
      { label: "Dietary Fibre", value: "13.2g", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 578.7, unit: "kcal", rda: 28.9 },
      { label: "Protein", per100g: 20.8, unit: "g", rda: 38.5 },
      { label: "Carbohydrate", per100g: 24.2, unit: "g", rda: 18.6 },
      { label: "Dietary Fibre", per100g: 13.2, unit: "g", rda: 44.0 },
      { label: "Total Sugars", per100g: 2.0, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 44.3, unit: "g", rda: 66.1 },
      { label: "Saturated Fat", per100g: 5.8, unit: "g", rda: 26.4 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 550, unit: "mg", rda: 27.5 },
    ],
    images: {
      bowl: "/images/products/seed-mix-bowl",
      packFront: "/images/products/seed-mix-pack-front",
      packBack: "/images/products/seed-mix-pack-back",
    },
  },
  {
    id: "chia-seed",
    slug: "chia-seed",
    name: "Chia Seed",
    titleWithVariant: "Chia Seed – Raw & Natural (100g)",
    tagline: "Superfood for Everyday",
    type: "Raw",
    sku: "PUR-CHI-100",
    netWeight: "100 g",
    accent: "#B57EDC",
    accentTextDark: false,
    servingsPerPack: "About 4 per pack",
    servingSizeGrams: 25,
    ingredients: "Raw Chia Seeds",
    description: "Pure, raw chia seeds with nothing added. Soak for puddings, add to smoothies, lemonade or overnight oats.",
    storage: "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Dietary Fibre", value: "26.3g", detail: "Per 100g" },
      { label: "Plant Protein", value: "22.5g", detail: "Per 100g" },
      { label: "Energy", value: "491.2 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 491.2, unit: "kcal", rda: 24.6 },
      { label: "Protein", per100g: 22.5, unit: "g", rda: 41.7 },
      { label: "Carbohydrate", per100g: 40.0, unit: "g", rda: 30.8 },
      { label: "Dietary Fibre", per100g: 26.3, unit: "g", rda: 87.7 },
      { label: "Total Sugars", per100g: 0.5, unit: "g" },
      { label: "Total Fat", per100g: 26.8, unit: "g", rda: 40.0 },
      { label: "Saturated Fat", per100g: 3.3, unit: "g", rda: 15.0 },
      { label: "Trans Fat", per100g: 0.0, unit: "g", rda: 0 },
      { label: "Cholesterol", per100g: 0.0, unit: "mg", rda: 0 },
      { label: "Sodium", per100g: 16, unit: "mg", rda: 0.8 },
    ],
    images: {
      bowl: "/images/products/chia-seed-bowl",
      packFront: "/images/products/chia-seed-pack-front",
      packBack: "/images/products/chia-seed-pack-back",
    },
  },
  {
    id: "sunflower-seeds",
    slug: "sunflower-seeds",
    name: "Sunflower Seeds",
    titleWithVariant: "Sunflower Seeds – Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-SUN-100",
    netWeight: "100 g",
    accent: "#F5C518",
    accentTextDark: true, // Yellow needs dark text for WCAG contrast
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Roasted Sunflower Seeds & Iodised Salt",
    description: "Golden roasted sunflower kernels with a light touch of salt. A crunchy, satisfying snack for any time of day.",
    storage: "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Crunchy Snack", value: "Ready to Eat", detail: "Golden roasted" },
      { label: "Plant Protein", value: "20.8g", detail: "Per 100g" },
      { label: "Energy", value: "613.7 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 613.7, unit: "kcal", rda: 30.7 },
      { label: "Protein", per100g: 20.8, unit: "g", rda: 38.5 },
      { label: "Carbohydrate", per100g: 26.2, unit: "g", rda: 20.2 },
      { label: "Dietary Fibre", per100g: 8.6, unit: "g", rda: 28.7 },
      { label: "Total Sugars", per100g: 2.6, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 47.3, unit: "g", rda: 70.6 },
      { label: "Saturated Fat", per100g: 5.2, unit: "g", rda: 23.6 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 468, unit: "mg", rda: 23.4 },
      { label: "Potassium", per100g: 642, unit: "mg", rda: 18.3 },
      { label: "Calcium", per100g: 78.0, unit: "mg", rda: 7.8 },
      { label: "Iron", per100g: 5.3, unit: "mg", rda: 27.9 },
    ],
    images: {
      bowl: "/images/products/sunflower-seeds-bowl",
      packFront: "/images/products/sunflower-seeds-pack-front",
      packBack: "/images/products/sunflower-seeds-pack-back",
    },
  },
  {
    id: "pumpkin-seeds",
    slug: "pumpkin-seeds",
    name: "Pumpkin Seeds",
    titleWithVariant: "Pumpkin Seeds – Roasted & Salted (100g)",
    tagline: "Ready to Eat",
    type: "Roasted & Salted",
    sku: "PUR-RPS-100",
    netWeight: "100 g",
    accent: "#F28C0F",
    accentTextDark: false,
    servingsPerPack: "Approx. 3.3 per pack",
    servingSizeGrams: 30,
    ingredients: "Roasted Pumpkin Seeds & Iodised Salt",
    description: "Roasted green pumpkin seeds, lightly salted. The highest-protein seed in our range — great for snacking and topping.",
    storage: "Store in a cool, dry and hygienic place, away from direct sunlight. After opening, keep the pack tightly sealed or transfer to an airtight container.",
    allergen: "Packed in a facility that also processes nuts, tree nuts, sesame, soy, wheat and other seeds.",
    keyStats: [
      { label: "Highest Protein", value: "29.8g", detail: "Per 100g" },
      { label: "Mineral Rich", value: "7.8mg Iron", detail: "Per 100g" },
      { label: "Energy", value: "593.9 kcal", detail: "Per 100g" },
    ],
    nutrients: [
      { label: "Energy", per100g: 593.9, unit: "kcal", rda: 29.7 },
      { label: "Protein", per100g: 29.8, unit: "g", rda: 55.2 },
      { label: "Carbohydrate", per100g: 21.7, unit: "g", rda: 16.7 },
      { label: "Dietary Fibre", per100g: 5.8, unit: "g", rda: 19.3 },
      { label: "Total Sugars", per100g: 1.4, unit: "g" },
      { label: "Added Sugars", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Total Fat", per100g: 43.1, unit: "g", rda: 64.3 },
      { label: "Saturated Fat", per100g: 7.5, unit: "g", rda: 34.1 },
      { label: "Trans Fat", per100g: "<0.1", unit: "g", rda: 0 },
      { label: "Sodium", per100g: 443, unit: "mg", rda: 22.2 },
      { label: "Potassium", per100g: 720, unit: "mg", rda: 20.6 },
      { label: "Calcium", per100g: 48.0, unit: "mg", rda: 4.8 },
      { label: "Iron", per100g: 7.8, unit: "mg", rda: 41.1 },
    ],
    images: {
      bowl: "/images/products/pumpkin-seeds-bowl",
      packFront: "/images/products/pumpkin-seeds-pack-front",
      packBack: "/images/products/pumpkin-seeds-pack-back",
    },
  },
];

