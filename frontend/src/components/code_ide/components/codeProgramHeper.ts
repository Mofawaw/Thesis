import CodeIDEMode from "../types/CodeIDEMode";

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (mode: CodeIDEMode, totalHeight: number) => {
    if (mode.has(CodeIDEMode.programRead)) {
      return totalHeight - 110
    } else if (mode.has(CodeIDEMode.programWrite)) {
      return totalHeight - codeIDELayout.codeOutputHeight - 190
    }
    return totalHeight
  },
};