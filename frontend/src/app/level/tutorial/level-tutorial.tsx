import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { ReactFlowProvider, NodeChange, applyNodeChanges, useReactFlow, ReactFlowInstance, Node } from 'reactflow';
import { useNavigate } from 'react-router-dom'
import 'reactflow/dist/style.css';

import useUserStore from '@/stores/user-store.ts';
import { tutorialLevel, tutorialMasterNode } from '@/data (todo-post: backend)/levels/extras/tutorial.ts';
import ThIconButton from '@/components/buttons/th-icon-button.tsx';
import ThTextButton from '@/components/buttons/th-text-button.tsx';
import ThDropdown from '@/components/portals/th-dropdown.tsx';
import ThMenuTextButton from '@/components/buttons/th-menu-text-button.tsx';
import ThPopup from '@/components/portals/th-popup.tsx';
import ThIconTextButton from '@/components/buttons/th-icon-text-button.tsx';
import { ThNode } from '@/types/th-types.ts';

import { convertToReactFlowNode } from '../level-initialization.ts';
import { nodeTypes } from '../nodes/types/node-types.ts';
import { evaluateLevelCompletion } from '../level-evaluation.ts';

const LevelTutorial: React.FC = () => {
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

    const reactflowNode: Node = convertToReactFlowNode(newLevelNode);
    reactflowNode.id = tutorialLevel.id + "-" + (nodes.length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    setNodes((nodes) => nodes.concat(reactflowNode));
  };

  // Initialize TutorialNode
  useEffect(() => {
    const initialNode: Node = convertToReactFlowNode(tutorialMasterNode);
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
          <TutorialOverlayBottom nodes={nodes} onAddNode={addNode} />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

interface TutorialReactFlowProps {
  nodes: Node[];
  setNodes: Dispatch<SetStateAction<Node[]>>;
}

const TutorialReactFlow: React.FC<TutorialReactFlowProps> = ({
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
      if (change.type === 'remove' && change.id.includes("t-")) {
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

export default LevelTutorial;

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

interface TutorialOverlayBottomProps {
  nodes: Node[];
  onAddNode: (node: ThNode) => (void);
}

const TutorialOverlayBottom: React.FC<TutorialOverlayBottomProps> = ({
  nodes,
  onAddNode,
}) => {
  const navigate = useNavigate();
  const userStore = useUserStore.getState();
  const [openExitDropdown, setOpenExitDropdown] = useState<boolean>(false);
  const [openTippsDropdown, setOpenTippsDropdown] = useState<boolean>(false);
  const [openCheckResultsPopup, setOpenCheckResultsPopup] = useState<{ success?: boolean, fail?: boolean, title: string, message: string }>();
  const [onChecking, setOnChecking] = useState<boolean>(false);

  const { zoomIn, zoomOut, fitView } = useReactFlow();

  function handleCheckButtonOnClick() {
    setOnChecking(true);

    evaluateLevelCompletion(tutorialLevel, nodes)
      .then(result => {
        if (result.result) {
          setOpenCheckResultsPopup({ success: true, title: result.title, message: result.message });
        } else {
          setOpenCheckResultsPopup({ fail: true, title: result.title, message: result.message });
        }
      })
      .finally(() => {
        setOnChecking(false);
      });
  }

  function handleCheckButtonOnClose() {
    if (openCheckResultsPopup?.success && !userStore.userProgress?.completedTutorial) {
      userStore.updateUserProgress({ completedTutorialChallenge: true });
      userStore.updateUserProgress({ completedTutorial: true });
      navigate('/');
    }
    setOpenCheckResultsPopup({ success: false, fail: false, title: "", message: "" });
  }

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

          {userStore.userProgress?.completedTutorialValueAndReference &&
            <div className="flex flex-row gap-3 pointer-events-auto">
              {/*Tipps*/}
              <ThDropdown
                position="top"
                width={150}
                height={25 + 40 * tutorialLevel.tippNodes.length}
                thColor="th-tint"
                button={<ThIconTextButton width={150} thColor="th-tint" icon="tipps" text="Tipps" onClick={() => setOpenTippsDropdown(true)} />}
                isOpen={openTippsDropdown}
                onClose={() => setOpenTippsDropdown(false)}
              >
                <ul className="flex flex-col items-center gap-1 p-3">
                  {tutorialLevel.tippNodes.map((tippNode) =>
                    <li key={tippNode.baseNode.id}>
                      <ThMenuTextButton width={120} thColor="th-tint" text={tippNode.baseNode.data.title ?? "Error"} onClick={() => onAddNode(tippNode)} />
                    </li>
                  )}
                </ul>
              </ThDropdown>

              {/*Tutorial*/}
              <ThIconTextButton width={150} thColor="th-tint" icon="tutorial" text="Tutorial" onClick={() => onAddNode(tutorialMasterNode)} />

              {/*Check*/}
              <ThPopup
                width={openCheckResultsPopup?.success ? 1000 : 650}
                height={openCheckResultsPopup?.success ? 600 : 800}
                thColor={openCheckResultsPopup?.success ? "th-tint" : "th-black"}
                backgroundClass={openCheckResultsPopup?.success ? "th-bg-gradient" : "bg-none"}
                button={<ThIconTextButton width={150} thColor="th-tint" icon="check" text={"Check"} isLoading={onChecking} onClick={handleCheckButtonOnClick} />}
                isOpen={(openCheckResultsPopup?.success || openCheckResultsPopup?.fail) ?? false}
                onClose={handleCheckButtonOnClose}
              >
                {openCheckResultsPopup?.success &&
                  <div className="h-full flex flex-col items-center justify-between p-12">
                    <h2 className="th-text-gradient">Erfolg!</h2>
                    <h3 className="text-center">Nice! Du hast das Tutorial erfolgreich abgeschlossen.</h3>
                    <p className="text-center whitespace-pre-line mt-4">{openCheckResultsPopup.message}</p>
                    <ThTextButton width={300} thColor="th-tint" text="Weiter" onClick={handleCheckButtonOnClose} />
                  </div>
                }
                {openCheckResultsPopup?.fail &&
                  <div className="h-full flex flex-col items-center justify-between p-12">
                    <h3>Falsch!</h3>
                    <div>
                      <h4 className="text-center mb-10">{openCheckResultsPopup.title}</h4>
                      <p className="text-center whitespace-pre-line mt-4">{openCheckResultsPopup.message}</p>
                    </div>
                    <ThMenuTextButton width={150} thColor="th-black" text="Weiter" onClick={handleCheckButtonOnClose} />
                  </div>
                }
              </ThPopup>
            </div>
          }

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
                <ThMenuTextButton width={userStore.userProgress?.completedTutorial ? 120 : 250} thColor="th-tint" text={`${userStore.userProgress?.completedTutorial ? "Exit" : "Weiter ohne Tutorial"}`}
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