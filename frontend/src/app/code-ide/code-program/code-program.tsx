import CodeEditor from "./components/code-editor.tsx";
import CodeOutput from "./components/code-output.tsx"
import { compileGetOutput } from "../code-ide-network.ts";
import { ThIcon } from "@/utilities/th-icon.js"
import useCodeIDEStore from "../code-ide-store.ts";
import { codeIDELayout } from "../code-ide-config.ts";

interface CodeProgramProps {
  height: number;
  scopeId: string;
}

const CodeProgram: React.FC<CodeProgramProps> = ({
  height,
  scopeId,
}) => {
  const store = useCodeIDEStore(scopeId).getState();
  let codeProgramComponent;
  let codeEditorHeight = codeIDELayout.getCodeEditorHeight(store.config, height)

  if (!store.config.runnable) {
    codeProgramComponent = (
      <div className="p-4 mb-2">
        <CodeEditor height={codeEditorHeight} scopeId={scopeId} />
      </div>
    )
  } else if (store.config.runnable) {
    codeProgramComponent = (
      <div className="flex flex-col gap-2 py-4 overflow-hidden" >
        <div className="px-4 mb-2">
          <CodeEditor height={codeEditorHeight} scopeId={scopeId} />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <div className="th-xline px-[-1rem]" />

          <div className="flex flex-row justify-between px-4">
            <button onClick={() => compileGetOutput(scopeId)}><ThIcon icon="play" className="h-6 w-6 text-th-black-100" /></button>
          </div>

          <div className="th-xline" />
        </div>

        <div className="px-4 my-2 overflow-hidden">
          <CodeOutput scopeId={scopeId} />
        </div>
      </div>
    )
  } else {
    codeProgramComponent = <div>No program mode found.</div>
  }

  return (
    <>
      {codeProgramComponent}
    </>
  );
}

export default CodeProgram;