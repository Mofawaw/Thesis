import { useState } from 'react';
import CodeIDE from '../../code_ide/CodeIDE';
import CodeIDEMode from '../../code_ide/types/CodeIDEMode';
import ComponentNode from './component_node/ComponentNode';
import { CodeIDENodeData } from '../types/LevelNode';

export default function CodeIDENode({ data }: { data: CodeIDENodeData }) {
  // Layout
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleSizeChange = (size: any) => {
    setSize(size);
  };

  // Node Header
  let nodeHeader;
  const headerHeight = 60;

  switch (data.props.mode) {
    case CodeIDEMode.programWriteGraphAuto:
      nodeHeader = (
        <div className="flex flex-row overflow-hidden">
          <h3 className="basis-3/5 flex-none px-4 pt-8">Program</h3>
          <div className="th-yline" />
          <h3 className="basis-2/5 flex-none px-4 pt-8">Speicher</h3>
        </div>
      );
      break;
    case CodeIDEMode.programWrite: case CodeIDEMode.programRead:
      nodeHeader = (
        <h3 className="px-4 pt-8">Program</h3>
      );
      break;
    case CodeIDEMode.graphAuto: case CodeIDEMode.graphRead: case CodeIDEMode.graphInput:
      nodeHeader = (
        <h3 className="px-4 pt-8">Speicher</h3>
      );
      break;
    default:
      nodeHeader = <h3>Error</h3>
  }

  return (
    <ComponentNode minWidth={data.initialSize.width} minHeight={data.initialSize.height} onSizeChange={handleSizeChange}>
      {nodeHeader}
      <CodeIDE height={size.height - headerHeight} {...data.props} />
    </ComponentNode>
  );
}