import { Node } from "reactflow";
import { compileGetGraph, compileGetOutput } from "../../code_ide/codeIDENetwork";
import useCodeIDEStore from "../../code_ide/codeIDEStore";
import CodeGraph from "../../code_ide/code_memory/codeGraph";
import { ThLevel } from "../types/thTypes";
import { CodeIDENodeData } from "../types/nodeTypes";

export function checkAndReturnResults(level: ThLevel, nodes: Node[]): Promise<{ result: boolean, message: string }> {
  return check(level, nodes)
    .then(result => {
      let message = "";
      if (result) {
        message = "Super!\nDu hast das Level erfolgreich abgeschlossen.";
        return { result: true, message: message };
      } else {
        message = "Schade. Es hat noch nicht ganz geklappt.\nGrund:";
        // TODO: message += from check
        return { result: false, message: message };
      }
    })
    .catch(error => {
      let message = "Es hat einen Fehler gegeben. Stelle sicher dass dein Code funktioniert!";
      message += `\nError: ${error}`; // TODO: pass errors from output, graph separately
      return { result: false, message: message };
    });
}

// Check if user has correctly completed the level task
async function check(level: ThLevel, nodes: Node[]): Promise<boolean> {
  const category = level.category;
  const mainNode = nodes.find(node => (node.data as CodeIDENodeData).codeIDE.isMain);
  const mainScopeId = mainNode ? (mainNode.data as CodeIDENodeData).codeIDE.scopeId : null;

  if (!mainScopeId) {
    console.error('Main scope ID not found');
    return false;
  }

  try {
    const expectedOutput = level.expected.output;
    const expectedGraph = level.expected.graph;

    switch (category.id) {
      case "c-1":
        if (expectedOutput) {
          return await checkUserOutput(mainScopeId, expectedOutput);
        }
      case "c-2":
        if (expectedGraph) {
          return await checkUserGraph(mainScopeId, expectedGraph);
        }
      case "c-3":
        if (expectedGraph) {
          return await checkUserInputGraph(mainScopeId, expectedGraph);
        }

      default:
        console.error(`Unknown category: ${category.id}`);
        return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// Category 1
async function checkUserOutput(scopeId: string, expectedOutput: string) {
  try {
    const codeIDEOutput = await compileGetOutput(scopeId);
    console.log("Output-CodeIDE:", codeIDEOutput);
    console.log("Output-Expected:", expectedOutput)
    return codeIDEOutput.trim() === expectedOutput.trim();
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// Category 2
async function checkUserGraph(scopeId: string, expectedGraph: CodeGraph) {
  try {
    const codeIDEGraph = await compileGetGraph(scopeId);
    console.log("Graph-CodeIDE:", codeIDEGraph);
    console.log("Graph-Expected:", codeIDEGraph);
    return isEqualGraph(codeIDEGraph, expectedGraph);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// Category 3
async function checkUserInputGraph(scopeId: string, expectedGraph: CodeGraph) {
  try {
    const codeIDEGraph = await useCodeIDEStore(scopeId).getState().graph;
    console.log("Graph-CodeIDE:", codeIDEGraph);
    console.log("Graph-Expected:", codeIDEGraph);
    return isEqualGraph(codeIDEGraph, expectedGraph);
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}

// GPT-4
function isEqualGraph(graph1: CodeGraph, graph2: CodeGraph) {
  if (graph1.nodes.length !== graph2.nodes.length || graph1.edges.length !== graph2.edges.length) {
    return false;
  }

  // Group nodes by type and collect labels
  const groupLabelsByType = (graph: CodeGraph) => {
    return graph.nodes.reduce((acc, node) => {
      acc[node.type] = acc[node.type] || new Set();
      acc[node.type].add(node.label);
      return acc;
    }, {} as Record<string, Set<string>>);
  };

  // Convert edges to a format that's independent of node IDs
  const convertEdges = (graph: CodeGraph) => {
    return graph.edges.map(edge => {
      const sourceNode = graph.nodes.find(node => node.id === edge.source);
      const targetNode = graph.nodes.find(node => node.id === edge.target);
      return `${edge.type}-${sourceNode?.type}-${sourceNode?.label}-${targetNode?.type}-${targetNode?.label}`;
    }).sort();
  };

  const labels1 = groupLabelsByType(graph1);
  const labels2 = groupLabelsByType(graph2);
  const edges1 = convertEdges(graph1);
  const edges2 = convertEdges(graph2);

  // Compare node labels by type
  for (let type in labels1) {
    if (!labels2[type] || labels1[type].size !== labels2[type].size || ![...labels1[type]].every(label => labels2[type].has(label))) {
      return false;
    }
  }

  // Compare edges
  if (edges1.length !== edges2.length || !edges1.every((edge, index) => edge === edges2[index])) {
    return false;
  }

  return true;
}