import { ThLevel, ThNode, ThStage, ThStageLevel } from "@/types/th-types.ts";
import stages from "./stages";
import categories from "./categories";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types";

export const tutorialMasterNode: ThNode = {
  baseNode: { id: "t-tu-master", type: "tutorial", data: { title: "Tutorial", size: "small" } },
  data: { tutorial: { id: "master" } }
}

export const tutorialValueNode: ThNode = {
  baseNode: { id: "tu-val", type: "tutorial", data: { title: "Wertetypen", size: "medium" } },
  data: { tutorial: { id: "value" } }
}

export const tutorialReferenceNode: ThNode = {
  baseNode: { id: "tu-ref", type: "tutorial", data: { title: "Referenztypen", size: "medium" } },
  data: { tutorial: { id: "reference" } }
}

const expectedGraphProgram = `a = 1
b = 2
c = [-1, -2]

a = b
`

const initialGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "a" },
    { "id": "n-vh-0", "type": "value-heap", "label": "" },
    { "id": "n-vs-1", "type": "value-stack", "label": "" },
    { "id": "n-vh-1", "type": "value-heap", "label": "2" },
    { "id": "n-rs-0", "type": "reference-stack", "label": "c" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-0" }
  ],
  inputMaxChars: 8
}

const expectedGraph: CodeGraph = {
  "nodes": [
    { "id": "n-vs-0", "type": "value-stack", "label": "a" },
    { "id": "n-vh-0", "type": "value-heap", "label": "2" },
    { "id": "n-vs-1", "type": "value-stack", "label": "b" },
    { "id": "n-vh-1", "type": "value-heap", "label": "2" },
    { "id": "n-rs-0", "type": "reference-stack", "label": "c" },
    { "id": "n-rh-0", "type": "reference-heap", "label": "[-1, -2]" }
  ],
  "edges": [
    { "id": "e-v-0", "type": "value", "source": "n-vs-0", "target": "n-vh-0" },
    { "id": "e-v-1", "type": "value", "source": "n-vs-1", "target": "n-vh-1" },
    { "id": "e-r-0", "type": "reference", "source": "n-rs-0", "target": "n-rh-0" }
  ]
}

const taskDescription = `<p><b>Ziel:</b></p>
<p>Gegeben das Program. Fülle die Lücken des Speicher-Graphens aus.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Entnehme die Informationen der Variablen aus dem Program</li>
  <li>Achte auf die Unterschiede zwischen Werte- und Referenztypen. Schau dir gerne die Tutorials nochmal an.</li>
</ul><br/>
`

export const tutorialStage: ThStage = {
  id: "s1",
  label: "Tutorial",
  color: "th-tint",
  logo: "castle-value",
  stageLevels: [
    { levelId: "ltutorial", label: "Tutorial", order: 0, category: categories[2] },
  ]
}

export const tutorialLevel: ThLevel = {
  id: "ltutorial",
  stage: stages[2],
  category: categories[2],
  label: "Tutorial",
  nodes: [
    { baseNode: categories[2].baseNodes[0], data: { codeIDE: { initialCode: expectedGraphProgram } } },
    { baseNode: categories[2].baseNodes[1], data: { codeIDE: { initialGraph: initialGraph } } },
    { baseNode: { ...categories[2].baseNodes[2], data: { ...categories[2].baseNodes[2].data, title: "Tutorial Challenge" } }, data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[2].baseTippNodes[0], data: { codeIDE: { initialCode: expectedGraphProgram } } },
    { baseNode: categories[2].baseTippNodes[1], data: { codeIDE: {} } },
    { baseNode: categories[2].baseTippNodes[2], data: { codeIDE: { initialGraph: expectedGraph } } },
  ],
  expected: { graph: expectedGraph }
}