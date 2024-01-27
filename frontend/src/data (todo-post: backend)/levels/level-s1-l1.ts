import stages from "../stages.ts";
import categories from "../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

const initialCode =
  `# TODO: - Bearbeite hier
h = 10
b = 3

summe = 0

print(summe)
`;

const expectedOutput =
  `18
`

const taskDescription =
  `Ein Bauernhof hat 10 Hamster, 3 Bieber und 5 Katzen. Die Anzahl Tiere werden mit den Variablen h, b und k definiert.
<br/>
<br/>
<b>Vervollständige das Programm und gebe die Summe aller Tiere im Bauernhof aus.</b>
`

const exampleSolution =
  `# TODO: - Bearbeite hier
h = 10
b = 3
k = 5

summe = h + b + k

print(summe)
`

const levelS1C1: ThLevel = {
  id: "s1-l1",
  stage: stages[0],
  category: categories[0],
  label: "Lvl 1",
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

export default levelS1C1;