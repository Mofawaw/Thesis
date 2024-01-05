import CodeGraph from "../../code_ide/types/CodeGraph";
import ThCategory from "./ThCategory";
import ThStage from "./ThStage";

export default interface ThLevel {
  id: string;
  stage: ThStage;
  category: ThCategory;
  label: string;
  task: string;
  initialCode: string;
  initialGraph: CodeGraph;
  expectedOutput: string;
  expectedGraph: CodeGraph;
  // tippsNodes: { id: string, type: string, size: string }[]; TODO?
}