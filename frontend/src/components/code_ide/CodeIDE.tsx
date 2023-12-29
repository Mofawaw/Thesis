import CodeEditor from "./CodeEditor";

export default function CodeIDE({ height }: { height: number }) {
  return (
    <>
      <CodeEditor height={height - 100} />
    </>
  )

}