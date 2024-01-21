import ThRoundButton from "@/components/buttons/th-round-button";
import useThStore from "@/stores/th-store";
import { ThCastleKey } from "@/utilities/th-castle";
import { useEffect, useState } from "react";

export interface LevelButtonProps {
  level_id: string;
  label?: string | null;
  icon?: ThCastleKey | null;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

const LevelButton: React.FC<LevelButtonProps> = ({
  level_id,
  label = null,
  icon = null,
  group,
  x = 0,
  y = 0,
  fx = null,
  fy = null,
}) => {
  const activeStage = useThStore(state => state.activeStage);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, group === 1 ? 1000 : 2400);

    return () => clearTimeout(timeout);
  }, [group]);

  return (
    <div className="pointer-events-auto" style={{ opacity, transition: 'opacity 800ms ease-in-out' }}>
      {group === 1 && <ThRoundButton thColor="th-tint" bgThColorShade={70} shadowThColorShade={100} textThColorShade={20} text={label} icon={icon} />}
      {group === 2 && <ThRoundButton thColor={activeStage.color} text={label} icon={icon} />}
    </div>
  );
}

export default LevelButton;