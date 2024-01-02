import React, { useState } from 'react';
import { NodeResizer, ResizeDragEvent, ResizeParams } from 'reactflow';
import styles from './componentNode.module.css';

interface ComponentNodeData {
  component: React.ComponentType<any>;
  minWidth: number;
  minHeight: number;
}

export default function ComponentNode({ data }: { data: ComponentNodeData }) {
  const { component: CustomComponent, minWidth, minHeight } = data;
  const maxWidth = minWidth * 2;
  const maxHeight = minHeight * 2;
  const [size, setSize] = useState({ width: minWidth, height: minHeight });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  return (
    <div className={`${styles.customHandle}`}>
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
        {CustomComponent ? <CustomComponent height={size.height} /> : <p>Error: No component found.</p>}
      </div>
    </div>
  );
}
