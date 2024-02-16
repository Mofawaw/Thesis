import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

// ================================== CodeIDEs ==================================
const expectedGraphProgram =
  `class Viereck:
  def __init__(self, name):
    self.name = name

class Dreieck:
  def __init__(self, name):
    self.name = name

f1 = Viereck("Parallelogramm")
f2 = Viereck("Drache")
f3 = Dreieck("Rechtwinklig")

f1.name = ("Rhombus")

f2 = f1
f1 = f3
f3 = f1
`;

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "" },
    { "id": "n-rhd-1", "type": "reference-heap-deallocated", "label": "Viereck('Drache')" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-2" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-0" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-2" }
  ],
  inputMaxChars: 24
}


const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "f1" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "f2" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "f3" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "Viereck('Rhombus')" },
    { "id": "n-rhd-1", "type": "reference-heap-deallocated", "label": "Viereck('Drache')" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "Dreieck('Rechtwinklig')" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-2" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-0" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-2" }
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
const levelS2LFinal: ThLevel = {
  id: "s2-lfinal",
  stage: stages[1],
  category: categories[2],
  label: "Finale",
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

export default levelS2LFinal;