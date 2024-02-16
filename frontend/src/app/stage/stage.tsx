import ThStarUserButton from '@/components/buttons/th-star-user-button';
import Levels from './components/levels';
import ThCastleButton from '@/components/buttons/th-castle-button';
import { ThStage } from '@/types/th-types';
import useUserStore from '@/stores/user-store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThIcon } from '@/utilities/th-icon';

interface StageProps {
  stages: ThStage[];
}

const Stage: React.FC<StageProps> = ({
  stages,
}) => {
  const navigate = useNavigate();
  const userStore = useUserStore.getState();
  const [openInfoPopup, setOpenInfoPopup] = useState<boolean>(false);

  const getClassFromProgress = (stage: "s1" | "s2" | "s3", lockedClass: string, unlockedClass: string, completedClass: string) => {
    return userStore.stagesProgress[stage]?.status === "completed" ? completedClass : (userStore.stagesProgress[stage]?.status === "unlocked" ? unlockedClass : lockedClass)
  }

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed left-[-50vw] top-[-50vh] th-bg-gradient-angular z-0" />

      {/* Levels */}
      <div className="w-screen h-screen absolute z-30 pointer-events-none">
        <Levels stages={stages} />
      </div>

      {/* Overlay-Top */}
      <div className="w-screen absolute top-10 z-20 flex flex-row justify-between">
        <div style={{ width: 200 }} className="pointer-events-auto" />
        <h2 className="text-th-black-20 text-center">
          {<span>
            <span className={getClassFromProgress("s1", "text-th-black-30", "text-th-value-100", "th-text-gradient")}>Werte</span>
            <span className={getClassFromProgress("s3", "text-th-black-30", "text-th-together-100", "th-text-gradient")}> &</span><br />
            <span className={getClassFromProgress("s2", "text-th-black-30", "text-th-reference-100", "th-text-gradient")}>Referenzen</span>
          </span>}
        </h2>
        <div style={{ width: 200 }} className="flex flex-row justify-end pr-10 pointer-events-auto" >
          <button className={`
            h-[3.75rem] w-[3.75rem] transition duration-150 ease-in-out rotate-12
            hover:scale-110
            active:scale-95 active:duration-100
          `}>
            <ThIcon icon="tutorial" className="h-[3.75rem] w-[3.75rem] text-th-tint-70" />
          </button>
        </div>
      </div>

      {/* Overlay-Bottom */}
      <div className="w-screen absolute bottom-0 z-10 flex flex-row gap-24 justify-center items-center pointer-events-auto -translate-y-6">
        <ThCastleButton castle="castle-value" color={getClassFromProgress("s1", "grey", "stage", "tint") as "grey" | "stage" | "tint" | "tint-grey"} />
        <div className="-translate-y-32">
          <ThCastleButton castle="castle-together" color={getClassFromProgress("s3", "grey", "stage", "tint") as "grey" | "stage" | "tint" | "tint-grey"} />
        </div>
        <ThCastleButton castle="castle-reference" color={getClassFromProgress("s2", "grey", "stage", "tint") as "grey" | "stage" | "tint" | "tint-grey"} />
      </div>
      <div className="w-screen absolute bottom-0 z-20 flex flex-row justify-center translate-y-36 pointer-events-none" >
        <div className="pointer-events-auto" >
          <ThStarUserButton width={360} height={360} iconWidth="small" />
        </div>
      </div>
    </div>
  );
}

export default Stage;
