import CodeGraph from '../code_ide/types/CodeGraph';
import CodeIDEMode from '../code_ide/types/CodeIDEMode';
import ThCategory from './types/Category';
import ThLevel from './types/Level';
import LevelNode, { LevelNodeSize, LevelNodeSizeType } from './types/LevelNodeData';

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

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    nodes: [
      { id: "1", type: "codeIDE-program-write-graph-auto", size: "large" },
      { id: "2", type: "task", size: "small" }
    ]
  },
  {
    id: "c2",
    label: "Code The Memory",
    nodes: [
      { id: "1", type: "codeIDE-program-write", size: "medium" },
      { id: "2", type: "codeIDE-graph-read", size: "small" },
      { id: "3", type: "task", size: "small" }
    ]
  },
  {
    id: "c3",
    label: "Memory From Code",
    nodes: [
      { id: "1", type: "codeIDE-graph-input", size: "medium" },
      { id: "2", type: "codeIDE-program-read", size: "small" },
      { id: "3", type: "task", size: "small" }
    ]
  }
]

const levels: ThLevel[] = [
  {
    id: "l1",
    stageId: "s1",
    categoryId: "c1",
    label: "Level 1.1",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: codeExample,
    initialGraph: { nodes: [], edges: [] },
    expectedOutput: outputExample,
    expectedGraph: { nodes: [], edges: [] },
  },
  {
    id: "l7",
    stageId: "s2",
    categoryId: "c2",
    label: "Level 2.7",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: "",
    initialGraph: graphExample,
    expectedOutput: "",
    expectedGraph: graphExample,
  },
  {
    id: "l4",
    stageId: "s3",
    categoryId: "c3",
    label: "Level 3.4",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: "",
    initialGraph: graphExample,
    expectedOutput: "",
    expectedGraph: graphExample,
  },
]

// export const mode1Nodes: LevelNode[] = [
//   {
//     id: "1",
//     type: "codeIDE",
//     position: { x: 0, y: 0 },
//     data: {
//       initialSize: LevelNodeSize.large,
//       props: {
//         scopeId: "1",
//         mode: CodeIDEMode.programWriteGraphAuto,
//         initialCode: codeExample,
//         initialGraph: graphExample
//       }
//     }
//   },
//   {
//     id: "2",
//     type: "task",
//     position: { x: 920, y: 0 },
//     data: {
//       initialSize: LevelNodeSize.small,
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet."
//     }
//   }
// ];

// export const sampleNode: LevelNode = {
//   id: "",
//   type: "task",
//   position: { x: 0, y: 0 },
//   data: {
//     initialSize: LevelNodeSize.medium,
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet."
//   }
// }

function generateLevelNodes(thLevel: ThLevel, categories: ThCategory[]): LevelNode[] {
  const category = categories.find(cat => cat.id === thLevel.categoryId);
  if (!category) {
    throw new Error(`Category with id ${thLevel.categoryId} not found`);
  }

  let currentPositionX = 0;
  const levelNodes: LevelNode[] = category.nodes.map(node => {
    const size = LevelNodeSize[node.size as keyof typeof LevelNodeSize] as LevelNodeSizeType;
    const nodeTypeParts = node.type.split('-');
    const isCodeIDE = nodeTypeParts[0] === "codeIDE";

    let levelNode: LevelNode = {
      id: node.id,
      type: isCodeIDE ? "codeIDE" : node.type,
      position: { x: currentPositionX, y: 0 },
      data: {
        initialSize: size
      }
    };

    if (isCodeIDE) {
      const modeString = nodeTypeParts.slice(1).join('-');
      levelNode.data = {
        initialSize: size,
        props: {
          scopeId: thLevel.id,
          mode: CodeIDEMode.fromString(modeString),
          initialCode: thLevel.initialCode,
          initialGraph: thLevel.initialGraph
        }
      };
    } else if (node.type === 'task') {
      levelNode.data = {
        initialSize: size,
        description: thLevel.task
      };
    }

    currentPositionX += size.width + 20;
    return levelNode;
  });

  return levelNodes;
}

// Example usage:
const mode1Nodes = generateLevelNodes(levels[0], categories);
console.log(mode1Nodes);

export default mode1Nodes;