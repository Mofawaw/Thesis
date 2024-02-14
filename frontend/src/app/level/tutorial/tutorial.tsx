import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '../nodes/types/node-types.ts';
import { ThNode } from '@/types/th-types.ts';
import { convertToReactFlowNode } from '../level-initialization.ts';
import useUserStore from '@/stores/user-store.ts';
import { tutorialNode } from '@/data (todo-post: backend)/tutorial.ts';
import ThIconButton from '@/components/buttons/th-icon-button.tsx';
import ThTextButton from '@/components/buttons/th-text-button.tsx';
import ThDropdown from '@/components/portals/th-dropdown.tsx';
import ThMenuTextButton from '@/components/buttons/th-menu-text-button.tsx';
import { useNavigate } from 'react-router-dom';

const Tutorial: React.FC = ({
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
    reactflowNode.id = "tutorial" + "-" + (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize TutorialNode
  useEffect(() => {
    const initialNode: Node = convertToReactFlowNode(tutorialNode);
    setNodes([initialNode])
    console.log([initialNode]);

    return () => {
      console.log("Resetting Level")
      setNodes([]);
    }
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          <TutorialOverlayTop />
          <TutorialReactFlow nodes={nodes} setNodes={setNodes} />
          <TutorialOverlayBottom />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

interface LevelReactFlowProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

const TutorialReactFlow: React.FC<LevelReactFlowProps> = ({
  nodes,
  setNodes,
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
      key="tutorial"
      nodes={nodes}
      nodeTypes={nodeTypes}
      onInit={onInit}
      onNodesChange={onNodesChange}
      className="bg-th-background"
      proOptions={{ hideAttribution: true }}
    />
  );
}

export default Tutorial;

const TutorialOverlayTop: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          <div style={{ width: 165 }} />

          <ThTextButton width={450} thColor="th-tint" text="Tutorial" />

          <div style={{ width: 165 }} />
        </div>
      </div>
    </div>
  )
}

const TutorialOverlayBottom: React.FC = () => {
  const navigate = useNavigate();
  const userStore = useUserStore.getState();
  const [openExitDropdown, setOpenExitDropdown] = useState<boolean>(false);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="relative">
      <div className="absolute left-3 right-3 bottom-3 pointer-events-none">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col gap-3 items-start pointer-events-auto" style={{ width: 0 }}>
            <ThIconButton thColor="th-tint" icon="plus" onClick={() => zoomIn({ duration: 300 })} />
            <div className="flex flex-row gap-3">
              <ThIconButton thColor="th-tint" icon="fit" onClick={() => fitView({ padding: 0.2, includeHiddenNodes: true, duration: 300 })} />
              <ThIconButton thColor="th-tint" icon="minus" onClick={() => zoomOut({ duration: 300 })} />
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto" style={{ width: 0 }}>
            {/*Exit*/}
            <ThDropdown
              position="top-left"
              width={270}
              height={25 + 40}
              thColor="th-tint"
              button={<ThIconButton thColor="th-tint" icon="exit" onClick={() => setOpenExitDropdown(true)} />}
              isOpen={openExitDropdown}
              onClose={() => setOpenExitDropdown(false)}
            >
              <div className="flex flex-col items-center gap-1 p-3">
                <ThMenuTextButton width={250} thColor="th-tint" text="Weiter ohne Tutorial"
                  onClick={() => {
                    userStore.updateUserProgress({ completedTutorial: true });
                    navigate('/');
                  }}
                />
              </div>
            </ThDropdown>
          </div>
        </div>
      </div>
    </div>
  )
}