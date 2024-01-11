import { useState } from 'react';
import { TutorialNodeData } from '../types/nodeTypes';
import ComponentNode from './component_node/ComponentNode';
import { componentNodeLayout } from './component_node/componentNodeLayout';

export default function TutorialNode({ data }: { data: TutorialNodeData }) {
  // Layout
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSizeChange = (size: any) => {
    setSize(size);
  };

  return (
    <ComponentNode data={data} maxWidth={data.width * 3.2} minHeight={data.height * 0.4} onSizeChange={handleSizeChange}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      <div className="overflow-hidden p-4">
        <div className="nowheel" style={{ height: `${componentNodeLayout.getContentHeight(size.height)}px`, overflow: 'auto' }} >
          <div dangerouslySetInnerHTML={{ __html: data.tutorial.description }}></div>
        </div>
      </div>
    </ComponentNode>
  );
}