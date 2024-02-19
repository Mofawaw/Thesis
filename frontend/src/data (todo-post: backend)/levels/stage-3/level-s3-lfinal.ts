import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

import stages from "../../stages.ts";
import categories from "../../categories.ts";

// ================================== CodeIDEs ==================================
const expectedGraphProgram =
  `class Kreis:
    def __init__(self, radius):
        self.radius = radius

    def get_area(self):
        return 3.142 * self.radius ** 2

x1 = 2
x2 = 4
x3 = x1
x3 += 6

areas = []
k1 = Kreis(1)
k2 = Kreis(2)
areas.append(k1.get_area())
k2 = k1
k1.radius = 10
areas.append(k1.get_area())
areas.append(k2.get_area())
`;

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "" },
    { "id": "n-vh-0", "type": "value-heap", "label": "" },
    { "id": "n-vs-1", "type": "value-stack", "label": "x2" },
    { "id": "n-vh-1", "type": "value-heap", "label": "4" },
    { "id": "n-vs-2", "type": "value-stack", "label": "x3" },
    { "id": "n-vh-2", "type": "value-heap", "label": "" },
    { "id": "n-rs-0", "type": "reference-stack", "label": "areas" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "" },
    { "id": "n-rhd-2", "type": "reference-heap-deallocated", "label": "Kreis(2)" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-0" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-1" }
  ],
  inputMaxChars: 21
}

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x1" },
    { "id": "n-vh-0", "type": "value-heap", "label": "2" },
    { "id": "n-vs-1", "type": "value-stack", "label": "x2" },
    { "id": "n-vh-1", "type": "value-heap", "label": "4" },
    { "id": "n-vs-2", "type": "value-stack", "label": "x3" },
    { "id": "n-vh-2", "type": "value-heap", "label": "8" },
    { "id": "n-rs-0", "type": "reference-stack", "label": "areas" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "k1" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "k2" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "[3.142, 314.2, 314.2]" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Kreis(10)" },
    { "id": "n-rhd-2", "type": "reference-heap-deallocated", "label": "Kreis(2)" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-0" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-1" }
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

// ================================== Tipps ==================================


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS3LFinal: ThLevel = {
  id: "s3-lfinal",
  stage: stages[2],
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

export default levelS3LFinal;