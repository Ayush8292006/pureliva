import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import WhatsAppIcon from "./WhatsAppIcon";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface WhatsAppButtonProps {
  href: string;
  text?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  href,
  text = "Order on WhatsApp",
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  ariaLabel,
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced) return;
    const { clientX, clientY } = e;
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs font-medium gap-1.5 rounded-xl",
    md: "px-5 py-3 text-sm font-semibold gap-2.5 rounded-2xl",
    lg: "px-7 py-4 text-base font-semibold gap-3 rounded-2xl shadow-lg hover:shadow-xl",
  }[size];

  const variantClasses = {
    primary:
      "bg-whatsapp text-white hover:bg-whatsapp-hover shadow-soft transition-all duration-300",
    secondary:
      "bg-pureliva-green text-white hover:bg-pureliva-green-hover transition-all duration-300",
    outline:
      "border-2 border-whatsapp text-pureliva-green hover:bg-whatsapp/10 transition-all duration-300",
  }[variant];

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || text}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center tracking-wide group select-none ${sizeClasses} ${variantClasses} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      <WhatsAppIcon
        size={size === "sm" ? 16 : size === "lg" ? 22 : 19}
        className="text-white flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        fill="currentColor"
      />
      <span>{text}</span>
    </motion.a>
  );
};

export default WhatsAppButton;

