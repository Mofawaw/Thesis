import CodeIDEMode from '../code_ide/types/CodeIDEMode';
import CodeIDENode from './nodes/CodeIDENode';
import TaskNode from './nodes/TaskNode';

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

export const mode1Nodes: any = [
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
    type: "task",
    position: { x: 1100, y: 200 },
    data: {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet."
    }
  }
];

export const nodeTypes = { codeIDE: CodeIDENode, task: TaskNode };