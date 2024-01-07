import { TextNodeData } from '../types/LevelNode';
import ComponentNode from './component_node/ComponentNode';

export default function TextNode({ data }: { data: TextNodeData }) {
  return (
    <ComponentNode data={data}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      <p className="p-4">{data.description}</p>
    </ComponentNode>
  );
}