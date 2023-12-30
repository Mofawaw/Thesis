import CodeEditor from "./components/CodeEditor.tsx";
import CodeConsole from "./components/CodeConsole.tsx"
import CodeGraph from "./components/CodeGraph.tsx";
import useCodeIDEStore from './codeide_store.ts'

import PlayIcon from '../../assets/icons/play.svg';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';

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
    <div className="flex flex-row gap-2">
      <div className="basis-2/3 flex flex-col gap-2 py-4">
        <div className="my-2 px-4">
          <CodeEditor height={height - 240} />
        </div>

        <hr className="th-hr" />

        <div className="flex flex-row justify-between px-4">
          <button onClick={compile}>
            <img src={PlayIcon} alt="Play button" className="h-6 w-6" />
          </button>
          <div className="flex flex-row gap-2">
            <button><img src={ArrowLeftIcon} alt="Left arrow" className="h-6 w-6" /></button>
            <button><img src={ArrowRightIcon} alt="Right arrow" className="h-6 w-6" /></button>
          </div>
        </div>

        <hr className="th-hr" />

        <div className="px-4">
          <CodeConsole />
        </div>
      </div>

      <div className="basis-1/3 bg-th-tint-20 my-4 mr-4">
        <CodeGraph />
      </div>
    </div>
  )
}