import { useEffect, useState } from "react";
import Stage from "@/app/stage/stage";
import useThStore from "@/stores/th-store";

const StageRoute = ({ isInitialLoading }: { isInitialLoading: boolean }) => {
  const activeStage = useThStore(state => state.activeStage);
  const [showStage, setShowStage] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    if (!isInitialLoading) {
      timeoutId = setTimeout(() => setShowStage(true), 500);
    }

    return () => clearTimeout(timeoutId);
  }, [isInitialLoading]);

  return (
    <div className="relative w-screen h-screen bg-th-gradient-angular">
      {/* Loading */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isInitialLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Loading />
      </div>

      {/* Stage Component */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showStage && activeStage ? 'opacity-100' : 'opacity-0'}`}>
        {activeStage && <Stage stage={activeStage} />}
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