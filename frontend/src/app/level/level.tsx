import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import { useLocation } from "react-router-dom";
import 'reactflow/dist/style.css';

import { ThLevel, ThNode } from '@/types/th-types.ts';
import useUserStore from '@/stores/user-store.ts';

import { nodeTypes } from './nodes/types/node-types.ts';
import LevelOverlayTop from './components/level-overlay-top.tsx';
import LevelOverlayBottom from './components/level-overlay-bottom.tsx';
import { convertToReactFlowNode, generateReactFlowNodes } from './level-initialization.ts';

interface LevelProps {
  level: ThLevel;
}

const Level: React.FC<LevelProps> = ({
  level,
}) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const userStore = useUserStore.getState();
  const location = useLocation();

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
    reactflowNode.id = level.id + "-" + (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize Nodes for Level
  useEffect(() => {
    const initialNodes = generateReactFlowNodes(level);
    setNodes(initialNodes)
    console.log(initialNodes);

    return () => {
      console.log("Resetting Level")
      setNodes([]);
      // resetStoreMap();
    }
  }, [level]);

  // Persist progress data when closing level
  useEffect(() => {
    updateUserProgress();

    return () => {
      updateUserProgress()
    }
  }, [location, level]);

  // Persist progress data when site is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateUserProgress();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [level]);

  function updateUserProgress() {
    console.log("Updating level progress nodes to LocalStorage.");
    userStore.updateLevelProgressCurrentNodes(level);
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <LevelOverlayTop level={level} />
          <LevelReactFlow level={level} nodes={nodes} setNodes={setNodes} />
          <LevelOverlayBottom level={level} nodes={nodes} onAddNode={(node) => addNode(node)} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

interface LevelReactFlowProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
  level: ThLevel;
}

const LevelReactFlow: React.FC<LevelReactFlowProps> = ({
  nodes,
  setNodes,
  level,
}) => {
  const reactFlowInstance = useReactFlow();
  const prevNodesLength = useRef(nodes.length);

  const onInit = (instance: ReactFlowInstance) => {
    console.log(nodes);
    const timeoutId = setTimeout(() => {
      instance.fitView({ padding: 0.2, includeHiddenNodes: true, duration: 300 });
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
      reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: true, duration: 300 });
    }
    prevNodesLength.current = nodes.length;
  }, [reactFlowInstance, nodes]);

  return (
    <ReactFlow
      key={level.id}
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