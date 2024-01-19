import stages from "./stages.ts";
import categories from "./categories.ts";
import { ThLevel } from "@/types/th-types.ts";
import { tippNodesC1 } from "./tipps.ts";

const initialCode =
  `class Tier:
  def __init__(self, name, alter):
      self.name = name
      self.alter = alter

  def __repr__(self):
      return f"{self.name}, {self.alter} Jahre alt"

hamster = Tier("Max", 2)
biber = Tier("Bert", 3)
katze = Tier("Luisa", 5)

boss = hamster
print("Der aktuelle Boss ist:", boss)

# TODO: - Bearbeite hier
`;

const expectedOutput =
  `
Der aktuelle Boss ist: Max, 2 Jahre alt
Die neue Bossin ist: Luisa, 5 Jahre alt
`

const taskDescription =
  `Im Bauernhof sind die Tiere organisiert: Sie haben einen Boss - aktuell, der Hamster Max. Jedoch hat sich die Katze Luisa als weiser erwiesen und soll die neue Bossin werden.
<br/>
<br/>
Dafür gibt es die Klasse 'Tier' mit den Parametern 'name' und 'alter'. Die Variable 'boss' ist eine Referenz auf das Objekt 'hamster'.
<br/>
<br/>
<b>Weise die Variable 'boss' der Katze zu und beobachte, was passiert. Gebe danach die folgende Ausgabe aus:</b>
<br/>
<br/>
Der aktuelle Boss ist: Max, 2 Jahre alt
<br/>
Die neue Bossin ist: Luisa, 5 Jahre alt
`

const levelS2C1: ThLevel = {
  id: "l-s2c1",
  stage: stages[1],
  category: categories[0],
  label: "Test 2-1",
  nodes: [
    { baseNode: categories[0].baseNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseNodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: tippNodesC1,
  expected: { output: expectedOutput }
}

export default levelS2C1;

const exampleSolution =
  `class Tier:
  def __init__(self, name, alter):
      self.name = name
      self.alter = alter

  def __repr__(self):
      return f"{self.name}, {self.alter} Jahre alt"

hamster = Tier("Max", 2)
biber = Tier("Bert", 3)
katze = Tier("Luisa", 5)

boss = hamster
print("Der aktuelle Boss ist:", boss)

# TODO: - Bearbeite hier

boss = katze
print("Die neue Bossin ist:", boss)
`
