import { useState } from 'react';
import { TextNodeData } from '../types/ThTypes';
import ComponentNode from './component_node/ComponentNode';

export default function TextNode({ data }: { data: TextNodeData }) {
  // Layout
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSizeChange = (size: any) => {
    setSize(size);
  };

  // Node Header
  const headerHeight = 60;

  return (
    <ComponentNode data={data} maxWidth={data.width * 3.2} minHeight={data.height * 0.4} onSizeChange={handleSizeChange}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      <div className="overflow-hidden p-4">
        <div className="nowheel" style={{ height: `${size.height - headerHeight - 55}px`, overflow: 'auto' }} >
          <p>{data.text.description}</p>
        </div>
      </div>
    </ComponentNode>
  );
}