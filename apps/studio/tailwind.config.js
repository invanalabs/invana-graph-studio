/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "src/**/*.{ts,tsx}", 
      "../../packages/ui/src/**/*.{ts,tsx}"
    ],
    plugins: [require("tailwindcss-animate")],
  }
  