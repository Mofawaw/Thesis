import { useEffect } from "react";
import CodeProgram from "./code_program/CodeProgram.tsx";
import CodeIDEConfig from "./codeIDEConfig.ts";
import useCodeIDEStore from "./codeIDEStore.ts";
import CodeGraphType from "./code_memory/codeGraph.ts";
import CodeMemory from "./code_memory/CodeMemory.tsx";

interface CodeIDEProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig;
  initialCode: string;
  initialGraph: CodeGraphType;
}

const CodeIDE: React.FC<CodeIDEProps> = ({
  height,
  scopeId,
  config,
  initialCode,
  initialGraph,
}) => {
  const store = useCodeIDEStore(scopeId).getState();
  let codeIDEComponent;

  switch (config.type) {
    case "program+graph":
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <div className="basis-3/5 flex-none overflow-hidden">
            <CodeProgram height={height} scopeId={scopeId} />
          </div>
          <div className="th-yline" />
          <div className="basis-2/5 flex-none overflow-hidden">
            <CodeMemory height={height} scopeId={scopeId} />
          </div>
        </div>
      );
      break;
    case "program":
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case "graph":
      if (config.mode === "read") {
        codeIDEComponent = <CodeMemory height={height} scopeId={scopeId} />;
      } else {
        codeIDEComponent = <CodeMemory height={height} scopeId={scopeId} />;
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
    store.setPresetGraph(initialGraph);
  }, []);

  return (
    <div>
      {codeIDEComponent}
    </div>
  );
}

export default CodeIDE;