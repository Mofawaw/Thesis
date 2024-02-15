import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

// ================================== CodeIDEs ==================================
const initialCode =
  `a = 1
b = 2
c = 3

# TODO: -\u200B Schreibe deinen Code hier



# ----------\u200B

print(a)
print(b)
print(c)
`;

const expectedOutput =
  `5
5
5
`

// ================================== Task ==================================
const taskDescription =
  `Gegeben sind die Variablen a, b und c. 
<br/>
<br/>
<b>Vervollständige das Programm, indem du a auf 5 setzst und anschliessend c auf die Differenz von a und b.</b>
`

// ================================== Solution ==================================
const exampleSolution =
  `# TODO
`

// ================================== Tipps ==================================


// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ================================== Level ==================================
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
const levelS1L3: ThLevel = {
  id: "s1-l3",
  stage: stages[0],
  category: categories[0],
  label: "3",
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

export default levelS1L3;