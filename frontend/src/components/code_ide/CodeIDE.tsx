import CodeEditor from "./components/CodeEditor.tsx";
import CodeConsole from "./components/CodeConsole.tsx"
import CodeGraph from "./components/CodeGraph.tsx";
import useCodeIDEStore, { codeIDEHelper } from './codeIDEStore.ts';

import PlayIcon from '../../assets/icons/play.svg';
import ArrowLeftIcon from '../../assets/icons/arrow-left.svg';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';

export default function CodeIDE({ height }: { height: number }) {
  const code = useCodeIDEStore((state) => state.code)
  const setOutput = useCodeIDEStore((state) => state.setOutput)
  const setGraph = useCodeIDEStore((state) => state.setGraph)

  function compileGetOutput() {
    console.log("Request: compile_get_output")
    fetch('http://127.0.0.1:5000/compile_get_output', {
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
        if (data.error) {
          setOutput(data.error);
          console.log('Error:', data.error);
          return
        }
        setOutput(data.output);
        console.log('Output:', data.output);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function compileGetGraph() {
    console.log("Request: compile_get_graph")
    fetch('http://127.0.0.1:5000/compile_get_graph', {
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
        if (data.error) {
          console.log('Error: ', data.error);
          return
        }
        const jsonData = JSON.parse(data.graph);
        setGraph(jsonData)
        console.log('Graph:', data.graph);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="flex flex-row h-full w-full">
      <div className="basis-3/5 flex-none flex flex-col gap-2 py-4 overflow-hidden" >
        <div className="my-2 px-4">
          <CodeEditor height={codeIDEHelper.editor.getHeight(height)} />
        </div>

        <div className="th-xline" />

        <div className="flex flex-row justify-between px-4">
          <button onClick={compileGetOutput}>
            <img src={PlayIcon} alt="Play button" className="h-6 w-6" />
          </button>
          <div className="flex flex-row gap-2">
            <button><img src={ArrowLeftIcon} alt="Left arrow" className="h-6 w-6" /></button>
            <button onClick={compileGetGraph}><img src={ArrowRightIcon} alt="Right arrow" className="h-6 w-6" /></button>
          </div>
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