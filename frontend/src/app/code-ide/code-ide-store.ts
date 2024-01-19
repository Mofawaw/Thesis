import { create } from 'zustand';
import CodeGraph from "./code-memory/code-memory-types.ts";

export type CodeIDEStore = {
  code: string;
  codeOutput: string;
  initialCode: string;

  graph: CodeGraph;
  graphOutput: { nodeIds: Set<string>, edgeIds: Set<string> }
  initialGraph: CodeGraph;

  setCode: (newCode: string) => (void);
  setCodeOutput: (newCodeOutput: string) => (void);
  setInitialCode: (newInitialCode: string) => (void);

  setGraph: (newGraph: CodeGraph) => (void);
  setGraphOutput: (newGraphOutput: { nodeIds: Set<string>, edgeIds: Set<string> }) => (void);
  setInitialGraph: (newInitialGraph: CodeGraph) => (void);
};

const createCodeIDEStore = (scopeId: string) => create<CodeIDEStore>((set) => {
  return {
    code: '',
    codeOutput: '',
    initialCode: '',

    graph: { nodes: [], edges: [] },
    graphOutput: { nodeIds: new Set(), edgeIds: new Set() },
    initialGraph: { nodes: [], edges: [] },

    setCode: (newCode) => set({ code: newCode }),
    setCodeOutput: (newCodeOutput) => set({ codeOutput: newCodeOutput }),
    setInitialCode: (newInitialCode) => set({ initialCode: newInitialCode }),

    setGraph: (newGraph) => set({ graph: newGraph }),
    setGraphOutput: (newGraphOutput) => set({ graphOutput: newGraphOutput }),
    setInitialGraph: (newGraph) => set({ initialGraph: newGraph }),
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