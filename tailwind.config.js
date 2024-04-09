module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xl: { min: "1279px" },
      // => @media (max-width: 1535px) { ... }

      lg: { min: "1023px", max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      md: { min: "769px", max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      sm: { max: "768px" },
      // => @media (max-width: 767px) { ... }

      tablet: { min: "531px", max: "768px" },
      // => @media (max-width: 639px) { ... }

      tabletxs: { min: "426px", max: "531px" },
      // => @media (max-width: 639px) { ... }

      mobile: { max: "426px" },
      // => @media (max-width: 521px) { ... }

      mobilexs: { max: "321px" },
      // => @media (max-width: 521px) { ... }
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
