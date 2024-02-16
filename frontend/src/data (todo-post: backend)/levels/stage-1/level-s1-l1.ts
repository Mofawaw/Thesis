import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `x = 1
y = 2
summe = 0

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print(summe)
`;

const expectedOutput =
  `33
`

// ================================== Task ==================================
const taskDescription =
  `<p><b>Ziel:</b></p>
<p>Bearbeite das Programm, sodass es die Summe von den Variablen x, y und z ausgibt.</p><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Definiere eine Variable <i>z</i> mit dem Wert 30</li>
  <li>Aktualisiere die Variable <i>summe</i></li>
</ul><br/>

<p><b>Erwartete Ausgabe:</b></p>
<p><i>Siehe: Tipp 1</i></p>
`

// ================================== Solution ==================================
const exampleSolution =
  `x = 1
y = 2
summe = 0

# TODO: -\u200B Schreibe deinen Code hier

z = 30
summe = x + y + z

# ----------\u200B

print(summe)
`

// ================================== Tipps ==================================
const tippDescription =
  `<p><b>Erwartete Ausgabe:</b></p>
33
`

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS1L1: ThLevel = {
  id: "s1-l1",
  stage: stages[0],
  category: categories[0],
  label: "1",
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

export default levelS1L1;