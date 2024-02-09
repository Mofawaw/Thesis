import ThRoundButton from "@/components/buttons/th-round-button";
import ThDropdown from "@/components/portals/th-dropdown";
import useUserStore from "@/stores/user-store";
import { ThStage } from "@/types/th-types";
import { ThCastleKey } from "@/utilities/th-castle";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface LevelButtonProps {
  stage: ThStage;
  levelId: string;
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
  levelId,
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
  const levelStatus = stagesProgress[stage.id].levelsStatus.find(levelStatus => levelStatus.id === levelId);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, group === 1 ? 1000 : 2400);

    return () => clearTimeout(timeout);
  }, [group]);

  return (
    <div className="pointer-events-auto" style={{ opacity, transition: 'opacity 800ms ease-in-out' }}>
      <ThDropdown
        width={300}
        height={200}
        thColor={stage.color}
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
        <div className="flex flex-col items-center gap-3 p-3">
          <h3 className={`text-${stage.color}-100`}>{`Level ${label}`}</h3>
          <p></p>
        </div>
      </ThDropdown>
    </div>
  );
}

export default LevelButton;
