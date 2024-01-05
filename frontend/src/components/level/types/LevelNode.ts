import CodeGraph from "../../code_ide/types/CodeGraph";
import CodeIDEMode from "../../code_ide/types/CodeIDEMode";
import { Node } from 'reactflow'

export class LevelNodeSize {
  static small = { width: 400, height: 600 };
  static medium = { width: 600, height: 600 };
  static large = { width: 900, height: 600 };

  static fromString(sizeType: string): LevelNodeSizeType {
    switch (sizeType) {
      case "small":
        return LevelNodeSize.small;
      case "medium":
        return LevelNodeSize.medium;
      case "large":
        return LevelNodeSize.large;
      default:
        throw new Error(`Unknown size type: ${sizeType}`);
    }
  }
}

export type LevelNodeSizeType = typeof LevelNodeSize.small | typeof LevelNodeSize.medium | typeof LevelNodeSize.large;

export interface CodeIDENodeData {
  initialSize: LevelNodeSizeType,
  isMain: boolean,
  props: {
    scopeId: string,
    mode: CodeIDEMode,
    initialCode: string,
    initialGraph: CodeGraph
  }
}

export interface TaskNodeData {
  initialSize: LevelNodeSizeType,
  isMain: boolean,
  description: string
}

type LevelNode = Node & {
  data: CodeIDENodeData | TaskNodeData;
};

export default LevelNode;