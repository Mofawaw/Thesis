import useCodeIDEStore from "./code-ide-store.ts";
import CodeGraph from "./code-memory/code-memory-types.ts";

export interface CodeIDENetworkResultType {
  success: boolean;
  output?: string;
  graph?: CodeGraph;
  error?: string;
}

export function compileGetOutput(scopeId: string) {
  const { code, setOutput } = useCodeIDEStore(scopeId).getState();

  console.log("Request: compile_get_output")
  console.log('Code', code)

  return new Promise<CodeIDENetworkResultType>((resolve) => {
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
          console.log('Error:', data.error);
          setOutput(data.error);
          resolve({ success: false, error: data.error });
        } else {
          console.log('Output:', data.output);
          setOutput(data.output);
          resolve({ success: true, output: data.output });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        resolve({ success: false, error: error.message });
      });
  });
}

export function compileGetGraph(scopeId: string) {
  const { code, setGraph } = useCodeIDEStore(scopeId).getState();

  console.log("Request: compile_get_graph")
  console.log('Code', code)

  return new Promise<CodeIDENetworkResultType>((resolve) => {
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
        if (data.success) {
          console.log('Graph:', data.graph);
          const graphData = JSON.parse(data.graph) as CodeGraph;
          setGraph(graphData);
          resolve({ success: true, graph: graphData });
        } else {
          console.log('Error generating Graph.');
          resolve({ success: false, error: 'Error generating Graph. Runne den Code um mehr herauszufinden.' });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        resolve({ success: false, error: error });
      })
  });
}