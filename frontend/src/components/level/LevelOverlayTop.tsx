import { useEffect, useState } from "react";
import ThButton from "../custom/ThButton";
import ThTextButton from "../custom/ThTextButton";
import { ThLevel } from "./types/thTypes";
import useTestingStore from "../../testing-1/testingStore";

export default function LevelOverlayTop({ level }: { level: ThLevel }) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const store = useTestingStore.getState();

  useEffect(() => {
    import(`../../assets/images/${level.stage.logo}.svg`)
      .then(image => {
        setImageSrc(image.default);
      })
      .catch(error => {
        console.error('Failed to load image:', error);
      });
  }, [level.stage.logo]);

  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          <ThButton width={120} height={150} thColor={level.stage.color} onClick={() => store.nextLevel(store.currentLevel.id)}>
            <div className="flex flex-col items-center p-2 gap-2">
              {imageSrc && <img src={imageSrc} className="w-20" alt={level.stage.logo} />}
              <h4 className={`text-${level.stage.color}-100`}>{level.label}</h4>
            </div>
          </ThButton>
          <ThTextButton width={550} thColor={level.stage.color} text={level.stage.label + " - " + level.category.label} />
          <div className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};
