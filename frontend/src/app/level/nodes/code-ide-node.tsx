import { useState } from 'react';
import CodeIDE from '@/app/code-ide/code-ide';
import ComponentNode from './component-node/component-node';
import { CodeIDENodeData } from './types/node-types';
import { componentNodeLayout } from './component-node/component-node-helper';

interface CodeIDENodeProps {
  data: CodeIDENodeData;
}

const CodeIDENode: React.FC<CodeIDENodeProps> = ({
  data,
}) => {
  // Layout
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSizeChange = (size: any) => {
    setSize(size);
  };

  // Node Header
  let nodeHeader;

  switch (data.codeIDE.config.type) {
    case "program+graph":
      nodeHeader = (
        <div className="flex flex-row overflow-hidden">
          <h3 className="basis-3/5 flex-none px-4 pt-8">Programm</h3>
          <div className="th-yline" />
          <h3 className="basis-2/5 flex-none px-4 pt-8">Speicher</h3>
        </div>
      );
      break;
    case "program":
      nodeHeader = (
        <h3 className="px-4 pt-8">{data.title ? data.title : "Programm"}</h3>
      );
      break;
    case "graph":
      nodeHeader = (
        <h3 className="px-4 pt-8">{data.title ? data.title : "Speicher"}</h3>
      );
      break;
    default:
      nodeHeader = <h3>Error</h3>
  }

  return (
    <ComponentNode data={data} onSizeChange={handleSizeChange}>
      {nodeHeader}
      <CodeIDE height={componentNodeLayout.getContentHeight(size.height)} {...data.codeIDE} />
    </ComponentNode>
  );
}

export default CodeIDENode;