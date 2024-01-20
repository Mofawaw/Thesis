import ThStarUser from '@/components/user/th-star-user';
import Levels from './components/levels';
import { ThCastle } from "@/utilities/th-castle";

interface StageProps {
}

const Stage: React.FC<StageProps> = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* Background */}
      <div className="fixed left-[-50vw] top-[-50vh] th-bg-gradient-angular z-0" />

      {/* Levels */}
      <div className="w-screen h-screen absolute z-30">
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
        <ThCastle castle="castle-value" className="w-48 h-48 translate-y-20" />
        <ThStarUser width={400} height={400} className="translate-y-40" />
        <ThCastle castle="castle-reference" className="w-48 h-48 translate-y-20" />
      </div>
      <div className="w-screen absolute bottom-0 z-10 flex flex-row justify-center">
        <ThCastle castle="castle-together" className="w-48 h-48 -translate-y-40" />
      </div>
    </div>
  );
}

export default Stage;
