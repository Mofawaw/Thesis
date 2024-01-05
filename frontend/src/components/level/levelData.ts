import CodeGraph from '../code_ide/types/CodeGraph';
import CodeIDEMode from '../code_ide/types/CodeIDEMode';
import LevelNode, { LevelNodeSize } from './types/LevelNodeData';

const initialCode = [
  "a = 1",
  "b = 2",
  "a = b",
  "print(a)",
  "print(b)"
].join('\n');

const initialGraph: CodeGraph = {
  nodes: [
    { id: "n-vs-0", type: "value-stack", label: "a" },
    { id: "n-vh-0", type: "value-heap", label: "2" },
    { id: "n-vs-1", type: "value-stack", label: "b" },
    { id: "n-vh-1", type: "value-heap", label: "2" }
  ],
  edges: [
    { id: "e-v-0", type: "value", source: "n-vs-0", target: "n-vh-0" },
    { id: "e-v-1", type: "value", source: "n-vs-1", target: "n-vh-1" }
  ]
};

export const mode1Nodes: LevelNode[] = [
  {
    id: "1",
    type: "codeIDE",
    position: { x: 100, y: 0 },
    data: {
      initialSize: LevelNodeSize.large,
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
    position: { x: 1020, y: 0 },
    data: {
      initialSize: LevelNodeSize.small,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet."
    }
  }
];

export const sampleNode: LevelNode = {
  id: "",
  type: "task",
  position: { x: 0, y: 0 },
  data: {
    initialSize: LevelNodeSize.medium,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet."
  }
}
