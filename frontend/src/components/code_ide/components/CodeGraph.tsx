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
      width: 0,
      height: 0,
      frozen: true,
      async: true,
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes
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
    <div ref={parentRef} className="w-full h-full nowheel">
      <div ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

// let maxX = 0, maxY = 0;
// graph.getElements().forEach((element) => {
//   const bbox = element.getBBox();
//   maxX = Math.max(maxX, bbox.x + bbox.width);
//   maxY = Math.max(maxY, bbox.y + bbox.height);
// });

// const padding = 10;
// paper.setDimensions(maxX + padding, maxY + padding);