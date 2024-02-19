export function pxToRem(pxs: number) {
  return `${pxs / 16}rem`; // Root base font size: 16px
}

export function pxAccordingToRem(pxs: number) {
  const baseFontSize = window.innerWidth < 1280 ? 12 : 16;
  return (pxs / 16) * baseFontSize;
}

export function responsiveSize(normal: number, small: number) {
  return window.innerWidth < 1280 ? small : normal;
}

export function responsiveClass(normal: string, small: string) {
  return window.innerWidth < 1280 ? small : normal;
}