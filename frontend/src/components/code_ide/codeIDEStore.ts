import { create } from 'zustand';
import CodeGraph from './types/CodeGraph.ts'
import CodeIDEConfig from './types/CodeIDEConfig.ts';

export type CodeIDEStore = {
  config: CodeIDEConfig;
  code: string;
  output: string;
  graph: CodeGraph;
  inputGraph: CodeGraph;

  setConfig: (newConfig: CodeIDEConfig) => (void);
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: CodeGraph) => (void);
  setInputGraph: (newInputGraph: CodeGraph) => (void);
};

const createCodeIDEStore = (scopeId: string) => create<CodeIDEStore>((set) => {
  return {
    config: { type: "program", mode: "write", runnable: true },
    code: '',
    output: '',
    graph: { nodes: [], edges: [] },
    inputGraph: { nodes: [], edges: [] },

    setConfig: (newConfig) => set({ config: newConfig }),
    setCode: (newCode) => set({ code: newCode }),
    setOutput: (newOutput) => set({ output: newOutput }),
    setGraph: (newGraphJSON) => set({ graph: newGraphJSON }),
    setInputGraph: (newInputGraph: CodeGraph) => set({ inputGraph: newInputGraph })
  };
});

const storeMap = new Map();

export const useCodeIDEStore = (scopeId: string) => {
  if (!storeMap.has(scopeId)) {
    storeMap.set(scopeId, createCodeIDEStore(scopeId));
  }
  return storeMap.get(scopeId);
};

export default useCodeIDEStore;