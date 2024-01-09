import CodeEditor from "./CodeEditor.tsx";
import CodeOutput from "./CodeOutput.tsx"
import { compileGetOutput } from "../codeIDENetwork.ts";
import ThIcon from '../../custom/ThIcon.tsx';
import useCodeIDEStore from "../codeIDEStore.ts";
import { codeIDELayout } from "../codeIDEConfig.ts";

export default function CodeProgram({ height, scopeId }: { height: number, scopeId: string }) {
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
            <button onClick={() => compileGetOutput(scopeId)}><ThIcon icon="Play" className="h-6 w-6 text-th-black-100" /></button>
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
  )
}