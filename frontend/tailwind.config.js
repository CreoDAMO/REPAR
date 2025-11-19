/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'aequitas-blue': '#1e40af',
        'aequitas-gold': '#f59e0b',
        'sovereign-purple': '#8b5cf6'
      }
    }
  },
  plugins: []
}
