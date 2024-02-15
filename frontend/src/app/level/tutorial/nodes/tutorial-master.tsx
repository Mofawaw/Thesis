import ThMenuTextButton from "@/components/buttons/th-menu-text-button";
import { tutorialLevel, tutorialValueNode, tutorialReferenceNode } from "@/data (todo-post: backend)/tutorial";
import { ThNode } from "@/types/th-types";
import { Node, useReactFlow } from "reactflow";
import { convertToReactFlowNode, generateReactFlowNodes } from "../../level-initialization";
import useUserStore from "@/stores/user-store";
import { useState } from "react";

const TutorialMaster: React.FC = () => {
  const userStore = useUserStore.getState();
  const userProgress = useUserStore(state => state.userProgress);
  const reactFlowInstance = useReactFlow();
  const [showTutorialChallenge, setShowTutorialChallenge] = useState(false);

  const addNode = (newLevelNode: ThNode) => {
    let maxX = -Infinity;
    reactFlowInstance.getNodes().forEach((node) => {
      const nodeWidth = node.width || 0
      const nodeRightEdge = node.position.x + nodeWidth;
      if (nodeRightEdge > maxX) {
        maxX = nodeRightEdge;
      }
    });

    const reactflowNode: Node = convertToReactFlowNode(newLevelNode);
    reactflowNode.id = newLevelNode.data.tutorial?.id + "-" + (reactFlowInstance.getNodes().length + 1).toString();
    reactflowNode.position = { x: maxX + 20, y: 0 };

    reactFlowInstance.setNodes((nodes) => {
      const newNodes = nodes.concat(reactflowNode)

      if (newNodes.find(node => node.id.includes("value")) && newNodes.find(node => node.id.includes("reference"))) {
        setShowTutorialChallenge(true);
      }

      return newNodes
    });
  };

  const addTutorialLevel = () => {
    const tutorialLevelNodes = generateReactFlowNodes(tutorialLevel);
    reactFlowInstance.setNodes(tutorialLevelNodes);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <p>In Python gibt es Werte- und Referenztypen.</p>
      </div>

      <div className="flex flex-row gap-3">
        <p>Wertetypen:</p>
        <ThMenuTextButton width={200} thColor="th-value" text="Wertetypen" onClick={() => addNode(tutorialValueNode)} />
      </div>

      <div className="flex flex-row gap-3">
        <p>Referenztypen:</p>
        <ThMenuTextButton width={200} thColor="th-reference" text="Referenztypen" onClick={() => addNode(tutorialReferenceNode)} />
      </div>

      {showTutorialChallenge && !userProgress?.completedTutorial &&
        <div className="flex flex-col gap-3">
          <p>Um das Tutorial abzuschliessen, beende die Challenge:</p>
          <ThMenuTextButton width={200} thColor="th-black" text="Challenge"
            onClick={() => {
              addTutorialLevel();
              userStore.updateUserProgress({ completedTutorialValueAndReference: true });
            }
            } />
        </div>
      }
    </div>
  )
}

export default TutorialMaster;