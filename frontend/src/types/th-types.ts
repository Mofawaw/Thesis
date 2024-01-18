import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";
import CodeIDEConfig from "@/app/code-ide/code-ide-config.ts";
import { ThColorKey } from "@/utilities/th-color.ts";

export interface ThStage {
  id: "s1" | "s2" | "s3";
  label: string;
  color: ThColorKey;
  logo: string;
  levels: ThLevel[];
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
    tutorial?: { color: ThColorKey, description: string }
  }
}