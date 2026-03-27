/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        card: "#111827",
        accent: "#38bdf8",
        accentSoft: "#0ea5e9",
        textSoft: "#9ca3af"
      },
      borderRadius: {
        xl: "1.25rem"
      }
    }
  },
  plugins: []
};
