import { ThCategory } from '@/types/th-types.ts';

const categories: ThCategory[] = [
  {
    id: "c1",
    label: "Coding Challenge",
    description: "Lerne Werte- & Referenztypen, während du Coding Aufgaben löst!",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "large", codeIDE: { main: true, scopeId: "c-ide-1", config: { type: "program+graph", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    baseTippNodes: [
      { id: "ti1", type: "text", data: { title: "Tipp 1", size: "small" } },
      { id: "ti2", type: "codeIDE", data: { title: "Tipp 2", size: "small", codeIDE: { main: false, scopeId: "t-ide-1", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "ti3", type: "codeIDE", data: { title: "Lösung", size: "large", codeIDE: { main: false, scopeId: "t-ide-2", config: { type: "program+graph", mode: "read", runnable: true } } } },
    ],
    expected: "output"
  },
  {
    id: "c2",
    label: "Code The Memory",
    description: "Gegeben der Speicher, schreibe das Programm!",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", codeIDE: { main: false, scopeId: "c-ide-1", config: { type: "graph", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", codeIDE: { main: true, scopeId: "c-ide-2", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    baseTippNodes: [
      { id: "ti1", type: "codeIDE", data: { title: "Tipp 1", size: "small", codeIDE: { main: false, scopeId: "t-ide-1", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "ti2", type: "codeIDE", data: { title: "Tipp 2", size: "small", codeIDE: { main: false, scopeId: "c-ide-2", config: { type: "graph", mode: "read", runnable: false } } } },
      { id: "ti3", type: "codeIDE", data: { title: "Lösung", size: "medium", codeIDE: { main: false, scopeId: "t-ide-2", config: { type: "program", mode: "read", runnable: true } } } },
    ],
    expected: "graph"
  },
  {
    id: "c3",
    label: "Memory From Code",
    description: "Gegeben das Programm, baue den Speicher!",
    baseNodes: [
      { id: "c-ide-1", type: "codeIDE", data: { size: "small", codeIDE: { main: false, scopeId: "c-ide-1", config: { type: "program", mode: "read", runnable: false } } } },
      { id: "c-ide-2", type: "codeIDE", data: { size: "medium", codeIDE: { main: true, scopeId: "c-ide-2", config: { type: "graph", mode: "write", runnable: false } } } },
      { id: "c-text-1", type: "text", data: { title: "Aufgabe", size: "small" } }
    ],
    baseTippNodes: [
      { id: "ti1", type: "codeIDE", data: { title: "Tipp 1", size: "small", codeIDE: { main: false, scopeId: "t-ide-1", config: { type: "program", mode: "write", runnable: true } } } },
      { id: "ti2", type: "codeIDE", data: { title: "Tipp 2", size: "small", codeIDE: { main: false, scopeId: "c-ide-2", config: { type: "graph", mode: "read", runnable: true } } } },
      { id: "ti3", type: "codeIDE", data: { title: "Lösung", size: "medium", codeIDE: { main: false, scopeId: "t-ide-2", config: { type: "graph", mode: "read", runnable: false } } } },
    ],
    expected: "graph"
  }
]

export default categories;