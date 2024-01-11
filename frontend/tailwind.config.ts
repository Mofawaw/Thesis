/** @type {import('tailwindcss').Config} */
import animationDelay from 'tailwindcss-animation-delay'

interface ColorShade {
  100: string;
  70: string;
  40: string;
  30: string;
  20: string;
  10: string;
}

interface ThColor {
  'th-white': string;
  'th-background': string;
  'th-black': ColorShade;
  'th-tint': ColorShade;
  'th-value': ColorShade;
  'th-reference': ColorShade;
  'th-together': ColorShade;
}

export type ThColorKeys = keyof ThColor;

const colors: ThColor = {
  'th-white': '#FFFFFF',
  'th-background': '#FAF8F4',
  'th-black': {
    100: '#383838',
    70: '#747474',
    40: '#9B9B9B',
    30: '#C3C3C3',
    20: '#D7D7D7',
    10: '#EBEBEB',
  },
  'th-tint': {
    100: '#F8B50E',
    70: '#FACB57',
    40: '#FCE19F',
    30: '#FDE9B7',
    20: '#FEF0CF',
    10: '#FEF8E7'
  },
  'th-value': {
    100: '#18B5CB',
    70: '#5DCBDB',
    40: '#A3E1EA',
    30: '#BAE9EF',
    20: '#D1F0F5',
    10: '#E8F8FA' // TODO
  },
  'th-reference': {
    100: '#1836CB',
    70: '#5D72DB',
    40: '#A3AFEA',
    30: '#BAC3EF',
    20: '#D1D7F5',
    10: '#E8EBFA' // TODO
  },
  'th-together': {
    100: '#CB188E',
    70: '#DB5DB0',
    40: '#EAA3D2',
    30: '#EFBADD',
    20: '#F5D1E9',
    10: '#FAE8F4' // TODO
  },
};

let colorSafeList = [];

for (const colorName in colors) {
  const pallette = colors[colorName as ThColorKeys];

  if (typeof pallette === "object") {
    for (const shade in pallette) {
      colorSafeList.push(`text-${colorName}-${shade}`);
      colorSafeList.push(`bg-${colorName}-${shade}`);
      colorSafeList.push(`border-${colorName}-${shade}`);
    }
  } else {
    colorSafeList.push(`text-${colorName}`);
    colorSafeList.push(`bg-${colorName}`);
    colorSafeList.push(`border-${colorName}`);
  }
}

export default {
  safelist: colorSafeList,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'th-magic': ['SuperCell Magic'],
      'th-mono': ['monospace'],
    },
    colors: colors,
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