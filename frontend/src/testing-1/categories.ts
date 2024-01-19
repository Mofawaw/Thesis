import { ThCategory } from '@/types/th-types.ts';

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "large", codeIDE: { main: true, scopeId: "c-ide-1", config: { type: "program+graph", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    expected: "output"
  },
  {
    id: "c2",
    label: "Code The Memory",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", codeIDE: { main: false, scopeId: "c-ide-1", config: { type: "graph", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", codeIDE: { main: true, scopeId: "c-ide-2", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    expected: "graph"
  },
  {
    id: "c3",
    label: "Memory From Code",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", codeIDE: { main: false, scopeId: "c-ide-1", config: { type: "program", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", codeIDE: { main: true, scopeId: "c-ide-2", config: { type: "graph", mode: "write", runnable: false } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    expected: "graph"
  }
]

export default categories;