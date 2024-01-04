import { useEffect, useRef } from 'react';
import { dia, shapes } from 'jointjs';
import useCodeIDEStore, { CodeIDEStore } from '../codeIDEStore.ts';
import { addData } from './codeGraphHelper';
import CodeIDEMode from '../types/CodeIDEMode.ts';

export default function CodeGraph({ scopeId }: { scopeId: string }) {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const mode = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.mode)
  const graph = useCodeIDEStore(scopeId)((state: CodeIDEStore) => state.graph)

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
      paper.on('element:pointerdown', (cellView) => {
        const model = (cellView as any).model;

        if (model instanceof dia.Element) {
          const textElement = cellView.findBySelector('text')[0];
          if (textElement) {
            createInlineEditor(paper, model);
          }
        }
      });
    }

    return () => {
      diaGraph.clear();
      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
      }
    };
  }, [graph]);

  // Responsivity
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
    <div className="basis-2/5 flex-none p-4 nowheel nodrag overflow-hidden">
      <div ref={canvasRef} className="w-full h-full overflow-auto" />
    </div>
  );
}

const createInlineEditor = (paper: dia.Paper, model: dia.Element) => {
  const currentText = model.attr('label/text');

  const bbox = model.findView(paper).getBBox();

  const paperRect = (paper as any).el.getBoundingClientRect();

  const absoluteX = paperRect.left + bbox.x;
  const absoluteY = paperRect.top + bbox.y;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = currentText;

  const padding = 8;
  const inputWidth = bbox.width - 2 * padding;
  const inputHeight = 20;

  input.style.position = 'absolute';
  input.style.left = `${absoluteX + padding}px`;
  input.style.top = `${absoluteY + (bbox.height / 2) - (inputHeight / 2)}px`;
  input.style.width = `${inputWidth}px`;
  input.style.height = `${inputHeight}px`;

  input.style.textAlign = 'center';

  const updateText = (newText: string) => {
    model.attr('label/text', newText);
  };

  input.addEventListener('blur', () => {
    setTimeout(() => {
      updateText(input.value);
    }, 0);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      input.remove();
    }
  });

  const outsideClickListener = (event: MouseEvent) => {
    if (!input.contains(event.target as Node)) {
      input.remove();
    }
  };

  document.body.appendChild(input);
  input.focus();

  setTimeout(() => document.addEventListener('mousedown', outsideClickListener), 0);
};