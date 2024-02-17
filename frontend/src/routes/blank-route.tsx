import LevelBlank from "@/app/level/blank/level-blank";
import { useState, useEffect } from "react";

const BlankRoute = () => {
  const [showBlank, setShowBlank] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowBlank(true), 300);
    return () => setShowBlank(false);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-th-background">
      {/* Blank */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showBlank ? 'opacity-100' : 'opacity-0'}`}>
        <LevelBlank key="blank" />
      </div>
    </div>
  );
}

export default BlankRoute;