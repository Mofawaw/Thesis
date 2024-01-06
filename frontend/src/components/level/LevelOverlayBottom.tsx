import { useReactFlow } from "reactflow";
import ThIconButton from "../custom/ThIconButton";
import ThIconTextButton from "../custom/ThIconTextButton";
import ThDropdown from "../portals/ThDropdown";
import ThMenuTextButton from "../custom/ThMenuTextButton";
import { sampleLevelNode } from './levelHelper';
import LevelNode from "./types/LevelNode";
import ThPopup from "../portals/ThPopup";
import { useState } from "react";

export default function LevelOverlayBottom({ onAddNode }: { onAddNode: (node: LevelNode) => (void) }) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [openTippsDropdown, setOpenTippsDropdown] = useState<boolean>(false);
  const [openTutorialDropdown, setOpenTutorialDropdown] = useState<boolean>(false);
  const [openCheckPopup, setOpenCheckPopup] = useState<boolean>(false);
  const [onChecking, setOnChecking] = useState<boolean>(false);

  function handleCheckButtonOnClick() {
    // Logic to handle result
    setOnChecking(true);
    setTimeout(() => {
      setOnChecking(false);
      setOpenCheckPopup(true);
    }, 5000);
  }

  function handleCheckButtonOnClose() {
    setOpenCheckPopup(false);
    // Logic to handle going to stage, ...
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
            thColor="th-reference"
            button={
              <ThIconTextButton thColor="th-reference" icon="Tipps" text="Tipps" onClick={() => setOpenTippsDropdown(true)} />
            }
            isOpen={openTippsDropdown}
            onClose={() => setOpenTippsDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              <li><ThMenuTextButton width={120} thColor="th-reference" text="Lösung" /></li>
              <li><ThMenuTextButton width={120} thColor="th-reference" text="Tipp 2" /></li>
              <li><ThMenuTextButton width={120} thColor="th-reference" text="Tipp 1" /></li>
            </ul>
          </ThDropdown>

          {/*Tutorial*/}
          <ThDropdown
            width={200}
            height={105}
            thColor="th-reference"
            button={
              <ThIconTextButton thColor="th-reference" icon="Tutorial" text="Tutorial" onClick={() => setOpenTutorialDropdown(!openTutorialDropdown)} />
            }
            isOpen={openTutorialDropdown}
            onClose={() => setOpenTutorialDropdown(false)}
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              <li><ThMenuTextButton width={180} thColor="th-reference" text="Referenztypen" /></li>
              <li>
                <ThMenuTextButton width={180} thColor="th-reference" text="Wertetypen"
                  onClick={() => {
                    onAddNode(sampleLevelNode);
                    setOpenTutorialDropdown(false);
                  }}
                />
              </li>
            </ul>
          </ThDropdown>

          {/*Check*/}
          <ThPopup
            width={800}
            height={600}
            thColor="th-reference"
            button={
              <ThIconTextButton thColor="th-reference" icon="Check" text={"Check"} isLoading={onChecking} onClick={handleCheckButtonOnClick} />
            }
            isOpen={openCheckPopup}
            onClose={handleCheckButtonOnClose}
          >
            <></>
          </ThPopup>
        </div>
      </div>
    </div>
  );
};