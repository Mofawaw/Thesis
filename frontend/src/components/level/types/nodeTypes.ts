import CodeIDEConfig from "../../code_ide/codeIDEConfig";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import CodeIDENode from "../nodes/CodeIDENode";
import TextNode from "../nodes/TextNode";

export const nodeTypes = { codeIDE: CodeIDENode, text: TextNode };

export class ThNodeSize {
  static small = { width: 400, height: 600 };
  static medium = { width: 600, height: 600 };
  static large = { width: 900, height: 600 };

  static fromString(sizeType: string) {
    switch (sizeType) {
      case "small":
        return ThNodeSize.small;
      case "medium":
        return ThNodeSize.medium;
      case "large":
        return ThNodeSize.large;
      default:
        throw new Error(`Unknown size type: ${sizeType}`);
    }
  }
}

export interface ComponentNodeData {
  title: string;
  width: number;
  height: number;
}

export interface TextNodeData extends ComponentNodeData {
  text: {
    description: string;
  }
}

export interface CodeIDENodeData extends ComponentNodeData {
  codeIDE: {
    isMain: boolean;
    scopeId: string;
    config: CodeIDEConfig;
    initialCode: string;
    initialGraph: CodeGraph;
  }
}

export type LevelNodeData = TextNodeData | CodeIDENodeData;