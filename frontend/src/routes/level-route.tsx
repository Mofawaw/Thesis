import Level from "@/app/level/level";
import { fetchLevelAndSetActiveLevel } from "@/routes/routing-network";
import tutorialNodes from "@/data (todo-post: backend)/tutorials";
import getRandomIntBetween from "@/helpers/random";
import useThStore from "@/stores/th-store";
import { ThLevel } from "@/types/th-types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThPopup from "@/components/portals/th-popup";
import ThMenuTextButton from "@/components/buttons/th-menu-text-button";

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
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [openMessageToStagePopup, setOpenMessageToStagePopup] = useState<{ title: string, message: string } | null>(null);

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

      fetchLevelAndSetActiveLevel(levelId)
        .then(() => {
          setProgress(100);
          setTimeout(() => setIsLoading(false), 1500);
        })
        .catch((error) => {
          if (error) {
            setOpenMessageToStagePopup(error);
          } else {
            navigate('/');
          }
        });
    }, 0);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [levelId]);

  return (
    <div className={`w-screen h-screen flex flex-col justify-center items-center gap-5 th-bg-gradient`}>
      <ThPopup
        width={450}
        height={300}
        thColor={"th-black"}
        backgroundClass={"bg-none"}
        button={<></>}
        isOpen={openMessageToStagePopup !== null}
        onClose={() => { }}
      >
        <div className="h-full flex flex-col items-center justify-between p-12">
          <h3>{openMessageToStagePopup?.title}</h3>
          <div className="pb-10">
            <p className="text-center whitespace-pre-line mt-4">{openMessageToStagePopup?.message}</p>
          </div>
          <div className="flex flex-row gap-3">
            <ThMenuTextButton width={150} thColor="th-black" text="Verstanden"
              onClick={() => {
                setOpenMessageToStagePopup(null);
                navigate('/');
              }}
            />
          </div>
        </div>
      </ThPopup>
    </div>
  );
}