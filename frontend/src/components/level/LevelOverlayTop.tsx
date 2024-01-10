import ThTextButton from "../custom/ThTextButton";
import { ThLevel } from "./types/thTypes";

export default function LevelOverlayTop({ level }: { level: ThLevel }) {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          {/* <ThButton width={120} height={150} thColor={level.stage.color} /> */}
          <div className="w-[100px]" />
          <ThTextButton width={300} thColor={level.stage.color} text="Coding Challenge" />
          <div className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};