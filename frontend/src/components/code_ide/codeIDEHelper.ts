import useCodeIDEStore from './codeIDEStore.ts';

export function compileGetOutput() {
  const { code, setOutput } = useCodeIDEStore.getState();

  console.log("Request: compile_get_output")
  console.log('Code', code)
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
      } else {
        setOutput(data.output);
        console.log('Output:', data.output);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export function compileGetGraph() {
  const store = useCodeIDEStore.getState();

  console.log("Request: compile_get_graph")
  console.log('Code', store.code)
  fetch('http://127.0.0.1:5000/compile_get_graph', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: store.code }),
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
        store.setGraph(jsonData)
        store.setLastLineGraphLoaded(store.lastLineGraphLoading);
      } else {
        console.log('Error generating Graph')
        store.setLastLineGraphLoading(store.lastLineGraphLoaded);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      store.setLastLineGraphLoading(store.lastLineGraphLoaded);
    })
}