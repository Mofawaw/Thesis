import CodeIDEMode from "../../code_ide/types/CodeIDEMode";
import { LevelNodeSizeType } from "./LevelNode";

export default interface ThCategory {
  id: string;
  label: string;
  nodes: { id: string, type: string, size: LevelNodeSizeType, codeIDE?: { isMain: boolean, mode: CodeIDEMode, hasInitialCode: boolean, hasInitialGraph: boolean, hasExpectedOutput: boolean, hasExpectedGraph: boolean } }[];
}
