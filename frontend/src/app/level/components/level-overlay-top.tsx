import ThButton from "@/components/buttons/th-button.tsx";
import ThTextButton from "@/components/buttons/th-text-button.tsx";
import ThStarUserButton from "@/components/buttons/th-star-user-button";
import useThStore from "@/stores/th-store";
import { ThLevel } from "@/types/th-types.ts";
import { ThCastle } from "@/utilities/th-castle";

interface LevelOverlayTopProps {
  level: ThLevel;
}

const LevelOverlayTop: React.FC<LevelOverlayTopProps> = ({
  level,
}) => {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          <div style={{ width: 200 }}>
            <ThButton width={140} height={200} thColor={level.stage.color} >
              <div className="flex flex-col items-center p-2 gap-4">
                <ThCastle castle={level.stage.logo} />
                <h3 className={`text-${level.stage.color}-100`}>{level.label}</h3>
              </div>
            </ThButton>
          </div>

          <ThTextButton width={700} thColor={level.stage.color} text={level.stage.label + " - " + level.category.label} />

          <ThStarUserButton width={200} height={200} />
        </div>
      </div>
    </div>
  );
};

export default LevelOverlayTop;