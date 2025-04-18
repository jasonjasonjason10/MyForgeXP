/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        forge: ["ForgeXP", "sans-serif"],
      },
      textShadow: {
        glow: "0 0 6px rgba(255, 165, 0, 0.6)", // subtle orange glow
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-textshadow"),
  ],
};
