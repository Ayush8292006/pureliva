import React from "react";
import { motion } from "framer-motion";
import RevealText from "./RevealText";

interface SectionHeadingProps {
  badge?: string;
  badgeScript?: boolean;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleAs?: "h1" | "h2" | "h3";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  badgeScript = false,
  title,
  subtitle,
  align = "center",
  className = "",
  titleAs = "h2",
}) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  }[align];

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          {badgeScript ? (
            <span className="font-script text-2xl md:text-3xl text-pureliva-brown">
              {badge}
            </span>
          ) : (
            <span className="inline-block text-xs uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full bg-pureliva-green/10 text-pureliva-green">
              {badge}
            </span>
          )}
        </motion.div>
      )}

      <RevealText
        as={titleAs}
        text={title}
        className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-pureliva-heading leading-tight tracking-tight"
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-pureliva-body font-light leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;

