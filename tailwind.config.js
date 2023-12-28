/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'th-magic': ['SuperCell Magic'],
      'th-mono': ['Monaco'],
    },
    colors: {
      'th-white': '#FFFFFF',
      'th-background': '#FAF8F4',
      'th-black': {
        100: '#383838',
        70: '#747474',
        40: '#9B9B9B',
        30: '#C3C3C3',
        20: '#D7D7D7',
      },
      'th-tint': {
        100: '#F8B50E',
        70: '#FACB57',
        40: '#FCE19F',
        30: '#FDE9B7',
        20: '#FEF0CF',
      },
      'th-value': {
        100: '#18B5CB',
        70: '#5DCBDB',
        40: '#A3E1EA',
        30: '#BAE9EF',
        20: '#D1F0F5',
      },
      'th-reference': {
        100: '#1836CB',
        70: '#5D72DB',
        40: '#A3AFEA',
        30: '#BAC3EF',
        20: '#D1D7F5',
      },
      'th-together': {
        100: '#CB188E',
        70: '#DB5DB0',
        40: '#EAA3D2',
        30: '#EFBADD',
        20: '#F5D1E9',
      },
    },
    extend: {},
  },
  plugins: [],
}

