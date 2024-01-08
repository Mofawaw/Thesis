import { TextNodeData, ThNodeSize } from '../types/ThTypes';
import ComponentNode from './component_node/ComponentNode';

export default function TextNode({ data }: { data: TextNodeData }) {
  return (
    <ComponentNode data={data} maxWidth={data.width * 3.2} minHeight={data.height * 0.4}>
      <h3 className="px-4 pt-8">{data.title ?? ""}</h3>
      <p className="p-4">{data.text.description}</p>
    </ComponentNode>
  );
}