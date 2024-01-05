import ReactFlow, { ReactFlowProvider, isNode, useNodesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { mode1Nodes, sampleNode } from './levelData';
import ThButton from '../custom/ThButton';
import ThIconButton from '../custom/ThIconButton';
import ThIconTextButton from '../custom/ThIconTextButton';
import ThTextButton from '../custom/ThTextButton';
import { nodeTypes } from './nodes/LevelNodeTypes';
import LevelNodeData from './types/LevelNodeData';

export default function Level() {
  const [nodes, setNodes, onNodesChange] = useNodesState(mode1Nodes);

  const addNode = (newNode: LevelNodeData) => {
    let maxX = -Infinity;
    nodes.forEach((node) => {
      if (isNode(node)) {
        const nodeWidth = node.width || 0
        const nodeRightEdge = node.position.x + nodeWidth;
        if (nodeRightEdge > maxX) {
          maxX = nodeRightEdge;
        }
      }
    });

    newNode.id = (nodes.length + 1).toString();
    newNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(newNode));
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <LevelOverlayTop />
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          className="bg-th-background"
          proOptions={{ hideAttribution: true }}
        />
        <LevelOverlayBottom onClick={() => addNode(sampleNode)} />
      </ReactFlowProvider>
    </div>
  );
}

const LevelOverlayBottom = ({ onClick }: { onClick: any }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="relative">
      <div className="absolute left-3 bottom-3">
        <div className="flex flex-col gap-3">
          <ThIconButton thColor="th-tint" icon="Plus" onClick={zoomIn} />
          <div className="flex flex-row gap-3">
            <ThIconButton thColor="th-tint" icon="Fit" onClick={fitView} />
            <ThIconButton thColor="th-tint" icon="Minus" onClick={zoomOut} />
          </div>
        </div>
      </div>

      <div className="absolute right-3 bottom-3">
        <div className="flex flex-row gap-3">
          <ThIconTextButton thColor="th-reference" icon="Tipps" text={"Tipps"} />
          <ThIconTextButton thColor="th-reference" icon="Tutorial" text={"Tutorial"} onClick={onClick} />
          <ThIconTextButton thColor="th-reference" icon="Check" text={"Check"} />
        </div>
      </div>
    </div>
  );
};

const LevelOverlayTop = () => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          {/* <ThButton width={120} height={150} thColor="th-reference" /> */}
          <div className="w-[100px]" />
          <ThTextButton thColor="th-reference" text="Coding Challenge" />
          <div className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};
