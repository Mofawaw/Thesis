import CodeEditor from "./CodeEditor.tsx";
import CodeOutput from "./CodeOutput.tsx"
import { codeIDELayout } from "./codeProgramHeper.ts";
import { compileGetOutput } from "../codeIDENetwork.ts";

import PlayIcon from '../../../assets/icons/play.svg';

export default function CodeProgram({ height }: { height: number }) {
  return (
    <div className="basis-3/5 flex-none flex flex-col gap-2 py-4 overflow-hidden" id="code-program" >
      <div className="px-4 mb-2">
        <h3 className="my-4">Programm</h3>
        <CodeEditor height={codeIDELayout.getCodeEditorHeight(height)} />
      </div>

      <div className="flex flex-col gap-2 justify-center">
        <div className="th-xline px-[-1rem]" />

        <div className="flex flex-row justify-between px-4">
          <button onClick={compileGetOutput}><img src={PlayIcon} alt="Run" className="h-6 w-6" /></button>
        </div>

        <div className="th-xline" />
      </div>

      <div className="px-4 mt-2 overflow-hidden">
        <CodeOutput />
      </div>
    </div>
  )
}