export default interface ThCategory {
  id: string,
  label: string,
  // mainNode: { id: string, type: string },
  nodes: { id: string, type: string, size: string }[]
}
