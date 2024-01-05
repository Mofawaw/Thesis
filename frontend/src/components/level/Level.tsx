import ReactFlow, { ReactFlowProvider, isNode, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/LevelNodeTypes';
import { generateLevelNodes, sampleLevelNode } from './levelHelper';
import { levels } from './levelData';
import { useCallback, useEffect, useState } from 'react';
import LevelNode from './types/LevelNode';
import { LevelOverlayBottom, LevelOverlayTop } from './LevelOverlays';

export default function Level() {
  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <LevelOverlayTop />
          <LevelReactFlow />
          <LevelOverlayBottom onClick={() => console.log("...")} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

function LevelReactFlow() {
  const [nodes, setNodes] = useState<LevelNode[]>([]);
  const reactFlowInstance = useReactFlow();

  const onInit = (instance: ReactFlowInstance) => {
    const mode1Nodes = generateLevelNodes(levels[0]);
    setNodes(mode1Nodes)
    console.log(mode1Nodes);

    const timeoutId = setTimeout(() => {
      instance.fitView({ padding: 0.1, includeHiddenNodes: true, duration: 300 });
    }, 200);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
  }, []);

  const addNode = (newNode: LevelNode) => {
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

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    const filteredChanges = changes.filter(change => {
      if (change.type === 'remove' && change.id.includes("c-")) {
        return false;
      }
      return true;
    });
    setNodes(nodes => applyNodeChanges(filteredChanges, nodes));

    const isNodeAdded = changes.some(change => change.type === 'add');
    if (reactFlowInstance && isNodeAdded) {
      reactFlowInstance.fitView({ padding: 0.1, includeHiddenNodes: true, duration: 300 });
    }
  }, [reactFlowInstance]);

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