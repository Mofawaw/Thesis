import { EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import config from '../../../../tailwind.config.ts'
import useCodeIDEStore from '../codeIDEStore.ts';

const { colors } = config.theme
const { fontFamily } = config.theme

const keywordColor = colors['th-black'][100];
const variableColor = colors['th-black'][100];
const mutableObjColor = colors['th-reference'][100];
const immutableObjColor = colors['th-value'][100];
const backgroundColor = colors['th-white'];
const textColor = colors['th-black'][40];

const activeLineNumberColor = colors['th-black'][100];
const lineGraphLoadingColor = colors['th-black'][10];
const lineGraphLoadedColor = colors['th-black'][20];
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
    ".cm-gutterElement.lastLineGraphLoading": {
        color: activeLineNumberColor,
        backgroundColor: lineGraphLoadingColor
    },
    ".cm-gutterElement.lastLineGraphLoaded": {
        color: activeLineNumberColor,
        backgroundColor: lineGraphLoadedColor
    },
    ".cm-activeLine": {
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

// Gutter
export const dynamicLineStyling = ViewPlugin.fromClass(class {
    view: EditorView;
    unsubscribe: () => void = () => { };

    constructor(view: EditorView) {
        this.view = view;
        this.updateFromStore();
    }

    updateFromStore() {
        this.unsubscribe = useCodeIDEStore.subscribe(state => {
            console.log("useCodeIDEStore change");

            const gutterElements = this.view.dom.getElementsByClassName('cm-gutterElement');
            for (let i = 0; i < gutterElements.length; i++) {
                const lineElement = gutterElements[i];
                if (lineElement) {
                    lineElement.classList.remove('lastLineGraphLoading', 'lastLineGraphLoaded');
                    if (i <= state.lastLineGraphLoaded) {
                        lineElement.classList.add('lastLineGraphLoaded');
                    } else if (i > state.lastLineGraphLoaded && i <= state.lastLineGraphLoading) {
                        lineElement.classList.add('lastLineGraphLoading');
                    }
                }
            }
        });
    }

    update(update: ViewUpdate) {
        if (update.docChanged || update.viewportChanged) {
        }
    }

    destroy() {
        this.unsubscribe();
    }
});

export function findModifiedLine(update: any) {
    let modifiedLine = 0;
    update.changes.iterChanges((from: any, to: any, fromB: any, toB: any, inserted: any) => {
        if (update.state.doc.length === 0) {
            modifiedLine = 0;
        } else {
            const startLine = update.state.doc.lineAt(Math.min(from, update.state.doc.length - 1)).number;
            const endLine = update.state.doc.lineAt(Math.min(to, update.state.doc.length - 1)).number;
            modifiedLine = Math.max(modifiedLine, startLine, endLine);
        }
    });
    return modifiedLine;
}