import CodeGraph from '../code_ide/types/CodeGraph';
import ThCategory from './types/ThCategory';
import ThLevel from './types/ThLevel';
import ThStage from './types/ThStage';

const outputExample = ""

const codeExample = [
  "a = 1",
  "b = 2",
  "a = b",
  "print(a)",
  "print(b)"
].join('\n');

const graphExample: CodeGraph = {
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

const stages: ThStage[] = [
  {
    id: "s1",
    label: "Wertetypen",
    color: "th-value",
    levels: []
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    levels: []
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    levels: []
  },
]

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    nodes: [
      { id: "c-ide-1-main", type: "codeIDE-program-write-graph-auto", size: "large" },
      { id: "c-task-1", type: "task", size: "small" }
    ]
  },
  {
    id: "c2",
    label: "Code The Memory",
    nodes: [
      { id: "c-ide-1", type: "codeIDE-graph-read", size: "small" },
      { id: "c-ide-2-main", type: "codeIDE-program-write", size: "medium" },
      { id: "c-task-1", type: "task", size: "small" }
    ]
  },
  {
    id: "c3",
    label: "Memory From Code",
    nodes: [
      { id: "c-ide-1", type: "codeIDE-program-read", size: "small" },
      { id: "c-ide-2-main", type: "codeIDE-graph-input", size: "medium" },
      { id: "c-task-1", type: "task", size: "small" }
    ]
  }
]

export const levels: ThLevel[] = [
  {
    id: "l1",
    stage: stages[0],
    category: categories[0],
    label: "Level 1.1",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: codeExample,
    initialGraph: { nodes: [], edges: [] },
    expectedOutput: outputExample,
    expectedGraph: { nodes: [], edges: [] },
  },
  {
    id: "l7",
    stage: stages[1],
    category: categories[1],
    label: "Level 2.7",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: "",
    initialGraph: graphExample,
    expectedOutput: "",
    expectedGraph: graphExample,
  },
  {
    id: "l4",
    stage: stages[2],
    category: categories[2],
    label: "Level 3.4",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: codeExample,
    initialGraph: graphExample,
    expectedOutput: "",
    expectedGraph: graphExample,
  },
]