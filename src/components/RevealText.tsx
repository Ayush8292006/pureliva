import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = "",
  delay = 0,
  as = "h2",
}) => {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  const Tag = motion[as];

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 140,
      },
    },
  };

  return (
    <Tag
      className={`${className} overflow-hidden`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;

