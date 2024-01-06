import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/LevelNodeTypes';
import { generateLevelNodes } from './levelHelper';
import { levels } from './levelData';
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { LevelOverlayBottom, LevelOverlayTop } from './LevelOverlays';
import LevelNode from './types/LevelNode.ts';

export default function Level() {
  const [nodes, setNodes] = useState<LevelNode[]>([]);

  const addNode = (newNode: LevelNode) => {
    let maxX = -Infinity;
    nodes.forEach((node) => {
      const nodeWidth = node.width || 0
      const nodeRightEdge = node.position.x + nodeWidth;
      if (nodeRightEdge > maxX) {
        maxX = nodeRightEdge;
      }
    });
    newNode.id = (nodes.length + 1).toString();
    newNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(newNode));
  };

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <LevelOverlayTop />
          <LevelReactFlow nodes={nodes} setNodes={setNodes} />
          <LevelOverlayBottom onAddNode={(node) => addNode(node)} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

function LevelReactFlow({ nodes, setNodes }: { nodes: LevelNode[], setNodes: Dispatch<SetStateAction<LevelNode[]>> }) {
  const reactFlowInstance = useReactFlow();
  const prevNodesLength = useRef(nodes.length);

  const onInit = (instance: ReactFlowInstance) => {
    const mode1Nodes = generateLevelNodes(levels[1]);
    setNodes(mode1Nodes)
    console.log(mode1Nodes);

    const timeoutId = setTimeout(() => {
      instance.fitView({ padding: 0.1, includeHiddenNodes: true, duration: 300 });
    }, 200);
    return () => clearTimeout(timeoutId);
  };

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    const filteredChanges = changes.filter(change => {
      if (change.type === 'remove' && change.id.includes("c-")) {
        return false;
      }
      return true;
    });
    setNodes(nodes => applyNodeChanges(filteredChanges, nodes));

    if (reactFlowInstance && nodes.length > prevNodesLength.current) {
      console.log("Fit!")
      reactFlowInstance.fitView({ padding: 0.1, includeHiddenNodes: true, duration: 300 });
    }
    prevNodesLength.current = nodes.length;
  }, [reactFlowInstance, nodes]);

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      onInit={onInit}
      onNodesChange={onNodesChange}
      className="bg-th-background"
      proOptions={{ hideAttribution: true }}
    />
  );
}