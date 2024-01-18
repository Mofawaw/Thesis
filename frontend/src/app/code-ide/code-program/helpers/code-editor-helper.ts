import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { thColors } from '@/utilities/th-color.ts';
import { thFont } from '@/utilities/th-font.ts';

const keywordColor = thColors['th-black'][100];
const variableColor = thColors['th-black'][100];
const mutableObjColor = thColors['th-reference'][100];
const immutableObjColor = thColors['th-value'][100];
const backgroundColor = thColors['th-white'];
const textColor = thColors['th-black'][40];
const currentLineColor = thColors['th-black'][10];

// Theme
const codeEditorTheme = EditorView.theme({
  "&": {
    color: textColor,
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
  ".cm-activeLine": {
    backgroundColor: currentLineColor
  },
  ".cm-activeLineGutter": {
    backgroundColor: currentLineColor
  }
}, { dark: false });

const codeEditorHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: keywordColor },
  { tag: tags.name, color: variableColor },
  { tag: tags.string, color: immutableObjColor },
  { tag: tags.number, color: immutableObjColor },
  { tag: tags.className, color: mutableObjColor },
  { tag: tags.definition(tags.variableName), color: keywordColor },
  { tag: tags.function(tags.variableName), color: mutableObjColor },
]);

const codeEditorStyles = [codeEditorTheme, syntaxHighlighting(codeEditorHighlightStyle)];

export { codeEditorStyles };