import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";

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

const levelS1C1: ThLevel = {
  id: "l-s1c1",
  stage: stages[0],
  category: categories[0],
  label: "Test 1-1",
  nodes: [
    { node: categories[0].nodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { node: categories[0].nodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [],
  expected: { output: expectedOutput }
}

export default levelS1C1;

const exampleSolution =
  `# TODO: - Bearbeite hier
h = 10
b = 3
k = 5

summe = h + b + k

print(summe)
`
