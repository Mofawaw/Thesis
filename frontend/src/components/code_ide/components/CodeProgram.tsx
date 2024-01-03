import CodeEditor from "./CodeEditor.tsx";
import CodeOutput from "./CodeOutput.tsx"
import { codeIDELayout } from "./codeProgramHeper.ts";
import { compileGetOutput } from "../codeIDENetwork.ts";
import { ProgramMode } from "../types/CodeIDEMode.ts";
import PlayIcon from '../../../assets/icons/play.svg';
import useCodeIDEStore from "../codeIDEStore.ts";

export default function CodeProgram({ mode, height, scopeId }: { mode: ProgramMode, height: number, scopeId: number }) {
  const store = useCodeIDEStore(scopeId).getState();
  let codeProgramComponent;

  if (mode === ProgramMode.static) {
    codeProgramComponent = (
      <div className="p-4 mb-2">
        <h3 className="my-4">Programm</h3>
        <CodeEditor mode={mode} height={codeIDELayout.getCodeEditorHeight(mode, height)} scopeId={scopeId} />
      </div>
    )
  } else if (mode === ProgramMode.write) {
    codeProgramComponent = (
      <div className="basis-3/5 flex-none flex flex-col gap-2 py-4 overflow-hidden" >
        <div className="px-4 mb-2">
          <h3 className="my-4">Programm</h3>
          <CodeEditor mode={mode} height={codeIDELayout.getCodeEditorHeight(mode, height)} scopeId={scopeId} />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <div className="th-xline px-[-1rem]" />

          <div className="flex flex-row justify-between px-4">
            <button onClick={() => compileGetOutput(scopeId)}><img src={PlayIcon} alt="Run" className="h-6 w-6" /></button>
          </div>

          <div className="th-xline" />
        </div>

        <div className="px-4 mt-2 overflow-hidden">
          <CodeOutput scopeId={scopeId} />
        </div>
      </div>
    )
  } else {
    codeProgramComponent = <div>No ProgramMode found.</div>
  }

  return (
    <>
      {codeProgramComponent}
    </>
  )
}