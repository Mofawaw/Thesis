import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `e = 1
m = 2
summe = 0

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print(summe)
`;

const expectedOutput =
  `95
`

// ================================== Task ==================================
const taskDescription =
  `<p><b>Ziel:</b></p>
<p>Schreibe ein Programm, das die Summe der Monde von Erde, Mars und Jupiter berechnet.</p><br/>

<p><b>Informationen (Stand heute):</b></p>
<ul class="list-disc pl-4">
  <li>Die Erde hat 1 Mond</li>
  <li>Der Mars hat 2 Monde</li>
  <li>Der Jupiter hat 92 Monde</li>
</ul><br/>

<p><b>Anweisungen:</b></p>
<ul class="list-disc pl-4">
  <li>Definiere eine Variable <i>j</i> für die Anzahl Monde des Jupiters</li>
  <li>Aktualisiere die Variable <i>summe</i> mit der Summe der Monde</li>
</ul><br/>

<p><b>Erwartete Ausgabe:</b></p>
<p><i>Siehe: Tipp 1</i></p>
`

// ================================== Solution ==================================
const exampleSolution =
  `e = 1
m = 2
summe = 0

# TODO: -\u200B Schreibe deinen Code hier

j = 92
summe = e + m + j

# ----------\u200B

print(summe)
`

// ================================== Tipps ==================================


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
    { baseNode: categories[0].baseTippNodes[0], data: { text: { description: "Tipp Text" } } },
    { baseNode: categories[0].baseTippNodes[1], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseTippNodes[2], data: { codeIDE: { initialCode: exampleSolution } } },
  ],
  expected: { output: expectedOutput }
}

export default levelS1L1;