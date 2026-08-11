/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      colors: {
        primary: "#22c55e",
        primaryDark: "#16a34a",
        primaryBlack: {
          100: "#0b0f17",
          200: "#131927",
          300: "#1f293d",
        },
      },
    },
  },
  plugins: [],
};
