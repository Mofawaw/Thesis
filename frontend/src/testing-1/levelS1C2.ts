import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";

const initialCode =
  `# Vor vier Jahren
h = 10
b = 3
k = 5
summe = h + b + k

# TODO: - Schreibe hier
`;

const expectedGraph = {
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
  `Nun sind vier Jahre vergangen und es hat sich einiges verändert. Die Hamster haben sich verdoppelt, eine Katze ist von uns gegangen und es sind gleich 48 Esel dazu gekommen. Der entsprechende Speicher-Zustand beschreibt die neue Situation.
<br/>
<br/>
<b>Schreibe ein Programm welches diesen Speicher ausgibt.</b>
`

const levelS1C2: ThLevel = {
  id: "l-s1c2",
  stage: stages[1],
  category: categories[1],
  label: "Test 1-2",
  nodes: [
    { node: categories[1].nodes[0], data: { codeIDE: { initialGraph: expectedGraph } } },
    { node: categories[1].nodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { node: categories[1].nodes[2], data: { text: { description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." } } }
  ],
  tippNodes: [],
  expected: { graph: expectedGraph }
}

export default levelS1C2;

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