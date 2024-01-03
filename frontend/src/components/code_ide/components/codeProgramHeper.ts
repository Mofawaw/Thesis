import { ProgramMode } from "../types/CodeIDEMode";

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (mode: ProgramMode, totalHeight: number) => {
    if (mode === ProgramMode.static) {
      return totalHeight - 110
    } else if (mode === ProgramMode.write) {
      return totalHeight - codeIDELayout.codeOutputHeight - 190
    }
    return totalHeight
  },
};