import { useEffect } from "react";

import CodeIDEConfig from "@/app/code-ide/code-ide-config";
import useCodeIDEStore from "@/app/code-ide/code-ide-store";
import CodeGraph from "@/app/code-ide/code-memory/components/code-graph";
import CodeEditor from "@/app/code-ide/code-program/components/code-editor";

interface TutorialCodeIDEProps {
  height: number;
  scopeId: string;
  mode: "write" | "read";
  code: string;
}

const TutorialCodeIDE: React.FC<TutorialCodeIDEProps> = ({
  height,
  scopeId,
  mode,
  code,
}) => {
  const config: CodeIDEConfig = { type: "program+graph", mode: mode, runnable: true }
  const store = useCodeIDEStore(scopeId).getState();

  useEffect(() => {
    store.setCode(code);
  }, [])

  return (
    <div className="flex flex-row gap-3 bg-th-white p-4 overflow-hidden">
      <div className="basis-1/2 flex flex-col gap-2">
        <p><b>Programm</b></p>
        <CodeEditor height={height} scopeId={scopeId} config={config} />
      </div>
      <div className="th-yline" />
      <div className="basis-1/2 flex flex-col gap-2">
        <p><b>Speicher</b></p>
        <CodeGraph height={height} scopeId={scopeId} config={config} />
      </div>
    </div>
  )
}

export default TutorialCodeIDE;