import { useState } from 'react';
import { TextNodeData } from '../types/node-types';
import ComponentNode from './component-node/component-node';
import { componentNodeLayout } from './component-node/component-node-helper';

interface TextNodeProps {
  data: TextNodeData;
}

const TextNode: React.FC<TextNodeProps> = ({
  data,
}) => {
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
          <div dangerouslySetInnerHTML={{ __html: data.text.description }}></div>
        </div>
      </div>
    </ComponentNode>
  );
}

export default TextNode;