import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, indentWithTab, history, redo } from '@codemirror/commands';
import { codeEditorStyles } from './codeEditorHelper.ts';
import useCodeIDEStore from '../codeIDEStore.ts'
import { compileGetGraph, compileGetOutput } from '../codeIDENetwork.ts';
import debounce from '../../../helper/debounce.ts';

export default function CodeEditor({ height, scopeId }: { height: number, scopeId: number }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const store = useCodeIDEStore(scopeId).getState()

    const debouncedCompileGetGraph = debounce(() => {
        compileGetGraph(scopeId);
    }, 1000);

    const redoKeymap = keymap.of([{
        key: "Mod-Shift-z",
        run: redo
    }]);

    const saveKeymap = keymap.of([{
        key: "Mod-s",
        run: () => { compileGetGraph(scopeId); return true; },
        preventDefault: true
    }]);

    const runKeymap = keymap.of([{
        key: "Mod-r",
        run: () => { compileGetOutput(scopeId); return true; },
        preventDefault: true
    }]);


    useEffect(() => {
        if (!editorRef.current) return;

        const startState = EditorState.create({
            doc: store.code,
            extensions: [
                python(),
                keymap.of([indentWithTab, ...defaultKeymap]),
                redoKeymap,
                saveKeymap,
                runKeymap,
                history(),
                codeEditorStyles,
                lineNumbers(),
                highlightActiveLine(),
                highlightActiveLineGutter(),
                EditorView.updateListener.of(update => {
                    if (update.docChanged) {
                        store.setCode(update.state.doc.toString());
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

