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
    10: '#FFFFFF' // TODO
  },
  'th-value': {
    100: '#18B5CB',
    70: '#5DCBDB',
    40: '#A3E1EA',
    30: '#BAE9EF',
    20: '#D1F0F5',
    10: '#FFFFFF' // TODO
  },
  'th-reference': {
    100: '#1836CB',
    70: '#5D72DB',
    40: '#A3AFEA',
    30: '#BAC3EF',
    20: '#D1D7F5',
    10: '#FFFFFF' // TODO
  },
  'th-together': {
    100: '#CB188E',
    70: '#DB5DB0',
    40: '#EAA3D2',
    30: '#EFBADD',
    20: '#F5D1E9',
    10: '#FFFFFF' // TODO
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
      'th-mono': ['Monaco'],
    },
    colors: colors,
    extend: {
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
        'th-border': 'background 20s ease infinite',
        'th-zoom-in-from-bottom': 'zoomInFromBottom 0.15s ease-out',
        'th-spin': 'spin 0.75s linear infinite',
      },
    },
  },
  plugins: [
    animationDelay
  ]
}