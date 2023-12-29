import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './ComponentNode.tsx';
import CodeEditor from '../code_editor/CodeEditor.tsx';

const initialNodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 0, y: 0 },
    data: {
      component: CodeEditor,
      minWidth: 1000,
      minHeight: 1000
    }
  }
];

const nodeTypes = { component: ComponentNode };

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