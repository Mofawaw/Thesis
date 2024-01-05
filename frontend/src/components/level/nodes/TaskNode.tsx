import { TaskNodeData } from '../types/LevelNode';
import ComponentNode from './component_node/ComponentNode';

export default function TaskNode({ data }: { data: TaskNodeData }) {
  return (
    <ComponentNode minWidth={data.initialSize.width} minHeight={data.initialSize.height}>
      <h3 className="px-4 pt-8">Aufgabe</h3>
      <p className="p-4">{data.description}</p>
    </ComponentNode>
  );
}