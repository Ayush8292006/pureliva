import React from "react";
import { CheckCircle2, ShieldCheck, Award, Sparkles, Leaf } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

interface MarqueeProps {
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ className = "" }) => {
  const items = [
    { label: "ISO 22000 Certified", icon: Award },
    { label: "GMP Certified Facility", icon: ShieldCheck },
    { label: "HACCP Certified", icon: CheckCircle2 },
    { label: "USDA Certified Standards", icon: Sparkles },
    { label: "FSSAI Lic. 21426950001159", icon: Leaf },
    { label: "100% Natural & Honest", icon: Award },
    { label: "Direct Farm Sourced", icon: ShieldCheck },
  ];

  return (
    <div
      className={`relative w-full overflow-hidden bg-pureliva-green text-white py-4 select-none ${className}`}
      aria-label="Certifications marquee"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center space-x-3 px-8 text-xs sm:text-sm tracking-wider uppercase font-medium text-emerald-100"
            >
              <Icon size={16} className="text-pureliva-brown shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
              <span className="text-pureliva-brown/50 ml-6 select-none">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;

