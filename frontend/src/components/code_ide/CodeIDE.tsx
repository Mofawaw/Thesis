import CodeEditor from "./components/CodeEditor.tsx";
import CodeConsole from "./components/CodeConsole.tsx"
import CodeGraph from "./components/CodeGraph.tsx";
import { codeIDEHelper } from './codeIDEStore.ts';
import { compileGetOutput } from "./codeIDEHelper.ts";

import PlayIcon from '../../assets/icons/play.svg';

export default function CodeIDE({ height }: { height: number }) {
  return (
    <div className="flex flex-row h-full w-full overflow-hidden">
      <div className="basis-3/5 flex-none flex flex-col gap-2 py-4 overflow-hidden" >
        <div className="my-2 px-4">
          <CodeEditor height={codeIDEHelper.editor.getHeight(height)} />
        </div>

        <div className="th-xline" />

        <div className="flex flex-row justify-between px-4">
          <button onClick={compileGetOutput}>
            <img src={PlayIcon} alt="Play button" className="h-6 w-6" />
          </button>
        </div>

        <div className="th-xline" />

        <div className="px-4 overflow-hidden">
          <CodeConsole />
        </div>
      </div>

      <div className="th-yline" />

      <div className="basis-2/5 flex-none p-4 nowheel overflow-hidden">
        <CodeGraph />
      </div>
    </div>
  )
}