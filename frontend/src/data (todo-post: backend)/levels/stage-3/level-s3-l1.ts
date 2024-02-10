import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

const initialCode =
  `class Punkt:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def __repr__(self):
    return "Punkt: "+ f"{self.x}, {self.y}"

punkt1 = Punkt(1, 2)
punkt2 = Punkt(3, 3)

quadrat = 0
zahl = 5

# Todo: Bearbeite nur hier



# --------------------

print(quadrat)
print(punkt1)
print(punkt2)
`;

const expectedOutput =
  `25
Punkt: 1, 1
Punkt: 1, 1
`

const taskDescription =
  `Gegeben die Klasse 'Punkt' mit den Attributen 'x' und 'y'.
<br/>
<br/>
<b>Modifiziere das Programm, sodass es die folgende Ausgabe ausgibt:</b>
<br/>
<br/>
25
<br/>
Punkt: 1, 1
<br/>
Punkt: 1, 1
`

const levelS3L1: ThLevel = {
  id: "s3-l1",
  stage: stages[2],
  category: categories[0],
  label: "Lvl 1",
  nodes: [
    { baseNode: categories[0].baseNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseNodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: categories[0].baseTippNodes[0], data: { text: { description: "Tipp Text" } } },
    { baseNode: categories[0].baseTippNodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseTippNodes[2], data: { codeIDE: {} } },
  ],
  expected: { output: expectedOutput }
}

export default levelS3L1;

const exampleSolution =
  `class Punkt:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def __repr__(self):
    return "Punkt: "+ f"{self.x}, {self.y}"

punkt1 = Punkt(1, 2)
punkt2 = Punkt(3, 3)

quadrat = 0
zahl = 5

# Todo: Bearbeite nur hier
quadrat = zahl ** 2

punkt2 = punkt1
punkt2.y = punkt1.x
# --------------------

print(quadrat)
print(punkt1)
print(punkt2)
`
