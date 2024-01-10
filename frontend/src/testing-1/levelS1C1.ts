import stages from "./stages";
import categories from "./categories";
import { ThLevel } from "../components/level/types/thTypes";

const initialCode = `
kinder = 10
erwachsene = 3
# Todo
`;

const expectedOutput = `
13
`

const levelS1C1: ThLevel = {
  id: "l-s1c1",
  stage: stages[0],
  category: categories[0],
  label: "Test 1-1",
  nodes: [
    { node: categories[0].nodes[0], data: { codeIDE: { initialCode: initialCode } } },
    { node: categories[0].nodes[1], data: { text: { description: "Gebe aus die Anzahl aller Personen (Kinder und Erwachsene)." } } }
  ],
  tippNodes: [],
  expected: { output: expectedOutput }
}

export default levelS1C1;