import { ThNode } from "@/types/th-types";

export const emptyIDENode: ThNode = {
  baseNode: {
    id: "c-ide-1",
    type: "codeIDE",
    data: { size: "large", codeIDE: { main: true, scopeId: "c-ide-1", config: { type: "program+graph", mode: "write", runnable: true } } }
  },
  data: { codeIDE: { initialCode: "" } }
}

export const emptyExtraIDENode: ThNode = {
  baseNode: {
    id: "c-ide-1",
    type: "codeIDE",
    data: { size: "large", codeIDE: { main: false, scopeId: "ide", config: { type: "program+graph", mode: "write", runnable: true } } }
  },
  data: { codeIDE: { initialCode: "" } }
}
