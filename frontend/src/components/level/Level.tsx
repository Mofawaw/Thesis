import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './components/ComponentNode.tsx';
import CodeIDE from '../code_ide/CodeIDE.tsx';
import CodeIDEMode from '../code_ide/types/CodeIDEMode.ts';

const initialNodes = [
  // {
  //   id: '1',
  //   type: 'component',
  //   position: { x: 100, y: 200 },
  //   data: {
  //     component: CodeIDE,
  //     componentProps: { codeIDEMode: CodeIDEMode.programWriteGraphRead, scopeId: 1 },
  //     minWidth: 900,
  //     minHeight: 600
  //   }
  // },
  {
    id: '2',
    type: 'component',
    position: { x: 500, y: 0 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.graphStatic, scopeId: 2 },
      minWidth: 400,
      minHeight: 600
    }
  },
  // {
  //   id: '3',
  //   type: 'component',
  //   position: { x: 500, y: 800 },
  //   data: {
  //     component: CodeIDE,
  //     componentProps: { codeIDEMode: CodeIDEMode.graphInput, scopeId: 3 },
  //     minWidth: 400,
  //     minHeight: 600
  //   }
  // },
  // {
  //   id: '4',
  //   type: 'component',
  //   position: { x: 0, y: 0 },
  //   data: {
  //     component: CodeIDE,
  //     componentProps: { codeIDEMode: CodeIDEMode.programWrite, scopeId: 4 },
  //     minWidth: 400,
  //     minHeight: 600
  //   }
  // },
  // {
  //   id: '5',
  //   type: 'component',
  //   position: { x: 0, y: 800 },
  //   data: {
  //     component: CodeIDE,
  //     componentProps: { codeIDEMode: CodeIDEMode.programStatic, scopeId: 5 },
  //     minWidth: 400,
  //     minHeight: 600
  //   }
  // }
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