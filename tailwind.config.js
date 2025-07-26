/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-animate'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake", "cyberpunk", "valentine"]
  }
}
