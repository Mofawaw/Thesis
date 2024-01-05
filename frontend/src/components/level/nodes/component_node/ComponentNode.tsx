import { useEffect, useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';
import resizerStyles from './componentNode.module.css';

export default function ComponentNode({ minWidth, minHeight, onSizeChange = () => { }, children }: { minWidth: number, minHeight: number, onSizeChange?: (size: { width: number; height: number }) => void, children: React.ReactNode }) {
  const maxWidth = minWidth * 2;
  const maxHeight = minHeight * 2;
  const [size, setSize] = useState({ width: minWidth, height: minHeight });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  useEffect(() => {
    if (onSizeChange) {
      onSizeChange(size);
    }
  }, [size, onSizeChange]);

  return (
    <div className={`${resizerStyles.customHandle}`}>
      <NodeResizer
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onResize={handleResize}
      />
      <div
        className="bg-th-white border-th border-th-black-10 rounded-th"
        style={{ width: size.width, height: size.height }}
      >
        {children ? children : <p>Error: No content provided.</p>}
      </div>
    </div>
  );
}
