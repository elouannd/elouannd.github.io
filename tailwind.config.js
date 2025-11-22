/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-orange': '#FFA666',
        'brand-teal': '#66F2E0',
        'brand-beige': '#FFF8F0',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px #000',
        'brutal-sm': '3px 3px 0px 0px #000',
        'brutal-pressed': '2px 2px 0px 0px #000',
      },
    },
  },
  plugins: [],
}
