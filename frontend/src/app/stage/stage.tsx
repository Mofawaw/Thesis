import ThStarUserButton from '@/components/buttons/th-star-user-button';
import Levels from './components/levels';
import useThStore from '@/stores/th-store';
import ThCastleButton from '@/components/buttons/th-castle-button';

interface StageProps {
}

const Stage: React.FC<StageProps> = () => {
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
          <span className="text-th-value-100">Werte</span> &<br />Referenzen
        </h2>
      </div>

      {/* Overlay-Bottom */}
      <div className="w-screen absolute bottom-0 z-20 flex flex-row justify-center items-center overflow-hidden">
        <ThCastleButton castle="castle-value" className="w-48 h-48 translate-y-20" onClick={() => setActiveStage('s1')} />

        <ThStarUserButton width={400} height={400} className="translate-y-40" />
        <ThCastleButton castle="castle-reference" className="w-48 h-48 translate-y-20" onClick={() => setActiveStage('s2')} />
      </div>
      <div className="w-screen absolute bottom-0 z-10 flex flex-row justify-center">
        <ThCastleButton castle="castle-together" className="w-48 h-48 -translate-y-40" onClick={() => setActiveStage('s3')} />
      </div>
    </div>
  );
}

export default Stage;
