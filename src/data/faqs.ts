export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "How do I place an order?",
    answer: "Tap 'Order on WhatsApp' on any product or use our Build Your Order tool. We will immediately confirm current batch pricing, requested quantities, and doorstep delivery options directly on chat.",
    category: "Ordering",
  },
  {
    question: "Do you deliver across India?",
    answer: "Please message us on WhatsApp with your delivery pincode. We ship directly across major cities and regional centers across India via reliable express courier partners.",
    category: "Shipping",
  },
  {
    question: "Are your seeds ready to eat?",
    answer: "Flax Seeds, Sunflower Seeds, Pumpkin Seeds, and our 6-in-1 Seed Mix are artisan roasted & salted, ready to eat straight from the pack. Chia Seeds are 100% raw and natural, ideal for soaking, smoothies, and breakfast bowls.",
    category: "Products",
  },
  {
    question: "How should I store the pack?",
    answer: "Store in a cool, dry and hygienic place, away from direct sunlight and humidity. After opening, use the resealable zipper to keep the pack tightly sealed, or transfer to an airtight container to preserve crunch and freshness.",
    category: "Storage",
  },
  {
    question: "Do you support bulk/export orders?",
    answer: "Yes! Pureliva Foods is an agro brand by Patidar Enterprises. We supply bulk buyers, retailers, institutional kitchens, manufacturers, importers, and distributors with certified quality handling and fast quotation support.",
    category: "B2B",
  },
  {
    question: "Do you offer custom packaging?",
    answer: "For bulk commercial or export orders, we offer customized packaging formats tailored to your destination market, trade specifications, and order volumes. Reach out via our Bulk & Export page.",
    category: "B2B",
  },
];

