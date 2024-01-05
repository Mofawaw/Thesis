import { useEffect } from "react";
import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";
import CodeIDEMode from "./types/CodeIDEMode.ts";
import useCodeIDEStore from "./codeIDEStore.ts";
import CodeGraphType from "./types/CodeGraph.ts";

export default function CodeIDE({ height, scopeId, mode, initialCode, initialGraph }: { height: number, scopeId: string, mode: CodeIDEMode, initialCode: string, initialGraph: CodeGraphType }) {
  const store = useCodeIDEStore(scopeId).getState();
  let codeIDEComponent;

  switch (mode) {
    case CodeIDEMode.programWriteGraphAuto:
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <CodeProgram height={height} scopeId={scopeId} />
          <div className="th-yline" />
          <CodeGraph scopeId={scopeId} />
        </div>
      );
      break;
    case CodeIDEMode.programWrite:
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.programRead:
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphRead:
      codeIDEComponent = <CodeGraph scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphInput:
      codeIDEComponent = <CodeGraph scopeId={scopeId} />;
      break;
    default:
      codeIDEComponent = <div>No CodeIDEMode found.</div>
  }

  // "Initialize" CodeIDEStore 
  useEffect(() => {
    store.setMode(mode);
    store.setCode(initialCode);
    store.setGraph(initialGraph);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      {codeIDEComponent}
    </div>
  )
}