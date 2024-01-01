import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap } from '@codemirror/commands';
import { codeEditorStyles, lineNumberStyling } from './codeEditorHelper.ts';
import useCodeIDEStore from '../codeIDEStore.ts'

export default function CodeEditor({ height }: { height: number }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const code = useCodeIDEStore((state) => state.code)
    const setCode = useCodeIDEStore((state) => state.setCode)

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: code,
            extensions: [
                keymap.of(defaultKeymap),
                python(),
                codeEditorStyles,
                lineNumbers(),
                lineNumberStyling(),
                highlightActiveLine(),
                highlightActiveLineGutter(),
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        setCode(update.state.doc.toString());
                    }
                    if (update.focusChanged) {
                        if (update.view.hasFocus) {
                            editorRef.current?.classList.add("nodrag");
                            editorRef.current?.classList.add("nowheel");
                        } else {
                            editorRef.current?.classList.remove("nodrag");
                            editorRef.current?.classList.remove("nowheel");
                        }
                    }
                })
            ]
        });

        const view = new EditorView({
            state: startState,
            parent: editorRef.current
        });

        return () => {
            view.destroy();
        };
    }, []);

    return (
        <div ref={editorRef} className="editor" style={{ height: `${height}px`, overflow: 'auto' }} />
    );
}

