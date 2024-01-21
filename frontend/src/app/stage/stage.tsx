import ThStarUserButton from '@/components/buttons/th-star-user-button';
import Levels from './components/levels';
import useThStore from '@/stores/th-store';
import ThCastleButton from '@/components/buttons/th-castle-button';

interface StageProps {
}

const Stage: React.FC<StageProps> = ({
}) => {
  const { activeStage } = useThStore();
  const { setActiveStage } = useThStore.getState();

  return (
    <div className="w-screen h-screen relative">
      {/* Background */}
      <div className="fixed left-[-50vw] top-[-50vh] th-bg-gradient-angular z-0" />

      {/* Levels */}
      <div className="w-screen h-screen absolute z-30 pointer-events-none">
        <Levels />
      </div>

      {/* Overlay-Top */}
      <div className="w-screen absolute top-10 z-20 flex flex-row justify-center">
        <h2 className="text-th-black-20 text-center">
          {activeStage.id === "s1" && <span><span className="text-th-value-100">Werte</span> &<br />Referenzen</span>}
          {activeStage.id === "s2" && <span>Werte &<br /><span className="text-th-reference-100">Referenzen</span></span>}
          {activeStage.id === "s3" && <span className="text-th-together-100">Werte &<br />Referenzen</span>}
        </h2>
      </div>

      {/* Overlay-Bottom */}
      <div className="w-screen absolute bottom-0 z-20 flex flex-row justify-center items-center overflow-hidden pointer-events-auto translate-y-16">
        <ThCastleButton castle="castle-value" grey={activeStage.id !== 's1'} onClick={() => setActiveStage('s1')} />
        <div className="translate-y-24" >
          <ThStarUserButton width={400} height={400} />
        </div>
        <ThCastleButton castle="castle-reference" grey={activeStage.id !== 's2'} onClick={() => setActiveStage('s2')} />
      </div>
      <div className="w-screen absolute bottom-0 z-10 flex flex-row justify-center pointer-events-auto -translate-y-48">
        <ThCastleButton castle="castle-together" grey={activeStage.id !== 's3'} onClick={() => setActiveStage('s3')} />
      </div>
    </div>
  );
}

export default Stage;
