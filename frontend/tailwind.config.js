/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F3E9E",
        "primary-dark": "#1B287A",
      },
    },
  },
  plugins: [],
};
