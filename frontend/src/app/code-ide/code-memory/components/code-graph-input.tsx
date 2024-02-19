import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';

import useCodeIDEStore, { CodeIDEStore } from '../../code-ide-store.ts';
import CodeIDEConfig from '../../code-ide-config.ts';
import { addDataToGraphInput, stylesGraphInput } from '../helpers/code-graph-input-helper.ts';
import { CodeGraphNode } from '../code-memory-types.ts';

interface CodeGraphInputProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig
}

const CodeGraphInput: React.FC<CodeGraphInputProps> = ({
  height,
  scopeId,
  config,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const graphRef = useRef<dia.Graph | null>(null);
  const [selectedNode, setSelectedNode] = useState<dia.Element | null>(null);
  const selectedNodeRef = useRef<dia.Element | null>(null);

  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph);
  const initialGraph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.initialGraph);

  const saveSelectedNode = () => {
    // Reset styles
    graphRef.current?.getElements().forEach(node => {
      // if (node.prop('preset')) { return }
      if (!node.attr('label/text')) {
        node.attr({ body: { stroke: stylesGraphInput.node.color.rect, fill: "none" } });
      } else {
        node.attr({ body: { stroke: stylesGraphInput.node.color.rect } });
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

    addDataToGraphInput(graph, initialGraph, diaGraph);
    paper.unfreeze();

    // Select node
    paper.on('element:pointerdown', (cellView) => {
      const node = (cellView as any).model;
      if (node instanceof dia.Element) { //  && !node.prop('preset')
        saveSelectedNode();
        setSelectedNode(node);
        selectedNodeRef.current = node;
        node.attr({ body: { stroke: stylesGraphInput.node.color.rectActive, fill: stylesGraphInput.node.color.rect } });
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
        paper.setDimensions(bbox.width + stylesGraphInput.node.strokeWidth, bbox.height + stylesGraphInput.node.strokeWidth);
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
  }, [initialGraph, config]);

  // SelectedNode input
  useEffect(() => {
    const handleInputChange = (event: any) => {
      if (selectedNode) { // && !selectedNode.prop('preset')
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

export default CodeGraphInput;