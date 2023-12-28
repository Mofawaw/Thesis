import { useState } from 'react';
import { NodeResizer, ResizeParams, ResizeDragEvent } from 'reactflow';

export default function CustomNode() {
  const [size, setSize] = useState({ width: 240, height: 240 });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  return (
    <>
      <NodeResizer
        minWidth={100}
        minHeight={30}
        onResize={handleResize}
      />
      <div
        className="bg-th-white border-4 border-th-black-20"
        style={{ width: size.width, height: size.height }}
      />
    </>
  );
}
