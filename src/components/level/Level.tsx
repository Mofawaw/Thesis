import { useCallback } from 'react';
import ReactFlow, { Controls, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import CustomNode from './CustomNode.tsx';

const initialNodes = [
  { id: '1', type: 'custom', position: { x: 0, y: 0 }, data: { label: '1' } }
];

const nodeTypes = { custom: CustomNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        className="bg-th-background"
      >
        <Controls />
      </ReactFlow>
    </div>
  );
}