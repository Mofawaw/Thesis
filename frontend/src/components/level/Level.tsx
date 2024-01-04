import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import ComponentNode from './components/ComponentNode.tsx';
import CodeIDE from '../code_ide/CodeIDE.tsx';
import CodeIDEMode from '../code_ide/types/CodeIDEMode.ts';

const mode1Nodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 100, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programWriteGraphAuto, scopeId: "1" },
      minWidth: 900,
      minHeight: 600
    }
  },
  {
    id: '2',
    type: 'component',
    position: { x: 100, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programWriteGraphAuto, scopeId: "2" },
      minWidth: 900,
      minHeight: 600
    }
  },
];

const mode2Nodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 100, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programWrite, scopeId: "1" },
      minWidth: 700,
      minHeight: 600
    }
  },
  {
    id: '2',
    type: 'component',
    position: { x: 850, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.graphRead, scopeId: "2" },
      minWidth: 400,
      minHeight: 600
    }
  },
];

const mode3Nodes = [
  {
    id: '1',
    type: 'component',
    position: { x: 100, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.graphInput, scopeId: "1" },
      minWidth: 700,
      minHeight: 600
    }
  },
  {
    id: '2',
    type: 'component',
    position: { x: 850, y: 200 },
    data: {
      component: CodeIDE,
      componentProps: { codeIDEMode: CodeIDEMode.programRead, scopeId: "2" },
      minWidth: 400,
      minHeight: 600
    }
  },
];

const nodeTypes = { component: ComponentNode };

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(mode1Nodes);

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