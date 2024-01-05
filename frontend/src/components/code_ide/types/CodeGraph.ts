export interface Node {
  id: string;
  type: string;
  label: string;
  position?: { x: number, y: number };
}

export interface Edge {
  id: string;
  type: string;
  source: string;
  target: string;
}

export default interface CodeGraph {
  nodes: Node[],
  edges: Edge[]
}