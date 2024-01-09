import { Node } from "reactflow";
import { CodeIDENetworkResultType, compileGetGraph, compileGetOutput } from "../../code_ide/codeIDENetwork";
import useCodeIDEStore from "../../code_ide/codeIDEStore";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import { ThLevel } from "../types/thTypes";
import { CodeIDENodeData } from "../types/nodeTypes";

export function evaluateLevelCompletion(level: ThLevel, nodes: Node[]): Promise<{ result: boolean, message: string }> {
  return verifyLevelCriteria(level, nodes)
    .then(({ result, message }) => {
      if (result) {
        message = "Super!\nDu hast das Level erfolgreich abgeschlossen.";
      } else {
        message = message ? `Schade. Es hat noch nicht ganz geklappt:\n\n${message}` : "Schade. Es hat noch nicht ganz geklappt.\n\n";
      }
      return { result, message };
    });
}

async function verifyLevelCriteria(level: ThLevel, nodes: Node[]): Promise<{ result: boolean, message: string }> {
  const category = level.category;
  const mainNode = nodes.find(node => (node.data as CodeIDENodeData).codeIDE.isMain);
  const mainScopeId = mainNode ? (mainNode.data as CodeIDENodeData).codeIDE.scopeId : null;

  if (!mainScopeId) {
    console.error('Main scope ID not found');
    return { result: false, message: 'Main scope ID not found' };
  }

  let networkResult: CodeIDENetworkResultType;

  switch (category.id) {
    case "c-1":
      networkResult = await compileGetOutput(mainScopeId);
      if (!networkResult.success) {
        return { result: false, message: networkResult.error || "Error in compileGetOutput" };
      }
      const userOutput = networkResult.output || "";
      console.log("Output-User:", userOutput);
      console.log("Output-Expected:", level.expected.output);
      return {
        result: level.expected.output ? (userOutput.trim() === level.expected.output.trim()) : false,
        message: level.expected.output ? (userOutput.trim() === level.expected.output.trim() ? 'Deine Ausgabe ist korrekt.' : 'Deine Ausgabe ist nicht korrekt.') : 'Es wurde keine erwartete Ausgabe definiert.'
      };

    case "c-2":
      networkResult = await compileGetGraph(mainScopeId);
      if (!networkResult.success) {
        return { result: false, message: networkResult.error || "Error in compileGetGraph" };
      }
      const userGraph = networkResult.graph;
      console.log("Graph-User:", userGraph);
      console.log("Graph-Expected:", level.expected.graph);

      if (userGraph && level.expected.graph) {
        const comparisonResult = isEqualGraph(userGraph, level.expected.graph);
        return { result: comparisonResult.result, message: comparisonResult.feedback };
      }
      break;

    case "c-3":
      const userGraphInput = useCodeIDEStore(mainScopeId).getState().graph;
      console.log("Graph-User:", userGraphInput);
      console.log("Graph-Expected:", level.expected.graph);
      if (!userGraphInput) {
        return { result: false, message: 'Es wurde kein Graph im Zustand gefunden.' };
      }
      if (userGraphInput && level.expected.graph) {
        const comparisonResult = isEqualGraph(userGraphInput, level.expected.graph);
        return { result: comparisonResult.result, message: comparisonResult.feedback };
      }
      break;

    default:
      console.error(`Unknown category: ${category.id}`);
      return { result: false, message: `Unbekannte Kategorie: ${category.id}` };
  }

  return { result: false, message: 'Unbekannter Fehler' };
}

