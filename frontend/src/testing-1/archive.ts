import CodeGraph from "../components/code_ide/code_memory/codeGraph";

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