import config from '../../../../tailwind.config.ts'

const { colors } = config.theme
const { fontFamily } = config.theme

export const nodeStyles = {
  rect: {
    fill: colors['th-tint'][20],
  },
  text: {
    fontSize: 16,
    fontFamily: fontFamily['th-mono'][0],
    fill: colors['th-black'][100],
  }
}