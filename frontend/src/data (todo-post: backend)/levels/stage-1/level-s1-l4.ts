import stages from "../../stages.ts";
import categories from "../../categories.ts";
import { ThLevel } from "@/types/th-types.ts";

const initialCode =
  `# TODO
print(5)
`;

const expectedOutput =
  `5
`

const taskDescription =
  `TODO
`

const exampleSolution =
  `# TODO
`

const levelS1L4: ThLevel = {
  id: "s1-l4",
  stage: stages[0],
  category: categories[0],
  label: "4",
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

export default levelS1L4;