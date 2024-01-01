import { useEffect, useRef, useState } from 'react';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { codeConsoleStyles, percentLineNumbers } from './codeConsoleHelper.ts';
import useCodeIDEStore from '../codeIDEStore.ts'

export default function CodeConsole() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const output = useCodeIDEStore((state) => state.output)

  useEffect(() => {
    if (!editorRef.current) return;

    const initialCode = Array(19).fill('\n').join('');
    const startState = EditorState.create({
      doc: initialCode,
      extensions: [
        python(),
        codeConsoleStyles,
        percentLineNumbers(),
        EditorState.transactionFilter.of((tr) => {
          const isProgrammatic = tr.annotation(Transaction.userEvent) === 'programmatic';

          if (tr.docChanged && !isProgrammatic) {
            return [];
          }
          return tr;
        }),
        EditorView.updateListener.of(update => {
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

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    if (editorView) {
      const transaction = editorView.state.update({
        changes: { from: 0, to: editorView.state.doc.length, insert: output },
        annotations: Transaction.userEvent.of('programmatic')
      });
      editorView.dispatch(transaction);
    }
  }, [output, editorView]);

  return (
    <div className="flex flex-col overflow-hidden">
      <div ref={editorRef} className="editor overflow-auto" />
    </div>
  );
}