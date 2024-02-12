import ThButton from "@/components/buttons/th-button.tsx";
import ThTextButton from "@/components/buttons/th-text-button.tsx";
import ThStarUserButton from "@/components/buttons/th-star-user-button";
import { ThLevel } from "@/types/th-types.ts";
import { ThCastle } from "@/utilities/th-castle";
import useUserStore from "@/stores/user-store";

interface LevelOverlayTopProps {
  level: ThLevel;
}

const LevelOverlayTop: React.FC<LevelOverlayTopProps> = ({
  level,
}) => {
  const userStore = useUserStore.getState();
  const label = !isNaN(parseFloat(level.label)) ? `Lvl ${level.label}` : level.label;
  const stageProgress = userStore.stagesProgress[level.stage.id];
  const levelProgress = userStore.levelsProgress[level.id];
  const buttonsColor = levelProgress.status === "completed" ? "th-tint" : level.stage.color;

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          <div style={{ width: 165 }}>
            <ThButton width={115} height={155} thColor={buttonsColor} >
              <div className="flex flex-col items-center -translate-y-1">
                <ThCastle castle={level.stage.logo} color={stageProgress.status === "completed" ? "tint" : "stage"} className="w-[6.5rem]" />
                <h3 className={levelProgress.status === "completed" ? "th-text-gradient" : `text-${buttonsColor}-100 scale-90 -translate-y-4`}>{label}</h3>
              </div>
            </ThButton>
          </div>

          <ThTextButton width={650} thColor={buttonsColor} text={level.stage.label + " - " + level.category.label} />

          <ThStarUserButton width={165} height={165} iconWidth="large" />
        </div>
      </div>
    </div>
  );
};

export default LevelOverlayTop;