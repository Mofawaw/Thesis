import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap } from '@codemirror/commands';

const CodeEditor = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [code, setCode] = useState<string>('');

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: "",
            extensions: [
                keymap.of(defaultKeymap),
                python(),
                lineNumbers(),
                highlightActiveLine(),
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
            <div ref={editorRef} className="editor" />
            <div className="output mt-4">
                <strong>Output:</strong>
                <pre>{code}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
