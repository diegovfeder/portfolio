/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scrollbar: '#AAA',
        scrollbarThumb: '#000',
        scrollbarThumbHover: '#555',
  
        corvu: {
          bg: "#f3f1fe",
          100: "#e6e2fd",
          200: "#d4cbfb",
          300: "#bcacf6",
          400: "#a888f1",
          text: "#180f24",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@corvu/tailwind")],
};
