export interface CodeGraphNode {
  id: string;
  type: string;
  label: string;
  position?: { x: number, y: number };
}

export interface CodeGraphEdge {
  id: string;
  type: string;
  source: string;
  target: string;
}

export default interface CodeGraph {
  nodes: CodeGraphNode[],
  edges: CodeGraphEdge[],
  inputMaxChars?: number;
}