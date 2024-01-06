import { useReactFlow } from "reactflow";
import ThIconButton from "../custom/ThIconButton";
import ThIconTextButton from "../custom/ThIconTextButton";
import ThTextButton from "../custom/ThTextButton";
import ThDropdown from "../portals/ThDropdown";
import ThMenuTextButton from "../custom/ThMenuTextButton";
import { sampleLevelNode } from './levelHelper';
import LevelNode from "./types/LevelNode";
import ThPopup from "../portals/ThPopup";

export const LevelOverlayBottom = ({ onAddNode }: { onAddNode: (node: LevelNode) => (void) }) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

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
          <ThIconTextButton thColor="th-reference" icon="Tipps" text={"Tipps"} />
          <ThDropdown
            width={200}
            height={105}
            thColor="th-reference"
            trigger={
              <ThIconTextButton thColor="th-reference" icon="Tutorial" text="Tutorial" />
            }
          >
            <ul className="flex flex-col items-center gap-1 p-3">
              <li><ThMenuTextButton width={180} thColor="th-reference" text="Wertetypen" onClick={() => onAddNode(sampleLevelNode)} /></li>
              <li><ThMenuTextButton width={180} thColor="th-reference" text="Referenztypen" /></li>
            </ul>
          </ThDropdown>
          <ThPopup
            width={800}
            height={600}
            thColor="th-reference"
            trigger={
              <ThIconTextButton thColor="th-reference" icon="Check" text={"Check"} />
            }
          >
            <></>
          </ThPopup>
        </div>
      </div>
    </div>
  );
};

export const LevelOverlayTop = () => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          {/* <ThButton width={120} height={150} thColor="th-reference" /> */}
          <div className="w-[100px]" />
          <ThTextButton width={300} thColor="th-reference" text="Coding Challenge" />
          <div className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};