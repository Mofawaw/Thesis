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
import { tutorialMasterNode } from "@/data (todo-post: backend)/tutorial.ts";

interface LevelOverlayBottomProps {
  level: ThLevel;
  nodes: Node[];
  onAddNode: (node: ThNode) => (void);
}

const LevelOverlayBottom: React.FC<LevelOverlayBottomProps> = ({
  level,
  nodes,
  onAddNode,
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [openExitDropdown, setOpenExitDropdown] = useState<boolean>(false);
  const [openLevelsDropdown, setOpenLevelsDropdown] = useState<boolean>(false);
  const [openTippsDropdown, setOpenTippsDropdown] = useState<boolean>(false);
  const [openCheckResultsPopup, setOpenCheckResultsPopup] = useState<{ success?: boolean, fail?: boolean, title: string, message: string }>();
  const [openCompletedStagePopup, setOpenCompletedStagePopup] = useState<boolean>(false);
  const [onChecking, setOnChecking] = useState<boolean>(false);
  const userStore = useUserStore.getState();
  const thStore = useThStore.getState();
  const navigate = useNavigate();

  const levelProgress = userStore.levelsProgress[level.id];
  const buttonsColor = levelProgress.status === "completed" ? "th-tint" : level.stage.color;

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
    if (openCheckResultsPopup?.success && levelProgress.status !== "completed") {
      userStore.completeLevel(level.stage.id, level.id);

      if (!level.id.includes("final")) {
        dismissLevel();
      } else {
        setOpenCompletedStagePopup(true);
      }
    } else if (openCheckResultsPopup?.fail) {
      userStore.increaseLevelCheckingAttempt(level.id);
    }
    setOpenCheckResultsPopup({ success: false, fail: false, title: "", message: "" });
  }

  function dismissLevel() {
    thStore.setActiveLevel(null);
    navigate(`/`);
  }

  return (
    <div className="relative">
      <div className="absolute left-3 right-3 bottom-3 pointer-events-none">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col gap-3 items-start pointer-events-auto" style={{ width: 0 }}>
            <ThIconButton thColor={buttonsColor} icon="plus" onClick={() => zoomIn({ duration: 300 })} />
            <div className="flex flex-row gap-3">
              <ThIconButton thColor={buttonsColor} icon="fit" onClick={() => fitView({ padding: 0.2, includeHiddenNodes: true, duration: 300 })} />
              <ThIconButton thColor={buttonsColor} icon="minus" onClick={() => zoomOut({ duration: 300 })} />
            </div>
          </div>

          <div className="flex flex-row gap-3 pointer-events-auto">
            {/*Tipps*/}
            <ThDropdown
              position="top"
              width={150}
              height={25 + 40 * level.tippNodes.length}
              thColor={buttonsColor}
              button={<ThIconTextButton width={150} thColor={buttonsColor} icon="tipps" text="Tipps" onClick={() => setOpenTippsDropdown(true)} />}
              isOpen={openTippsDropdown}
              onClose={() => setOpenTippsDropdown(false)}
            >
              <ul className="flex flex-col items-center gap-1 p-3">
                {level.tippNodes.map((tippNode) => {
                  let tippCheckingAttemptsToUnlock = 0;
                  switch (tippNode.baseNode.id) {
                    case "ti-1": tippCheckingAttemptsToUnlock = 0; break;
                    case "ti-2": tippCheckingAttemptsToUnlock = 3; break;
                    case "ti-sol": tippCheckingAttemptsToUnlock = (level.stage.id === "s1" ? 6 : 10); break;
                  }
                  const tippUnlocked = levelProgress.checkingAttempts >= tippCheckingAttemptsToUnlock

                  return (
                    <li key={tippNode.baseNode.id}>
                      {(levelProgress.status === "completed" || tippUnlocked) &&
                        <ThMenuTextButton width={120} thColor={buttonsColor} text={tippNode.baseNode.data.title ?? "Error"} onClick={() => onAddNode(tippNode)} />
                      }
                      {(levelProgress.status !== "completed" && !tippUnlocked) &&
                        <ThMenuTextButton width={120} thColor={buttonsColor} bgThColorShade={40} textThColorShade={30} text={tippNode.baseNode.data.title ?? "Error"} disabled />
                      }
                    </li>
                  )
                })}
              </ul>
            </ThDropdown>

            {/*Tutorial*/}
            <ThIconTextButton width={150} thColor={buttonsColor} icon="tutorial" text="Tutorial" onClick={() => onAddNode(tutorialMasterNode)} />

            {/*Check*/}
            <ThPopup
              width={openCheckResultsPopup?.success ? 1000 : 650}
              height={openCheckResultsPopup?.success ? 600 : 800}
              thColor={openCheckResultsPopup?.success ? "th-tint" : "th-black"}
              backgroundClass={openCheckResultsPopup?.success ? "th-bg-gradient" : "bg-none"}
              button={<ThIconTextButton width={150} thColor={buttonsColor} icon="check" text={"Check"} isLoading={onChecking} onClick={handleCheckButtonOnClick} />}
              isOpen={(openCheckResultsPopup?.success || openCheckResultsPopup?.fail) ?? false}
              onClose={handleCheckButtonOnClose}
            >
              {openCheckResultsPopup?.success &&
                <div className="h-full flex flex-col items-center justify-between p-12">
                  <h2 className="th-text-gradient">Erfolg!</h2>
                  <h3 className="text-center">{openCheckResultsPopup.title}</h3>
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

            {/*Check: Completed Stage*/}
            <ThPopup
              width={1000}
              height={600}
              thColor={"th-tint"}
              backgroundClass={"th-bg-gradient-100"}
              button={<></>}
              isOpen={openCompletedStagePopup}
              onClose={() => { }}
            >
              {openCompletedStagePopup &&
                <div className="h-full flex flex-col items-center justify-between p-12">
                  <h2 className="th-text-gradient scale-75">{level.stage.id === "s3" ? "Glückwunsch" : "Geschafft"}</h2>
                  {level.stage.id === "s1" && <p className="text-center whitespace-pre-line scale-125 -translate-y-2 px-20"><b>Nice! Du hast Wertetypen gemeistert. Weiter so! 💪</b></p>}
                  {level.stage.id === "s2" && <p className="text-center whitespace-pre-line scale-125 -translate-y-2 px-20"><b> Referenztypen ✅ - du bist genial! Als nächstes kommt alles zusammen.</b></p>}
                  {level.stage.id === "s3" && <p className="text-center whitespace-pre-line scale-125 -translate-y-2 px-20"><b>Alles geschafft - alles gemeistert!<br /><br />Du bist nun erfolgreicher Absolvent und beherrschst Werte- und Referenztypen. Enjoy deine Trophäe: 🏆</b></p>}
                  <ThTextButton width={300} thColor="th-white" gradient={true} shadow={false} text={level.stage.id === "s3" ? "Beenden" : "Weiter 🥳"}
                    onClick={() => {
                      setOpenCompletedStagePopup(false);
                      dismissLevel();
                    }}
                  />
                </div>
              }
            </ThPopup>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto" style={{ width: 0 }}>
            {/*Levels*/}
            <ThDropdown
              position="top-left"
              width={180}
              height={25 + 40 * level.stage.stageLevels.length}
              thColor={buttonsColor}
              button={<ThIconButton thColor={buttonsColor} icon="levels" onClick={() => setOpenLevelsDropdown(true)} />}
              isOpen={openLevelsDropdown}
              onClose={() => setOpenLevelsDropdown(false)}
            >
              <ul className="flex flex-col items-center gap-1 p-3">
                {level.stage.stageLevels.map((stageLevel) => {
                  const stagesProgress = useUserStore(state => state.stagesProgress);
                  const levelStatus = stagesProgress[level.stage.id].levelsStatus.find(levelStatus => levelStatus.id === stageLevel.levelId);
                  const label = !isNaN(parseFloat(stageLevel.label)) ? `Lvl ${stageLevel.label}` : stageLevel.label;

                  return (
                    <li key={stageLevel.levelId}>
                      {levelStatus?.status === "completed" &&
                        <ThMenuTextButton width={150} thColor={buttonsColor} bgThColorShade={20} textGradient={true} text={label}
                          onClick={() => {
                            if (stageLevel.levelId === level.id) { return }
                            thStore.setActiveLevel(null);
                            navigate(`/level/${stageLevel.levelId}`);
                          }}
                        />
                      }
                      {levelStatus?.status === "unlocked" &&
                        <ThMenuTextButton width={150} thColor={buttonsColor} textThColorShade={10} gradient={true} text={label}
                          onClick={() => {
                            if (stageLevel.levelId === level.id) { return }
                            thStore.setActiveLevel(null);
                            navigate(`/level/${stageLevel.levelId}`);
                          }}
                        />
                      }
                      {levelStatus?.status === "locked" && <ThMenuTextButton width={150} thColor={buttonsColor} bgThColorShade={40} textThColorShade={30} text={label} disabled />}
                    </li>
                  )
                })}
              </ul>
            </ThDropdown>

            {/*Exit*/}
            <ThDropdown
              position="top-left"
              width={150}
              height={25 + 40}
              thColor={buttonsColor}
              button={<ThIconButton thColor={buttonsColor} icon="exit" onClick={() => setOpenExitDropdown(true)} />}
              isOpen={openExitDropdown}
              onClose={() => setOpenExitDropdown(false)}
            >
              <div className="flex flex-col items-center gap-1 p-3">
                <ThMenuTextButton width={120} thColor={buttonsColor} text="Exit"
                  onClick={() => {
                    thStore.setActiveLevel(null);
                    navigate('/');
                  }}
                />
              </div>
            </ThDropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelOverlayBottom;