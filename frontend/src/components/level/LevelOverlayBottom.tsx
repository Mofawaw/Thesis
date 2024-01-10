import { Node, useReactFlow } from "reactflow";
import ThIconButton from "../custom/ThIconButton";
import ThIconTextButton from "../custom/ThIconTextButton";
import ThDropdown from "../portals/ThDropdown";
import ThMenuTextButton from "../custom/ThMenuTextButton";
import ThPopup from "../portals/ThPopup";
import { useState } from "react";
import ThTextButton from "../custom/ThTextButton.tsx";
import { ThLevel, ThLevelNode } from "./types/thTypes.ts";
import { evaluateLevelCompletion } from "./logic/levelEvaluation.ts";
import { sampleLevelNode } from "./levelData.ts";

export default function LevelOverlayBottom({ nodes, level, onAddNode }: { nodes: Node[], level: ThLevel, onAddNode: (node: ThLevelNode) => (void) }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [openTippsDropdown, setOpenTippsDropdown] = useState<boolean>(false);
  const [openTutorialDropdown, setOpenTutorialDropdown] = useState<boolean>(false);
  const [openCheckResultsPopup, setOpenCheckResultsPopup] = useState<{ success?: boolean, fail?: boolean, title: string, message: string }>();
  const [onChecking, setOnChecking] = useState<boolean>(false);

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
    setOpenCheckResultsPopup({ success: false, fail: false, title: "", message: "" });
    // Todo: Logic to handle going to stage, ...
  }

  return (
    <div className="relative">
      <div className="absolute left-3 bottom-3">
        <div className="flex flex-col gap-3">
          <ThIconButton thColor="th-tint" icon="Plus" onClick={() => zoomIn({ duration: 300 })} />
          <div className="flex flex-row gap-3">
            <ThIconButton thColor="th-tint" icon="Fit" onClick={() => fitView({ padding: 0.1, includeHiddenNodes: true, duration: 300 })} />
            <ThIconButton thColor="th-tint" icon="Minus" onClick={() => zoomOut({ duration: 300 })} />
          </div>
        </div>
      </div>

      <div className="absolute right-3 bottom-3">
        <div className="flex flex-row gap-3">
          {/*Tipps*/}
          <ThDropdown
            width={140}
            height={145}
            thColor={level.stage.color}
            button={
              <ThIconTextButton thColor={level.stage.color} icon="Tipps" text="Tipps" onClick={() => setOpenTippsDropdown(true)} />
            }
            isOpen={openTippsDropdown}
            onClose={() => setOpenTippsDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              <li><ThMenuTextButton width={120} thColor={level.stage.color} text="Lösung" /></li>
              <li><ThMenuTextButton width={120} thColor={level.stage.color} text="Tipp 2" /></li>
              <li><ThMenuTextButton width={120} thColor={level.stage.color} text="Tipp 1" /></li>
            </ul>
          </ThDropdown>

          {/*Tutorial*/}
          <ThDropdown
            width={200}
            height={105}
            thColor={level.stage.color}
            button={
              <ThIconTextButton thColor={level.stage.color} icon="Tutorial" text="Tutorial" onClick={() => setOpenTutorialDropdown(!openTutorialDropdown)} />
            }
            isOpen={openTutorialDropdown}
            onClose={() => setOpenTutorialDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              { }
              <li><ThMenuTextButton width={180} thColor={level.stage.color} text="Referenztypen" /></li>
              <li>
                <ThMenuTextButton width={180} thColor={level.stage.color} text="Wertetypen"
                  onClick={() => {
                    onAddNode(sampleLevelNode); // Todo
                    setOpenTutorialDropdown(false);
                  }}
                />
              </li>
            </ul>
          </ThDropdown>

          {/*Check*/}
          <ThPopup
            width={openCheckResultsPopup?.success ? 1000 : 650}
            height={openCheckResultsPopup?.success ? 600 : 800}
            thColor={openCheckResultsPopup?.success ? "th-tint" : "th-black"}
            backgroundClass={openCheckResultsPopup?.success ? "th-bg-gradient" : "bg-none"}
            button={
              <ThIconTextButton thColor={level.stage.color} icon="Check" text={"Check"} isLoading={onChecking} onClick={handleCheckButtonOnClick} />
            }
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