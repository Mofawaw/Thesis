import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Arrow } from 'react-konva';
import useCodeIDEStore from '../codeide_store.ts'

export default function CodeGraph() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Positions for rectangles
  const rect1 = { x: 0, y: 0, width: 80, height: 30 };
  const rect2 = { x: 150, y: 0, width: 120, height: 30 };

  // Calculate the start and end points for the arrow
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
          <Rect {...rect1} fill="green" draggable />

          <Rect {...rect2} fill="blue" draggable />

          <Arrow
            points={[arrowStart.x, arrowStart.y, arrowEnd.x, arrowEnd.y]}
            pointerLength={5}
            pointerWidth={5}
            fill="black"
            stroke="black"
            strokeWidth={1.5}
          />
        </Layer>
      </Stage>
    </div>
  );
}
