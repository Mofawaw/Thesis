import { create } from 'zustand';
import CodeGraph from './types/CodeGraph.ts'

export type CodeIDEStore = {
  code: string;
  output: string;
  graph: CodeGraph;

  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: CodeGraph) => (void);
};

const createCodeIDEStore = (scopeId: number) => create<CodeIDEStore>((set) => {
  const initialCode = [ // Todo
    "a = 1",
    "b = 2",
    "a = b",
    "print(a)",
    "print(b)"
  ].join('\n');

  return {
    code: initialCode, // Todo
    output: '',
    graph: { nodes: [], edges: [] },

    setCode: (newCode) => set(() => ({ code: newCode })),
    setOutput: (newOutput) => set(() => ({ output: newOutput })),
    setGraph: (newGraphJSON) => set(() => ({ graph: newGraphJSON }))
  };
});

const storeMap = new Map();

export const useCodeIDEStore = (scopeId: number) => {
  console.log(scopeId, storeMap)
  if (!storeMap.has(scopeId)) {
    storeMap.set(scopeId, createCodeIDEStore(scopeId));
  }
  return storeMap.get(scopeId);
};

export default useCodeIDEStore;