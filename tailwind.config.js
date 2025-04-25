/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Asosiy fayllar
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Komponentlar
    "./slices/**/*.{js,ts,jsx,tsx,mdx}", // Slice Machine fayllari
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-alpino)", "sans-serif"],
      },
      keyframes: {
        "slide-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-left": "slide-left 3s linear infinite",
        "spin-slow": "spin 6s linear infinite",
      },
    },
  },
  plugins: [], // prettier-plugin bu yerda kerak emas
};