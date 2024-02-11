import Level from "@/app/level/level";
import { fetchAndConfigureLevel } from "@/routes/routing-network";
import tutorialNodes from "@/data (todo-post: backend)/tutorials";
import useThStore from "@/stores/th-store";
import useUserStore from "@/stores/user-store";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ThPopup from "@/components/portals/th-popup";
import ThMenuTextButton from "@/components/buttons/th-menu-text-button";

const LevelRoute = () => {
  const location = useLocation();
  const { levelId } = useParams();
  const userStore = useUserStore.getState();
  const activeLevel = useThStore(state => state.activeLevel);

  const [showLevel, setShowLevel] = useState(false);

  useEffect(() => {
    if (activeLevel) {
      setTimeout(() => setShowLevel(true), 300);
    }
    return () => setShowLevel(false);
  }, [activeLevel]);

  // Persist progress data when closing level
  useEffect(() => {
    updateUserProgress();

    return () => {
      updateUserProgress()
    }
  }, [location, activeLevel]);

  // Persist progress data when site is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateUserProgress();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [activeLevel]);

  function updateUserProgress() {
    if (activeLevel) {
      console.log("Updating level progress nodes to LocalStorage.");
      userStore.updateLevelProgressCurrentNodes(activeLevel);
      userStore.updateLevelProgressCurrentTippNodes(activeLevel);
    }
  }

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Loading Level */}
      {!showLevel && <LoadingLevel key={levelId} levelId={levelId ?? ""} />}

      {/* Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showLevel ? 'opacity-100' : 'opacity-0'}`}>
        {activeLevel && <Level key={levelId} level={activeLevel} tutorialNodes={tutorialNodes} />}
      </div>
    </div>
  );
}

export default LevelRoute;

const LoadingLevel = ({ levelId }: { levelId: string }) => {
  const navigate = useNavigate();
  const [openMessageToStagePopup, setOpenMessageToStagePopup] = useState<{ title: string, message: string } | null>(null);

  useEffect(() => {
    fetchAndConfigureLevel(levelId)
      .catch((error) => {
        if (error) {
          setOpenMessageToStagePopup(error);
        } else {
          navigate('/');
        }
      });
  }, []);

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