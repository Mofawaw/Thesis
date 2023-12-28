import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const keywordColor = "#000000";
const variableColor = "#000000";
const mutableObjColor = "#268bd2";
const immutableObjColor = "#98c379";
const backgroundColor = "#ffffff";
const textColor = "#aaaaaa";

const activeLineColor = "#000000";
const selectionColor = "#eeeeee";

// ----- Theme -----
const customTheme = EditorView.theme({
    "&": {
        color: textColor,
        backgroundColor: backgroundColor,
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
        border: "none"
    },
    ".cm-gutterElement.line-has-code": {
        color: activeLineColor,
        backgroundColor: selectionColor
    },
    ".cm-activeLine": {
        backgroundColor: selectionColor
    },
    ".cm-activeLineGutter": {
        backgroundColor: selectionColor,
    }
}, { dark: false });

const customHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: keywordColor },
    { tag: tags.name, color: variableColor },
    { tag: tags.string, color: immutableObjColor },
    { tag: tags.number, color: immutableObjColor },
    { tag: tags.className, color: mutableObjColor },
    { tag: tags.definition(tags.variableName), color: keywordColor },
    { tag: tags.function(tags.variableName), color: mutableObjColor },
]);

const theme = [customTheme, syntaxHighlighting(customHighlightStyle)];

export { theme, customHighlightStyle, customTheme };

// ----- Gutter: lineNumberStyling
function lineNumberStyling() {
    return EditorView.updateListener.of((update) => {
        if (!update.docChanged && !update.selectionSet) return;

        let lastNonEmptyLine = 0;
        // Find the last non-empty line number
        for (let i = 1; i <= update.state.doc.lines; i++) {
            const line = update.state.doc.line(i);
            if (line.text.trim() !== '') {
                lastNonEmptyLine = i + 1;
            }
        }

        // Apply the class to line numbers up to the last non-empty line
        const gutterElements = update.view.dom.getElementsByClassName('cm-gutterElement');
        for (let i = 0; i < lastNonEmptyLine; i++) {
            if (gutterElements[i]) {
                gutterElements[i].classList.add('line-has-code');
            }
        }

        // Remove the class from line numbers beyond the last non-empty line
        for (let i = lastNonEmptyLine; i < gutterElements.length; i++) {
            if (gutterElements[i]) {
                gutterElements[i].classList.remove('line-has-code');
            }
        }
    });
}

export { lineNumberStyling }
