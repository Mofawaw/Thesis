import { useEffect, useState } from "react";
import ThButton from "../custom/ThButton";
import ThTextButton from "../custom/ThTextButton";
import { ThLevel } from "./types/thTypes";
import useTestingStore from "../../testing-1/testingStore"; // MARK: Testing
import ThStarIconButton from "../custom/ThStarIconButton";

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
          <div style={{ width: 200 }}>
            <ThButton width={140} height={200} thColor={level.stage.color} onClick={() => store.nextLevel(false, true)}> {/* MARK: Testing */}
              <div className="flex flex-col items-center p-2 gap-4">
                {imageSrc && <img src={imageSrc} alt={level.stage.logo} />}
                <h3 className={`text-${level.stage.color}-100`}>{level.label}</h3>
              </div>
            </ThButton>
          </div>

          <ThTextButton width={700} thColor={level.stage.color} text={level.stage.label + " - " + level.category.label} onClick={() => store.nextLevel(true, false)} /> {/* MARK: Testing */}

          <ThStarIconButton width={200} height={200} />
        </div>
      </div>
    </div>
  );
};
