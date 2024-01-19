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
  baseNodes: ThBaseNode[];
  baseTippNodes: ThBaseNode[];
  expected: "output" | "graph";
}

export interface ThLevel {
  id: string;
  stage: ThStage;
  category: ThCategory;
  label: string;
  nodes: ThNode[];
  tippNodes: ThNode[];
  expected: { output?: string, graph?: CodeGraph };
}

export interface ThBaseNode {
  id: string;
  type: "codeIDE" | "text" | "tutorial";
  data: {
    title?: string,
    size: "small" | "medium" | "large",
    codeIDE?: { main: boolean, scopeId: string, config: CodeIDEConfig }
  }
}

export interface ThNode {
  baseNode: ThBaseNode;
  data: {
    codeIDE?: { initialCode?: string; initialGraph?: CodeGraph }
    text?: { description: string }
    tutorial?: { color: ThColorKey, description: string }
  }
}