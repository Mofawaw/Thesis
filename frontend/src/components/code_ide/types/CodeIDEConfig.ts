export default interface CodeIDEConfig {
  type: "program" | "graph" | "program+graph";
  mode: "read" | "write";
  runnable: boolean;
}

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (config: CodeIDEConfig, totalHeight: number) => {
    if (config.mode === "read") {
      return totalHeight - 55
    } else if (config.mode === "write") {
      return totalHeight - codeIDELayout.codeOutputHeight - 130
    }
    return totalHeight
  },
  getCodeGraphHeight: (totalHeight: number) => {
    return totalHeight - 55
  }
};