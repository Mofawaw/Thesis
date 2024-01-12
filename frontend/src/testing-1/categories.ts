import { ThCategory } from '../components/level/types/thTypes';

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "large", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-1", config: { type: "program+graph", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "output"
  },
  {
    id: "c2",
    label: "Code The Memory",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", isDefault: true, codeIDE: { isMain: false, scopeId: "c-ide-1", config: { type: "graph", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-2", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "graph"
  },
  {
    id: "c3",
    label: "Memory From Code",
    nodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", isDefault: true, codeIDE: { isMain: false, scopeId: "c-ide-1", config: { type: "program", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", isDefault: true, codeIDE: { isMain: true, scopeId: "c-ide-2", config: { type: "graph", mode: "write", runnable: false } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small", isDefault: true } }
    ],
    expected: "graph"
  }
]

export default categories;