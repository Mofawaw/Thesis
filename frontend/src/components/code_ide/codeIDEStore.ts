import { create } from 'zustand';
import CodeGraph from './components/CodeGraph.ts'

export type CodeIDEStore = {
  code: string;
  output: string;
  graph: CodeGraph;
  lastLineGraphLoading: number;
  lastLineGraphLoaded: number;

  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: CodeGraph) => (void);
  setLastLineGraphLoading: (lineNumber: number) => void;
  setLastLineGraphLoaded: (lineNumber: number) => void;
};

const useCodeIDEStore = create<CodeIDEStore>((set) => {
  const initialCode = [ // Todo
    "a = 1",
    "b = 2",
    "a = b",
    "print(a)",
    "print(b)"
  ].join('\n');

  const initialLastLine = initialCode.trim().split('\n').length; // Todo

  return {
    code: initialCode, // Todo
    output: '',
    graph: { nodes: [], edges: [] },
    lastLineGraphLoading: initialLastLine, // Todo
    lastLineGraphLoaded: 0,

    setCode: (newCode) => {
      const lastLineWithCode = newCode.trim().split('\n').length;
      console.log("setLastLineGraphLoading: ", lastLineWithCode)
      set({
        code: newCode,
        lastLineGraphLoading: lastLineWithCode,
      });
    },
    setOutput: (newOutput) => set(() => ({ output: newOutput })),
    setGraph: (newGraphJSON) => set(() => ({ graph: newGraphJSON })),
    setLastLineGraphLoading: (lineNumber) => {
      console.log("setLastLineGraphLoading: ", lineNumber)
      set({ lastLineGraphLoading: lineNumber }
      )
    },
    setLastLineGraphLoaded: (lineNumber) => {
      console.log("setLastLineGraphLoaded: ", lineNumber)
      set({ lastLineGraphLoaded: lineNumber })
    }
  };
});

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