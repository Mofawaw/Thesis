import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `# Stand heute
e = 1
m = 2
j = 92
summe = e + m + j

# Stand 2010
# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print(summe)
`;

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "e" },
    { "id": "n-vh-0", "type": "value-heap", "label": "1" },
    { "id": "n-vs-1", "type": "value-stack", "label": "m" },
    { "id": "n-vh-1", "type": "value-heap", "label": "2" },
    { "id": "n-vs-2", "type": "value-stack", "label": "j" },
    { "id": "n-vh-2", "type": "value-heap", "label": "63" },
    { "id": "n-vs-3", "type": "value-stack", "label": "summe" },
    { "id": "n-vh-3", "type": "value-heap", "label": "128" },
    { "id": "n-vs-4", "type": "value-stack", "label": "s" },
    { "id": "n-vh-4", "type": "value-heap", "label": "62" }
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

<p><b>Informationen (Stand 2010):</b></p>
<ul class="list-disc pl-4">
  <li>Die Erde hat 1 Mond</li>
  <li>Der Mars hat 2 Monde</li>
  <li>Der Jupiter hat 63 Monde (heute 92)</li>
  <li>Der Saturn hat 62 Monde (heute 146)</li>
</ul><br/>
`

// ================================== Solution ==================================
const exampleSolution =
  `# Stand heute
e = 1
m = 2
j = 92
summe = e + m + j

# Stand 2010
# TODO: -\u200B Schreibe deinen Code hier

j = 63
s = 62
summe = e + m + j + s

# ----------\u200B

print(summe)
`

// ================================== Tipps ==================================


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
  category: categories[1],
  label: "2",
  nodes: [
    { baseNode: categories[1].baseNodes[0], data: { codeIDE: { initialGraph: expectedGraph } } },
    { baseNode: categories[1].baseNodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[1].baseNodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[1].baseTippNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[1].baseTippNodes[1], data: { codeIDE: {} } },
    { baseNode: categories[1].baseTippNodes[2], data: { codeIDE: { initialCode: exampleSolution } } },
  ],
  expected: { graph: expectedGraph }
}

export default levelS1L2;