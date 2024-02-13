import { useState } from 'react';
import { TutorialNodeData } from './types/node-types';
import ComponentNode from './component-node/component-node';
import { componentNodeLayout } from './component-node/component-node-helper';

interface TutorialNodeProps {
  data: TutorialNodeData;
}

const TutorialNode: React.FC<TutorialNodeProps> = ({
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
        <div className="nowheel nodrag" style={{ height: `${componentNodeLayout.getContentHeight(size.height)}px`, overflow: 'auto' }} >
          <TutorialValue />
        </div>
      </div>
    </ComponentNode>
  );
}

export default TutorialNode;

const TutorialValue = () => {
  return (
    <div>
      <p>Wertetypen </p>

    </div>
  )
}