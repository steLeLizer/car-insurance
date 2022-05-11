module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        offer: "url('/src/assets/offer-background.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
