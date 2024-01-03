import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";
import CodeIDEMode, { GraphMode, ProgramMode } from "./types/CodeIDEMode.ts";

export default function CodeIDE({ height, codeIDEMode, scopeId }: { height: number, codeIDEMode: CodeIDEMode, scopeId: number }) {
  let codeIDEComponent;

  switch (codeIDEMode) {
    case CodeIDEMode.programWriteGraphRead:
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <CodeProgram mode={ProgramMode.write} height={height} scopeId={scopeId} />
          <div className="th-yline" />
          <CodeGraph mode={GraphMode.auto} scopeId={scopeId} />
        </div>
      );
      break;
    case CodeIDEMode.programWrite:
      codeIDEComponent = <CodeProgram mode={ProgramMode.write} height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.programStatic:
      codeIDEComponent = <CodeProgram mode={ProgramMode.static} height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphStatic:
      codeIDEComponent = <CodeGraph mode={GraphMode.static} scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphInput:
      codeIDEComponent = <CodeGraph mode={GraphMode.input} scopeId={scopeId} />;
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