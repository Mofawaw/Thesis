import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Arrow, Text } from 'react-konva';
import useCodeIDEStore from '../codeide_store.ts'

export default function CodeGraph() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const graph = useCodeIDEStore((state) => state.graph)

  const rect1 = { x: 0, y: 0, width: 80, height: 30 };
  const rect2 = { x: 150, y: 0, width: 120, height: 30 };

  const arrowStart = {
    x: rect1.x + rect1.width,
    y: rect1.y + rect1.height / 2,
  };
  const arrowEnd = {
    x: rect2.x,
    y: rect2.y + rect2.height / 2,
  };

  useEffect(() => {
    const updateSize = () => {
      if (canvasRef.current) {
        setDimensions({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div ref={canvasRef} className="w-full h-full nodrag nowheel">
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {graph.nodes.map((node) => (
            <Node
              id={node.id}
              x={node.position.x}
              y={node.position.y}
              width={100}
              label={node.label}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

interface NodeProps { id: string, x: number, y: number, width: number, label: string }

function Node({ id, x, y, width, label }: NodeProps) {
  return (
    <>
      <Rect id={id} x={x} y={y} width={width} height={35} fill={"green"} />
      <Text x={x} y={y - 20} label={label} />
    </>
  );
}