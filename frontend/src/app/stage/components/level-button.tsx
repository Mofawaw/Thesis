import ThMenuTextButton from "@/components/buttons/th-menu-text-button";
import ThRoundButton from "@/components/buttons/th-round-button";
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
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, group === 1 ? 1000 : 2400);

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
              text={label}
              icon={icon}
              onClick={() => setOpenDropdown(!openDropdown)}
            />}
            {levelStatus?.status === "unlocked" && <ThRoundButton
              thColor={stage.color}
              bgThColorShade={70}
              shadowThColorShade={100}
              textThColorShade={20}
              text={label}
              icon={icon}
              tooltipText={!openDropdown ? "Anfangen" : ""}
              onClick={() => setOpenDropdown(!openDropdown)}
            />}
            {levelStatus?.status === "locked" && <ThRoundButton
              thColor={stage.color}
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
            <p className={`h-32 text-center text-th-tint-100`}><b>{stageLevel.category.description}</b></p>
            <ThMenuTextButton width={165} thColor="th-tint" text={"Open"} onClick={() => { }} />
          </div>
        }
        {levelStatus?.status === "unlocked" &&
          <div className="flex flex-col items-center gap-3 p-3 m-2">
            <h3 className={`text-${stage.color}-100`}>{`${stageLevel.levelId.includes("final") ? "Finale" : `Level ${label}`}`}</h3>
            <p className={`h-32 text-center text-${stage.color}-100`}><b>{stageLevel.category.description}</b></p>
            <ThMenuTextButton width={165} thColor={stage.color} bgThColorShade={70} textThColorShade={10} text={"Start"} onClick={() => { }} />
          </div>
        }
        {levelStatus?.status === "locked" &&
          <div className="flex flex-col items-center gap-3 p-3 m-2">
            <h3 className={`text-${stage.color}-70`}>{`${stageLevel.levelId.includes("final") ? "Finale" : `Level ${label}`}`}</h3>
            <p className={`h-32 text-center text-${stage.color}-70`}><b>{stageLevel.category.description}</b></p>
            <ThMenuTextButton width={165} thColor={stage.color} textThColorShade={40} text={"Locked"} onClick={() => { }} />
          </div>
        }
      </ThDropdown>
    </div>
  );
}

export default LevelButton;
