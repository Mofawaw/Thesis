import { ThColorKeys } from "../../../../tailwind.config";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import CodeIDEConfig from "../../code_ide/codeIDEConfig";

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
    isDefault: boolean,
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