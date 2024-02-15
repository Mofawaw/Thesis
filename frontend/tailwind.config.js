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
        'th-gradient-70': "linear-gradient(to bottom right, #5DCBDB, #EBEBEB, #5DCBDB, #5D72DB, #DB5DB0, #EBEBEB, #DB5DB0)",
        'th-gradient-40': "linear-gradient(to bottom right, #A3E1EA, #EBEBEB, #A3E1EA, #A3AFEA, #EAA3D2, #EBEBEB, #EAA3D2)",
        'th-gradient-30': "linear-gradient(to bottom right, #BAE9EF, #EBEBEB, #BAE9EF, #BAC3EF, #EFBADD, #EBEBEB, #EFBADD)",
        'th-gradient-20': "linear-gradient(to bottom right, #D1F0F5, #FFFFFF, #D1F0F5, #D1D7F5, #F5D1E9, #FFFFFF, #F5D1E9)",
        'th-gradient-10': "linear-gradient(to bottom right, #FAF8F4, #FFFFFF, #FAF8F4, #FFFFFF, #FAF8F4, #FFFFFF. #FAF8F4)",
        'th-gradient-angular': 'conic-gradient(at center, #FDE9B7 0%, #FCE19F 20%, #FEF8E7 40%, #FEF0CF 80%, #FDE9B7 90%)',
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
        zoomInFromRight: {
          '0%': {
            transform: 'translateX(100px) scale(0.3)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0) scale(1)',
            opacity: 1,
          },
        },
      },
      animation: {
        'th-fade-in': 'fadeIn 0.3s ease-out',
        'th-gradient': 'background 6s ease infinite',
        'th-gradient-fast': 'background 3s ease infinite',
        'th-gradient-slow': 'background 6s ease infinite',
        'th-zoom-in-from-bottom': 'zoomInFromBottom 0.15s ease-out',
        'th-zoom-in-from-right': 'zoomInFromRight 0.15s ease-out',
        'th-spin': 'spin 0.75s linear infinite',
        'th-spin-slow': 'spin 6s linear infinite',
        'th-spin-super-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [
    animationDelay
  ]
}