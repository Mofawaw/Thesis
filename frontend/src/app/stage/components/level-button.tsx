import ThRoundButton from "@/components/buttons/th-round-button";
import { useEffect, useState } from "react";

export interface LevelButtonProps {
  name: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

const LevelButton: React.FC<LevelButtonProps> = ({
  name,
  group,
  x = 0,
  y = 0,
  fx = null,
  fy = null,
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, group === 1 ? 1000 : 2400);

    return () => clearTimeout(timeout);
  }, [group]);

  return (
    <div style={{ opacity, transition: 'opacity 800ms ease-in-out' }}>
      {group === 1 && <ThRoundButton thColor="th-tint" bgThColorShade={70} shadowThColorShade={100} textThColorShade={20} text={name} />}
      {group === 2 && <ThRoundButton thColor="th-value" text={name} />}
    </div>
  );
}

export default LevelButton;