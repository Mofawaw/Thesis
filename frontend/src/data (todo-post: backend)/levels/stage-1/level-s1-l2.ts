import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

// ================================== CodeIDEs ==================================
const expectedGraphProgram =
  `x = 5
y = 10
x = y
y = x

str = "A"
str2 = "I"
str3 = str + str2
`;

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x" },
    { "id": "n-vh-0", "type": "value-heap", "label": "" },
    { "id": "n-vs-1", "type": "value-stack", "label": "y" },
    { "id": "n-vh-1", "type": "value-heap", "label": "" },
    { "id": "n-vs-2", "type": "value-stack", "label": "str" },
    { "id": "n-vh-2", "type": "value-heap", "label": "" },
    { "id": "n-vs-3", "type": "value-stack", "label": "" },
    { "id": "n-vh-3", "type": "value-heap", "label": "I" },
    { "id": "n-vs-4", "type": "value-stack", "label": "" },
    { "id": "n-vh-4", "type": "value-heap", "label": "AI" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" },
    { "id": "e-v-4", "type": "value", "source": "n-vs-4", "target": "n-vh-4" }
  ],
  "inputMaxChars": 4
}

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x" },
    { "id": "n-vh-0", "type": "value-heap", "label": "10" },
    { "id": "n-vs-1", "type": "value-stack", "label": "y" },
    { "id": "n-vh-1", "type": "value-heap", "label": "10" },
    { "id": "n-vs-2", "type": "value-stack", "label": "str" },
    { "id": "n-vh-2", "type": "value-heap", "label": "A" },
    { "id": "n-vs-3", "type": "value-stack", "label": "str2" },
    { "id": "n-vh-3", "type": "value-heap", "label": "I" },
    { "id": "n-vs-4", "type": "value-stack", "label": "str3" },
    { "id": "n-vh-4", "type": "value-heap", "label": "AI" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" },
    { "id": "e-v-4", "type": "value", "source": "n-vs-4", "target": "n-vh-4" }
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
const levelS1L2: ThLevel = {
  id: "s1-l2",
  stage: stages[0],
  category: categories[2],
  label: "2",
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

export default levelS1L2;