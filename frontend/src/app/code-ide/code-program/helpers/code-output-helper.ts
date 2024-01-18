import { EditorView, gutter, GutterMarker } from '@codemirror/view';
import { thFont } from '@/utilities/th-font.ts';
import { thColors } from '@/utilities/th-color.ts';

const keywordColor = thColors['th-black'][100];
const backgroundColor = thColors['th-white'];
const textColor = thColors['th-black'][40];

// Theme
const codeOutputTheme = EditorView.theme({
  "&": {
    color: keywordColor,
    backgroundColor: backgroundColor,
    fontFamily: thFont['th-mono'][0],
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

const codeOutputStyles = [codeOutputTheme];

export { codeOutputStyles };

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