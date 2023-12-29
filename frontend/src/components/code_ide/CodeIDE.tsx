import CodeEditor from "./CodeEditor";
import useCodeIDEStore from './codeide_store.ts'

export default function CodeIDE({ height }: { height: number }) {
  const code = useCodeIDEStore((state) => state.code)

  return (
    <>
      <CodeEditor height={height - 200} />
      <pre>{code}</pre>
    </>
  )

}