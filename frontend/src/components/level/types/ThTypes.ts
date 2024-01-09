import { ThColorKeys } from "../../../../tailwind.config";
import CodeGraph from "../../code_ide/types/CodeGraph";
import CodeIDEConfig from "../../code_ide/types/CodeIDEConfig";

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

export interface ThStage {
  id: string;
  label: string;
  color: ThColorKeys;
  levels: ThLevel[];
  // tutorial: ThLevel;
}

export interface ThCategory {
  id: string;
  label: string;
  nodes: ThNode[];
  expected: "output" | "graph";
}

export interface ThLevel {
  id: string;
  stage: ThStage;
  category: ThCategory;
  label: string;
  nodes: ThLevelNode[];
  tippNodes: ThLevelNode[];
  expected: { output?: string, graph?: CodeGraph };
}

export interface ThNode {
  id: string;
  type: string;
  data: {
    title?: string,
    size: "small" | "medium" | "large",
    codeIDE?: { isMain: boolean, scopeId: string, config: CodeIDEConfig }
  }
}

export interface ThLevelNode {
  node: ThNode;
  data: {
    codeIDE?: { initialCode?: string; initialGraph?: CodeGraph }
    text?: { description: string }
  }
}