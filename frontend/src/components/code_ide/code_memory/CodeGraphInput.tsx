import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addData, styles } from './codeGraphHelper';

export default function CodeGraphInput({ height, scopeId }: { height: number, scopeId: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const graphRef = useRef<dia.Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<dia.Element | null>(null);

  const config = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.config);
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

    addData(graph, diaGraph, config);
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

    // Update paper size based on graph content
    const resizePaper = () => {
      const bbox = diaGraph.getBBox();
      if (bbox) {
        paper.setDimensions(bbox.width + styles.node.strokeWidth, bbox.height + styles.node.strokeWidth);
      }
    };

    resizePaper();
    (diaGraph as any).on('change', resizePaper);

    return () => {
      diaGraph.clear();

      (diaGraph as any).off('change', resizePaper);

      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [graph, config]);

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

  return (
    <div className="basis-2/5 flex-none nowheel nodrag" style={{ height: `${height}px`, overflow: 'auto' }} >
      <input ref={inputRef} type="text" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <div ref={canvasRef} />
    </div>
  );
}
