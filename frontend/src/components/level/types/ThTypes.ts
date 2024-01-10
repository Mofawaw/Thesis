import { ThColorKeys } from "../../../../tailwind.config";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import CodeIDEConfig from "../../code_ide/codeIDEConfig";

export interface ThStage {
  id: "s1" | "s2" | "s3";
  label: string;
  color: ThColorKeys;
  logo: string;
  levels: ThLevel[];
  // tutorial: ThLevel;
}

export interface ThCategory {
  id: "c1" | "c2" | "c3";
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
  tutorialNodes: ThLevelNode[];
  expected: { output?: string, graph?: CodeGraph };
}

export interface ThNode {
  id: string;
  type: "codeIDE" | "text" | "tutorial";
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
    tutorial?: { color: ThColorKeys, description: string }
  }
}