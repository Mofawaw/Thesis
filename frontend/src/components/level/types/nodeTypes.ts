import { ThColorKeys } from "../../../../tailwind.config";
import CodeIDEConfig from "../../code_ide/codeIDEConfig";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import CodeIDENode from "../nodes/CodeIDENode";
import TextNode from "../nodes/TextNode";
import TutorialNode from "../nodes/TutorialNode";

export const nodeTypes = { codeIDE: CodeIDENode, text: TextNode, tutorial: TutorialNode };

export class ThNodeSize {
  static small = { width: 450, height: 700 };
  static medium = { width: 700, height: 700 };
  static large = { width: 1000, height: 700 };

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
  isDefault: boolean;
}

export interface TextNodeData extends ComponentNodeData {
  text: {
    description: string;
  }
}

export interface TutorialNodeData extends ComponentNodeData {
  tutorial: {
    color: ThColorKeys;
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

export type LevelNodeData = CodeIDENodeData | TextNodeData | TutorialNodeData;