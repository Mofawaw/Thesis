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
          <CodeGraph mode={GraphMode.auto} />
        </div>
      );
      break;
    case CodeIDEMode.programWrite:
      codeIDEComponent = <CodeProgram mode={ProgramMode.write} height={height} />;
      break;
    case CodeIDEMode.programStatic:
      codeIDEComponent = <CodeProgram mode={ProgramMode.static} height={height} />;
      break;
    case CodeIDEMode.graphStatic:
      codeIDEComponent = <CodeGraph mode={GraphMode.static} />;
      break;
    case CodeIDEMode.graphInput:
      codeIDEComponent = <CodeGraph mode={GraphMode.input} />;
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