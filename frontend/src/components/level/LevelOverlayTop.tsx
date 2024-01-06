import ThTextButton from "../custom/ThTextButton";

export default function LevelOverlayTop() {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3 left-3">
        <div className="flex justify-between">
          {/* <ThButton width={120} height={150} thColor="th-reference" /> */}
          <div className="w-[100px]" />
          <ThTextButton width={300} thColor="th-reference" text="Coding Challenge" />
          <div className="w-[100px]" />
        </div>
      </div>
    </div>
  );
};