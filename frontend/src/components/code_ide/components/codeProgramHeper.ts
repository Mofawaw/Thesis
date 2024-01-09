import CodeIDEConfig from "../types/CodeIDEConfig";

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (config: CodeIDEConfig, totalHeight: number) => {
    if (config.mode === "read") {
      return totalHeight - 60
    } else if (config.mode === "write") {
      return totalHeight - codeIDELayout.codeOutputHeight - 130
    }
    return totalHeight
  },
};