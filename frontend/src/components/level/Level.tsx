import ReactFlow, { ReactFlowProvider, Controls, useNodesState, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import { mode1Nodes, nodeTypes } from './levelData';
import ThButton from '../custom/ThButton';
import ThIconButton from '../custom/ThIconButton';
import ThIcons from '../custom/ThIcon';
import ThIconTextButton from '../custom/ThIconTextButton';

export default function Level() {
  const [nodes, setNodes, onNodesChange] = useNodesState(mode1Nodes);

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          className="bg-th-background"
          proOptions={{ hideAttribution: true }}
        />
        <LevelOverlay />
      </ReactFlowProvider>
    </div>
  );
}

const LevelOverlay = () => {
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
          <ThIconTextButton thColor="th-reference" icon="Tutorial" text={"Tutorial"} />
          <ThIconTextButton thColor="th-reference" icon="Tipps" text={"Tipps"} />
          <ThIconTextButton thColor="th-reference" icon="Check" text={"Check"} />
        </div>
      </div>
    </div>
  );
};
