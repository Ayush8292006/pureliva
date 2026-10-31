import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const prefersReduced = useReducedMotion();

  // 5 seed accent colors
  const seedColors = ["#B5652A", "#7A0F2E", "#B57EDC", "#F5C518", "#F28C0F"];

  const handleFinish = () => {
    try {
      sessionStorage.setItem("pureliva_intro_seen", "true");
    } catch {
      // ignore storage errors
    }
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  useEffect(() => {
    // If reduced motion, skip quickly
    if (prefersReduced) {
      handleFinish();
      return;
    }

    // Progress counter 0 to 100 over ~2.4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(handleFinish, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 5) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          key="preloader"
          exit={{ y: "-100%", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          onClick={handleFinish}
          role="dialog"
          aria-label="Loading Pureliva Foods"
        >
          {/* Subtle curved wave at bottom during slide up */}
          <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none translate-y-full">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-24 block"
            >
              <path
                d="M0,0 C480,120 960,0 1440,80 L1440,120 L0,120 Z"
                fill="#0B3D1E"
              />
            </svg>
          </div>

          {/* Center composition */}
          <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
            {/* Step 1: SVG Leaf draw animation */}
            <div className="w-20 h-20 mb-4 relative flex items-center justify-center">
              <svg
                width="72"
                height="72"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M12 52C12 52 16 32 36 20C48 12.8 54 10 54 10C54 10 51.2 16 44 28C32 48 12 52 12 52Z"
                  stroke="#0B3D1E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, fill: "rgba(11, 61, 30, 0)" }}
                  animate={{
                    pathLength: 1,
                    fill: progress > 50 ? "rgba(11, 61, 30, 0.1)" : "rgba(11, 61, 30, 0)",
                  }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                />
                <motion.path
                  d="M12 52C22 42 34 30 54 10"
                  stroke="#B5652A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
                <motion.path
                  d="M26 38C30 35 36 33 42 32"
                  stroke="#0B3D1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.path
                  d="M34 29C38 25 43 23 48 21"
                  stroke="#0B3D1E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </svg>
            </div>

            {/* Step 2: Logo fades + scales in (0.8 -> 1) with soft blur-to-sharp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="relative z-10"
            >
              <img
                src="/images/brand/logo.png"
                alt="Pureliva Logo"
                className="h-16 w-auto object-contain mx-auto"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-script text-2xl text-pureliva-brown mt-2"
              >
                Natural Seeds for Everyday Wellness
              </motion.p>
            </motion.div>

            {/* Step 3: Small seed shapes (dots/ovals in 5 product accent colours) falling and scattering softly */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {[
                { x: -70, y: -40, rotate: 25, delay: 0.8, color: seedColors[0], scale: 1 },
                { x: 80, y: -30, rotate: -35, delay: 0.9, color: seedColors[1], scale: 1.1 },
                { x: -90, y: 50, rotate: 45, delay: 1.0, color: seedColors[2], scale: 0.9 },
                { x: 95, y: 40, rotate: -20, delay: 1.1, color: seedColors[3], scale: 1.2 },
                { x: 0, y: -65, rotate: 15, delay: 0.7, color: seedColors[4], scale: 0.85 },
                { x: -45, y: 70, rotate: -55, delay: 1.2, color: seedColors[0], scale: 0.75 },
                { x: 60, y: 75, rotate: 30, delay: 1.15, color: seedColors[2], scale: 0.95 },
              ].map((seed, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: -30, scale: 0 }}
                  animate={{
                    opacity: [0, 0.9, 0.75],
                    y: seed.y,
                    x: seed.x,
                    scale: seed.scale,
                    rotate: seed.rotate,
                  }}
                  transition={{ duration: 1.2, delay: seed.delay, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 w-3.5 h-2 rounded-[50%]"
                  style={{ backgroundColor: seed.color }}
                />
              ))}
            </div>

            {/* Step 4: Thin green progress line fills 0 -> 100% with counter */}
            <div className="w-56 mt-10">
              <div className="flex items-center justify-between text-xs font-mono text-pureliva-green font-semibold mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-pureliva-muted">Loading Purity</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-pureliva-green rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5 }}
              className="text-[11px] text-gray-400 mt-4 tracking-wide"
            >
              Click anywhere to skip
            </motion.span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Preloader;

