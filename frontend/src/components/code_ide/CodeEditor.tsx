import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap } from '@codemirror/commands';
import { theme, lineNumberStyling } from './codemirror_extensions.ts';
import useCodeIDEStore from './codeide_store.ts'

export default function CodeEditor({ height }: { height: number }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const setCode = useCodeIDEStore((state) => state.setCode)

    useEffect(() => {
        if (!editorRef.current) return;

        const initialCode = Array(19).fill('\n').join('');
        const startState = EditorState.create({
            doc: initialCode,
            extensions: [
                keymap.of(defaultKeymap),
                python(),
                theme,
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
        <div className="flex flex-col">
            <div ref={editorRef} className="editor" style={{ height: `${height}px`, overflow: 'auto' }} />
        </div>
    );
}
