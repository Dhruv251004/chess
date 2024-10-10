/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#855f3c",
        light: "#c8b07f",
      },
    },
  },
  plugins: [],
};
