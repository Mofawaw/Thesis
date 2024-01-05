import CodeGraph from "../../code_ide/types/CodeGraph";

export default interface ThLevel {
  id: string;
  stageId: string;
  categoryId: string;
  label: string;
  task: string;
  initialCode: string;
  initialGraph: CodeGraph;
  expectedOutput: string;
  expectedGraph: CodeGraph;
}