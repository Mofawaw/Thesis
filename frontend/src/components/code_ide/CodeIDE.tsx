import CodeEditor from "./components/CodeEditor.tsx";
import CodeConsole from "./components/CodeConsole.tsx"
import CodeGraph from "./components/CodeGraph.tsx";
import { codeIDELayout, compileGetOutput } from "./codeIDEHelper.ts";

import PlayIcon from '../../assets/icons/play.svg';

export default function CodeIDE({ height }: { height: number }) {
  return (
    <div className="flex flex-row h-full w-full overflow-hidden">
      <div className="basis-3/5 flex-none flex flex-col gap-2 py-4 overflow-hidden" id="code-program" >
        <div className="px-4 mb-2">
          <h3 className="my-4">Programm</h3>
          <CodeEditor height={codeIDELayout.getEditorHeight(height)} />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <div className="th-xline px-[-1rem]" />

          <div className="flex flex-row justify-between px-4">
            <button onClick={compileGetOutput}><img src={PlayIcon} alt="Run" className="h-6 w-6" /></button>
          </div>

          <div className="th-xline" />
        </div>

        <div className="px-4 mt-2 overflow-hidden">
          <CodeConsole />
        </div>
      </div>

      <div className="th-yline" />

      <div className="basis-2/5 flex-none p-4 nowheel overflow-hidden">
        <h3 className="my-4">Speicher</h3>
        <CodeGraph />
      </div>
    </div>
  )
}