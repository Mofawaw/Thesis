import { useEffect, useRef, useState } from 'react';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';

import useCodeIDEStore, { CodeIDEStore } from '../../code-ide-store.ts'
import CodeIDEConfig, { codeIDELayout } from '../../code-ide-config.ts';
import { codeOutputStyles, percentLineNumbers } from '../helpers/code-output-helper.ts';

interface CodeOutputProps {
  scopeId: string;
  config: CodeIDEConfig;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  scopeId,
  config,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const codeOutput = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.codeOutput)

  useEffect(() => {
    if (!editorRef.current) return;

    const initialCode = Array(9).fill('\n').join('');
    const startState = EditorState.create({
      doc: initialCode,
      extensions: [
        python(),
        codeOutputStyles,
        percentLineNumbers(),
        // Disable edit
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

  // Updates editor programmatically based on output
  useEffect(() => {
    if (editorView) {
      const transaction = editorView.state.update({
        changes: { from: 0, to: editorView.state.doc.length, insert: codeOutput },
        annotations: Transaction.userEvent.of('programmatic')
      });
      editorView.dispatch(transaction);
    }
  }, [codeOutput, editorView]);

  return (
    <div className="flex flex-col overflow-auto">
      <div ref={editorRef} className="editor" style={{ height: `${codeIDELayout.codeOutputHeight}px`, overflow: 'auto' }} />
    </div>
  );
}

export default CodeOutput;