import CodeGraph from '../code_ide/code_memory/codeGraph';
import { ThCategory, ThLevel, ThLevelNode, ThStage } from './types/thTypes';

const c1_initialCode = [
  "apples = 4",
  "peaches = 6",
  "fruits = 0 # Todo 1",
  "",
  "print(\"Lily's fruits in total:\")",
  "# Todo 2"
].join('\n');

const c1_initialGraph = { nodes: [], edges: [] };

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

const c3_initialGraph: CodeGraph = {
  "nodes": [
    {
      "id": "n-vs-0",
      "type": "value-stack",
      "label": ""
    },
    {
      "id": "n-vh-0",
      "type": "value-heap",
      "label": "2"
    },
    {
      "id": "n-vs-1",
      "type": "value-stack",
      "label": ""
    },
    {
      "id": "n-vh-1",
      "type": "value-heap",
      "label": ""
    },
    {
      "id": "n-rs-0",
      "type": "reference-stack",
      "label": "tier_1"
    },
    {
      "id": "n-rs-1",
      "type": "reference-stack",
      "label": ""
    },
    {
      "id": "n-vs-2",
      "type": "value-stack",
      "label": "c"
    },
    {
      "id": "n-vh-2",
      "type": "value-heap",
      "label": ""
    },
    {
      "id": "n-rhd-0",
      "type": "reference-heap-deallocated",
      "label": ""
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
  ],
  "inputMaxChars": 15
}

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
    logo: "castle-value",
    levels: [],
  },
  {
    id: "s2",
    label: "Referenztypen",
    color: "th-reference",
    logo: "castle-reference",
    levels: []
  },
  {
    id: "s3",
    label: "Werte- & Referenztypen",
    color: "th-together",
    logo: "castle-together",
    levels: []
  },
]

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "large", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-1", config: { type: "program+graph", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "output"
  },
  {
    id: "c2",
    label: "Code The Memory",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", isDefault: true, codeIDE: { isMain: false, scopeId: "c-ide-1", config: { type: "graph", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-2", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "graph"
  },
  {
    id: "c3",
    label: "Memory From Code",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", isDefault: true, codeIDE: { isMain: false, scopeId: "c-ide-1", config: { type: "program", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-2", config: { type: "graph", mode: "write", runnable: false } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "graph"
  }
]

export const levels: ThLevel[] = [
  {
    id: "s-1-l-1",
    stage: stages[0],
    category: categories[0],
    label: "Level 1.1",
    nodes: [
      { node: categories[0].nodes[0], data: { codeIDE: { initialCode: c1_initialCode, initialGraph: c1_initialGraph } } },
      { node: categories[0].nodes[1], data: { text: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." } } }
    ],
    tippNodes: [],
    tutorialNodes: [],
    expected: { output: c1_expectedOutput }
  },
  {
    id: "s-2-l-1",
    stage: stages[1],
    category: categories[1],
    label: "Level 2.1",
    nodes: [
      { node: categories[1].nodes[0], data: { codeIDE: { initialGraph: c2_expectedGraph } } },
      { node: categories[1].nodes[1], data: { codeIDE: { initialCode: c2_initialCode } } },
      { node: categories[1].nodes[2], data: { text: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." } } }
    ],
    tippNodes: [],
    tutorialNodes: [],
    expected: { graph: c2_expectedGraph }
  },
  {
    id: "s-3-l-1",
    stage: stages[2],
    category: categories[2],
    label: "Level 3.1",
    nodes: [
      { node: categories[2].nodes[0], data: { codeIDE: { initialCode: c3_initialCode } } },
      { node: categories[2].nodes[1], data: { codeIDE: { initialGraph: c3_initialGraph } } },
      { node: categories[2].nodes[2], data: { text: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." } } }
    ],
    tippNodes: [],
    tutorialNodes: [
      { node: { id: "t-1", type: "tutorial", data: { title: "Tutorial Wertetypen", size: "medium", isDefault: false } }, data: { tutorial: { color: "th-value", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." } } },
    ],
    expected: { graph: c3_expectedGraph }
  },
]

export const sampleLevelNode: ThLevelNode = {
  node: {
    id: "",
    type: "text",
    data: {
      title: "Tipp 1",
      size: "medium",
      isDefault: false
    }
  },
  data: {
    text: {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  }
}