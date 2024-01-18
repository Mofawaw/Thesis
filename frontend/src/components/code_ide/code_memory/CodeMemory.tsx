import ThIcon from "../../custom/ThIcon.tsx";
import { codeIDELayout } from "../codeIDEConfig.ts";
import useCodeIDEStore from "../codeIDEStore.ts";
import CodeGraph from "./CodeGraph.tsx";
import CodeGraphInput from "./CodeGraphInput.tsx";

interface CodeMemoryProps {
  height: number;
  scopeId: string;
}

const CodeMemory: React.FC<CodeMemoryProps> = ({
  height,
  scopeId,
}) => {
  const store = useCodeIDEStore(scopeId).getState();
  let codeMemoryComponent;
  let codeGraphHeight = codeIDELayout.getCodeGraphHeight(store.config, height)

  if (store.config.type === "program+graph") {
    codeMemoryComponent = (
      <div className="p-4 mb-2  overflow-hidden">
        <CodeGraph height={codeGraphHeight} scopeId={scopeId} />
      </div>
    )
  } else if (store.config.mode === "read") {
    if (!store.config.runnable) {
      codeMemoryComponent = (
        <div className="p-4 mb-2">
          <CodeGraph height={codeGraphHeight} scopeId={scopeId} />
        </div>
      )
    } else {
      codeMemoryComponent = (
        <div className="flex flex-col gap-2 py-4" >
          <div className="p-4 mb-2">
            <CodeGraph height={codeGraphHeight} scopeId={scopeId} />
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <div className="th-xline px-[-1rem]" />

            <div className="flex flex-row justify-between px-4">
              <button onClick={() => { }}><ThIcon icon="play" className="h-6 w-6 text-th-black-100" /></button>
            </div>
          </div>
        </div>
      )
    }
  } else if (store.config.mode === "write") {
    codeMemoryComponent = (
      <div className="p-4 mb-2">
        <CodeGraphInput height={codeGraphHeight} scopeId={scopeId} />
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