export default interface ThCategory {
  id: string;
  label: string;
  nodes: { id: string, type: string, size: string }[];
}
