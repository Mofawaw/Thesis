import { useEffect } from "react";
import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";
import CodeIDEConfig from "./types/CodeIDEConfig.ts";
import useCodeIDEStore from "./codeIDEStore.ts";
import CodeGraphType from "./types/CodeGraph.ts";
import CodeGraphInput from "./components/CodeGraphInput.tsx";

export default function CodeIDE({ height, scopeId, config, initialCode, initialGraph }: { height: number, scopeId: string, config: CodeIDEConfig, initialCode: string, initialGraph: CodeGraphType }) {
  const store = useCodeIDEStore(scopeId).getState();
  let codeIDEComponent;

  switch (config.type) {
    case "program+graph":
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <CodeProgram height={height} scopeId={scopeId} />
          <div className="th-yline" />
          <div className="h-full w-full overflow-hidden p-4">
            <CodeGraph height={height} scopeId={scopeId} />
          </div>
        </div>
      );
      break;
    case "program":
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case "graph":
      if (config.mode === "read") {
        codeIDEComponent = (
          <div className="h-full w-full overflow-hidden p-4">
            <CodeGraph height={height} scopeId={scopeId} />
          </div>
        );
      } else {
        codeIDEComponent = (
          <div className="h-full w-full overflow-hidden p-4">
            <CodeGraphInput height={height} scopeId={scopeId} />
          </div>
        );
      }
      break;
    default:
      codeIDEComponent = <div>No CodeIDEMode found.</div>
  }

  // "Initialize" CodeIDEStore 
  useEffect(() => {
    store.setConfig(config);
    store.setCode(initialCode);
    store.setGraph(initialGraph);
  }, []);

  return (
    <div>
      {codeIDEComponent}
    </div>
  )
}