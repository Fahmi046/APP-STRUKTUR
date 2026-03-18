/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ff6a00",
        "background-light": "#f8f7f5",
        "background-dark": "#0B0F19",
        "card-dark": "#161B26",
        "border-dark": "#242B38",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
