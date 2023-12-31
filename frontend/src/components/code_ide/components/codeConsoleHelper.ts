import { EditorView, gutter, GutterMarker } from '@codemirror/view';
import config from '../../../../tailwind.config.ts'

const { colors } = config.theme
const { fontFamily } = config.theme

const keywordColor = colors['th-black'][100];
const backgroundColor = colors['th-white'];
const textColor = colors['th-black'][40];

// Theme
const codeConsoleTheme = EditorView.theme({
  "&": {
    color: keywordColor,
    backgroundColor: backgroundColor,
    fontFamily: fontFamily['th-mono'][0],
    fontSize: "1rem",
    lineHeight: "1.5rem"
  },
  "&.cm-focused": {
    outline: "none"
  },
  ".cm-content": {
    caretColor: textColor,
  },
  ".cm-gutters": {
    backgroundColor: backgroundColor,
    color: textColor,
    border: "none",
  },
}, { dark: false });

const codeConsoleStyles = [codeConsoleTheme];

export { codeConsoleStyles };

//Gutter
class PercentGutterMarker extends GutterMarker {
  toDOM() {
    return document.createTextNode("%");
  }
}

function percentLineNumbers() {
  return gutter({
    class: "cm-lineNumbers",
    lineMarker: () => new PercentGutterMarker(),
    initialSpacer: () => new PercentGutterMarker()
  });
}

export { percentLineNumbers }