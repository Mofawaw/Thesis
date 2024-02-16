import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `class Punkt:
  def __init__(self, x, y):
    self.x = x
    self.y = y

p1 = Punkt(1, 2)
p2 = Punkt(3, 3)

quadrat = 0
zahl = 5

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print("Quadrat:", quadrat)
print(f"Punkt: ({p1.x}, {p1.y})")
print(f"Punkt: ({p2.x}, {p2.y})")
`;

const expectedOutput =
  `Quadrat: 25
Punkt: (3, 25)
Punkt: (3, 25)
`

// ================================== Task ==================================
const taskDescription =
  `<p><b>Ziel:</b></p>
<p>Bearbeite das Programm, sodass beide Punkte an Position <i>(3, zahl^2)</i> landen.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Berechne das Quadrat der Variable <i>zahl</i></li>
  <li>Sorge dafür, dass beide <i>p1</i> und <i>p2</i> auf den gleichen Punkt zeigen</li>
  <li>Aktualisiere die Koordinaten</li>
</ul><br/>

<p><b>Erwartete Ausgabe:</b></p>
<p><i>Siehe: Tipp 1</i></p>
`

// ================================== Solution ==================================
const exampleSolution =
  `class Punkt:
  def __init__(self, x, y):
    self.x = x
    self.y = y

p1 = Punkt(1, 2)
p2 = Punkt(3, 3)

quadrat = 0
zahl = 5

# TODO: -\u200B Schreibe deinen Code hier

quadrat = zahl ** 2

p1 = p2
p2.y = quadrat

# ----------\u200B

print("Quadrat:", quadrat)
print(f"Punkt: ({p1.x}, {p1.y})")
print(f"Punkt: ({p2.x}, {p2.y})")
`

// ================================== Tipps ==================================
const tippDescription =
  `<p><b>Erwartete Ausgabe:</b></p>
Quadrat: 25<br/>
Punkt: (3, 25)<br/>
Punkt: (3, 25)
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS3L1: ThLevel = {
  id: "s3-l1",
  stage: stages[2],
  category: categories[0],
  label: "9",
  nodes: [
    { baseNode: categories[0].baseNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseNodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[0].baseTippNodes[0], data: { text: { description: tippDescription } } },
    { baseNode: categories[0].baseTippNodes[1], data: { codeIDE: { initialCode: exampleSolution } } },
  ],
  expected: { output: expectedOutput }
}

export default levelS3L1;