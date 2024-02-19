import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import { useNavigate } from 'react-router-dom'
import 'reactflow/dist/style.css';

import useUserStore from '@/stores/user-store.ts';
import ThIconButton from '@/components/buttons/th-icon-button.tsx';
import ThTextButton from '@/components/buttons/th-text-button.tsx';
import ThDropdown from '@/components/portals/th-dropdown.tsx';
import ThMenuTextButton from '@/components/buttons/th-menu-text-button.tsx';
import { ThNode } from '@/types/th-types.ts';
import ThIconTextButton from '@/components/buttons/th-icon-text-button.tsx';
import { emptyExtraIDENode, emptyIDENode } from '@/data (todo-post: backend)/levels/extras/blank.ts';

import { nodeTypes } from '../nodes/types/node-types.ts';
import { convertToReactFlowNode } from '../level-initialization.ts';

const LevelBlank: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);

  const addNode = (newLevelNode: ThNode) => {
    let maxX = -Infinity;
    nodes.forEach((node) => {
      const nodeWidth = node.width || 0
      const nodeRightEdge = node.position.x + nodeWidth;
      if (nodeRightEdge > maxX) {
        maxX = nodeRightEdge;
      }
    });

    if (newLevelNode.baseNode.data.codeIDE) {
      newLevelNode.baseNode.data.codeIDE.scopeId = "ide" + "-" + (nodes.length + 1).toString()
    }
    const reactflowNode: Node = convertToReactFlowNode(newLevelNode);
    reactflowNode.id = "blank" + "-" + (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize TutorialNode
  useEffect(() => {
    const initialNode: Node = convertToReactFlowNode(emptyIDENode);
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
          <BlankOverlayTop />
          <BlankReactFlow nodes={nodes} setNodes={setNodes} />
          <BlankOverlayBottom onAddNode={addNode} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

interface BlankReactFlowProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

const BlankReactFlow: React.FC<BlankReactFlowProps> = ({
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
      key="blank"
      nodes={nodes}
      nodeTypes={nodeTypes}
      onInit={onInit}
      onNodesChange={onNodesChange}
      className="bg-th-background"
      proOptions={{ hideAttribution: true }}
    />
  );
}

export default LevelBlank;

const BlankOverlayTop: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          <div style={{ width: 165 }} />

          <ThTextButton width={450} thColor="th-tint" text="Leere IDE" />

          <div style={{ width: 165 }} />
        </div>
      </div>
    </div>
  )
}

interface BlankOverlayBottomProps {
  onAddNode: (node: ThNode) => (void);
}

const BlankOverlayBottom: React.FC<BlankOverlayBottomProps> = ({
  onAddNode,
}) => {
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

          <div className="flex flex-row gap-3 pointer-events-auto">
            {/*More*/}
            <ThIconTextButton width={200} thColor="th-tint" icon="tutorial" text="Weitere IDE" onClick={() => onAddNode(emptyExtraIDENode)} />
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto" style={{ width: 0 }}>
            {/*Exit*/}
            <ThDropdown
              position="top-left"
              width={userStore.userProgress?.completedTutorial ? 150 : 270}
              height={25 + 40}
              thColor="th-tint"
              button={<ThIconButton thColor="th-tint" icon="exit" onClick={() => setOpenExitDropdown(true)} />}
              isOpen={openExitDropdown}
              onClose={() => setOpenExitDropdown(false)}
            >
              <div className="flex flex-col items-center gap-1 p-3">
                <ThMenuTextButton width={120} thColor="th-tint" text="Exit"
                  onClick={() => {
                    userStore.updateUserProgress({ completedTutorialValueAndReference: true });
                    userStore.updateUserProgress({ completedTutorialChallenge: true });
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