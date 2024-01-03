import CodeGraph from "./components/CodeGraph.tsx";
import CodeProgram from "./components/CodeProgram.tsx";

export default function CodeIDE({ height }: { height: number }) {
  return (
    <div className="flex flex-row h-full w-full overflow-hidden">
      <CodeProgram height={height} />

      <div className="th-yline" />

      <CodeGraph />
    </div>
  )
}