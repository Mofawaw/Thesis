export const codeIDELayout = {
  codeOutputHeight: 100,
  getCodeEditorHeight: (totalHeight: number) => (totalHeight - codeIDELayout.codeOutputHeight - 190),
};