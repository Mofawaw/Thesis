import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `x = 1
y = 2
z = 40
produkt = x * y * z

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print(produkt)
`;

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x" },
    { "id": "n-vh-0", "type": "value-heap", "label": "5" },
    { "id": "n-vs-1", "type": "value-stack", "label": "y" },
    { "id": "n-vh-1", "type": "value-heap", "label": "-1" },
    { "id": "n-vs-2", "type": "value-stack", "label": "z" },
    { "id": "n-vh-2", "type": "value-heap", "label": "40" },
    { "id": "n-vs-3", "type": "value-stack", "label": "produkt" },
    { "id": "n-vh-3", "type": "value-heap", "label": "-20000" },
    { "id": "n-vs-4", "type": "value-stack", "label": "alpha" },
    { "id": "n-vh-4", "type": "value-heap", "label": "100" }
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
<p>Gegeben der Speicher. Vervollständige das Programm, sodass er diesen Speicher-Zustand ausgibt.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Entnehme die Informationen der Variablen aus dem Speicher-Zustand.</li>
</ul><br/>
`

// ================================== Solution ==================================
const exampleSolution =
  `x = 1
y = 2
z = 40
produkt = x * y * z

# TODO: -\u200B Schreibe deinen Code hier

x = 5
y = -1
alpha = 100
produkt = x * y * z * alpha

# ----------\u200B

print(produkt)
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS1LFinal: ThLevel = {
  id: "s1-lfinal",
  stage: stages[0],
  category: categories[1],
  label: "Finale",
  nodes: [
    { baseNode: categories[1].baseNodes[0], data: { codeIDE: { initialGraph: expectedGraph } } },
    { baseNode: categories[1].baseNodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[1].baseNodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[1].baseTippNodes[0], data: { codeIDE: {} } },
    { baseNode: categories[1].baseTippNodes[1], data: { codeIDE: { initialCode: exampleSolution } } },
  ],
  expected: { graph: expectedGraph }
}

export default levelS1LFinal;