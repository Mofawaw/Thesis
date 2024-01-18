interface ThFont {
  'th-magic': string[];
  'th-mono': string[];
}

export type ThFontKey = keyof ThFont;

export const thFont: ThFont = {
  'th-magic': ['SuperCell Magic'],
  'th-mono': ['monospace'],
};