import LevelTutorial from "@/app/level/tutorial/level-tutorial";
import { useState, useEffect } from "react";

const TutorialRoute = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowTutorial(true), 300);
    return () => setShowTutorial(false);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Tutorial */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showTutorial ? 'opacity-100' : 'opacity-0'}`}>
        <LevelTutorial key="tutorial" />
      </div>
    </div>
  );
}

export default TutorialRoute;