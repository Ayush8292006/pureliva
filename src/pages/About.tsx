import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import Img from "../components/Img";
import SectionHeading from "../components/SectionHeading";
import Marquee from "../components/Marquee";
import {
  Tractor,
  Sparkles,
  Flame,
  ShieldCheck,
  Package,
  Award,
  Heart,
  Users,
  Leaf,
  CheckCircle2,
} from "lucide-react";

export const About: React.FC = () => {
  const timelineSteps = [
    {
      step: "01",
      title: "Direct Farm Cultivation",
      icon: Tractor,
      desc: "We collaborate directly with generational farming families in Madhya Pradesh. Healthy fertile soils, non-GMO crops, and responsible agricultural stewardship from the very first sprout.",
    },
    {
      step: "02",
      title: "Cleaning & Optical Sorting",
      icon: Sparkles,
      desc: "Multi-stage mechanical and optical color sorting removes all dust, stones, and broken seed fragments, ensuring only 100% whole, clean, uniform seeds move forward.",
    },
    {
      step: "03",
      title: "Artisanal Roasting & Seasoning",
      icon: Flame,
      desc: "Slow-roasted at carefully controlled temperatures to bring out the natural nutty aromatics and crisp snap, lightly seasoned with iodised salt (or kept 100% raw for chia).",
    },
    {
      step: "04",
      title: "Stringent Quality Checks",
      icon: ShieldCheck,
      desc: "Every batch is inspected in accredited testing labs for moisture levels, protein integrity, and microbiological purity before any packing begins.",
    },
    {
      step: "05",
      title: "Resealable Zipper Packaging",
      icon: Package,
      desc: "Packaged hygienically in high-barrier 100g zipper pouches that protect against oxidation and humidity, keeping your seeds crisp from the first spoonful to the last.",
    },
  ];

  const brandValues = [
    {
      icon: Leaf,
      title: "Soil-First Integrity",
      desc: "We don't buy from anonymous commodity brokers. Purity begins with knowing who tilled the earth and how the seeds were nurtured.",
    },
    {
      icon: Heart,
      title: "Transparency in Every Pack",
      desc: "Exact lab-tested nutritional breakdowns, clear ingredients, and straightforward ICMR RDA guidance. No vague promises.",
    },
    {
      icon: Users,
      title: "Fair Farmer Partnerships",
      desc: "Long-term relationships with regional growers ensure fair market compensation and sustainable farming practices in Khandwa.",
    },
    {
      icon: Award,
      title: "Certified Hygiene Standard",
      desc: "Processed in facilities complying with rigorous international standards including ISO 22000, GMP, and HACCP guidelines.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Pureliva Foods by Patidar Enterprises</title>
        <meta
          name="description"
          content="Learn about Pureliva Foods, our farming roots in Khandwa, Madhya Pradesh, and our journey from agricultural heritage to certified natural seed nutrition."
        />
        <link rel="canonical" href="https://purelivafoods.com/about" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        {/* Hero Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Heritage"
            title="Rooted in Soil, Committed to Purity"
            subtitle="From a generational farming family in Khandwa, Madhya Pradesh to dining tables across India — our story is built on honest nutrition."
            align="center"
          />

          {/* Story Narrative with Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-16">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-script text-3xl text-pureliva-brown">
                The Patidar Enterprises Story
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-pureliva-heading leading-tight">
                "Purity Isn't a Marketing Trend. It's How We Grew Up."
              </h2>
              <p className="text-base sm:text-lg text-pureliva-body leading-relaxed">
                Pureliva was founded by Patidar Enterprises in Khandwa, in the fertile heartland of Madhya Pradesh. Growing up with mud on our boots and hands in the soil, our founder understood what true farm quality feels like long before modern health food trends began.
              </p>
              <p className="text-sm sm:text-base text-pureliva-body leading-relaxed">
                Too often, commercial seeds on retail shelves are overly processed, stale, or blended with filler additives. Pureliva was born with a single mission: bring whole, crunchy, nutrient-packed natural seeds straight from reliable farms into your pantry with total honesty.
              </p>

              <div className="p-6 bg-pureliva-cream rounded-3xl border border-stone-200/70">
                <blockquote className="font-heading text-lg font-semibold text-pureliva-heading italic">
                  "When the soil is your teacher, purity is our promise."
                </blockquote>
                <p className="text-xs text-pureliva-brown font-semibold uppercase tracking-wider mt-2">
                  — Founder, Patidar Enterprises
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-pureliva-cream/70 p-8 flex items-center justify-center border border-stone-200/60 shadow-soft">
                <div className="absolute inset-8 rounded-full bg-pureliva-green/10 blur-xl" />
                <Img
                  src="/images/decor/seed-mix-bowl-alt"
                  alt="Artisanal seed mix bowl"
                  transparent
                  className="relative z-10 w-full h-full object-contain filter drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Animated Vertical Timeline */}
        <div className="py-20 bg-pureliva-cream/50 border-y border-stone-200/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="From Farm to Table"
              title="Our 5-Stage Journey of Purity"
              subtitle="Step by step, here is how raw harvest turns into pristine superfood ready for your spoon."
              align="center"
            />

            <div className="relative mt-16">
              {/* Vertical timeline spine */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-pureliva-green/20 -translate-x-1/2" />

              <div className="space-y-12">
                {timelineSteps.map((step, idx) => {
                  const Icon = step.icon;
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-center gap-8 ${
                        isEven ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Timeline Card */}
                      <div className="w-full md:w-1/2">
                        <div
                          className={`p-8 bg-white rounded-3xl border border-stone-200 shadow-soft hover:shadow-soft-lg transition-all ${
                            isEven ? "md:text-left" : "md:text-right"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-3 mb-3 ${
                              isEven ? "md:justify-start" : "md:justify-end"
                            }`}
                          >
                            <span className="font-mono text-xs font-bold text-pureliva-brown bg-pureliva-brown/10 px-2.5 py-1 rounded-full">
                              Step {step.step}
                            </span>
                            <h3 className="font-heading text-xl font-bold text-pureliva-heading">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-sm text-pureliva-body leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center Timeline Icon Pin */}
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-pureliva-green text-white flex items-center justify-center shadow-md">
                        <Icon size={24} />
                      </div>

                      {/* Spacer for symmetrical layout */}
                      <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Our Values Grid */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Guiding Values"
              title="What We Stand For"
              subtitle="Ethical practices that inspire everything from soil preparation to packaging."
              align="center"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandValues.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.1 }}
                    className="p-6 rounded-3xl bg-pureliva-cream border border-stone-200/60 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-pureliva-green text-white flex items-center justify-center mb-5 shadow-sm">
                        <Icon size={22} />
                      </div>
                      <h4 className="font-heading text-lg font-bold text-pureliva-heading mb-2">
                        {val.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-pureliva-body leading-relaxed">
                        {val.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications Strip */}
        <Marquee />
      </div>
    </>
  );
};

export default About;

