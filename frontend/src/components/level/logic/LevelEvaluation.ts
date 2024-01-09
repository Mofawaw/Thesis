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
        return {
          result: comparisonResult.result,
          message: comparisonResult.errorMessage ? `Dein Code generiert nicht den erwarteten Speicher-Graphen:\n\n${comparisonResult.errorMessage}` : 'Dein Code generiert nicht den erwarteten Speicher-Graphen.'
        };
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
        const comparisonResultC3 = isEqualGraph(userGraphInput, level.expected.graph);
        return {
          result: comparisonResultC3.result,
          message: comparisonResultC3.errorMessage ? `Der Graph ist nicht korrekt:\n\n${comparisonResultC3.errorMessage}` : 'Der Graph ist nicht korrekt.'
        };
      }
      break;

    default:
      console.error(`Unknown category: ${category.id}`);
      return { result: false, message: `Unbekannte Kategorie: ${category.id}` };
  }

  return { result: false, message: 'Unbekannter Fehler' };
}

// Graph equality criteria:
// 1. Same number of nodes and edges
// 2. Same set of node types and labels (converted to strings for comparison)
// 3. Same set of edge connections (independent of node IDs)
// 4. Position is irrelevant for comparison
// 5. Node labels are compared as strings, so numeric labels are converted to strings
function isEqualGraph(graph1: CodeGraph, graph2: CodeGraph): { result: boolean, errorMessage?: string } {
  // Check if the numbers of nodes and edges are the same
  if (graph1.nodes.length !== graph2.nodes.length || graph1.edges.length !== graph2.edges.length) {
    return {
      result: false,
      errorMessage: `Number of nodes or edges differs (Nodes: ${graph1.nodes.length}/${graph2.nodes.length}, Edges: ${graph1.edges.length}/${graph2.edges.length})`
    };
  }

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

  const labels1 = groupLabelsByType(graph1);
  const labels2 = groupLabelsByType(graph2);
  const edges1 = convertEdges(graph1);
  const edges2 = convertEdges(graph2);

  // Compare node labels by type
  for (let type in labels1) {
    if (!labels2[type] || labels1[type].size !== labels2[type].size || ![...labels1[type]].every(label => labels2[type].has(label))) {
      return {
        result: false,
        errorMessage: `Mismatch in nodes of type '${type}'.`
      };
    }
  }

  // Compare edges
  if (edges1.length !== edges2.length || !edges1.every((edge, index) => edge === edges2[index])) {
    return {
      result: false,
      errorMessage: `Mismatch in edges.`
    };
  }

  // If all checks pass, the graphs are considered equal
  return { result: true };
}