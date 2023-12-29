import CodeEditor from "./components/CodeEditor.tsx";
import CodeConsole from "./components/CodeConsole.tsx"
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
        if (data.error) {
          setOutput(data.error);
        }
        console.log('Output:', data.output);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="my-2 px-4">
        <CodeEditor height={height - 240} />
      </div>

      <hr className="th-hr" />

      <div className="flex flex-row justify-between px-4">
        <button className="text-th-black-100" onClick={compile}>Run</button>
        <div className="flex flex-row gap-4">
          <button className="text-th-tint-100">Back</button>
          <button className="text-th-tint-100">Next</button>
        </div>
      </div>

      <hr className="th-hr" />

      <div className="px-4">
        <CodeConsole />
      </div>
    </div>
  )
}