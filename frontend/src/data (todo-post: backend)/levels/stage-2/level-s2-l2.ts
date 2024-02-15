import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";

const initialCode =
  `class Tier:
  def __init__(self, name, alter):
      self.name = name
      self.alter = alter

# Anfangszustand
stall = Tier("Max", 2)  
teich = Tier("Bert", 3)
scheune = Tier("Luisa", 5)

# TODO: - Schreibe hier
`;

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-rs-0", "type": "reference-stack", "label": "stall" },
    { "id": "n-rs-1", "type": "reference-stack", "label": "teich" },
    { "id": "n-rs-2", "type": "reference-stack", "label": "scheune" },
    { "id": "n-rs-3", "type": "reference-stack", "label": "wiese" },
    { "id": "n-rhd-0", "type": "reference-heap-deallocated", "label": "Tier('Max', 2)" },
    { "id": "n-rh-1", "type": "reference-heap", "label": "Tier('Bert', 3)" },
    { "id": "n-rh-2", "type": "reference-heap", "label": "Tier('Luisa', 5)" },
    { "id": "n-rh-3", "type": "reference-heap", "label": "Tier('Elsa', 1)" }
  ],
  "edges": [
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-1" },
    { "id": "e-r-1", "type": "reference", "source": "n-rs-1", "target": "n-rh-2" },
    { "id": "e-r-2", "type": "reference", "source": "n-rs-2", "target": "n-rh-1" },
    { "id": "e-r-3", "type": "reference", "source": "n-rs-3", "target": "n-rh-3" }
  ]
}

const taskDescription =
  `Auf dem Bauernhof haben die Tiere beschlossen, ihre Plätze zu wechseln. Bert zieht in den Stall, Luisa geht zum Teich, und Max erkundet die Scheune. Außerdem kommt ein neues Tier, Elsa, und macht es sich auf der Wiese gemütlich.
<br/>
<br/>
Ordne die Plätze neu zu, sodass sie den Tieren entsprechen, die jetzt dort leben. Der entsprechende Speicher-Zustand beschreibt die neue Situation.
<br/>
<br/>
<b>Schreibe ein Programm, welches diesen Speicher ausgibt.</b>
`

const levelS2L2: ThLevel = {
  id: "s2-l2",
  stage: stages[1],
  category: categories[1],
  label: "5",
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

export default levelS2L2;

const exampleSolution =
  `class Tier:
  def __init__(self, name, alter):
      self.name = name
      self.alter = alter

# Anfangszustand
stall = Tier("Max", 2)
teich = Tier("Bert", 3)
scheune = Tier("Luisa", 5)

# TODO: - Schreibe hier
stall = teich  # Benny zieht in den Stall
teich = scheune  # Kitty geht zum Teich
scheune = stall  # Henry erkundet die Scheune
wiese = Tier("Elsa", 1)  # Elsa kommt neu dazu
`