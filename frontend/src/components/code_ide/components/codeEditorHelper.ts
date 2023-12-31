import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import config from '../../../../tailwind.config.ts'

const { colors } = config.theme
const { fontFamily } = config.theme

const keywordColor = colors['th-black'][100];
const variableColor = colors['th-black'][100];
const mutableObjColor = colors['th-reference'][100];
const immutableObjColor = colors['th-value'][100];
const backgroundColor = colors['th-white'];
const textColor = colors['th-black'][40];

const activeLineNumberColor = colors['th-black'][100];
const activeLineColor = colors['th-tint'][40];
const currentLineColor = colors['th-black'][10];

// Theme
const codeEditorTheme = EditorView.theme({
    "&": {
        color: textColor,
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
    ".cm-gutterElement.line-has-code": {
        color: activeLineNumberColor,
        backgroundColor: activeLineColor
    },
    ".cm-activeLine": {
        backgroundColor: currentLineColor
    },
    ".cm-activeLineGutter": {
        backgroundColor: currentLineColor,
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

// Gutter
function lineNumberStyling() {
    return EditorView.updateListener.of((update) => {
        if (!update.docChanged && !update.selectionSet) return;

        let lastNonEmptyLine = 0;
        // Find last non-empty line number
        for (let i = 1; i <= update.state.doc.lines; i++) {
            const line = update.state.doc.line(i);
            if (line.text.trim() !== '') {
                lastNonEmptyLine = i + 1;
            }
        }

        // Apply class to line numbers up to the last non-empty line
        const gutterElements = update.view.dom.getElementsByClassName('cm-gutterElement');
        for (let i = 0; i < lastNonEmptyLine; i++) {
            if (gutterElements[i]) {
                gutterElements[i].classList.add('line-has-code');
            }
        }

        // Remove class from line numbers beyond the last non-empty line
        for (let i = lastNonEmptyLine; i < gutterElements.length; i++) {
            if (gutterElements[i]) {
                gutterElements[i].classList.remove('line-has-code');
            }
        }
    });
}

export { lineNumberStyling }