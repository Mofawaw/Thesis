import { useEffect, useRef } from 'react';
import { dia, shapes } from 'jointjs';

import useCodeIDEStore, { CodeIDEStore } from '../../code-ide-store.ts';
import CodeIDEConfig from '../../code-ide-config.ts';
import { addDataToGraph } from '../helpers/code-graph-helper.ts';

interface CodeGraphProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig
}

const CodeGraph: React.FC<CodeGraphProps> = ({
  height,
  scopeId,
  config,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<dia.Paper | null>(null);

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
    paperRef.current = paper;

    addDataToGraph(graph, diaGraph);
    paper.unfreeze();

    // Update paper size based on graph content
    const resizePaper = () => {
      const bbox = diaGraph.getBBox();
      if (bbox) {
        paper.setDimensions(bbox.width, bbox.height);
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

  return (
    <div className="nowheel nodrag" style={{ height: `${height}px`, overflow: 'auto' }} >
      <div ref={canvasRef} />
    </div>
  );
}

export default CodeGraph;