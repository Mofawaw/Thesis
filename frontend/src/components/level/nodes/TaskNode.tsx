import ComponentNode from '../components/ComponentNode';

interface TaskNodeData {
  description: string
}

export default function TaskNode({ data }: { data: TaskNodeData }) {
  // Layout
  const minWidth = 400;
  const minHeight = 600;

  return (
    <ComponentNode minWidth={minWidth} minHeight={minHeight}>
      <h3 className="px-4 pt-8">Aufgabe</h3>
      <p className="p-4">{data.description}</p>
    </ComponentNode>
  );
}