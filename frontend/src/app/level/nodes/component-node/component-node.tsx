import { useEffect, useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';

import { CodeIDENodeData, ComponentNodeData, TutorialNodeData } from '../types/node-types';
import styles from './component-node.module.css';

interface ComponentNodeProps {
  data: ComponentNodeData;
  maxWidth?: number;
  minHeight?: number;
  onSizeChange?: (size: { width: number; height: number }) => void;
  background?: string;
  children: React.ReactNode;
}

const ComponentNode: React.FC<ComponentNodeProps> = ({
  data,
  maxWidth,
  minHeight,
  onSizeChange,
  background = 'bg-th-white',
  children,
}) => {
  const initialWidth = data.width
  const initialHeight = data.height

  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });

  const handleResize = (_: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  useEffect(() => {
    if (onSizeChange) {
      onSizeChange(size);
    }
  }, [size, onSizeChange]);

  let border;
  if ((data as CodeIDENodeData)?.codeIDE?.main) {
    border = 'th-bg-gradient p-[5px]';
  } else if ((data as TutorialNodeData)?.tutorial) {
    border = `border-th-white border-th`;
  } else {
    border = 'border-th-black-10 border-th';
  }

  return (
    <div
      className="opacity-0 animate-th-fade-in animation-delay-500"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className={`${styles.resizerHandle}`}>
        <NodeResizer
          minWidth={initialWidth * 0.6}
          minHeight={minHeight ?? initialHeight * 0.6}
          maxWidth={maxWidth ?? initialWidth * 1.6}
          maxHeight={initialHeight * 1.6}
          onResize={handleResize}
        />
        <div
          className={`${border} rounded-th`}
          style={{ width: size.width, height: size.height }}
        >
          <div className={`${background} rounded-th-inner w-full h-full`}>
            {children ? children : <p>Error: No content provided.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComponentNode;