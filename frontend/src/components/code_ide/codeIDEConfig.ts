export default interface CodeIDEConfig {
  type: "program" | "graph" | "program+graph";
  mode: "read" | "write";
  runnable: boolean;
}

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (config: CodeIDEConfig, totalHeight: number) => {
    if (config.mode === "read") {
      return totalHeight
    } else if (config.mode === "write") {
      return totalHeight - codeIDELayout.codeOutputHeight - 75
    }
    return totalHeight
  },
  getCodeGraphHeight: (config: CodeIDEConfig, totalHeight: number) => {
    if (config.mode === "read" || config.type === "program+graph") {
      return totalHeight
    } else if (config.mode === "write") {
      return totalHeight - 50
    }
    return totalHeight
  }
};