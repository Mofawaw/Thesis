import ThRoundButton from "@/components/buttons/th-round-button";
import ThTextButton from "@/components/buttons/th-text-button";
import ThDropdown from "@/components/portals/th-dropdown";
import useUserStore from "@/stores/user-store";
import { ThStage, ThStageLevel } from "@/types/th-types";
import { ThCastleKey } from "@/utilities/th-castle";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface LevelButtonProps {
  stage: ThStage;
  stageLevel: ThStageLevel;
  label?: string | null;
  icon?: ThCastleKey | null;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

export const levelButtonRadius = 55;

const LevelButton: React.FC<LevelButtonProps> = ({
  stage,
  stageLevel,
  label = null,
  icon = null,
  group,
  x = 0,
  y = 0,
  fx = null,
  fy = null,
}) => {
  const [opacity, setOpacity] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  const stagesProgress = useUserStore(state => state.stagesProgress);
  const levelStatus = stagesProgress[stage.id].levelsStatus.find(levelStatus => levelStatus.id === stageLevel.levelId);

  useEffect(() => {
    let timeout: any;

    if (stagesProgress[stage.id].status === "locked") {
      timeout = setTimeout(() => {
        setOpacity(1);
      }, 300);
    } else {
      timeout = setTimeout(() => {
        setOpacity(1);
      }, group === 1 ? 300 : 900);
    }

    return () => clearTimeout(timeout);
  }, [group]);

  return (
    <div className="pointer-events-auto" style={{ opacity, transition: 'opacity 800ms ease-in-out' }}>
      <ThDropdown
        width={350}
        height={260}
        thColor={levelStatus?.status === "completed" ? "th-tint" : stage.color}
        button={
          <>
            {levelStatus?.status === "completed" && <ThRoundButton
              thColor="th-tint"
              bgThColorShade={70}
              shadowThColorShade={100}
              textThColorShade={20}
              radius={levelButtonRadius}
              text={label}
              icon={icon}
              onClick={() => setOpenDropdown(!openDropdown)}
            />}
            {levelStatus?.status === "unlocked" && <ThRoundButton
              thColor={stage.color}
              bgThColorShade={70}
              shadowThColorShade={100}
              textThColorShade={20}
              radius={levelButtonRadius}
              text={label}
              icon={icon}
              tooltipText={!openDropdown ? "Anfangen" : ""}
              onClick={() => setOpenDropdown(!openDropdown)}
            />}
            {levelStatus?.status === "locked" && <ThRoundButton
              thColor={stage.color}
              radius={levelButtonRadius}
              text={label}
              icon={icon}
              onClick={() => setOpenDropdown(!openDropdown)}
            />}
          </>
        }
        isOpen={openDropdown}
        onClose={() => setOpenDropdown(false)}
      >
        {levelStatus?.status === "completed" &&
          <div className="flex flex-col items-center gap-3 p-3 m-2">
            <h3 className={`text-th-tint-100`}>{`${stageLevel.levelId.includes("final") ? "Finale" : `Level ${label}`}`}</h3>
            <p className={`h-28 text-center text-th-tint-100`}><b>{stageLevel.category.description}</b></p>
            <ThTextButton width={200} thColor="th-tint" text={"Öffnen"} onClick={() => { navigate(`/level/${stageLevel.levelId}`) }} />
          </div>
        }
        {levelStatus?.status === "unlocked" &&
          <div className="flex flex-col items-center gap-3 p-3 m-2">
            <h3 className={`text-${stage.color}-100`}>{`${stageLevel.levelId.includes("final") ? "Finale" : `Level ${label}`}`}</h3>
            <p className={`h-28 text-center text-${stage.color}-100`}><b>{stageLevel.category.description}</b></p>
            <ThTextButton width={200} thColor={stage.color} bgThColorShade={70} textThColorShade={10} text={"Start"} onClick={() => { navigate(`/level/${stageLevel.levelId}`) }} />
          </div>
        }
        {levelStatus?.status === "locked" &&
          <div className="flex flex-col items-center gap-3 p-3 m-2">
            <h3 className={`text-${stage.color}-70`}>{`${stageLevel.levelId.includes("final") ? "Finale" : `Level ${label}`}`}</h3>
            <p className={`h-28 text-center text-${stage.color}-70`}><b>{stageLevel.category.description}</b></p>
            <ThTextButton width={200} thColor={stage.color} textThColorShade={40} text={"Gesperrt"} />
          </div>
        }
      </ThDropdown>
    </div>
  );
}

export default LevelButton;
