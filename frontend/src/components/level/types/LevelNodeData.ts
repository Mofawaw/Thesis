import CodeGraph from "../../code_ide/types/CodeGraph";
import CodeIDEMode from "../../code_ide/types/CodeIDEMode";

export class LevelNodeSize {
  static small = { width: 400, height: 600 };
  static medium = { width: 600, height: 600 };
  static large = { width: 900, height: 600 };
}

type LevelNodeSizeType = typeof LevelNodeSize.small | typeof LevelNodeSize.medium | typeof LevelNodeSize.large;

interface BaseNode {
  id: string,
  type: string,
  position: { x: number, y: number }
  data: {
    initialSize: LevelNodeSizeType
  }
}

export interface CodeIDENodeData {
  initialSize: LevelNodeSizeType;
  props: {
    scopeId: string,
    mode: CodeIDEMode,
    initialCode: string,
    initialGraph: CodeGraph
  }
}

export interface TaskNodeData {
  initialSize: LevelNodeSizeType;
  description: string
}

type LevelNode = BaseNode & {
  data: CodeIDENodeData | TaskNodeData;
};

export default LevelNode;