import ThStarUserButton from '@/components/buttons/th-star-user-button';
import Levels from './components/levels';
import ThCastleButton from '@/components/buttons/th-castle-button';
import { ThStage } from '@/types/th-types';
import useUserStore from '@/stores/user-store';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThIcon } from '@/utilities/th-icon';
import ThStageButton from '@/components/buttons/th-stage-button';
import ThPopup from '@/components/portals/th-popup';
import ThMenuTextButton from '@/components/buttons/th-menu-text-button';
import ThTextButton from '@/components/buttons/th-text-button';

interface StageProps {
  stages: ThStage[];
}

const Stage: React.FC<StageProps> = ({
  stages,
}) => {
  const navigate = useNavigate();
  const userStore = useUserStore.getState();
  const [openExtrasPopup, setOpenExtrasPopup] = useState<boolean>(false);

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
        <div style={{ width: 200 }}></div>
        <h2 className="text-th-black-20 text-center">
          {<span>
            <span className={getClassFromProgress("s1", "text-th-black-30", "text-th-value-100", "th-text-gradient")}>Werte</span>
            <span className={getClassFromProgress("s3", "text-th-black-30", "text-th-together-100", "th-text-gradient")}> &</span><br />
            <span className={getClassFromProgress("s2", "text-th-black-30", "text-th-reference-100", "th-text-gradient")}>Referenzen</span>
          </span>}
        </h2>
        <div style={{ width: 200 }} className="flex flex-col items-end gap-6 pr-10 pointer-events-auto" >
          <ThPopup
            width={310}
            height={25 + 65 * 3}
            thColor={"th-tint"}
            backgroundClass={"bg-none"}
            button={<ThStageButton thColor="th-tint" thColorShade={70} icon="star" onClick={() => setOpenExtrasPopup(true)} />}
            isOpen={openExtrasPopup}
            onClose={() => setOpenExtrasPopup(false)}
          >
            <ul className="flex flex-col items-center gap-3 p-5">
              <li><ThTextButton width={270} thColor="th-tint" text="Tutorial" onClick={() => navigate('/level/tutorial')} /></li>
              <li><ThTextButton width={270} thColor="th-tint" text="Üben Leere IDE" onClick={() => navigate('/level/blank')} /></li>
              <li><ThTextButton width={270} thColor="th-black" shadow={false} gradient={true} text="Üben mit AI" /></li>
            </ul>
          </ThPopup>
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
