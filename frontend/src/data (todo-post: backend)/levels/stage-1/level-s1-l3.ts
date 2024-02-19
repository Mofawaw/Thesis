import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

import stages from "../../stages.ts";
import categories from "../../categories.ts";

// ================================== CodeIDEs ==================================
const expectedGraphProgram =
  `a = -1
b = -1
c = a
b = c

for i in [0, 1, 2]:
  a = a + 1
`;

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "a" },
    { "id": "n-vh-0", "type": "value-heap", "label": "" },
    { "id": "n-vs-1", "type": "value-stack", "label": "b" },
    { "id": "n-vh-1", "type": "value-heap", "label": "" },
    { "id": "n-vs-2", "type": "value-stack", "label": "" },
    { "id": "n-vh-2", "type": "value-heap", "label": "-1" },
    { "id": "n-vs-3", "type": "value-stack", "label": "" },
    { "id": "n-vh-3", "type": "value-heap", "label": "" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" }
  ],
  "inputMaxChars": 2
}

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "a" },
    { "id": "n-vh-0", "type": "value-heap", "label": "2" },
    { "id": "n-vs-1", "type": "value-stack", "label": "b" },
    { "id": "n-vh-1", "type": "value-heap", "label": "-1" },
    { "id": "n-vs-2", "type": "value-stack", "label": "c" },
    { "id": "n-vh-2", "type": "value-heap", "label": "-1" },
    { "id": "n-vs-3", "type": "value-stack", "label": "i" },
    { "id": "n-vh-3", "type": "value-heap", "label": "2" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" }
  ]
}


// ================================== Task ==================================
const taskDescription =
  `<p><b>Ziel:</b></p>
<p>Gegeben das Program. Fülle die Lücken des Speicher-Graphens aus.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Entnehme die Informationen der Variablen aus dem Program</li>
</ul><br/>
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS1L3: ThLevel = {
  id: "s1-l3",
  stage: stages[0],
  category: categories[2],
  label: "3",
  nodes: [
    { baseNode: categories[2].baseNodes[0], data: { codeIDE: { initialCode: expectedGraphProgram } } },
    { baseNode: categories[2].baseNodes[1], data: { codeIDE: { initialGraph: initialGraph } } },
    { baseNode: categories[2].baseNodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[2].baseTippNodes[0], data: { codeIDE: { initialCode: expectedGraphProgram } } },
    { baseNode: categories[2].baseTippNodes[1], data: { codeIDE: {} } },
    { baseNode: categories[2].baseTippNodes[2], data: { codeIDE: { initialGraph: expectedGraph } } },
  ],
  expected: { graph: expectedGraph }
}

export default levelS1L3;