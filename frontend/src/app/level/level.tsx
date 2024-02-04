import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from './nodes/types/node-types.ts';
import LevelOverlayTop from './components/level-overlay-top.tsx';
import LevelOverlayBottom from './components/level-overlay-bottom.tsx';
import { ThLevel, ThNode } from '@/types/th-types.ts';
import { convertToReactFlowNode, generateReactFlowNodes } from './level-initialization.ts';
import useUserStore from '@/stores/user-store.ts';
import { resetStoreMap } from '../code-ide/code-ide-store.ts';

interface LevelProps {
  level: ThLevel;
  tutorialNodes: ThNode[];
}

const Level: React.FC<LevelProps> = ({
  level,
  tutorialNodes,
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const userStore = useUserStore.getState();

  const addNode = (newLevelNode: ThNode) => {
    let maxX = -Infinity;
    nodes.forEach((node) => {
      const nodeWidth = node.width || 0
      const nodeRightEdge = node.position.x + nodeWidth;
      if (nodeRightEdge > maxX) {
        maxX = nodeRightEdge;
      }
    });

    const reactflowNode: Node = convertToReactFlowNode(newLevelNode);
    reactflowNode.id = (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize Nodes for Level
  useEffect(() => {
    const initialNodes = generateReactFlowNodes(level);
    setNodes(initialNodes)
    userStore.initializeLevelProgress(level.id);
    console.log(initialNodes);
  }, [level]);

  return (
    <div className="w-screen h-screen">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <LevelOverlayTop level={level} />
          <LevelReactFlow nodes={nodes} setNodes={setNodes} />
          <LevelOverlayBottom level={level} nodes={nodes} tutorialNodes={tutorialNodes} onAddNode={(node) => addNode(node)} />
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
      instance.fitView({ padding: 0.25, includeHiddenNodes: true, duration: 300 });
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
      reactFlowInstance.fitView({ padding: 0.25, includeHiddenNodes: true, duration: 300 });
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

export default Level;