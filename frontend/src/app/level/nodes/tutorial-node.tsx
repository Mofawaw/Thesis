import { useState } from 'react';

import TutorialValue from '../tutorial/nodes/tutorial-value';
import TutorialMaster from '../tutorial/nodes/tutorial-master';
import TutorialReference from '../tutorial/nodes/tutorial-reference';
import ComponentNode from './component-node/component-node';
import { componentNodeLayout } from './component-node/component-node-helper';
import { TutorialNodeData } from './types/node-types';

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

  let background;
  if (data.tutorial.id === "master") {
    background = "th-bg-gradient-10";
  } else if (data.tutorial.id === "value") {
    background = "bg-th-value-10";
  } else if (data.tutorial.id === "reference") {
    background = "bg-th-reference-10";
  } else {
    background = "bg-th-black-10";
  }

  return (
    <ComponentNode data={data} maxWidth={data.width * 3.2} minHeight={data.height * 0.4} onSizeChange={handleSizeChange} background={background}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      <div className="overflow-hidden p-4">
        <div className="nowheel nodrag" style={{ height: `${componentNodeLayout.getContentHeight(size.height)}px`, overflow: 'auto' }} >
          {data.tutorial.id === "master" && <TutorialMaster />}
          {data.tutorial.id === "value" && <TutorialValue />}
          {data.tutorial.id === "reference" && <TutorialReference />}
        </div>
      </div>
    </ComponentNode>
  );
}

export default TutorialNode;



