import { useEffect, useRef } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore from '../codeIDEStore.ts';
import { addData } from './codeGraphHelper';

export default function CodeGraph() {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const graphData = useCodeIDEStore((state) => state.graph);

  useEffect(() => {
    if (!canvasRef.current) return;

    const graph = new dia.Graph();
    const paper = new dia.Paper({
      model: graph,
      el: canvasRef.current,
      width: '100%',
      height: '100%',
      frozen: true,
      async: true,
      interactive: { linkMove: false, elementMove: false },
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes,
    });

    addData(graphData, graph);

    paper.unfreeze();

    return () => {
      graph.clear();
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [graphData]);

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
    <div ref={parentRef} className="w-full h-full overflow-auto">
      <div ref={canvasRef} className="w-full h-full overflow-auto" />
    </div>
  );
}
