import { create } from 'zustand';

interface Node {
  id: string;
  type: string;
  label: string;
  position: { x: number, y: number };
}

interface Edge {
  id: string;
  type: string;
  source: string;
  target: string;
}

export interface Graph {
  nodes: Node[],
  edges: Edge[]
}

type CodeIDEStore = {
  code: string;
  output: string;
  graph: Graph;
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: any) => (void);
};

const useCodeIDEStore = create<CodeIDEStore>((set) => ({
  code: '',
  output: '',
  graph: { nodes: [], edges: [] },
  setCode: (newCode: string) => set(() => ({ code: newCode })),
  setOutput: (newOutput: string) => set(() => ({ output: newOutput })),
  setGraph: (newGraphJSON: any) => set(() => ({ graph: newGraphJSON }))
}));

export default useCodeIDEStore;

export const codeIDEHelper = {
  editor: {
    getHeight: (availableHeight: number) => (availableHeight - 240)
  },
  graph: {
    node: {
      getWidth: (nodeType: string) => (nodeType.includes("stack") ? 80 : 150),
      height: 35,
      gap: { x: 50, y: 5 }
    },
    referenceOffset: 20,
  }
}