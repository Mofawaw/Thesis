import { Node } from "reactflow";
import { CodeIDENetworkResultType, compileGetGraph, compileGetOutput } from "../../code_ide/codeIDENetwork";
import useCodeIDEStore from "../../code_ide/codeIDEStore";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import { ThLevel } from "../types/thTypes";
import { CodeIDENodeData } from "../types/nodeTypes";

export function evaluateLevelCompletion(level: ThLevel, nodes: Node[]): Promise<{ result: boolean, title: string, message: string }> {
  let title;

  return verifyLevelCriteria(level, nodes)
    .then(({ result, message }) => {
      if (result) {
        title = "Super!\nDu hast das Level erfolgreich abgeschlossen."
      } else {
        title = "Schade. Es hat nicht geklappt."
      }
      return { result, title, message };
    });
}

async function verifyLevelCriteria(level: ThLevel, nodes: Node[]): Promise<{ result: boolean, message: string }> {
  const category = level.category;
  const mainNode = nodes.find(node => (node.data as CodeIDENodeData).codeIDE.isMain);
  const mainScopeId = mainNode ? (mainNode.data as CodeIDENodeData).codeIDE.scopeId : null;

  if (!mainScopeId) {
    console.error('Main scope ID not found.');
    return { result: false, message: 'Main scope ID not found.' };
  }

  let networkResult: CodeIDENetworkResultType;

  switch (category.id) {
    case "c1":
      networkResult = await compileGetOutput(mainScopeId);
      if (!networkResult.success) {
        return { result: false, message: networkResult.error || "Error." };
      }
      const userOutput = networkResult.output || "";
      console.log("Output-User:", userOutput);
      console.log("Output-Expected:", level.expected.output);

      if (userOutput && level.expected.output) {
        const comparisonResult = isEqualOutput(userOutput, level.expected.output);
        return { result: comparisonResult.result, message: comparisonResult.feedback };
      }
      break;

    case "c2":
      networkResult = await compileGetGraph(mainScopeId);
      if (!networkResult.success) {
        return { result: false, message: networkResult.error || "Error." };
      }
      const userGraph = networkResult.graph;
      console.log("Graph-User:", userGraph);
      console.log("Graph-Expected:", level.expected.graph);

      if (userGraph && level.expected.graph) {
        const comparisonResult = isEqualGraph(userGraph, level.expected.graph);
        return { result: comparisonResult.result, message: comparisonResult.feedback };
      }
      break;

    case "c3":
      const userGraphInput = useCodeIDEStore(mainScopeId).getState().graph;
      console.log("Graph-User:", userGraphInput);
      console.log("Graph-Expected:", level.expected.graph);
      if (!userGraphInput) {
        return { result: false, message: 'Error.' };
      }
      if (userGraphInput && level.expected.graph) {
        const comparisonResult = isEqualGraphInput(userGraphInput, level.expected.graph);
        return { result: comparisonResult.result, message: comparisonResult.feedback };
      }
      break;

    default:
      console.error(`Unknown category: ${category.id}`);
      return { result: false, message: `Unbekannte Kategorie: ${category.id}.` };
  }

  return { result: false, message: 'Unbekannter Fehler.' };
}

