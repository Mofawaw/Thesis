import ThStarUserButton from '@/components/buttons/th-star-user-button';
import Levels from './components/levels';
import useThStore from '@/stores/th-store';
import ThCastleButton from '@/components/buttons/th-castle-button';
import { ThStage } from '@/types/th-types';
import useUserStore from '@/stores/user-store';

interface StageProps {
  stage: ThStage;
}

const Stage: React.FC<StageProps> = ({
  stage,
}) => {
  const { setActiveStage } = useThStore.getState();
  const userStore = useUserStore.getState();

  return (
    <div className="w-screen h-screen relative">
      {/* Background */}
      <div className="fixed left-[-50vw] top-[-50vh] th-bg-gradient-angular z-0" />

      {/* Levels */}
      <div className="w-screen h-screen absolute z-30 pointer-events-none">
        <Levels stage={stage} />
      </div>

      {/* Overlay-Top */}
      <div className="w-screen absolute top-10 z-20 flex flex-row justify-center">
        <h2 className="text-th-black-20 text-center">
          {stage.id === "s1" && <span><span className={userStore.stagesProgress['s1'].status === "completed" ? "th-text-gradient" : `text-th-value-100`}>Werte</span> &<br />Referenzen</span>}
          {stage.id === "s2" && <span>Werte &<br /><span className={userStore.stagesProgress['s2'].status === "completed" ? "th-text-gradient" : `text-th-reference-100`}>Referenzen</span></span>}
          {stage.id === "s3" && <span className={userStore.stagesProgress['s3'].status === "completed" ? "th-text-gradient" : `text-th-together-100`}>Werte &<br />Referenzen</span>}
        </h2>
      </div>

      {/* Overlay-Bottom */}
      <div className="w-screen absolute bottom-0 z-10 flex flex-row gap-28 justify-center items-center pointer-events-auto -translate-y-6">
        <ThCastleButton castle="castle-value" color={stage.id === 's1' ? (userStore.stagesProgress['s1'].status === "completed" ? "tint" : "stage") : "grey"} onClick={() => setActiveStage('s1')} />
        <div className="-translate-y-32">
          <ThCastleButton castle="castle-together" color={stage.id === 's3' ? (userStore.stagesProgress['s3'].status === "completed" ? "tint" : "stage") : "grey"} onClick={() => setActiveStage('s3')} />
        </div>
        <ThCastleButton castle="castle-reference" color={stage.id === 's2' ? (userStore.stagesProgress['s2'].status === "completed" ? "tint" : "stage") : "grey"} onClick={() => setActiveStage('s2')} />
      </div>
      <div className="w-screen absolute bottom-0 z-20 flex flex-row justify-center translate-y-40 pointer-events-none" >
        <div className="pointer-events-auto" >
          <ThStarUserButton width={400} height={400} iconWidth="small" />
        </div>
      </div>
    </div>
  );
}

export default Stage;
