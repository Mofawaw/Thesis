import CodeGraph from "@/app/code-ide/code-memory/code-memory-types.ts";
import CodeIDEConfig from "@/app/code-ide/code-ide-config.ts";
import { ThColorKey } from "@/utilities/th-color.ts";

export interface ThStage { // TODO-Post: Backend Version
  id: "s1" | "s2" | "s3";
  label: string;
  color: ThColorKey;
  logo: "castle-value" | "castle-reference" | "castle-together";
  levels: ThLevel[];
}

export interface ThCategory { // TODO-Post: Backend Version
  id: "c1" | "c2" | "c3";
  label: string;
  baseNodes: ThBaseNode[];
  baseTippNodes: ThBaseNode[]; // TODO-Post: Remove -> Move to Backend
  expected: "output" | "graph";
}

export interface ThLevel { // TODO-Post: Backend Version
  id: string;
  stage: ThStage;
  category: ThCategory;
  label: string;
  nodes: ThNode[];
  tippNodes: ThNode[]; // TODO-Post: Remove -> Move to Backend
  expected: { output?: string, graph?: CodeGraph }; // TODO-Post: Remove -> Move to Backend
}

export interface ThBaseNode { // TODO-Post: Backend Version
  id: string;
  type: "codeIDE" | "text" | "tutorial";
  data: {
    title?: string,
    size: "small" | "medium" | "large",
    codeIDE?: { main: boolean, scopeId: string, config: CodeIDEConfig }
  }
}

export interface ThNode { // TODO-Post: Backend Version
  baseNode: ThBaseNode;
  data: {
    codeIDE?: { initialCode?: string; initialGraph?: CodeGraph }
    text?: { description: string }
    tutorial?: { color: ThColorKey, description: string }
  }
}