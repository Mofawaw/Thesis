import { useState } from 'react';
import { TextNodeData } from './types/node-types';
import ComponentNode from './component-node/component-node';
import { componentNodeLayout } from './component-node/component-node-helper';
import useThStore from '@/stores/th-store';

interface TextNodeProps {
  data: TextNodeData;
}

const TextNode: React.FC<TextNodeProps> = ({
  data,
}) => {
  const activeLevel = useThStore(state => state.activeLevel);

  // Layout
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSizeChange = (size: any) => {
    setSize(size);
  };

  // Type
  const isTask = data.title === "Aufgabe";

  return (
    <ComponentNode data={data} maxWidth={data.width * 3.2} minHeight={data.height * 0.4} onSizeChange={handleSizeChange}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      {isTask && activeLevel &&
        <p className={`px-4 pb-4 text-${activeLevel.stage.color}-100`}><b><i>{activeLevel.category.label ?? ""}</i></b></p>
      }
      <div className="overflow-hidden p-4">
        <div className="nowheel" style={{ height: `${componentNodeLayout.getContentHeight(size.height) - (isTask ? 40 : 0)}px`, overflow: 'auto' }} >
          <div dangerouslySetInnerHTML={{ __html: data.text.description }}></div>
        </div>
      </div>
    </ComponentNode>
  );
}

export default TextNode;