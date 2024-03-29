import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stage from "@/app/stage/stage";
import useThStore from "@/stores/th-store";
import useUserStore from "@/stores/user-store";
import ThPopup from "@/components/portals/th-popup";
import ThTextButton from "@/components/buttons/th-text-button";

const StageRoute = ({ isInitialLoading }: { isInitialLoading: boolean }) => {
  const navigate = useNavigate();
  const stages = useThStore(state => state.stages);
  const userStore = useUserStore.getState();
  const [showStage, setShowStage] = useState(false);
  const [showFirstVisitPopup, setShowFirstVisitPopup] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    if (!isInitialLoading) {
      if (!userStore.userProgress?.completedTutorial) {
        setShowFirstVisitPopup(true);
        return;
      }

      timeoutId = setTimeout(() => setShowStage(true), 500);
    }

    return () => clearTimeout(timeoutId);
  }, [isInitialLoading]);

  return (
    <div className="relative w-screen h-screen bg-th-gradient-angular">
      {/* Loading */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isInitialLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Loading />

        {/*First Visit Popup*/}
        <ThPopup
          width={800}
          height={500}
          thColor={"th-tint"}
          backgroundClass={"th-bg-gradient"}
          button={<></>}
          isOpen={showFirstVisitPopup}
          onClose={() => { }}
        >
          {showFirstVisitPopup &&
            <div className="h-full flex flex-col items-center justify-between p-12">
              <h2 className="text-th-tint-100 scale-75">Willkommen 🎉</h2>
              <p className="text-center whitespace-pre-line scale-125 -translate-y-2"><b>Meistere Werte und Referenztypen in Python!</b></p>
              <ThTextButton width={300} thColor="th-tint" text="Los gehts 🙌"
                onClick={() => {
                  setShowFirstVisitPopup(false);
                  setShowStage(true);
                  navigate('/level/tutorial');
                }}
              />
            </div>
          }
        </ThPopup>
      </div>

      {/* Stage Component */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showStage && stages ? 'opacity-100' : 'opacity-0'}`}>
        <Stage stages={stages} />
      </div>
    </div>
  );
}

export default StageRoute;

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center text-center bg-th-gradient-angular">
      <h1><span className="text-th-value-100">Werte</span><span className="text-th-together-100"> &</span><br /><span className="text-th-reference-100">Referenzen</span></h1>
    </div>
  )
}