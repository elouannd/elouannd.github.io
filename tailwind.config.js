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
        'brutal-lg': '10px 10px 0px 0px #000',
        'brutal-xl': '14px 14px 0px 0px #000',
        'brutal-layered': '6px 6px 0px 0px #000, 12px 12px 0px 0px rgba(0,0,0,0.15)',
        'brutal-colored-orange': '6px 6px 0px 0px #FFA666',
        'brutal-colored-teal': '6px 6px 0px 0px #66F2E0',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 166, 102, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 166, 102, 0.6)' },
        },
        'slide-in-bottom': {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
      },
    },
  },
  plugins: [],
}
