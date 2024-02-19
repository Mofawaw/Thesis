import { ThLevel } from "@/types/th-types.ts";

import stages from "../../stages.ts";
import categories from "../../categories.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `class Dreieck:
  def __init__(self, name):
    self.name = name

v1 = Dreieck("Rechtwinklig")
v2 = Dreieck("Gleichseitig")

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B
`;

const expectedGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "v1" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "v2" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "v3" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "Dreieck('Gleichseitig')" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Dreieck('Gleichseitig')" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "Dreieck('Gleichschenklig')" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-0" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-2" }
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
  `class Dreieck:
  def __init__(self, name):
    self.name = name

v1 = Dreieck("Rechtwinklig")
v2 = Dreieck("Gleichseitig")

# TODO: -\u200B Schreibe deinen Code hier

v1.name = v2.name
v3 = Dreieck("Gleichschenklig")

# ----------\u200B
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS2L3: ThLevel = {
  id: "s2-l3",
  stage: stages[1],
  category: categories[1],
  label: "7",
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

export default levelS2L3;