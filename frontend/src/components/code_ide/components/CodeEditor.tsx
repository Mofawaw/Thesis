import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap } from '@codemirror/commands';
import { codeEditorStyles } from './codeEditorHelper.ts';
import useCodeIDEStore from '../codeIDEStore.ts'
import { compileGetGraph } from '../codeIDEHelper.ts';
import debounce from '../../../helper/debounce.ts';

export default function CodeEditor({ height }: { height: number }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const store = useCodeIDEStore.getState()

    const debouncedCompileGetGraph = debounce(() => {
        compileGetGraph();
    }, 1000);

    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: store.code,
            extensions: [
                keymap.of(defaultKeymap),
                python(),
                codeEditorStyles,
                lineNumbers(),
                highlightActiveLine(),
                highlightActiveLineGutter(),
                EditorView.updateListener.of(update => {
                    const innerStore = useCodeIDEStore.getState()
                    if (update.docChanged) {
                        innerStore.setCode(update.state.doc.toString());
                        debouncedCompileGetGraph();
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

