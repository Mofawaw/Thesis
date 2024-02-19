import { ThLevel } from "@/types/th-types.ts";

import stages from "../../stages.ts";
import categories from "../../categories.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `class Viereck:
  def __init__(self, name):
    self.name = name

quadrat = Viereck("Quadrat")
trapez = Viereck("Trapez")

viereck = quadrat

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print("Das Viereck ist ein:", viereck.name)
`;

const expectedOutput =
  `Das Viereck ist ein: Trapez
`

// ================================== Task ==================================
const taskDescription =
  `<p><b>Ziel:</b></p>
<p>Bearbeite das Programm, sodass das Viereck ein Trapez ist.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Aktualisiere die Variable <i>viereck</i></li>
</ul><br/>

<p><b>Erwartete Ausgabe:</b></p>
<p><i>Siehe: Tipp 1</i></p>
`

// ================================== Solution ==================================
const exampleSolution =
  `class Viereck:
  def __init__(self, name):
    self.name = name

quadrat = Viereck("Quadrat")
trapez = Viereck("Trapez")

viereck = quadrat

# TODO: -\u200B Schreibe deinen Code hier

viereck = trapez

# ----------\u200B

print("Das Viereck ist ein:", viereck.name)
`

// ================================== Tipps ==================================
const tippDescription =
  `<p><b>Erwartete Ausgabe:</b></p>
Das Viereck ist ein: Trapez
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS2L1: ThLevel = {
  id: "s2-l1",
  stage: stages[1],
  category: categories[0],
  label: "5",
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

export default levelS2L1;