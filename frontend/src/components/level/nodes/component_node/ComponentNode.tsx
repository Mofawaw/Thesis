import { useEffect, useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';
import styles from './componentNode.module.css';
import { ComponentNodeData } from '../../types/LevelNode';

export default function ComponentNode({ data, onSizeChange = () => { }, children }: { data: ComponentNodeData, onSizeChange?: (size: { width: number; height: number }) => void, children: React.ReactNode }) {
  const [size, setSize] = useState({ width: data.initialSize.width, height: data.initialSize.height });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  useEffect(() => {
    if (onSizeChange) {
      onSizeChange(size);
    }
  }, [size, onSizeChange]);

  const gradientBorder = 'animate-th-border rounded-th bg-th-white bg-gradient-to-r from-th-reference-40 via-th-black-10 to-th-value-40 bg-[length:400%_400%] p-[5px]';

  return (
    <div
      className="opacity-0 animate-th-fade-in animation-delay-500"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className={`${styles.resizerHandle}`}>
        <NodeResizer
          minWidth={data.initialSize.width * 0.8}
          minHeight={data.initialSize.height * 0.8}
          maxWidth={data.initialSize.width * 1.6}
          maxHeight={data.initialSize.height * 1.6}
          onResize={handleResize}
        />
        <div
          className={`${data.isMain ? gradientBorder : 'border-th-black-10 border-th'} rounded-th`}
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
