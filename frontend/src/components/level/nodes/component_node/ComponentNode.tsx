import { useEffect, useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';
import styles from './componentNode.module.css';

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
    <div className={`${styles.resizerHandle}`}>
      <NodeResizer
        minWidth={minWidth}
        minHeight={minHeight}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onResize={handleResize}
      />
      <div
        className="${resizerStyles.gradientBorder} bg-th-white border-th border-th-black-10 rounded-th opacity-0 animate-th-fade-in animation-delay-500"
        style={{ width: size.width, height: size.height, animationFillMode: 'forwards' }}
      >
        {children ? children : <p>Error: No content provided.</p>}
      </div>
    </div>
  );
}
