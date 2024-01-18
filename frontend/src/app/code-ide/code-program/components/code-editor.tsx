import { useEffect, useRef } from 'react';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, indentWithTab, history, redo } from '@codemirror/commands';
import { codeEditorStyles } from '../helpers/code-editor-helper.ts';
import useCodeIDEStore from '../../code-ide-store.ts'
import { compileGetGraph, compileGetOutput } from '../../code-ide-network.ts';
import debounce from '@/helpers/debounce.ts';
import CodeIDEConfig from '../../code-ide-config.ts';

interface CodeEditorProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  height,
  scopeId,
  config,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { code, setCode } = useCodeIDEStore(scopeId).getState();

  const debouncedCompileGetGraph = debounce(() => {
    config.runnable ? compileGetGraph(scopeId) : {};
  }, 1000);

  const redoKeymap = keymap.of([{
    key: "Mod-Shift-z",
    run: redo
  }]);

  const saveKeymap = keymap.of([{
    key: "Mod-s",
    run: () => { config.runnable ? compileGetGraph(scopeId) : {}; return true; },
    preventDefault: true
  }]);

  const runKeymap = keymap.of([{
    key: "Mod-r",
    run: () => { config.runnable ? compileGetOutput(scopeId) : {}; return true; },
    preventDefault: true
  }]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      config.runnable ? compileGetGraph(scopeId) : {};
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc: code,
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
            setCode(update.state.doc.toString());
            config.runnable ? debouncedCompileGetGraph() : {}
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
        }),
        // Disable edit when mode is read
        EditorState.transactionFilter.of((tr) => {
          if (config.mode === "read") {
            const isProgrammatic = tr.annotation(Transaction.userEvent) === 'programmatic';
            if (tr.docChanged && !isProgrammatic) {
              return [];
            }
          }
          return tr;
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
  }, [code]);

  return (
    <div ref={editorRef} className="editor" style={{ height: `${height}px`, overflow: 'auto' }} />
  );
}

export default CodeEditor;