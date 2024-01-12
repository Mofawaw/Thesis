import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";
import CodeGraph from "../components/code_ide/code_memory/codeGraph";
import { tippNodesC2 } from "./tippNodes";

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

const levelS2C2: ThLevel = {
  id: "l-s2c2",
  stage: stages[1],
  category: categories[1],
  label: "Test 2-2",
  nodes: [
    { node: categories[1].nodes[0], data: { codeIDE: { initialGraph: expectedGraph } } },
    { node: categories[1].nodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { node: categories[1].nodes[2], data: { text: { description: taskDescription } } }
  ],
  tippNodes: tippNodesC2,
  expected: { graph: expectedGraph }
}

export default levelS2C2;

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