import useCodeIDEStore from "./codeIDEStore";
import CodeGraph from "./code_memory/codeGraph";

export function compileGetOutput(scopeId: string) {
  const { code, setOutput } = useCodeIDEStore(scopeId).getState();

  console.log("Request: compile_get_output")
  console.log('Code', code)

  return new Promise<string>((resolve, reject) => {
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
          reject(data.error);
        } else {
          console.log('Output:', data.output);
          setOutput(data.output);
          resolve(data.output);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

export function compileGetGraph(scopeId: string) {
  const { code, setGraph } = useCodeIDEStore(scopeId).getState();

  console.log("Request: compile_get_graph")
  console.log('Code', code)

  return new Promise<CodeGraph>((resolve, reject) => {
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
          const jsonData = JSON.parse(data.graph);
          setGraph(jsonData);
          resolve(jsonData);
        } else {
          console.log('Error generating Graph')
          reject('Error generating Graph');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        reject(error);
      })
  });
}