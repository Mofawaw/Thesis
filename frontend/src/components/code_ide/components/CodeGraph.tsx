import { useEffect, useRef, useState } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore from '../codeIDEStore.ts';

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

    graphData.nodes.forEach((node) => {
      const rect = new shapes.standard.Rectangle();
      rect.position(node.position.x, node.position.y);
      rect.resize(100, 35);
      rect.attr({
        body: {
          fill: 'blue',
        },
        label: {
          text: node.label,
          fill: 'white',
        },
      });
      graph.addCell(rect);
    });

    // graphData.edges.forEach((edge) => {
    //   const link = new shapes.standard.Link();
    //   link.source({ id: edge.source.id });
    //   link.target({ id: edge.target.id });
    //   graph.addCell(link);
    // });

    paper.unfreeze();

    // let maxX = 0, maxY = 0;
    // graph.getElements().forEach((element) => {
    //   const bbox = element.getBBox();
    //   maxX = Math.max(maxX, bbox.x + bbox.width);
    //   maxY = Math.max(maxY, bbox.y + bbox.height);
    // });

    // const padding = 10;
    // paper.setDimensions(maxX + padding, maxY + padding);

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
    <div ref={parentRef} className="w-full h-full bg-th-tint-20 nowheel">
      <div ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
