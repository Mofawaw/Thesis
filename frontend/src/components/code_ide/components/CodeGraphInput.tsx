import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addData, styles } from './codeGraphHelper';

export default function CodeGraphInput({ scopeId }: { scopeId: string }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const graphRef = useRef<dia.Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<dia.Element | null>(null);

  const mode = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.mode);
  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph);

  const resetAllNodeStyles = () => {
    graphRef.current?.getElements().forEach(node => {
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

  const finalizeTextUpdate = () => {
    if (selectedNode && inputRef.current) {
      selectedNode.attr('label/text', inputRef.current.value);
      resetAllNodeStyles();
      setSelectedNode(null);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const diaGraph = new dia.Graph();
    graphRef.current = diaGraph;

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

    paper.on('element:pointerdown', (cellView) => {
      const model = (cellView as any).model;
      if (model instanceof dia.Element) {
        resetAllNodeStyles();
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
      finalizeTextUpdate();
    });

    return () => {
      diaGraph.clear();
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [graph, mode]);

  useEffect(() => {
    const handleInputChange = (event: any) => {
      if (selectedNode) {
        const maxCharsAllowed = selectedNode.prop('maxChars');
        const inputValue = event.target.value.slice(0, maxCharsAllowed);

        selectedNode.attr('label/text', inputValue);
        if (inputRef.current) {
          inputRef.current.value = inputValue;
        }
      }
    };

    const handleKeyDown = (event: any) => {
      if (event.key === 'Enter' || event.key === 'Escape') {
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
