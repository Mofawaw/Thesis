import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addData, styles } from './codeGraphHelper';
import { CodeGraphNode } from './codeGraph.ts';

export default function CodeGraphInput({ height, scopeId }: { height: number, scopeId: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const graphRef = useRef<dia.Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<dia.Element | null>(null);
  const selectedNodeRef = useRef<dia.Element | null>(null);

  const config = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.config);
  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph);
  const presetGraph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.presetGraph);

  const saveSelectedNode = () => {
    // Reset styles
    graphRef.current?.getElements().forEach(node => {
      if (node.prop('preset')) { return }
      if (!node.attr('label/text')) {
        node.attr({ body: { stroke: styles.node.color.rect, fill: "none" } });
      } else {
        node.attr({ body: { stroke: styles.node.color.rect } });
      }
    });
    // Save to store
    if (selectedNodeRef.current) {
      const store = useCodeIDEStore(scopeId).getState();
      const newNodes = store.graph.nodes.map((node: CodeGraphNode) => {
        if (node.id === selectedNodeRef.current?.prop('nodeId') && inputRef.current) {
          return { ...node, label: inputRef.current.value };
        } else {
          return node;
        }
      });
      const newGraph = { ...store.graph, nodes: newNodes };
      store.setGraph(newGraph);
      console.log("newGraph", newGraph);
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

    addData(graph, diaGraph, config, presetGraph);
    paper.unfreeze();

    // Select node
    paper.on('element:pointerdown', (cellView) => {
      const node = (cellView as any).model;
      if (node instanceof dia.Element && !node.prop('preset')) {
        saveSelectedNode();
        setSelectedNode(node);
        selectedNodeRef.current = node;
        node.attr({ body: { stroke: styles.node.color.rectActive, fill: styles.node.color.rect } });
        node.toFront();

        // Trigger input
        if (inputRef.current) {
          inputRef.current.value = node.attr('label/text') || '';
          inputRef.current.focus();
        }
      }
    });

    paper.on('blank:pointerdown', () => {
      saveSelectedNode();
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
  }, [presetGraph, config]);

  // SelectedNode input
  useEffect(() => {
    const handleInputChange = (event: any) => {
      if (selectedNode && !selectedNode.prop('preset')) {
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
        saveSelectedNode();
      }
    };

    if (inputRef.current) {
      inputRef.current.removeEventListener('input', handleInputChange);
      inputRef.current.removeEventListener('blur', saveSelectedNode);
      inputRef.current.removeEventListener('keydown', handleKeyDown);

      inputRef.current.addEventListener('input', handleInputChange);
      inputRef.current.addEventListener('blur', saveSelectedNode);
      inputRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('input', handleInputChange);
        inputRef.current.removeEventListener('blur', saveSelectedNode);
        inputRef.current.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [selectedNode]);

  return (
    <div className="nowheel nodrag" style={{ height: `${height}px`, overflow: 'auto' }} >
      <input ref={inputRef} type="text" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      <div ref={canvasRef} />
    </div>
  );
}
