import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";

const expectedGraphProgram =
  `x = 5
y = 10
x = y
y = x

str = "Hallo"

for i in range(0, 3):
  x = x + 1

str2 = "Welt"
str3 = str + " " + str2
`;

const initialGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x" },
    { "id": "n-vh-0", "type": "value-heap", "label": "" },
    { "id": "n-vs-1", "type": "value-stack", "label": "" },
    { "id": "n-vh-1", "type": "value-heap", "label": "10" },
    { "id": "n-vs-2", "type": "value-stack", "label": "" },
    { "id": "n-vh-2", "type": "value-heap", "label": "Hallo" },
    { "id": "n-vs-3", "type": "value-stack", "label": "i" },
    { "id": "n-vh-3", "type": "value-heap", "label": "" },
    { "id": "n-vs-4", "type": "value-stack", "label": "" },
    { "id": "n-vh-4", "type": "value-heap", "label": "" },
    { "id": "n-vs-5", "type": "value-stack", "label": "" },
    { "id": "n-vh-5", "type": "value-heap", "label": "" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" },
    { "id": "e-v-4", "type": "value", "source": "n-vs-4", "target": "n-vh-4" },
    { "id": "e-v-5", "type": "value", "source": "n-vs-5", "target": "n-vh-5" }
  ]
}

const expectedGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "x" },
    { "id": "n-vh-0", "type": "value-heap", "label": "13" },
    { "id": "n-vs-1", "type": "value-stack", "label": "y" },
    { "id": "n-vh-1", "type": "value-heap", "label": "10" },
    { "id": "n-vs-2", "type": "value-stack", "label": "str" },
    { "id": "n-vh-2", "type": "value-heap", "label": "Hallo" },
    { "id": "n-vs-3", "type": "value-stack", "label": "i" },
    { "id": "n-vh-3", "type": "value-heap", "label": "2" },
    { "id": "n-vs-4", "type": "value-stack", "label": "str2" },
    { "id": "n-vh-4", "type": "value-heap", "label": "Welt" },
    { "id": "n-vs-5", "type": "value-stack", "label": "str3" },
    { "id": "n-vh-5", "type": "value-heap", "label": "HalloWelt" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" },
    { "id": "e-v-4", "type": "value", "source": "n-vs-4", "target": "n-vh-4" },
    { "id": "e-v-5", "type": "value", "source": "n-vs-5", "target": "n-vh-5" }
  ]
}

const taskDescription =
  `Vergessen wir jetzt den Bauernhof.
<br/>
<br/>
Gegeben ist ein Programm mit dem dazugehörigen, aber unvollständigen, Speicher-Graphen.
<br/>
<br/>
<b>Fülle die Lücken des Speicher-Graphen aus.</b>
`

const levelS1C3: ThLevel = {
  id: "l-s1c3",
  stage: stages[0],
  category: categories[2],
  label: "Test 1-3",
  nodes: [
    { node: categories[2].nodes[0], data: { codeIDE: { initialCode: expectedGraphProgram } } },
    { node: categories[2].nodes[1], data: { codeIDE: { initialGraph: initialGraph } } },
    { node: categories[2].nodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [],
  expected: { graph: expectedGraph }
}

export default levelS1C3;

const exampleSolution =
  `# Vor vier Jahren
h = 10
b = 3
k = 5
summe = h + b + k

# TODO: - Schreibe hier
h = 10 * 2
k = 5 - 1
e = 48
summe = h + b + k + e
`