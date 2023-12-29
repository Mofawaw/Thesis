import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './ComponentNode.tsx';

const initialNodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 0, y: 0 },
    data: {
      component: CustomComponent,
      minWidth: 200,
      minHeight: 200
    }
  },
  {
    id: '2',
    type: 'component',
    position: { x: 0, y: 0 },
    data: {
      component: CustomComponent,
      minWidth: 400,
      minHeight: 600
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

function CustomComponent() {
  return (
    <h2>This is a custom Component!</h2>
  )
}