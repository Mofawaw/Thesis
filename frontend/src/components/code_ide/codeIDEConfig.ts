export default interface CodeIDEConfig {
  type: "program" | "graph" | "program+graph";
  mode: "read" | "write";
  runnable: boolean;
}

export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (config: CodeIDEConfig, totalHeight: number) => {
    return config.runnable ? totalHeight - codeIDELayout.codeOutputHeight - 75 : totalHeight;
  },
  getCodeGraphHeight: (config: CodeIDEConfig, totalHeight: number) => {
    return config.runnable ? totalHeight - 50 : totalHeight;
  }
};