import { useEffect, useRef } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addDataToGraph } from './codeGraphHelper';

export default function CodeGraph({ height, scopeId }: { height: number, scopeId: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<dia.Paper | null>(null);

  const config = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.config);
  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph);

  useEffect(() => {
    if (!canvasRef.current) return;

    const diaGraph = new dia.Graph();
    const paper = new dia.Paper({
      model: diaGraph,
      el: canvasRef.current,
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
