import { useEffect, useRef, useState } from 'react';
import { EditorState, Transaction } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, indentWithTab, history, redo } from '@codemirror/commands';

import debounce from '@/helpers/debounce.ts';

import useCodeIDEStore, { CodeIDEStore } from '../../code-ide-store.ts'
import { compileGetGraph, compileGetCodeOutput } from '../../code-ide-network.ts';
import CodeIDEConfig from '../../code-ide-config.ts';
import { codeEditorStyles } from '../helpers/code-editor-helper.ts';

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
  const [editorView, setEditorView] = useState<EditorView>();
  const updateFromEditorRef = useRef(false);
  const code = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.code)
  const setCode = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.setCode)
  const initialCode = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.initialCode)

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
    run: () => { config.runnable ? compileGetCodeOutput(scopeId) : {}; return true; },
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
        ...(config.mode === "write" ? [highlightActiveLine()] : []),
        ...(config.mode === "write" ? [highlightActiveLineGutter()] : []),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            updateFromEditorRef.current = true;
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
        EditorState.transactionFilter.of((tr) => {
          // Disable edit when mode is read
          if (config.mode === "read") {
            const isProgrammatic = tr.annotation(Transaction.userEvent) === 'programmatic';
            if (tr.docChanged && !isProgrammatic) {
              return [];
            }
          }
          // Allow editing only within TODO range
          if (tr.docChanged) {
            const doc = tr.startState.doc.toString();
            const todoStart = doc.indexOf("# TODO: -\u200B");
            const todoEnd = doc.indexOf("# ----------\u200B");

            if (todoStart === -1 || todoEnd === -1 || todoStart >= todoEnd) {
              return tr;
            }

            let preventChange = false;
            tr.changes.iterChanges((from, to) => {
              if (from <= doc.indexOf('\n', todoStart) || to >= todoEnd) {
                preventChange = true;
              }
            });

            if (preventChange) {
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

    setEditorView(view);

    return () => {
      view.destroy();
    };
  }, [initialCode]);

  useEffect(() => {
    if (updateFromEditorRef.current) {
      updateFromEditorRef.current = false;
      return;
    }

    if (editorView) {
      const currentContent = editorView.state.doc.toString();
      if (currentContent !== code) {
        const transaction = editorView.state.update({
          changes: { from: 0, to: currentContent.length, insert: code },
          annotations: Transaction.userEvent.of('programmatic')
        });
        editorView.dispatch(transaction);
      }
    }
  }, [code, editorView]);

  return (
    <div ref={editorRef} className="editor" style={{ height: `${height}px`, overflow: 'auto' }} />
  );
}

export default CodeEditor;