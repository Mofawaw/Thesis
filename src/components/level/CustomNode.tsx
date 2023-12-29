import { useState } from 'react';
import { NodeResizer, ResizeParams, ResizeDragEvent } from 'reactflow';
import styles from './customnode.module.css'

export default function CustomNode() {
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleResize = (event: ResizeDragEvent, { width, height }: ResizeParams): void => {
    setSize({ width, height });
  };

  return (
    <div className={styles.customHandle}>
      <NodeResizer
        minWidth={200}
        minHeight={200}
        maxWidth={1000}
        maxHeight={1000}
        onResize={handleResize}
      />
      <div
        className="bg-th-white border-th border-th-black-20 rounded-th"
        style={{ width: size.width, height: size.height }}
      />
    </div>
  );
}
