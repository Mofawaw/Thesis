import stages from "../stages.ts";
import categories from "../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

const expectedGraphProgram =
  `class Tier:
    def __init__(self, name, alter):
        self.name = name
        self.alter = alter

stall = Tier("Max", 2)
teich = Tier("Bert", 3)
scheune = Tier("Luisa", 5)
wiese = Tier("Elsa", 1)

# Julius das neue Tier kommt und ersetzt Max im Stall
stall = Tier("Julius", 4)

# Elsa verlässt die Wiese und wird nicht ersetzt
del wiese

# Bert und Luisa tauschen die Plätze
temp = stall
stall = scheune
scheune = temp
`;

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "scheune" },
    { "id": "n-rs-3", "type": "reference-stack", "label": "temp" },
    { "id": "n-rhd-0", "type": "reference-heap-deallocated", "label": "" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Tier('Bert', 3)" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "" },
    { "id": "n-rhd-3", "type": "reference-heap-deallocated", "label": "" },
    { "id": "n-rh-4", "type": "reference-heap", "label": "" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-2" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-4" },
    { "id": "e-r-3", "type": "reference", "source": "n-rs-3", "target": "n-rh-4" }
  ],
  inputMaxChars: 17
}

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "stall" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "teich" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "scheune" },
    { "id": "n-rs-3", "type": "reference-stack", "label": "temp" },
    { "id": "n-rhd-0", "type": "reference-heap-deallocated", "label": "Tier('Max', 2)" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Tier('Bert', 3)" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "Tier('Luisa', 5)" },
    { "id": "n-rhd-3", "type": "reference-heap-deallocated", "label": "Tier('Elsa', 1)" },
    { "id": "n-rh-4", "type": "reference-heap", "label": "Tier('Julius', 4)" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-2" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-1" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-4" },
    { "id": "e-r-3", "type": "reference", "source": "n-rs-3", "target": "n-rh-4" }
  ]
}

const taskDescription =
  `Heute im Bauernhof: Julius kommt hinzu und ersetzt Max am Teich und Elsa verlässt den Bauernhof. Zudem tauschen Bert und Luisa die Plätze.
<br/>
<br/>
Gegeben ist das entsprechene Programm. Deine Aufgabe ist es, den zugehörigen Speicher-Graphen zu vollenden.
<br/>
<br/>
<b>Fülle die Lücken des Speicher-Graphen aus.</b>
`

const levelS2C3: ThLevel = {
  id: "s2-l3",
  stage: stages[1],
  category: categories[2],
  label: "Lvl 3",
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

export default levelS2C3;