function isEqualGraph(graph1: CodeGraph, graph2: CodeGraph): { result: boolean, feedback: string } {
  // Initialize the feedback summary
  let feedback = '';
  let passedTests = 0;
  const totalTests = 6; // Total number of tests

  // Test 1: Number of nodes
  const nodesTestPassed = graph1.nodes.length === graph2.nodes.length;
  feedback += `Anzahl der Knoten: ${nodesTestPassed ? 'bestanden' : 'nicht bestanden'} (${graph1.nodes.length}/${graph2.nodes.length})\n`;
  if (nodesTestPassed) passedTests++;

  // Test 2: Number of edges
  const edgesTestPassed = graph1.edges.length === graph2.edges.length;
  feedback += `Anzahl der Kanten: ${edgesTestPassed ? 'bestanden' : 'nicht bestanden'} (${graph1.edges.length}/${graph2.edges.length})\n`;
  if (edgesTestPassed) passedTests++;

  // Helper function to group nodes by type and collect labels as strings
  const groupLabelsByType = (graph: CodeGraph) => {
    return graph.nodes.reduce((acc, node) => {
      acc[node.type] = acc[node.type] || new Set();
      acc[node.type].add(String(node.label)); // Convert label to string and add to set
      return acc;
    }, {} as Record<string, Set<string>>);
  };

  // Helper function to convert edges to a string format for comparison
  const convertEdges = (graph: CodeGraph) => {
    return graph.edges.map(edge => {
      const sourceNode = graph.nodes.find(node => node.id === edge.source);
      const targetNode = graph.nodes.find(node => node.id === edge.target);
      return `${edge.type}-${sourceNode?.type}-${String(sourceNode?.label)}-${targetNode?.type}-${String(targetNode?.label)}`;
    }).sort();
  };

  // Group nodes and convert edges
  const labels1 = groupLabelsByType(graph1);
  const labels2 = groupLabelsByType(graph2);
  const edges1 = convertEdges(graph1);
  const edges2 = convertEdges(graph2);

  // Test 3 and 4: Value type nodes and edges
  const valueTypeNodesPassed = compareTypes(labels1, labels2, 'value');
  feedback += `Wert-Typ Knoten: ${valueTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeNodesPassed) passedTests++;

  const valueTypeEdgesPassed = compareEdges(edges1, edges2, 'value');
  feedback += `Wert-Typ Kanten: ${valueTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (valueTypeEdgesPassed) passedTests++;

  // Test 5 and 6: Reference type nodes and edges
  const referenceTypeNodesPassed = compareTypes(labels1, labels2, 'reference');
  feedback += `Referenz-Typ Knoten: ${referenceTypeNodesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeNodesPassed) passedTests++;

  const referenceTypeEdgesPassed = compareEdges(edges1, edges2, 'reference');
  feedback += `Referenz-Typ Kanten: ${referenceTypeEdgesPassed ? 'bestanden' : 'nicht bestanden'}\n`;
  if (referenceTypeEdgesPassed) passedTests++;

  // Prepend the summary message based on the number of passed tests
  let summaryMessage = `Du hast ${passedTests} von ${totalTests} Testfällen bestanden - `;
  if (passedTests === 0) {
    summaryMessage += 'es gibt noch viel zu tun.';
  } else if (passedTests < totalTests) {
    summaryMessage += passedTests > (totalTests / 2) ? 'fast geschafft!' : 'weiter so!';
  } else {
    summaryMessage += 'perfekt!';
  }

  feedback = summaryMessage + '\n\n' + feedback;

  // Determine final result
  const result = passedTests === totalTests;

  return { result, feedback };
}

// Helper function to compare node types for 'value' or 'reference'
function compareTypes(labels1: Record<string, Set<string>>, labels2: Record<string, Set<string>>, typeKeyword: string): boolean {
  for (let type in labels1) {
    if (type.includes(typeKeyword)) {
      if (!labels2[type] || labels1[type].size !== labels2[type].size || ![...labels1[type]].every(label => labels2[type].has(label))) {
        return false;
      }
    }
  }
  return true;
}

// Helper function to compare edges for 'value' or 'reference'
function compareEdges(edges1: string[], edges2: string[], typeKeyword: string): boolean {
  const filteredEdges1 = edges1.filter(edge => edge.includes(typeKeyword));
  const filteredEdges2 = edges2.filter(edge => edge.includes(typeKeyword));
  return filteredEdges1.length === filteredEdges2.length && filteredEdges1.every((edge, index) => edge === filteredEdges2[index]);
}