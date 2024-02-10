import Level from "@/app/level/level";
import { fetchLevelAndSetActiveLevel } from "@/data (todo-post: backend)/th-network";
import tutorialNodes from "@/data (todo-post: backend)/tutorials";
import getRandomIntBetween from "@/helpers/random";
import useThStore from "@/stores/th-store";
import { ThLevel } from "@/types/th-types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LevelRoute = () => {
  const { levelId } = useParams();
  const activeLevel = useThStore(state => state.activeLevel);
  const [showLevel, setShowLevel] = useState(false);

  useEffect(() => {
    if (activeLevel) {
      setTimeout(() => setShowLevel(true), 300);
    }

    return () => setShowLevel(false);
  }, [activeLevel]);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Loading Level */}
      {!showLevel && <LoadingLevel key={levelId} activeLevel={activeLevel} levelId={levelId ?? ""} />}

      {/* Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showLevel ? 'opacity-100' : 'opacity-0'}`}>
        {activeLevel && <Level key={levelId} level={activeLevel} tutorialNodes={tutorialNodes} />}
      </div>
    </div>
  );
}

export default LevelRoute;

const LoadingLevel = ({ activeLevel, levelId }: { activeLevel?: ThLevel | null, levelId: string }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);

    let intervalId: any;
    let timeoutId: any;

    const totalDuration = getRandomIntBetween(100, 3000);
    const intervalDuration = 1000;
    const incrementPerInterval = 100 / (totalDuration / intervalDuration);

    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + getRandomIntBetween(incrementPerInterval * 0.5, incrementPerInterval * 1.5);;
          return newProgress < 100 ? newProgress : 100;
        });
      }, intervalDuration);

      fetchLevelAndSetActiveLevel(levelId).then(() => {
        setProgress(100);
        setTimeout(() => setIsLoading(false), 1500);
      });
    }, 0);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [levelId]);

  const loadingText = progress < 100 ? (progress < 67 ? 'Level lädt...' : 'Fast fertig...') : 'Los gehts!';
  const barColor = progress < 100 ? 'bg-th-black-30' : (activeLevel ? `bg-${activeLevel.stage.color}-100` : 'bg-th-black-30');

  return (
    <div className={`w-screen h-screen flex flex-col justify-center items-center gap-5 th-bg-gradient`}>
      <h3 className={`text-${activeLevel ? activeLevel.stage.color : "th-black"}-100 text-center`}>{loadingText}</h3>
      <div className="w-2/4">
        <div className={`h-8 rounded-th bg-th-black-10`}>
          <div className={`h-8 rounded-th ${barColor} transition-all duration-100`} style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}