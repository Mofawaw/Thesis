import CodeGraph from '../code_ide/types/CodeGraph';
import CodeIDEMode from '../code_ide/types/CodeIDEMode';
import LevelNode, { LevelNodeSize } from './types/LevelNode';
import ThCategory from './types/ThCategory';
import ThLevel from './types/ThLevel';
import ThStage from './types/ThStage';

// TODO: Backend
const c1_initialCode = [
  "apples = 4",
  "peaches = 6",
  "fruits = 0 # Todo 1",
  "",
  "print(\"Lily's fruits in total:\")",
  "# Todo 2"
].join('\n');

const c1_expectedOutput = [
  "Lily's fruits in total:",
  "10"
].join('\n')

const c2_initialCode = [
  "# TODO: Schreibe dein Program hier."
].join('\n');

const c2_expectedGraph: CodeGraph = {
  "nodes": [
    {
      "id": "n-vs-0",
      "type": "value-stack",
      "label": "a"
    },
    {
      "id": "n-vh-0",
      "type": "value-heap",
      "label": "2"
    },
    {
      "id": "n-vs-1",
      "type": "value-stack",
      "label": "b"
    },
    {
      "id": "n-vh-1",
      "type": "value-heap",
      "label": "2"
    },
    {
      "id": "n-rs-0",
      "type": "reference-stack",
      "label": "tier_1"
    },
    {
      "id": "n-rs-1",
      "type": "reference-stack",
      "label": "tier_2"
    },
    {
      "id": "n-vs-2",
      "type": "value-stack",
      "label": "c"
    },
    {
      "id": "n-vh-2",
      "type": "value-heap",
      "label": "10"
    },
    {
      "id": "n-rhd-0",
      "type": "reference-heap-deallocated",
      "label": "Tier('Esel', 5)"
    },
    {
      "id": "n-rh-1",
      "type": "reference-heap",
      "label": "Tier('Kuh', 12)"
    }
  ],
  "edges": [
    {
      "id": "e-v-0",
      "type": "value",
      "source": "n-vs-0",
      "target": "n-vh-0"
    },
    {
      "id": "e-v-1",
      "type": "value",
      "source": "n-vs-1",
      "target": "n-vh-1"
    },
    {
      "id": "e-v-2",
      "type": "value",
      "source": "n-vs-2",
      "target": "n-vh-2"
    },
    {
      "id": "e-r-0",
      "type": "reference",
      "source": "n-rs-0",
      "target": "n-rh-1"
    },
    {
      "id": "e-r-1",
      "type": "reference",
      "source": "n-rs-1",
      "target": "n-rh-1"
    }
  ]
}

const c3_initialCode = [
  "class Tier:",
  "  def __init__(self, art, alter):",
  "    self.art = art",
  "    self.alter = alter",
  "",
  "a = 1",
  "b = 2",
  "a = b",
  "tier_1 = Tier(\"Esel\", 5)",
  "tier_2 = Tier(\"Kuh\", 12)",
  "tier_1 = tier_2",
  "",
  "c = 10",
  "print(c)",
].join('\n');

const c3_expectedGraph: CodeGraph = {
  "nodes": [
    {
      "id": "n-vs-0",
      "type": "value-stack",
      "label": "a"
    },
    {
      "id": "n-vh-0",
      "type": "value-heap",
      "label": "2"
    },
    {
      "id": "n-vs-1",
      "type": "value-stack",
      "label": "b"
    },
    {
      "id": "n-vh-1",
      "type": "value-heap",
      "label": "2"
    },
    {
      "id": "n-rs-0",
      "type": "reference-stack",
      "label": "tier_1"
    },
    {
      "id": "n-rs-1",
      "type": "reference-stack",
      "label": "tier_2"
    },
    {
      "id": "n-vs-2",
      "type": "value-stack",
      "label": "c"
    },
    {
      "id": "n-vh-2",
      "type": "value-heap",
      "label": "10"
    },
    {
      "id": "n-rhd-0",
      "type": "reference-heap-deallocated",
      "label": "Tier('Esel', 5)"
    },
    {
      "id": "n-rh-1",
      "type": "reference-heap",
      "label": "Tier('Kuh', 12)"
    }
  ],
  "edges": [
    {
      "id": "e-v-0",
      "type": "value",
      "source": "n-vs-0",
      "target": "n-vh-0"
    },
    {
      "id": "e-v-1",
      "type": "value",
      "source": "n-vs-1",
      "target": "n-vh-1"
    },
    {
      "id": "e-v-2",
      "type": "value",
      "source": "n-vs-2",
      "target": "n-vh-2"
    },
    {
      "id": "e-r-0",
      "type": "reference",
      "source": "n-rs-0",
      "target": "n-rh-1"
    },
    {
      "id": "e-r-1",
      "type": "reference",
      "source": "n-rs-1",
      "target": "n-rh-1"
    }
  ]
}

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
      { id: "c-ide-1", type: "codeIDE", size: LevelNodeSize.large, codeIDE: { isMain: true, mode: CodeIDEMode.programWriteGraphAuto, hasInitialCode: true, hasInitialGraph: true, hasExpectedOutput: true, hasExpectedGraph: false } },
      { id: "c-task-1", type: "text", size: LevelNodeSize.small }
    ]
  },
  {
    id: "c2",
    label: "Code The Memory",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", size: LevelNodeSize.small, codeIDE: { isMain: false, mode: CodeIDEMode.graphRead, hasInitialCode: false, hasInitialGraph: true, hasExpectedOutput: false, hasExpectedGraph: false } },
      { id: "c-ide-2", type: "codeIDE", size: LevelNodeSize.medium, codeIDE: { isMain: true, mode: CodeIDEMode.programWrite, hasInitialCode: true, hasInitialGraph: false, hasExpectedOutput: false, hasExpectedGraph: true } },
      { id: "c-task-1", type: "text", size: LevelNodeSize.small }
    ]
  },
  {
    id: "c3",
    label: "Memory From Code",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", size: LevelNodeSize.small, codeIDE: { isMain: false, mode: CodeIDEMode.programRead, hasInitialCode: true, hasInitialGraph: false, hasExpectedOutput: false, hasExpectedGraph: false } },
      { id: "c-ide-2", type: "codeIDE", size: LevelNodeSize.medium, codeIDE: { isMain: true, mode: CodeIDEMode.graphInput, hasInitialCode: false, hasInitialGraph: true, hasExpectedOutput: false, hasExpectedGraph: true } },
      { id: "c-task-1", type: "text", size: LevelNodeSize.small }
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
    initialCode: c1_initialCode,
    initialGraph: { nodes: [], edges: [] },
    expectedOutput: c1_expectedOutput,
    expectedGraph: { nodes: [], edges: [] },
  },
  {
    id: "l7",
    stage: stages[1],
    category: categories[1],
    label: "Level 2.7",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: c2_initialCode,
    initialGraph: c2_expectedGraph,
    expectedOutput: "",
    expectedGraph: c2_expectedGraph,
  },
  {
    id: "l4",
    stage: stages[2],
    category: categories[2],
    label: "Level 3.4",
    task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo laoreet sit amet cursus sit amet dictum sit amet.",
    initialCode: c3_initialCode,
    initialGraph: c3_expectedGraph,
    expectedOutput: "",
    expectedGraph: c3_expectedGraph,
  },
]

// TODO: Samples
export const sampleLevelNode: LevelNode = {
  id: "",
  type: "text",
  position: { x: 0, y: 0 },
  data: {
    title: "Tipp 1",
    initialSize: LevelNodeSize.medium,
    description: "This is a sample Tipp!"
  }
}