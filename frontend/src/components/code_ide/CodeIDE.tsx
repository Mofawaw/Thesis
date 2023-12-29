import CodeEditor from "./CodeEditor.tsx";
import CodeConsole from "./CodeConsole.tsx"
import useCodeIDEStore from './codeide_store.ts'

export default function CodeIDE({ height }: { height: number }) {
  const code = useCodeIDEStore((state) => state.code)
  const setOutput = useCodeIDEStore((state) => state.setOutput)

  function compile() {
    fetch('http://127.0.0.1:5000/compile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setOutput(data.output);
        console.log('Output:', data.output);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="my-2">
        <CodeEditor height={height - 240} />
      </div>
      <hr className="h-px my-0 bg-th-black-20 border-0" />
      <div className="flex flex-row justify-between">
        <button className="text-th-black-100" onClick={compile}>Run</button>
        <div className="flex flex-row gap-4">
          <button className="text-th-tint-100">Back</button>
          <button className="text-th-tint-100">Next</button>
        </div>
      </div>
      <hr className="h-px my-0 bg-th-black-20 border-0" />
      <CodeConsole />
    </div>
  )
}