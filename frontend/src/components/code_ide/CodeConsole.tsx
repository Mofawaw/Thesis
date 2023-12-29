import { useEffect, useRef, useState } from 'react';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView, gutter, GutterMarker } from '@codemirror/view';
import { theme } from './codemirror_extensions.ts';
import useCodeIDEStore from './codeide_store.ts'

class PercentGutterMarker extends GutterMarker {
  toDOM() {
    return document.createTextNode("%");
  }
}

function percentLineNumbers() {
  return gutter({
    class: "cm-lineNumbers",
    lineMarker: () => new PercentGutterMarker(),
    initialSpacer: () => new PercentGutterMarker()
  });
}

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
        theme,
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
    <div className="flex flex-col">
      <div ref={editorRef} className="editor h-28 overflow-auto" />
    </div>
  );
}
