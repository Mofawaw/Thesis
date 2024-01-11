import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";

const initialCode =
  `class Tier:
  def __init__(self, name, alter):
      self.name = name
      self.alter = alter

  def __repr__(self):
      return f"{self.name}, {self.alter} Jahre alt"

# TODO: - Bearbeite hier
hamster = Tier("Max", 2)
biber = Tier("Bert", 3)
katze = Tier("Luisa", 5)

boss = hamster
print("Der aktuelle Boss ist:", boss)
`;

const expectedOutput =
  `
`

const taskDescription =
  `Schauen wir genauer ins Bauernhof: Die Tiere haben einen Bosss, das ist aktuell der Hamster namens Max. Jedoch hat sich die Katze Kitty als klüger und weiser erwiesen und soll die neue Bossin werden.
<br/>
<br/>
Dafür gibt es die Klasse Tier, die ein Tier mit Namen und Alter beschreibt. Die Variable 'boss' ist eine Referenz auf das Objekt 'hamster'.
<br/>
<br/>
<b>Deine Aufgabe ist es, den Boss auf dem Bauernhof zu ändern. Weise die Variable 'boss' der Katze zu und beobachte, was passiert. Beachte, wie die Referenz auf das Objekt 'katze' übertragen wird.</b>

`

const levelS2C1: ThLevel = {
  id: "l-s2c1",
  stage: stages[1],
  category: categories[0],
  label: "Test 2-1",
  nodes: [
    { node: categories[0].nodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { node: categories[0].nodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [],
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

# TODO: - Bearbeite hier
hamster = Tier("Henry", 2)
biber = Tier("Benny", 3)
katze = Tier("Kitty", 5)

leittier = hamster
print("Das aktuelle Leittier ist:", leittier)

# Leittier ändern
leittier = katze
print("Das neue Leittier ist:", leittier)
`
