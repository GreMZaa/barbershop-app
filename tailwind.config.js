/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0F0F0F",
        gold: "#D4AF37",
        goldLight: "#F1D592",
        wood: "#3D2B1F",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #D4AF37 0%, #F1D592 50%, #D4AF37 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(212, 175, 55, 0.2)",
      }
    },
  },
  plugins: [],
}
