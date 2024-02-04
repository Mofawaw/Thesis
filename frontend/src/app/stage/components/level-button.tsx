import ThRoundButton from "@/components/buttons/th-round-button";
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
      {levelStatus?.status === "completed" && <ThRoundButton thColor="th-tint" bgThColorShade={70} shadowThColorShade={100} textThColorShade={20} text={label} icon={icon} />}
      {levelStatus?.status === "unlocked" && <ThRoundButton thColor={stage.color} bgThColorShade={70} shadowThColorShade={100} textThColorShade={20} text={label} icon={icon} tooltipText="Anfangen" onClick={() => navigate(`/level/${levelId}`)} />}
      {levelStatus?.status === "locked" && <ThRoundButton thColor={stage.color} text={label} icon={icon} />}
    </div>
  );
}

export default LevelButton;
