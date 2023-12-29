import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './ComponentNode.tsx';
import CodeIDE from '../code_ide/CodeIDE.tsx';

const initialNodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 0, y: 0 },
    data: {
      component: CodeIDE,
      minWidth: 700,
      minHeight: 500
    }
  }
];

const nodeTypes = { component: ComponentNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <div className="w-screen h-screen">
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