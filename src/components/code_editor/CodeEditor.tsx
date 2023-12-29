import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap } from '@codemirror/commands';
import { theme, lineNumberStyling } from './codemirror_extensions.ts';

export default function CodeEditor({ editorHeight }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState<string>('');
    // const [editorHeight, setEditorHeight] = useState<number>(300);

    useEffect(() => {
        if (!editorRef.current) return;

        const initialCode = Array(10).fill('\n').join('');
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
            <div ref={editorRef} className="editor" style={{ height: `${editorHeight}px`, overflow: 'auto' }} />
        </div>
    );
}
