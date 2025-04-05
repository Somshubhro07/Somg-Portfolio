// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class strategy
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-black': '#000505',
        'space-cadet': '#3B3355',
        'ultra-violet': '#5D5D81',
        'columbia-blue': '#BFCDE0',
        'brand-white': '#FEFCFD', // Use this for pure white text/bg
        // Add slightly off-white/darker gray for subtle text contrast if needed
        'off-white': '#F7F7F8',
        'near-black': '#111113',
        'mid-gray': '#888891',
      },
      keyframes: {
        'gradient-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        'gradient-bg': 'gradient-bg 25s ease infinite', // Slowed down gradient
      }
    },
  },
  plugins: [],
}