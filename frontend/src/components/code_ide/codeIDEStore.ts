import { create } from 'zustand';
import CodeGraph from './components/CodeGraph.ts'

const initialCode = [
  "a = 1",
  "b = 2",
  "a = b",
  "print(a)",
  "print(b)"
].join('\n');

type CodeIDEStore = {
  code: string;
  output: string;
  graph: CodeGraph;
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: CodeGraph) => (void);
};

const useCodeIDEStore = create<CodeIDEStore>((set) => ({
  code: initialCode,
  output: '',
  graph: { nodes: [], edges: [] },
  setCode: (newCode: string) => set(() => ({ code: newCode })),
  setOutput: (newOutput: string) => set(() => ({ output: newOutput })),
  setGraph: (newGraphJSON: CodeGraph) => set(() => ({ graph: newGraphJSON }))
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