import ReactFlow, { Controls, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';
import CodeIDEMode from '../code_ide/types/CodeIDEMode';
import CodeIDENode from './nodes/CodeIDENode';

const initialCode = [
  "a = 1",
  "b = 2",
  "a = b",
  "print(a)",
  "print(b)"
].join('\n');

const initialGraph = {
  nodes: [
    { id: "n-vs-0", type: "value-stack", label: "a" },
    { id: "n-vh-0", type: "value-heap", label: 2 },
    { id: "n-vs-1", type: "value-stack", label: "b" },
    { id: "n-vh-1", type: "value-heap", label: 2 }
  ],
  edges: [
    { id: "e-v-0", type: "value", source: "n-vs-0", target: "n-vh-0" },
    { id: "e-v-1", type: "value", source: "n-vs-1", target: "n-vh-1" }
  ]
};

const mode1Nodes = [
  {
    id: "1",
    type: "codeIDE",
    position: { x: 100, y: 200 },
    data: {
      props: {
        scopeId: "1",
        mode: CodeIDEMode.programWriteGraphAuto,
        initialCode: initialCode,
        initialGraph: initialGraph
      }
    }
  },
  {
    id: "2",
    type: "codeIDE",
    position: { x: 100, y: 200 },
    data: {
      props: {
        scopeId: "2",
        mode: CodeIDEMode.programWrite,
        initialCode: "",
        initialGraph: { nodes: [], edges: [] }
      }
    }
  },
  {
    id: "3",
    type: "codeIDE",
    position: { x: 100, y: 200 },
    data: {
      props: {
        scopeId: "3",
        mode: CodeIDEMode.graphInput,
        initialCode: "",
        initialGraph: { nodes: [], edges: [] }
      }
    }
  },
];

const nodeTypes = { codeIDE: CodeIDENode };

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