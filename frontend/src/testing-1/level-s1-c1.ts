import stages from "./stages.ts";
import categories from "./categories.ts";
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

const levelS1C1: ThLevel = {
  id: "l-s1c1",
  stage: stages[0],
  category: categories[0],
  label: "Test 1-1",
  nodes: [
    { baseNode: categories[0].baseNodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { baseNode: categories[0].baseNodes[1], data: { text: { description: taskDescription } } }
  ],
  tippNodes: [
    { baseNode: { id: "ti1", type: "text", data: { title: "Tipp 1", size: "small" } }, data: { text: { description: "Dieser Tipp enthält z.B. ein paar hilfreiche Hinweise zur Aufgabe und ergänzt die Aufgabenstellung zusätzlich." } } },
    { baseNode: { id: "ti2", type: "text", data: { title: "Tipp 2", size: "small" } }, data: { text: { description: "Platzhalter für eine weitere IDE [Programm], Duplikat des ursprünglichen Programms, aber mit z.B. Kommentaren, Guide, ..." } } },
    { baseNode: { id: "ti3", type: "text", data: { title: "Lösung", size: "large" } }, data: { text: { description: "Platzhalter für eine weitere IDE [Programm | Speicher] mit dem Lösungsprogramm und dem Lösungsgraphen." } } }
  ],
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
