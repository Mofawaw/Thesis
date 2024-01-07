import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addData, styles } from './codeGraphHelper';
import CodeIDEMode from '../types/CodeIDEMode.ts';

export default function CodeGraph({ scopeId }: { scopeId: string }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedNode, setSelectedNode] = useState<dia.Element | null>(null);

  const mode = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.mode);
  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph);

  useEffect(() => {
    if (!canvasRef.current) return;

    const diaGraph = new dia.Graph();
    const paper = new dia.Paper({
      model: diaGraph,
      el: canvasRef.current,
      width: '100%',
      height: '100%',
      frozen: true,
      async: true,
      interactive: { linkMove: false, elementMove: false },
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes,
    });

    addData(graph, diaGraph, mode);
    paper.unfreeze();

    // GraphMode: input
    if (mode.has(CodeIDEMode.graphInput)) {
      const resetAllNodeStyles = () => {
        diaGraph.getElements().forEach(node => {
          if (!node.attr('label/text')) {
            node.attr({
              body: {
                stroke: styles.node.color.rect,
                fill: "none"
              }
            });
          } else {
            node.attr({
              body: {
                stroke: styles.node.color.rect
              }
            });
          }
        });
      };

      paper.on('element:pointerdown', (cellView) => {
        const model = (cellView as any).model;
        if (model instanceof dia.Element) {
          resetAllNodeStyles();

          // Set new node as selected and apply styles
          setSelectedNode(model);
          model.attr({
            body: {
              stroke: styles.node.color.rectActive,
              fill: styles.node.color.rect
            }
          });
          model.toFront();

          if (inputRef.current) {
            inputRef.current.value = model.attr('label/text') || '';
            inputRef.current.focus();
          }
        }
      });

      paper.on('blank:pointerdown', () => {
        resetAllNodeStyles();
        finalizeTextUpdate();
      });
    }

    return () => {
      diaGraph.clear();
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [graph, mode]);

  const finalizeTextUpdate = () => {
    if (selectedNode && inputRef.current) {
      selectedNode.attr('label/text', inputRef.current.value);
      setSelectedNode(null);
    }
  };

  useEffect(() => {
    const handleInputChange = (e: any) => {
      if (selectedNode) {
        selectedNode.attr('label/text', e.target.value);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        finalizeTextUpdate();
      }
    };

    if (inputRef.current) {
      inputRef.current.removeEventListener('input', handleInputChange);
      inputRef.current.removeEventListener('blur', finalizeTextUpdate);
      inputRef.current.removeEventListener('keydown', handleKeyDown);

      inputRef.current.addEventListener('input', handleInputChange);
      inputRef.current.addEventListener('blur', finalizeTextUpdate);
      inputRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', handleInputChange);
        inputRef.current.removeEventListener('blur', finalizeTextUpdate);
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [selectedNode]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        if (canvasRef.current) {
          const { width, height } = entry.contentRect;
          canvasRef.current.style.width = `${width}px`;
          canvasRef.current.style.height = `${height}px`;
        }
      }
    });

    if (parentRef.current) {
      resizeObserver.observe(parentRef.current);
    }

    return () => {
      if (parentRef.current) {
        resizeObserver.unobserve(parentRef.current);
      }
    };
  }, []);

  return (
    <div ref={parentRef} className="w-full h-full basis-2/5 flex-none p-4 nowheel nodrag overflow-hidden">
      <input ref={inputRef} type="text" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <div ref={canvasRef} className="w-full h-full overflow-auto" />
    </div>
  );
}
