import { useState } from "react";
import { Node, useReactFlow } from "reactflow";
import ThIconButton from "@/components/buttons/th-icon-button.tsx";
import ThIconTextButton from "@/components/buttons/th-icon-text-button.tsx";
import ThDropdown from "@/components/portals/th-dropdown.tsx";
import ThMenuTextButton from "@/components/buttons/th-menu-text-button.tsx";
import ThPopup from "@/components/portals/th-popup.tsx";
import ThTextButton from "@/components/buttons/th-text-button.tsx";
import { ThLevel, ThNode } from "@/types/th-types.ts";
import { evaluateLevelCompletion } from "../level-evaluation.ts";
import useUserStore from "@/stores/user-store.ts";
import { useNavigate } from "react-router-dom";
import useThStore from "@/stores/th-store.ts";

interface LevelOverlayBottomProps {
  level: ThLevel;
  nodes: Node[];
  tutorialNodes: ThNode[];
  onAddNode: (node: ThNode) => (void);
}

const LevelOverlayBottom: React.FC<LevelOverlayBottomProps> = ({
  level,
  nodes,
  tutorialNodes,
  onAddNode,
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [openLevelsDropdown, setOpenLevelsDropdown] = useState<boolean>(false);
  const [openTippsDropdown, setOpenTippsDropdown] = useState<boolean>(false);
  const [openTutorialDropdown, setOpenTutorialDropdown] = useState<boolean>(false);
  const [openCheckResultsPopup, setOpenCheckResultsPopup] = useState<{ success?: boolean, fail?: boolean, title: string, message: string }>();
  const [onChecking, setOnChecking] = useState<boolean>(false);
  const userStore = useUserStore.getState();
  const thStore = useThStore.getState();
  const navigate = useNavigate();

  function handleCheckButtonOnClick() {
    setOnChecking(true);

    evaluateLevelCompletion(level, nodes)
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
    if (openCheckResultsPopup?.success) {
      userStore.completeLevel(level.stage.id, level.id);
      thStore.setActiveLevel(null);

      navigate(`/`);
    }
    setOpenCheckResultsPopup({ success: false, fail: false, title: "", message: "" });
  }

  return (
    <div className="relative">
      <div className="absolute left-3 bottom-3">
        <div className="flex flex-col gap-3">
          <ThIconButton thColor="th-tint" icon="plus" onClick={() => zoomIn({ duration: 300 })} />
          <div className="flex flex-row gap-3">
            <ThIconButton thColor="th-tint" icon="fit" onClick={() => fitView({ padding: 0.25, includeHiddenNodes: true, duration: 300 })} />
            <ThIconButton thColor="th-tint" icon="minus" onClick={() => zoomOut({ duration: 300 })} />
          </div>
        </div>
      </div>

      <div className="absolute right-3 bottom-3">
        <div className="flex flex-row gap-3">
          {/*Levels*/}
          <ThDropdown
            width={140}
            height={25 + 40 * level.stage.stageLevels.length}
            thColor={level.stage.color}
            button={<ThIconTextButton thColor={level.stage.color} icon="levels" text="Levels" onClick={() => setOpenLevelsDropdown(true)} />}
            isOpen={openLevelsDropdown}
            onClose={() => setOpenLevelsDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              {level.stage.stageLevels.map((stageLevel) => {
                const stagesProgress = useUserStore(state => state.stagesProgress);
                const levelStatus = stagesProgress[level.stage.id].levelsStatus.find(levelStatus => levelStatus.id === stageLevel.levelId);

                return (
                  <li key={stageLevel.levelId}>
                    {levelStatus?.status === "completed" &&
                      <ThMenuTextButton width={120} thColor={level.stage.color} bgThColorShade={20} textGradient={true} text={stageLevel.levelId}
                        onClick={() => {
                          thStore.setActiveLevel(null);
                          navigate(`/level/${stageLevel.levelId}`);
                        }}
                      />
                    }
                    {levelStatus?.status === "unlocked" && <ThMenuTextButton width={120} thColor={level.stage.color} textThColorShade={10} gradient={true} text={stageLevel.levelId} disabled />}
                    {levelStatus?.status === "locked" && <ThMenuTextButton width={120} thColor={level.stage.color} bgThColorShade={40} textThColorShade={30} text={stageLevel.levelId} disabled />}
                  </li>
                )
              })}
            </ul>
          </ThDropdown>

          {/*Tipps*/}
          <ThDropdown
            width={140}
            height={25 + 40 * level.tippNodes.length}
            thColor={level.stage.color}
            button={<ThIconTextButton thColor={level.stage.color} icon="tipps" text="Tipps" onClick={() => setOpenTippsDropdown(true)} />}
            isOpen={openTippsDropdown}
            onClose={() => setOpenTippsDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              {level.tippNodes.map((tippNode) => (
                <li key={tippNode.baseNode.id}><ThMenuTextButton width={120} thColor={level.stage.color} text={tippNode.baseNode.data.title ?? "Error"} onClick={() => onAddNode(tippNode)} /></li>
              ))}
            </ul>
          </ThDropdown>

          {/*Tutorial*/}
          <ThDropdown
            width={200}
            height={25 + 40 * tutorialNodes.length}
            thColor={level.stage.color}
            button={<ThIconTextButton thColor={level.stage.color} icon="tutorial" text="Tutorial" onClick={() => setOpenTutorialDropdown(!openTutorialDropdown)} />}
            isOpen={openTutorialDropdown}
            onClose={() => setOpenTutorialDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              {tutorialNodes.map((tutorialNode) => (
                <li key={tutorialNode.baseNode.id}><ThMenuTextButton width={165} thColor={level.stage.color} text={tutorialNode.baseNode.data.title ?? "Error"} onClick={() => onAddNode(tutorialNode)} /></li>
              ))}
            </ul>
          </ThDropdown>

          {/*Check*/}
          <ThPopup
            width={openCheckResultsPopup?.success ? 1000 : 650}
            height={openCheckResultsPopup?.success ? 600 : 800}
            thColor={openCheckResultsPopup?.success ? "th-tint" : "th-black"}
            backgroundClass={openCheckResultsPopup?.success ? "th-bg-gradient" : "bg-none"}
            button={<ThIconTextButton thColor={level.stage.color} icon="check" text={"Check"} isLoading={onChecking} onClick={handleCheckButtonOnClick} />}
            isOpen={(openCheckResultsPopup?.success || openCheckResultsPopup?.fail) ?? false}
            onClose={handleCheckButtonOnClose}
          >

            {openCheckResultsPopup?.success &&
              <div className="h-full flex flex-col items-center justify-between p-12">
                <h2 className="th-text-gradient">Erfolg!</h2>
                <h3 className="text-center">{openCheckResultsPopup.title}</h3>
                <p className="text-center whitespace-pre-line mt-4">{openCheckResultsPopup.message}</p>
                <ThTextButton width={150} thColor="th-tint" text="Weiter" onClick={handleCheckButtonOnClose} />
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
      </div>
    </div>
  );
};

export default LevelOverlayBottom;