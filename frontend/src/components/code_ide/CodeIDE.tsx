import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";
import CodeIDEMode, { GraphMode, ProgramMode } from "./types/CodeIDEMode.ts";

export default function CodeIDE({ height, codeIDEMode }: { height: number, codeIDEMode: CodeIDEMode }) {
  let codeIDEComponent;

  switch (codeIDEMode) {
    case CodeIDEMode.programWriteGraphRead:
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <CodeProgram mode={ProgramMode.write} height={height} />
          <div className="th-yline" />
          <CodeGraph mode={GraphMode.read} />
        </div>
      );
      break;
    case CodeIDEMode.programWrite:
      codeIDEComponent = <CodeProgram mode={ProgramMode.write} height={height} />;
      break;
    case CodeIDEMode.programRead:
      codeIDEComponent = <CodeProgram mode={ProgramMode.read} height={height} />;
      break;
    case CodeIDEMode.graphWrite:
      codeIDEComponent = <CodeGraph mode={GraphMode.write} />;
      break;
    case CodeIDEMode.graphRead:
      codeIDEComponent = <CodeGraph mode={GraphMode.read} />;
      break;
    default:
      codeIDEComponent = <div>No CodeIDEMode found.</div>
  }

  return (
    <div className="h-full w-full overflow-hidden">
      {codeIDEComponent}
    </div>
  )
}