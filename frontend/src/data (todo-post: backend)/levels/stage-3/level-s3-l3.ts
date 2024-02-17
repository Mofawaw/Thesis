import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `class Rechteck:
    def __init__(self, laenge, breite):
        self.laenge = laenge
        self.breite = breite

a = Rechteck(10, 5)
b = Rechteck(5, 5)
c = Rechteck(1, 5)
d = Rechteck(1, 1)

area = a.laenge * a.breite
areas = []
areas.append(area)
a = b
areas.append(area)

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

areas.append(a.laenge * a.breite)
`;

const expectedGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "n" },
    { "id": "n-vh-0", "type": "value-heap", "label": "50" },
    { "id": "n-rs-0", "type": "reference-stack", "label": "xs" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "ys" },
    { "id": "n-vs-1", "type": "value-stack", "label": "x" },
    { "id": "n-vh-1", "type": "value-heap", "label": "10" },
    { "id": "n-rhd-0", "type": "reference-heap-deallocated", "label": "[1, 1, 1, 1, 1, 10]" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "[10, 10, 10, 10]" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-1" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" }
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
  `class Rechteck:
    def __init__(self, laenge, breite):
        self.laenge = laenge
        self.breite = breite

a = Rechteck(10, 5)
b = Rechteck(5, 5)
c = Rechteck(1, 5)
d = Rechteck(1, 1)

area = a.laenge * a.breite
areas = []
areas.append(area)
a = b
areas.append(area)

# TODO: -\u200B Schreibe deinen Code hier

b = d
areas.append(c.laenge * c.breite)
c = a
a = d
areas.append(c.laenge * c.breite)

# ----------\u200B

areas.append(a.laenge * a.breite)
`

// ================================== Tipps ==================================


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS3L3: ThLevel = {
  id: "s3-l3",
  stage: stages[2],
  category: categories[1],
  label: "11",
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

export default levelS3L3;