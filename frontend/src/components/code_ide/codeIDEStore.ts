import { create } from 'zustand';
import CodeGraph from './types/CodeGraph.ts'
import CodeIDEMode from './types/CodeIDEMode.ts';

export type CodeIDEStore = {
  mode: CodeIDEMode;
  code: string;
  output: string;
  graph: CodeGraph;

  setMode: (newMode: CodeIDEMode) => (void);
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: CodeGraph) => (void);
};

const createCodeIDEStore = (scopeId: number) => create<CodeIDEStore>((set) => {
  return {
    mode: CodeIDEMode.default,
    code: '',
    output: '',
    graph: { nodes: [], edges: [] },

    setCode: (newCode) => set({ code: newCode }),
    setOutput: (newOutput) => set({ output: newOutput }),
    setGraph: (newGraphJSON) => set({ graph: newGraphJSON }),
    setMode: (newMode) => set({ mode: newMode })
  };
});

const storeMap = new Map();

export const useCodeIDEStore = (scopeId: number) => {
  if (!storeMap.has(scopeId)) {
    storeMap.set(scopeId, createCodeIDEStore(scopeId));
  }
  return storeMap.get(scopeId);
};

export default useCodeIDEStore;