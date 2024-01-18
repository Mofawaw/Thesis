import { create } from 'zustand';
import CodeGraph from "./code-memory/code-memory-types.ts";

export type CodeIDEStore = {
  code: string;
  output: string;
  graph: CodeGraph;

  initialGraph: CodeGraph;
  graphOutput: { nodeIds: Set<string>, edgeIds: Set<string> }

  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraph: CodeGraph) => (void);

  setInitialGraph: (newGraph: CodeGraph) => (void);
  setGraphOutput: (newGraphOutput: { nodeIds: Set<string>, edgeIds: Set<string> }) => (void);
};

const createCodeIDEStore = (scopeId: string) => create<CodeIDEStore>((set) => {
  return {
    code: '',
    output: '',
    graph: { nodes: [], edges: [] },

    initialGraph: { nodes: [], edges: [] },
    graphOutput: { nodeIds: new Set(), edgeIds: new Set() },

    setCode: (newCode) => set({ code: newCode }),
    setOutput: (newOutput) => set({ output: newOutput }),
    setGraph: (newGraph) => set({ graph: newGraph }),

    setInitialGraph: (newGraph) => set({ initialGraph: newGraph }),
    setGraphOutput: (newGraphOutput) => set({ graphOutput: newGraphOutput }),
  };
});

const storeMap = new Map();

export function resetStoreMap() {
  storeMap.clear();
}

export const useCodeIDEStore = (scopeId: string) => {
  if (!storeMap.has(scopeId)) {
    storeMap.set(scopeId, createCodeIDEStore(scopeId));
  }
  return storeMap.get(scopeId);
};

export default useCodeIDEStore;