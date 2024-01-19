interface ThColorShade {
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
  'th-black': ThColorShade;
  'th-tint': ThColorShade;
  'th-value': ThColorShade;
  'th-reference': ThColorShade;
  'th-together': ThColorShade;
}

export type ThColorKey = keyof ThColor;
export type ThColorShadeKey = keyof ThColorShade;

export const thColors: ThColor = {
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
    10: '#E8F8FA'
  },
  'th-reference': {
    100: '#1836CB',
    70: '#5D72DB',
    40: '#A3AFEA',
    30: '#BAC3EF',
    20: '#D1D7F5',
    10: '#E8EBFA'
  },
  'th-together': {
    100: '#CB188E',
    70: '#DB5DB0',
    40: '#EAA3D2',
    30: '#EFBADD',
    20: '#F5D1E9',
    10: '#FAE8F4'
  },
};

const colorSafeList: string[] = [];

for (const colorName in thColors) {
  const palette = thColors[colorName as ThColorKey];

  if (typeof palette === "object" && palette !== null) {
    for (const shade in palette) {
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

export const thColorSafeList = colorSafeList;