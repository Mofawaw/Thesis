import useTestingStore from "@/testing-1/testing-store.ts";
import useCodeIDEStore from "../../code-ide-store.ts";
import CodeGraph from "../code-memory-types.ts";

export function calculateAndSetGraphOutput(scopeId: string) {
  const store = useCodeIDEStore(scopeId).getState();
  const testingStore = useTestingStore.getState();

  const expectedGraph = testingStore.currentLevel.expected.graph ?? { nodes: [], edges: [] };

  store.setGraphOutput(getGraphMatches(store.graph, expectedGraph));
  console.log("Graph Output", getGraphMatches(store.graph, expectedGraph));
}

function getGraphMatches(graph1: CodeGraph, graph2: CodeGraph): { nodeIds: Set<string>, edgeIds: Set<string> } {
  const nodeIds = new Set<string>();
  const edgeIds = new Set<string>();

  const normalizeString = (str: string): string => {
    return str.trim().replace(/"/g, "'");
  };

  const getMatchingNodesByType = (type: "value" | "reference"): Set<string> => {
    const nodes1 = graph1.nodes.filter(node => node.type.includes(type));
    const nodes2 = graph2.nodes.filter(node => node.type.includes(type));
    const matchingNodeIds = new Set<string>();

    nodes2.forEach(node2 => {
      const label2 = normalizeString(String(node2.label));
      const matchingNode = nodes1.find(node1 => normalizeString(String(node1.label)) === label2);
      if (matchingNode) {
        matchingNodeIds.add(matchingNode.id);
      }
    });

    return matchingNodeIds;
  };

  const getMatchingEdgesByLabelConnections = (type: "value" | "reference"): Set<string> => {
    const getLabelById = (graph: CodeGraph, id: string) => {
      const node = graph.nodes.find(node => node.id === id);
      return node ? normalizeString(String(node.label)) : '';
    };

    const edges1 = graph1.edges.filter(edge => edge.type.includes(type));
    const edges2 = graph2.edges.filter(edge => edge.type.includes(type));
    const matchingEdgeIds = new Set<string>();

    edges2.forEach(edge2 => {
      const edgeLabel2 = `${getLabelById(graph2, edge2.source)}-${getLabelById(graph2, edge2.target)}`;
      const matchingEdge = edges1.find(edge1 => {
        const edgeLabel1 = `${getLabelById(graph1, edge1.source)}-${getLabelById(graph1, edge1.target)}`;
        return edgeLabel1 === edgeLabel2;
      });

      if (matchingEdge) {
        matchingEdgeIds.add(matchingEdge.id);
      }
    });

    return matchingEdgeIds;
  };

  getMatchingNodesByType('value').forEach(id => nodeIds.add(id));
  getMatchingEdgesByLabelConnections('value').forEach(id => edgeIds.add(id));

  getMatchingNodesByType('reference').forEach(id => nodeIds.add(id));
  getMatchingEdgesByLabelConnections('reference').forEach(id => edgeIds.add(id));

  return { nodeIds, edgeIds };
}
