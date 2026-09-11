/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zoho: {
          blue: "#0F62FE",
          dark: "#121619",
          border: "#E0E0E0",
          bg: "#F4F7FB",
          green: "#25D366",
          darkGreen: "#128C7E"
        }
      }
    },
  },
  plugins: [],
}
