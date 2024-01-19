import stages from "./stages.ts";
import categories from "./categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

const initialCode =
  `# Vor vier Jahren
h = 10
b = 3
k = 5
summe = h + b + k

# TODO: - Schreibe hier
`;

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "h" },
    { "id": "n-vh-0", "type": "value-heap", "label": "20" },
    { "id": "n-vs-1", "type": "value-stack", "label": "b" },
    { "id": "n-vh-1", "type": "value-heap", "label": "3" },
    { "id": "n-vs-2", "type": "value-stack", "label": "k" },
    { "id": "n-vh-2", "type": "value-heap", "label": "4" },
    { "id": "n-vs-3", "type": "value-stack", "label": "summe" },
    { "id": "n-vh-3", "type": "value-heap", "label": "75" },
    { "id": "n-vs-4", "type": "value-stack", "label": "e" },
    { "id": "n-vh-4", "type": "value-heap", "label": "48" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-v-2", "type": "value", "source": "n-vs-2", "target": "n-vh-2" },
    { "id": "e-v-3", "type": "value", "source": "n-vs-3", "target": "n-vh-3" },
    { "id": "e-v-4", "type": "value", "source": "n-vs-4", "target": "n-vh-4" }
  ]
}

const taskDescription =
  `Nun sind vier Jahre vergangen und es hat sich einiges verändert. Die Hamster haben sich verdoppelt, eine Katze ist abgehauen und es sind gleich 48 Esel dazu gekommen. 
<br/>
<br/>
Der entsprechende Speicher-Zustand beschreibt die neue Situation. Beachte, dass der jeweilige Wert der Variable im Speicher überschrieben wurde.
<br/>
<br/>
<b>Schreibe ein Programm welches diesen Speicher ausgibt.</b>
`

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

const levelS1C2: ThLevel = {
  id: "l-s1c2",
  stage: stages[0],
  category: categories[1],
  label: "Test 1-2",
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

export default levelS1C2;