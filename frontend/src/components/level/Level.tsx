import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './components/ComponentNode.tsx';
import CodeIDE from '../code_ide/CodeIDE.tsx';
import CodeIDEMode from '../code_ide/types/CodeIDEMode.ts';

const initialNodes = [
  {
    id: '1',
    type: 'component',
    position: { x: -500, y: -500 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programWriteGraphRead },
      minWidth: 500,
      minHeight: 600
    }
  },
  {
    id: '2',
    type: 'component',
    position: { x: 500, y: 0 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.graphStatic },
      minWidth: 400,
      minHeight: 600
    }
  },
  {
    id: '3',
    type: 'component',
    position: { x: 500, y: 800 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.graphInput },
      minWidth: 400,
      minHeight: 600
    }
  },
  {
    id: '4',
    type: 'component',
    position: { x: 0, y: 0 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programWrite },
      minWidth: 400,
      minHeight: 600
    }
  },
  {
    id: '5',
    type: 'component',
    position: { x: 0, y: 800 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programStatic },
      minWidth: 400,
      minHeight: 600
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