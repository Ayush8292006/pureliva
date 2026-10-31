/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pureliva: {
          green: "#0B3D1E",
          "green-hover": "#0e4d27",
          "green-dark": "#072613",
          brown: "#B5652A",
          cream: "#FBF8F1",
          heading: "#1A1A1A",
          body: "#555555",
          muted: "#767676",
          border: "#E7E5E4",
        },
        whatsapp: {
          DEFAULT: "#25D366",
          hover: "#20BD5A",
          dark: "#128C7E",
        },
        accent: {
          flax: "#B5652A",
          mix: "#7A0F2E",
          chia: "#B57EDC",
          sunflower: "#F5C518",
          pumpkin: "#F28C0F",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Poppins'", "sans-serif"],
        script: ["'Caveat'", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(11, 61, 30, 0.08)",
        "soft-lg": "0 20px 40px -15px rgba(11, 61, 30, 0.12)",
        glow: "0 0 25px rgba(37, 211, 102, 0.35)",
        bowl: "0 25px 35px -10px rgba(11, 61, 30, 0.25)",
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1', boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.6)' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9', boxShadow: '0 0 0 14px rgba(37, 211, 102, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}

