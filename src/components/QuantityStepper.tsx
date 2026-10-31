import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantityStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
  size?: "sm" | "md";
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  min = 1,
  max = 10,
  onChange,
  className = "",
  size = "md",
}) => {
  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    if (value < max) {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: "h-9 text-xs",
    md: "h-11 text-sm",
  }[size];

  const btnClasses = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
  }[size];

  return (
    <div
      className={`inline-flex items-center border border-gray-200 bg-white rounded-2xl p-1 shadow-sm ${sizeClasses} ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center rounded-xl text-pureliva-heading hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${btnClasses}`}
      >
        <Minus size={size === "sm" ? 14 : 16} />
      </button>

      <span className="w-9 text-center font-semibold text-pureliva-heading select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
        className={`flex items-center justify-center rounded-xl text-pureliva-heading hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${btnClasses}`}
      >
        <Plus size={size === "sm" ? 14 : 16} />
      </button>
    </div>
  );
};

export default QuantityStepper;

