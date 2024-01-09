import { useEffect, useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';
import styles from './componentNode.module.css';
import { CodeIDENodeData, ComponentNodeData } from '../../types/nodeTypes';

export default function ComponentNode({ data, maxWidth, minHeight, onSizeChange = () => { }, children }: { data: ComponentNodeData, maxWidth?: number, minHeight?: number, onSizeChange?: (size: { width: number; height: number }) => void, children: React.ReactNode }) {
  const initialWidth = data.width
  const initialHeight = data.height

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  useEffect(() => {
    if (onSizeChange) {
      onSizeChange(size);
    }
  }, [size, onSizeChange]);

  const gradientBorder = 'th-bg-gradient p-[5px]';

  return (
    <div
      className="opacity-0 animate-th-fade-in animation-delay-500"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className={`${styles.resizerHandle}`}>
        <NodeResizer
          minWidth={initialWidth * 0.8}
          minHeight={minHeight ?? initialHeight * 0.8}
          maxWidth={maxWidth ?? initialWidth * 1.6}
          maxHeight={initialHeight * 1.6}
          onResize={handleResize}
        />
        <div
          className={`${(data as CodeIDENodeData)?.codeIDE?.isMain ? gradientBorder : 'border-th-black-10 border-th'} rounded-th`}
          style={{ width: size.width, height: size.height }}
        >
          <div className="bg-th-white rounded-th-inner w-full h-full">
            {children ? children : <p>Error: No content provided.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
