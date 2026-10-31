import React from "react";

interface WaveDividerProps {
  fillColor?: string;
  inverted?: boolean;
  className?: string;
  height?: number;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({
  fillColor = "#FBF8F1",
  inverted = false,
  className = "",
  height = 54,
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${
        inverted ? "rotate-180" : ""
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: `${height}px` }}
      >
        <path
          d="M0,0 C320,70 560,10 900,55 C1200,90 1360,20 1440,35 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;

