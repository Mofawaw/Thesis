import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Group, Rect, Arrow, Text } from 'react-konva';
import useCodeIDEStore, { codeIDEHelper } from '../codeIDEStore.ts'
import { nodeStyles } from './codeGraphHelper.ts'

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
              key={node.id}
              x={node.position.x}
              y={node.position.y}
              width={codeIDEHelper.graph.node.getWidth(node.type)}
              label={node.label}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

interface NodeProps { x: number, y: number, width: number, label: string }

function Node({ x, y, width, label }: NodeProps) {
  return (
    <Group clip={{
      x: x,
      y: y,
      width: width,
      height: codeIDEHelper.graph.node.height,
    }}>
      <Rect x={x} y={y} width={width} height={codeIDEHelper.graph.node.height} fill={nodeStyles.rect.fill} />
      <Text x={x + 5} y={y + 35 / 3} text={label} fontFamily={nodeStyles.text.fontFamily} fontSize={nodeStyles.text.fontSize} fill={nodeStyles.text.fill} />
    </Group>
  );
}