import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

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

# Todo: Bearbeite hier
`;

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "a" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "b" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "c" },
    { "id": "n-rs-3", "type": "reference-stack", "label": "d" },
    { "id": "n-vs-0", "type": "value-stack", "label": "area" },
    { "id": "n-vh-0", "type": "value-heap", "label": "50" },
    { "id": "n-rs-4", "type": "reference-stack", "label": "areas" },
    { "id": "n-rhd-0", "type": "reference-heap-deallocated", "label": "Rechteck(10, 5)" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Rechteck(5, 5)" },
    { "id": "n-rhd-2", "type": "reference-heap-deallocated", "label": "Rechteck(1, 5)" },
    { "id": "n-rh-3", "type": "reference-heap", "label": "Rechteck(1, 1)" },
    { "id": "n-rh-4", "type": "reference-heap", "label": "[50, 50, 5, 25, 1]" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-3" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-3" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-1" },
    { "id": "e-r-3", "type": "reference", "source": "n-rs-3", "target": "n-rh-3" },
    { "id": "e-r-4", "type": "reference", "source": "n-rs-4", "target": "n-rh-4" }
  ]
}

const taskDescription =
  `Gegeben die Klasse 'Rechteck' mit den Attributen 'laenge' und 'breite'.
<br/>
<br/>
<b>Vervollständige das Programm so, dass er den Speicher-Zustand beschreibt.</b>
`

const levelS3L2: ThLevel = {
  id: "s3-l2",
  stage: stages[2],
  category: categories[1],
  label: "Lvl 2",
  nodes: [
    { baseNode: categories[1].baseNodes[0], data: { codeIDE: { initialGraph: expectedGraph } } },
    { baseNode: categories[1].baseNodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[1].baseNodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[1].baseTippNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[1].baseTippNodes[1], data: { codeIDE: {} } },
    { baseNode: categories[1].baseTippNodes[2], data: { codeIDE: {} } },
  ],
  expected: { graph: expectedGraph }
}

export default levelS3L2;

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

# Todo: Bearbeite hier
b = d
areas.append(c.laenge * c.breite)
c = a
a = d
areas.append(c.laenge * c.breite)
# -----
areas.append(a.laenge * a.breite)
`