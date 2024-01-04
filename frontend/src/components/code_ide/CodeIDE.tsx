import { useEffect } from "react";
import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";
import CodeIDEMode from "./types/CodeIDEMode.ts";
import useCodeIDEStore from "./codeIDEStore.ts";

export default function CodeIDE({ height, codeIDEMode, scopeId }: { height: number, codeIDEMode: CodeIDEMode, scopeId: string }) {
  const store = useCodeIDEStore(scopeId).getState();
  let codeIDEComponent;

  switch (codeIDEMode) {
    case CodeIDEMode.programWriteGraphAuto:
      codeIDEComponent = (
        <div className="flex flex-row overflow-hidden">
          <CodeProgram height={height} scopeId={scopeId} />
          <div className="th-yline" />
          <CodeGraph scopeId={scopeId} />
        </div>
      );
      break;
    case CodeIDEMode.programWrite:
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.programRead:
      codeIDEComponent = <CodeProgram height={height} scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphRead:
      codeIDEComponent = <CodeGraph scopeId={scopeId} />;
      break;
    case CodeIDEMode.graphInput:
      codeIDEComponent = <CodeGraph scopeId={scopeId} />;
      break;
    default:
      codeIDEComponent = <div>No CodeIDEMode found.</div>
  }

  useEffect(() => {
    const initialCode = [
      "a = 1",
      "b = 2",
      "a = b",
      "print(a)",
      "print(b)"
    ].join('\n');

    const initialGraph = {
      nodes: [
        { id: "n-vs-0", type: "value-stack", label: "a" },
        { id: "n-vh-0", type: "value-heap", label: 2 },
        { id: "n-vs-1", type: "value-stack", label: "b" },
        { id: "n-vh-1", type: "value-heap", label: 2 }
      ],
      edges: [
        { id: "e-v-0", type: "value", source: "n-vs-0", target: "n-vh-0" },
        { id: "e-v-1", type: "value", source: "n-vs-1", target: "n-vh-1" }
      ]
    };

    store.setMode(codeIDEMode);
    store.setCode(initialCode);
    store.setGraph(initialGraph);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      {codeIDEComponent}
    </div>
  )
}