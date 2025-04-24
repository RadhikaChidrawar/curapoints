/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e0f7fa",
        red: {
          light: "#F08080", // Light red
          DEFAULT: "#FF0000", // Default bright red
          dark: "#8B0000", // Dark red
        },
        orange: {
          light: "#FFA726", // Custom light orange
          DEFAULT: "#FF9800", // Default orange
          dark: "#FB8C00", // Darker orange
        },
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
