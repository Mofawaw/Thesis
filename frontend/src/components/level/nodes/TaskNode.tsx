import { TaskNodeData } from '../types/LevelNode';
import ComponentNode from './component_node/ComponentNode';

export default function TaskNode({ data }: { data: TaskNodeData }) {
  return (
    <ComponentNode data={data}>
      <h3 className="px-4 pt-8">Aufgabe</h3>
      <p className="p-4">{data.description}</p>
    </ComponentNode>
  );
}