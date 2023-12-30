import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import useCodeIDEStore from '../codeide_store.ts'

export default function CodeGraph() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
          <Rect
            x={20}
            y={20}
            width={100}
            height={100}
            fill="red"
            draggable
          />
        </Layer>
      </Stage>
    </div>
  );
}
