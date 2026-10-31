import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "../config/site";
import { PRODUCTS } from "../data/products";
import { FAQS } from "../data/faqs";
import Img from "../components/Img";
import WhatsAppButton from "../components/WhatsAppButton";
import ProductPanel from "../components/ProductPanel";
import SectionHeading from "../components/SectionHeading";
import Marquee from "../components/Marquee";
import FAQAccordion from "../components/FAQAccordion";
import NutritionBars from "../components/NutritionBars";
import WaveDivider from "../components/WaveDivider";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { useReducedMotion } from "../hooks/useReducedMotion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Leaf,
  CheckCircle,
  Package,
  Layers,
  Heart,
  MessageCircle,
  Truck,
  Check,
  Instagram,
  ExternalLink,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Home: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [activeAccent, setActiveAccent] = useState<string>(PRODUCTS[0].accent);

  // Mouse tilt for hero section on desktop
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || window.innerWidth < 1024) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / 30;
    const y = (clientY - (top + height / 2)) / 30;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // GSAP pinned horizontal scroll on desktop
  useEffect(() => {
    if (prefersReduced || typeof window === "undefined") return;

    // Run GSAP matchMedia for desktop only
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = horizontalTrackRef.current;
      const section = horizontalSectionRef.current;
      if (!track || !section) return;

      const panels = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
      const totalPanels = panels.length;

      const tween = gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.1,
          },
          end: () => `+=${section.offsetWidth * 2.8}`,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalPanels),
              totalPanels - 1
            );
            setActiveAccent(PRODUCTS[index]?.accent || PRODUCTS[0].accent);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [prefersReduced]);

  const whyChooseUs = [
    {
      icon: Leaf,
      title: "100% Natural",
      desc: "Zero synthetic preservatives, colors, or artificial flavorings. Pure nutrition straight from the farm.",
    },
    {
      icon: ShieldCheck,
      title: "No Additives",
      desc: "Pure single-origin seeds or wholesome blends lightly tossed with iodised salt, nothing hidden.",
    },
    {
      icon: Heart,
      title: "Plant Based",
      desc: "Naturally high in vegan proteins, vital dietary fibre, and clean omega healthy fats for heart wellness.",
    },
    {
      icon: Layers,
      title: "Direct Farm Sourcing",
      desc: "Sourced directly from our family agricultural networks and trusted MP growers with transparent origins.",
    },
    {
      icon: Package,
      title: "Resealable Zipper Pack",
      desc: "Airtight, moisture-barrier packaging that locks in the farm-fresh crunch and natural aromas.",
    },
    {
      icon: CheckCircle,
      title: "Certified Quality Handling",
      desc: "Hygienically sorted, cleaned and packed in ISO 22000, GMP and HACCP accredited processing lines.",
    },
  ];

  const waysToEnjoy = [
    {
      title: "Smoothies & Shakes",
      desc: "Blend raw chia seeds or power seed mix into morning fruit bowls for long-lasting stamina.",
      tag: "Energize",
    },
    {
      title: "Salads & Raita",
      desc: "Toss crunchy roasted sunflower or flax seeds over green salads and chilled curd raita.",
      tag: "Crunch",
    },
    {
      title: "Oats & Breakfast Bowls",
      desc: "Sprinkle generously on warm oatmeal, muesli, or Greek yogurt with local honey.",
      tag: "Breakfast",
    },
    {
      title: "Anytime Snacking",
      desc: "Keep a pack in your work bag or car for wholesome, guilt-free mid-afternoon crunch.",
      tag: "On the Go",
    },
    {
      title: "Baking & Laddoos",
      desc: "Fold into artisanal sourdough breads, cookies, crackers, and traditional energy laddoos.",
      tag: "Kitchen",
    },
    {
      title: "Curd & Yogurt Topping",
      desc: "Stir a spoon into fresh probiotic curd after meals for smooth digestion and satiety.",
      tag: "Gut Health",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Pureliva Foods | Natural Seeds & Everyday Wellness</title>
        <meta
          name="description"
          content="Pureliva Foods by Patidar Enterprises, Khandwa. Premium roasted & raw natural seeds – Flax Seeds, Seed Mix, Chia Seeds, Sunflower Seeds, and Pumpkin Seeds. Order via WhatsApp."
        />
        <link rel="canonical" href="https://purelivafoods.com" />
      </Helmet>

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative min-h-[92vh] pt-32 pb-20 flex items-center bg-white overflow-hidden"
      >
        {/* Subtle decorative background gradient circles */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pureliva-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pureliva-brown/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating background seed particle accents */}
        <motion.div
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-36 left-12 hidden lg:block opacity-40 pointer-events-none"
        >
          <div className="w-4 h-6 rounded-[50%] bg-accent-flax rotate-12" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 right-1/3 hidden lg:block opacity-35 pointer-events-none"
        >
          <div className="w-5 h-3 rounded-[50%] bg-accent-pumpkin -rotate-45" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pureliva-green/10 text-pureliva-green text-xs sm:text-sm font-semibold tracking-wider uppercase"
              >
                <Sparkles size={14} className="text-pureliva-brown" />
                <span>Farm-to-Table. Honest. Pure.</span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-pureliva-heading tracking-tight leading-[1.15]"
                >
                  Pure Nutrition in Every Spoon
                </motion.h1>
              </div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg text-pureliva-body leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Premium seeds, naturally sourced from Indian farms. Roasted, raw and ready for your everyday wellness. No artificial additives, just crisp wholesome vitality.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link
                  to="/products"
                  className="px-6 py-3.5 rounded-2xl bg-pureliva-green text-white font-semibold text-sm hover:bg-pureliva-green-hover transition-all duration-300 shadow-soft hover:shadow-soft-lg flex items-center gap-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight size={16} />
                </Link>

                <WhatsAppButton
                  href={buildWhatsAppLink("Hello Pureliva, I want to order natural seeds.")}
                  text="Order on WhatsApp"
                  size="md"
                />
              </motion.div>

              {/* Trust Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-pureliva-muted font-medium"
              >
                {SITE_CONFIG.trustBadges.map((badge, idx) => (
                  <span key={idx} className="flex items-center gap-1.5">
                    <Check size={14} className="text-pureliva-green" />
                    <span>{badge}</span>
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right Column: Hero Bowl Composition with Parallax & Mouse Tilt */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px]">
              <motion.div
                style={{ x: springX, y: springY }}
                className="relative w-full max-w-lg aspect-square flex items-center justify-center"
              >
                {/* Center Main Bowl (Seed Mix) */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  className="relative z-20 w-72 h-72 sm:w-88 sm:h-88 animate-float"
                >
                  {/* Shadow ellipse */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-56 h-8 bg-black/15 rounded-full blur-md" />
                  <Img
                    src="/images/products/seed-mix-bowl"
                    alt="Pureliva Seed Mix Bowl"
                    transparent
                    priority
                    className="w-full h-full object-contain filter drop-shadow-xl"
                  />
                </motion.div>

                {/* Secondary Bowl Left Behind (Chia Seed) */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, x: -40 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="absolute -left-4 sm:left-2 top-8 z-10 w-44 h-44 sm:w-52 sm:h-52 animate-float-slow"
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-black/10 rounded-full blur-sm" />
                  <Img
                    src="/images/products/chia-seed-bowl"
                    alt="Pureliva Chia Seed Bowl"
                    transparent
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </motion.div>

                {/* Tertiary Bowl Right Behind (Pumpkin Seeds) */}
                <motion.div
                  initial={{ scale: 0.7, opacity: 0, x: 40 }}
                  animate={{ scale: 1, opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -right-4 sm:right-2 bottom-6 z-10 w-44 h-44 sm:w-52 sm:h-52 animate-float"
                >
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-5 bg-black/10 rounded-full blur-sm" />
                  <Img
                    src="/images/products/pumpkin-seeds-bowl"
                    alt="Pureliva Pumpkin Seeds Bowl"
                    transparent
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </motion.div>

                {/* Botanical Accent (Flax Flower Seeds) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.85, scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  className="absolute -top-6 -right-6 sm:top-0 sm:right-0 z-30 w-32 h-32 sm:w-40 sm:h-40 pointer-events-none"
                >
                  <Img
                    src="/images/decor/flax-flower-seeds"
                    alt="Flax flowers botanical accent"
                    transparent
                    className="w-full h-full object-contain filter drop-shadow-sm rotate-12"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CERTIFICATE MARQUEE STRIP */}
      <Marquee />

      {/* 3. OUR PRODUCTS – PINNED HORIZONTAL SCROLL ON DESKTOP & SNAP CAROUSEL ON MOBILE */}
      <section
        ref={horizontalSectionRef}
        className="relative py-20 lg:py-28 overflow-hidden transition-colors duration-700"
        style={{
          backgroundColor: `${activeAccent}0D`, // ~5% soft ambient tint
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-12">
          <SectionHeading
            badge="Farm Direct Collection"
            title="Harvested with Care, Roasted to Perfection"
            subtitle="Explore our artisanal range of nutrient-dense natural seeds. Single origin seeds and balanced multi-seed power blends for daily wellness."
            align="center"
          />
        </div>

        {/* Desktop: GSAP Horizontal Track */}
        <div className="hidden lg:block w-full overflow-hidden">
          <div
            ref={horizontalTrackRef}
            className="flex items-center space-x-12 px-12 w-max"
          >
            {PRODUCTS.map((product, idx) => (
              <div
                key={product.slug}
                className="horizontal-panel w-[860px] flex-shrink-0"
              >
                <ProductPanel product={product} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet: Swipeable Snap Carousel */}
        <div className="block lg:hidden px-4 sm:px-6">
          <div className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar">
            {PRODUCTS.map((product, idx) => (
              <div
                key={product.slug}
                className="w-[85vw] max-w-sm flex-shrink-0 snap-center"
              >
                <ProductPanel product={product} index={idx} />
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-xs text-pureliva-muted">
            Swipe sideways to view all 5 seed varieties →
          </div>
        </div>
      </section>

      {/* 4. WHY PURELIVA (6 ICON CARDS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="The Pureliva Standard"
            title="Honest Nutrition, No Compromises"
            subtitle="We believe wellness shouldn't be complicated or loaded with synthetic chemicals. Every batch is crafted with clean ethics."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-pureliva-cream border border-stone-200/60 shadow-soft hover:shadow-soft-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-pureliva-green text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pureliva-body leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. WHO WE ARE (FARMING HERITAGE COLLAGE) */}
      <section className="py-20 bg-pureliva-cream/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center">
                {/* Background soft circle */}
                <div className="absolute inset-4 rounded-full bg-pureliva-green/10 blur-2xl" />

                {/* Primary collage item: Chia flower seeds */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative z-10 w-64 h-64 sm:w-72 sm:h-72"
                >
                  <Img
                    src="/images/decor/chia-flower-seeds"
                    alt="Chia flower seeds natural collage"
                    transparent
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </motion.div>

                {/* Secondary collage item: Sunflower kernels pile */}
                <motion.div
                  initial={{ opacity: 0, x: 30, y: 30 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="absolute bottom-0 right-0 z-20 w-44 h-44 sm:w-52 sm:h-52"
                >
                  <Img
                    src="/images/decor/sunflower-kernels-pile"
                    alt="Pile of golden sunflower kernels"
                    transparent
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Column: Founder Story */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-script text-3xl text-pureliva-brown">
                Generations of Indian Agriculture
              </span>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-pureliva-heading leading-tight">
                Rooted in Farming. Built on Trust.
              </h2>

              <p className="text-base sm:text-lg text-pureliva-body leading-relaxed">
                Pureliva is an agro brand by <strong className="text-pureliva-heading">Patidar Enterprises</strong>, Khandwa, Madhya Pradesh. Our founder grew up in a farming family — purity isn't a marketing promise, it's a standard we lived by long before it became a trend.
              </p>

              <p className="text-sm sm:text-base text-pureliva-body leading-relaxed">
                We work directly with trusted farmers and certified processing units, with no middlemen and no shortcuts. Every seed is carefully inspected, cleaned, gently roasted, and sealed to bring nature’s authentic nourishment to your dining table.
              </p>

              {/* Quote block */}
              <div className="p-6 rounded-2xl bg-white border-l-4 border-pureliva-green shadow-soft">
                <blockquote className="font-heading text-lg sm:text-xl italic text-pureliva-heading">
                  "When the soil is your teacher, purity is our promise."
                </blockquote>
                <span className="block mt-2 text-xs font-semibold text-pureliva-brown uppercase tracking-wider">
                  — Patidar Enterprises, Khandwa (M.P.)
                </span>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-pureliva-green font-semibold text-sm hover:underline"
                >
                  <span>Read our full farming story</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW TO ORDER ON WHATSAPP (3 CONNECTED STEPS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Effortless Ordering"
            title="How to Order in 3 Simple Steps"
            subtitle="Direct customer support without complicated shopping carts or account passwords. We chat, confirm, and deliver."
            align="center"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-dashed border-t-2 border-dashed border-pureliva-green/20 -translate-y-8 z-0 pointer-events-none" />

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center text-center p-8 bg-pureliva-cream rounded-3xl border border-stone-200/60 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-pureliva-green text-white flex items-center justify-center font-heading text-2xl font-bold mb-6 shadow-md">
                1
              </div>
              <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                Choose Your Seeds
              </h3>
              <p className="text-sm text-pureliva-body leading-relaxed">
                Browse our range of roasted or raw seeds, or use our multi-product order builder to customize quantities.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative z-10 flex flex-col items-center text-center p-8 bg-pureliva-cream rounded-3xl border border-stone-200/60 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-whatsapp text-white flex items-center justify-center font-heading text-2xl font-bold mb-6 shadow-md">
                2
              </div>
              <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                Tap "Order on WhatsApp"
              </h3>
              <p className="text-sm text-pureliva-body leading-relaxed">
                Your selected items and quantities pre-fill into a WhatsApp message automatically. Tap send to begin.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 flex flex-col items-center text-center p-8 bg-pureliva-cream rounded-3xl border border-stone-200/60 shadow-soft"
            >
              <div className="w-16 h-16 rounded-2xl bg-pureliva-brown text-white flex items-center justify-center font-heading text-2xl font-bold mb-6 shadow-md">
                3
              </div>
              <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                Confirm & Delivered
              </h3>
              <p className="text-sm text-pureliva-body leading-relaxed">
                We confirm your delivery address and payment on chat. Your fresh batch ships swiftly to your doorstep.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. NUTRITION AT A GLANCE (TABS, BARS, BOWL) */}
      <section className="py-20 bg-pureliva-cream/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Macro Breakdown"
            title="Nutrition at a Glance"
            subtitle="Compare protein, dietary fibre, and sustained energy across all our seed varieties. Real lab-tested metrics per 100g."
            align="center"
          />

          <NutritionBars />
        </div>
      </section>

      {/* 8. WAYS TO ENJOY (CARDS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Culinary Inspiration"
            title="Simple Ways to Enjoy Every Spoon"
            subtitle="From energizing breakfast bowls to guilt-free midday crunching, here's how Pureliva fits seamlessly into your daily lifestyle."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {waysToEnjoy.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-pureliva-cream/60 border border-stone-200/70 shadow-sm hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pureliva-green/10 text-pureliva-green mb-4">
                    {item.tag}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-pureliva-body leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/40 text-xs text-pureliva-brown font-medium">
                  Ideal with all Pureliva packs
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. BULK & EXPORT TEASER */}
      <section className="py-20 bg-pureliva-green text-white relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-pureliva-brown/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="font-script text-3xl text-pureliva-brown">
                B2B & Commercial Supply
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Bulk Agro Supply & Export Ready
              </h2>
              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl leading-relaxed">
                Also supplying bulk Chia Seeds, Flax Seeds, Onion Flakes, Garlic Powder and Dry Garlic to retailers, manufacturers, importers and distributors across India and worldwide.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-center justify-center lg:items-end gap-4">
              <Link
                to="/bulk-export"
                className="w-full sm:w-auto px-6 py-3.5 bg-white text-pureliva-green hover:bg-emerald-50 rounded-2xl font-semibold text-sm transition-all shadow-md text-center"
              >
                View Bulk Specifications
              </Link>

              <WhatsAppButton
                href={buildWhatsAppLink("Hello, I want to enquire about bulk/export supply.")}
                text="Bulk Enquiry on WhatsApp"
                size="md"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQS ACCORDION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Got Questions? We Have Answers"
            subtitle="Everything you need to know about placing an order, delivery timelines, storage tips, and bulk procurement."
            align="center"
          />

          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* 11. INSTAGRAM CTA */}
      <section className="py-16 bg-pureliva-cream border-t border-stone-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-pink-100 text-pink-600 mb-2">
            <Instagram size={24} />
          </div>
          <h2 className="font-heading text-3xl font-bold text-pureliva-heading">
            Join Our Community of Mindful Eaters
          </h2>
          <p className="text-sm sm:text-base text-pureliva-body max-w-xl mx-auto">
            Show your Pureliva creation to us on Instagram. Tag us in your smoothies, morning bowls, and wholesome recipes!
          </p>
          <div className="pt-2">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-pureliva-green text-white font-semibold text-sm hover:bg-pureliva-green-hover transition-colors shadow-soft"
            >
              <span>Follow @purelivafoods</span>
              <ExternalLink size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

