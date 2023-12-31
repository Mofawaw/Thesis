import { create } from 'zustand';

interface Node {
  id: string;
  type: string;
  label: string;
  position: { x: number, y: number };
}

interface Edge {
  id: string;
  type: string;
  source: Node;
  target: Node;
}

interface Graph {
  nodes: Node[],
  edges: Edge[]
}

type CodeIDEStore = {
  code: string;
  output: string;
  graph: Graph;
  setCode: (newCode: string) => (void);
  setOutput: (newOutput: string) => (void);
  setGraph: (newGraphJSON: any) => (void);
};

const useCodeIDEStore = create<CodeIDEStore>((set) => ({
  code: '',
  output: '',
  graph: { nodes: [], edges: [] },
  setCode: (newCode: string) => set(() => ({ code: newCode })),
  setOutput: (newOutput: string) => set(() => ({ output: newOutput })),
  setGraph: (newGraphJSON: any) => set(() => ({ graph: jsonGraphDecoder(newGraphJSON) }))
}));

export default useCodeIDEStore;

export const codeIDEHelper = {
  editor: {
    getHeight: (availableHeight: number) => (availableHeight - 240)
  },
  graph: {
    node: {
      getWidth: (nodeType: string) => (nodeType.includes("stack") ? 80 : 150),
      height: 35,
      gap: { x: 50, y: 5 }
    },
    referenceOffset: 20,
  }
}

function generatePositions(graph: Graph): Graph {
  const stackValueNodes = graph.nodes.filter((node: any) => node.type === ('value-stack'));
  const stackReferenceNodes = graph.nodes.filter((node: any) => node.type === ('reference-stack'));

  const heapValueNodes = graph.nodes.filter((node: any) => node.type === ('value-heap'));
  const heapReferenceNodes = graph.nodes.filter((node: any) => node.type.startsWith('reference-heap'));

  const xStack = 0;
  const xHeap = codeIDEHelper.graph.node.getWidth('stack') + codeIDEHelper.graph.node.gap.x;
  const yGap = codeIDEHelper.graph.node.height + codeIDEHelper.graph.node.gap.y;
  const yReferenceOffset = codeIDEHelper.graph.referenceOffset;

  stackValueNodes.concat(stackReferenceNodes).forEach((node: any, i: number) => {
    const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
    node.position = { x: xStack, y: yOffset + i * yGap };
  });

  heapValueNodes.concat(heapReferenceNodes).forEach((node: any, i: number) => {
    const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
    node.position = { x: xHeap, y: yOffset + i * yGap };
  });

  graph.nodes = stackValueNodes.concat(stackReferenceNodes, heapValueNodes, heapReferenceNodes);
  return graph
}

function jsonGraphDecoder(jsonData: any): Graph {
  const nodeMap = new Map<string, Node>();

  // Decode nodes
  const nodes = jsonData.nodes.map((node: any) => {
    const newNode: Node = {
      id: node.id,
      type: node.type,
      label: node.label,
      position: { x: 0, y: 0 }
    };
    nodeMap.set(node.id, newNode);
    return newNode;
  });

  // Decode edges
  const edges = jsonData.edges.map((edge: any) => {
    const sourceNodeId = `n-${edge.source}`;
    const targetNodeId = `n-${edge.target}`;

    const sourceNode = nodeMap.get(sourceNodeId);
    const targetNode = nodeMap.get(targetNodeId);

    if (!sourceNode || !targetNode) {
      throw new Error("Invalid edge reference in the data");
    }

    return {
      id: edge.id,
      type: edge.type,
      source: sourceNode,
      target: targetNode
    };
  });

  const graph = { nodes, edges }
  generatePositions(graph)

  console.log(JSON.stringify(graph))

  return graph;
}
