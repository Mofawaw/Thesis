import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './types/nodeTypes.ts';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import LevelOverlayTop from './LevelOverlayTop.tsx';
import LevelOverlayBottom from './LevelOverlayBottom.tsx';
import { ThLevel, ThLevelNode } from './types/thTypes.ts';
import { convertToReactflowNode, generateReactflowNodes } from './logic/levelInitialization.ts';

export default function Level({ level }: { level: ThLevel }) {
  const [nodes, setNodes] = useState<Node[]>([]);

  const addNode = (newLevelNode: ThLevelNode) => { // TODO!!
    let maxX = -Infinity;
    nodes.forEach((node) => {
      const nodeWidth = node.width || 0
      const nodeRightEdge = node.position.x + nodeWidth;
      if (nodeRightEdge > maxX) {
        maxX = nodeRightEdge;
      }
    });

    const reactflowNode: Node = convertToReactflowNode(newLevelNode);
    reactflowNode.id = (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize Nodes for Level
  useEffect(() => {
    const initialNodes = generateReactflowNodes(level);
    setNodes(initialNodes)
    console.log(initialNodes);
  }, []);

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <LevelOverlayTop />
          <LevelReactFlow nodes={nodes} setNodes={setNodes} />
          <LevelOverlayBottom level={level} nodes={nodes} onAddNode={(node) => addNode(node)} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

function LevelReactFlow({ nodes, setNodes }: { nodes: Node[], setNodes: Dispatch<SetStateAction<Node[]>> }) {
  const reactFlowInstance = useReactFlow();
  const prevNodesLength = useRef(nodes.length);

  const onInit = (instance: ReactFlowInstance) => {
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