function isEqualOutput(userOutput: string, expectedOutput: string): { result: boolean, feedback: string } {
  let feedback = '';
  let passedTests = 0;
  const totalTests = 3;

  // Test 1: No error in output (assuming error messages are part of the output)
  const noErrorTestPassed = true; // always true if isEqualOutput called
  feedback += `Kein Error in der Ausgabe: ${noErrorTestPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (noErrorTestPassed) passedTests++;

  // Test 1: Non-empty output
  const nonEmptyTestPassed = userOutput.trim().length > 0;
  feedback += `Nicht-leere Ausgabe: ${nonEmptyTestPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (nonEmptyTestPassed) passedTests++;

  // Test 3: Equality (ignoring leading/trailing whitespaces and case-insensitive)
  const equalityTestPassed = userOutput.trim().toLowerCase() === expectedOutput.trim().toLowerCase();
  feedback += `Gleichheit mit der Lösung: ${equalityTestPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (equalityTestPassed) passedTests++;

  // Summary message
  let summaryMessage = `Du hast ${passedTests} von ${totalTests} Testfällen bestanden - `;
  summaryMessage +=
    passedTests === 0 ? 'es gibt noch viel zu tun.' :
      passedTests < totalTests ? 'weiter so!' :
        'perfekt!';
  feedback = summaryMessage + '\n\n' + feedback;

  // Determine final result
  const result = passedTests == totalTests;

  return { result, feedback };
}

function isEqualGraph(graph1: CodeGraph, graph2: CodeGraph): { result: boolean, feedback: string } {
  let feedback = '';
  let passedTests = 0;
  const totalTests = 6;

  // Test 1: Number of nodes
  const nodesTestPassed = graph1.nodes.length === graph2.nodes.length;
  feedback += `Anzahl der Knoten: ${nodesTestPassed ? 'bestanden' : 'nicht bestanden'} (${graph1.nodes.length}/${graph2.nodes.length})\n`;
  if (nodesTestPassed) passedTests++;

  // Test 2: Number of edges
  const edgesTestPassed = graph1.edges.length === graph2.edges.length;
  feedback += `Anzahl der Kanten: ${edgesTestPassed ? 'bestanden' : 'nicht bestanden'} (${graph1.edges.length}/${graph2.edges.length})\n`;
  if (edgesTestPassed) passedTests++;

  // Helper function to normalize strings for comparison
  const normalizeString = (str: string): string => {
    return str.trim().replace(/"/g, "'");
  };

  // Adjusted helper function to compare nodes by type with normalization
  const compareNodesByType = (graph1: CodeGraph, graph2: CodeGraph, type: "value" | "reference"): boolean => {
    const nodes1 = graph1.nodes.filter(node => node.type.includes(type)).map(node => normalizeString(String(node.label))).sort();
    const nodes2 = graph2.nodes.filter(node => node.type.includes(type)).map(node => normalizeString(String(node.label))).sort();
    return nodes1.length === nodes2.length && nodes1.every((label, index) => label === nodes2[index]);
  };

  // Adjusted helper function to compare edges by type with normalization
  const compareEdgesByType = (graph1: CodeGraph, graph2: CodeGraph, type: "value" | "reference"): boolean => {
    const edges1 = graph1.edges.filter(edge => edge.type.includes(type)).map(edge => normalizeString(`${edge.source}-${edge.target}`)).sort();
    const edges2 = graph2.edges.filter(edge => edge.type.includes(type)).map(edge => normalizeString(`${edge.source}-${edge.target}`)).sort();
    return edges1.length === edges2.length && edges1.every((edge, index) => edge === edges2[index]);
  };

  // Test 3: Value type nodes
  const valueTypeNodesPassed = compareNodesByType(graph1, graph2, 'value');
  feedback += `Wertetyp Knoten: ${valueTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeNodesPassed) passedTests++;

  // Test 4: Value type edges
  const valueTypeEdgesPassed = compareEdgesByType(graph1, graph2, 'value');
  feedback += `Wertetyp Kanten: ${valueTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeEdgesPassed) passedTests++;

  // Test 5: Reference type nodes
  const referenceTypeNodesPassed = compareNodesByType(graph1, graph2, 'reference');
  feedback += `Referenztyp Knoten: ${referenceTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeNodesPassed) passedTests++;

  // Test 6: Reference type edges
  const referenceTypeEdgesPassed = compareEdgesByType(graph1, graph2, 'reference');
  feedback += `Referenztyp Kanten: ${referenceTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeEdgesPassed) passedTests++;

  // Summary message
  let summaryMessage = `Du hast ${passedTests} von ${totalTests} Testfällen bestanden - `;
  summaryMessage +=
    passedTests <= 2 ? 'es gibt noch viel zu tun.' :
      passedTests < totalTests ? 'weiter so!' :
        'perfekt!';
  feedback = summaryMessage + '\n\n' + feedback;

  // Determine final result
  const result = passedTests == totalTests;

  return { result, feedback };
}

function isEqualGraphInput(graph1: CodeGraph, graph2: CodeGraph): { result: boolean, feedback: string } {
  let feedback = '';
  let passedTests = 0;
  const totalTests = 4;

  // Helper function to normalize strings for comparison
  const normalizeString = (str: string): string => {
    return str.trim().replace(/"/g, "'");
  };

  // Adjusted helper function to compare nodes by type with normalization
  const compareNodesByType = (graph1: CodeGraph, graph2: CodeGraph, type: "value" | "reference"): boolean => {
    const nodes1 = graph1.nodes.filter(node => node.type.includes(type)).map(node => normalizeString(String(node.label))).sort();
    const nodes2 = graph2.nodes.filter(node => node.type.includes(type)).map(node => normalizeString(String(node.label))).sort();
    return nodes1.length === nodes2.length && nodes1.every((label, index) => label === nodes2[index]);
  };

  // Adjusted helper function to compare edges by label connections
  const compareEdgesByLabelConnections = (graph1: CodeGraph, graph2: CodeGraph, type: "value" | "reference"): boolean => {
    const getLabelById = (graph: CodeGraph, id: string) => {
      const node = graph.nodes.find(node => node.id === id);
      return node ? normalizeString(String(node.label)) : '';
    };

    const edges1 = graph1.edges.filter(edge => edge.type.includes(type)).map(edge => `${getLabelById(graph1, edge.source)}-${getLabelById(graph1, edge.target)}`).sort();
    const edges2 = graph2.edges.filter(edge => edge.type.includes(type)).map(edge => `${getLabelById(graph2, edge.source)}-${getLabelById(graph2, edge.target)}`).sort();
    return edges1.length === edges2.length && edges1.every((edge, index) => edge === edges2[index]);
  };

  // Test 1: Value type nodes
  const valueTypeNodesPassed = compareNodesByType(graph1, graph2, 'value');
  feedback += `Wertetyp Knoten: ${valueTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeNodesPassed) passedTests++;

  // Test 2: Value type edges
  const valueTypeEdgesPassed = compareEdgesByLabelConnections(graph1, graph2, 'value');
  feedback += `Wertetyp Kanten: ${valueTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeEdgesPassed) passedTests++;

  // Test 3: Reference type nodes
  const referenceTypeNodesPassed = compareNodesByType(graph1, graph2, 'reference');
  feedback += `Referenztyp Knoten: ${referenceTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeNodesPassed) passedTests++;

  // Test 4: Reference type edges
  const referenceTypeEdgesPassed = compareEdgesByLabelConnections(graph1, graph2, 'reference');
  feedback += `Referenztyp Kanten: ${referenceTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeEdgesPassed) passedTests++;

  // Summary message
  let summaryMessage = `Du hast ${passedTests} von ${totalTests} Testfällen bestanden - `;
  summaryMessage +=
    passedTests <= 1 ? 'es gibt noch viel zu tun.' :
      passedTests < totalTests ? 'weiter so!' :
        'perfekt!';
  feedback = summaryMessage + '\n\n' + feedback;

  // Determine final result
  const result = passedTests == totalTests;

  return { result, feedback };
}