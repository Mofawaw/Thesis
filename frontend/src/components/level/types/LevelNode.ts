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

export interface ComponentNodeData {
  title?: string;
  initialSize: LevelNodeSizeType,
}

export interface CodeIDENodeData extends ComponentNodeData {
  props: {
    scopeId: string,
    isMain: boolean,
    mode: CodeIDEMode,
    initialCode: string,
    initialGraph: CodeGraph
  }
}

export interface TextNodeData extends ComponentNodeData {
  description: string
}

export default interface LevelNode extends Node {
  data: CodeIDENodeData | TextNodeData;
}