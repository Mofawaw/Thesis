import CodeIDEConfig from "@/app/code-ide/code-ide-config";
import CodeGraph from "@/app/code-ide/code-memory/code-memory-types";

import CodeIDENode from "../code-ide-node";
import TextNode from "../text-node";
import TutorialNode from "../tutorial-node";

export const nodeTypes = { codeIDE: CodeIDENode, text: TextNode, tutorial: TutorialNode };

export class ThNodeSize {
  static small = { width: 500, height: 800 };
  static medium = { width: 700, height: 800 };
  static large = { width: 1100, height: 800 };

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

export interface TutorialNodeData extends ComponentNodeData {
  tutorial: {
    id: string;
  }
}

export interface CodeIDENodeData extends ComponentNodeData {
  codeIDE: {
    main: boolean;
    scopeId: string;
    config: CodeIDEConfig;
    initialCode: string;
    initialGraph: CodeGraph;
  }
}

export type LevelNodeData = CodeIDENodeData | TextNodeData | TutorialNodeData;