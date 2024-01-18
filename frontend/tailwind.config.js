/** @type {import('tailwindcss').Config} */
import animationDelay from 'tailwindcss-animation-delay'
import { thColors, thColorSafeList } from './src/utilities/th-color.ts';
import { thFont } from './src/utilities/th-font.ts';

export default {
  safelist: thColorSafeList,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: thFont,
    colors: thColors,
    extend: {
      backgroundImage: {
        'th-gradient-100': "linear-gradient(to right, #18B5CB, #1836CB, #CB188E)",
        'th-gradient-40': "linear-gradient(to bottom right, #A3E1EA, #EBEBEB, #A3E1EA, #A3AFEA, #EAA3D2, #EBEBEB, #EAA3D2)"
      },
      backgroundSize: {
        '400%': '400% 400%'
      },
      borderWidth: {
        'th-xl': '10px',
        'th': '5px'
      },
      borderRadius: {
        'th': '15px',
        'th-inner': '10px'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        background: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        zoomInFromBottom: {
          '0%': {
            transform: 'translateY(100px) scale(0.3)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0) scale(1)',
            opacity: 1,
          },
        },
      },
      animation: {
        'th-fade-in': 'fadeIn 0.3s ease-out',
        'th-gradient': 'background 6s ease infinite',
        'th-gradient-fast': 'background 3s ease infinite',
        'th-zoom-in-from-bottom': 'zoomInFromBottom 0.15s ease-out',
        'th-spin': 'spin 0.75s linear infinite',
        'th-spin-slow': 'spin 6s linear infinite',
      },
    },
  },
  plugins: [
    animationDelay
  ]
}