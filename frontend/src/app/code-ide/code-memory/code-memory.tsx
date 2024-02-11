import ThIDEButton from "@/components/buttons/th-ide-button.tsx";
import CodeIDEConfig, { codeIDELayout } from "../code-ide-config.ts";
import useCodeIDEStore from "../code-ide-store.ts";
import CodeGraph from "./components/code-graph.tsx";
import CodeGraphInput from "./components/code-graph-input.tsx";
import { calculateAndSetGraphOutput } from "./helpers/code-memory-helper.ts";
import CodeGraphOutput from "./components/code-graph-output.tsx";

interface CodeMemoryProps {
  height: number;
  scopeId: string;
  config: CodeIDEConfig
}

const CodeMemory: React.FC<CodeMemoryProps> = ({
  height,
  scopeId,
  config,
}) => {
  const store = useCodeIDEStore(scopeId).getState();

  let codeMemoryComponent;
  let codeGraphHeight = codeIDELayout.getCodeGraphHeight(config, height)

  if (config.type === "program+graph") {
    codeMemoryComponent = (
      <div className="p-4 mb-2  overflow-hidden">
        <CodeGraph height={codeGraphHeight} scopeId={scopeId} config={config} />
      </div>
    )
  } else if (config.mode === "read") {
    if (!config.runnable) {
      codeMemoryComponent = (
        <div className="p-4 mb-2">
          <CodeGraph height={codeGraphHeight} scopeId={scopeId} config={config} />
        </div>
      )
    } else {
      codeMemoryComponent = (
        <div className="flex flex-col gap-2 py-4" >
          <div className="p-4 mb-2">
            <CodeGraphOutput height={codeGraphHeight} scopeId={scopeId} config={config} />
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <div className="th-xline px-[-1rem]" />

            <div className="flex flex-row justify-between h-8 px-4">
              <ThIDEButton thColor="th-black" thColorShade={100} icon="run" onClick={() => calculateAndSetGraphOutput(scopeId)} />
            </div>
          </div>
        </div>
      )
    }
  } else if (config.mode === "write") {
    codeMemoryComponent = (
      <div className="p-4 mb-2">
        <CodeGraphInput height={codeGraphHeight} scopeId={scopeId} config={config} />
      </div>
    )
  } else {
    codeMemoryComponent = <div>No graph mode found.</div>
  }

  return (
    <>
      {codeMemoryComponent}
    </>
  );
}

export default CodeMemory;