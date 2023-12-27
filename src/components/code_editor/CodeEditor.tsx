import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';

const CodeEditor: React.FC = () => {
    const editorDiv = useRef<HTMLDivElement>(null);
    const [editorView, setEditorView] = useState<EditorView | null>(null);

    useEffect(() => {
        if (editorDiv.current) {
            const startState = EditorState.create({
                doc: 'print("Hello, world!")',
                extensions: [python()],
            });

            const view = new EditorView({
                state: startState,
                parent: editorDiv.current,
            });

            setEditorView(view);
        }

        return () => {
            editorView?.destroy();
        };
    }, []);

    return <div ref={editorDiv} />;
};

export default CodeEditor;