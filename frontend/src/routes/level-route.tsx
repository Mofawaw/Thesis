import Level from "@/app/level/level";
import { fetchAndConfigureLevel } from "@/routes/routing-network";
import tutorialNodes from "@/data (todo-post: backend)/tutorials";
import useThStore from "@/stores/th-store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThPopup from "@/components/portals/th-popup";
import ThMenuTextButton from "@/components/buttons/th-menu-text-button";

const LevelRoute = () => {
  const { levelId } = useParams();
  const activeLevel = useThStore(state => state.activeLevel);
  const [showLevel, setShowLevel] = useState(false);

  const tutorialNodesStage1 = tutorialNodes.filter(node => node.baseNode.id === "tu-s1");
  const tutorialNodesStage2 = tutorialNodes.filter(node => node.baseNode.id === "tu-s2");

  useEffect(() => {
    if (activeLevel) {
      setTimeout(() => setShowLevel(true), 300);
    }
    return () => setShowLevel(false);
  }, [activeLevel]);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Loading Level */}
      {!showLevel && <LoadingLevel key={levelId} levelId={levelId ?? ""} />}

      {/* Level */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showLevel ? 'opacity-100' : 'opacity-0'}`}>
        {activeLevel &&
          <Level
            key={levelId}
            level={activeLevel}
            tutorialNodes={activeLevel.stage.id === "s1" ? tutorialNodesStage1 : (activeLevel.stage.id === "s2" ? tutorialNodesStage2 : tutorialNodes)}
          />
        }
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