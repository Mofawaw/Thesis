import config from '../../../../tailwind.config.ts'
import { dia, shapes } from 'jointjs';
import CodeGraph, { CodeGraphNode, CodeGraphEdge } from './codeGraph.ts'

const { colors } = config.theme
const { fontFamily } = config.theme

export const stylesGraphInput = {
  node: {
    width: 100,
    height: 35,
    gap: { x: 50, y: 5 },
    padding: 10,
    font: { size: "15px", family: fontFamily['th-mono'][0] },
    color: {
      text: colors['th-black'][100],
      rect: colors['th-black'][10],
      rectActive: colors['th-black'][20],
      getRectPreset: (type: string) => (type.includes("value") ? colors['th-value'][20] : colors['th-reference'][20])
    },
    strokeWidth: 3
  },
  edge: {
    getColor: (type: string) => (type === "value" ? colors['th-value'][100] : colors['th-reference'][100])
  },
  referenceOffset: 20,
}

export function addDataToGraphInput(graph: CodeGraph, presetGraph: CodeGraph, diaGraph: dia.Graph) {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();

  let maxWidthOfStackNodes = calculateMaxWidth(graph.nodes, "stack", graph.inputMaxChars ?? 0);
  let maxWidthOfHeapNodes = calculateMaxWidth(graph.nodes, "heap", graph.inputMaxChars ?? 0);
  const maxWidthOfNodes = Math.max(maxWidthOfStackNodes, maxWidthOfHeapNodes);

  positionNodes(graph.nodes, maxWidthOfNodes);
  addNodesToGraph(graph.nodes, nodeRectMap, diaGraph, presetGraph.nodes, graph.inputMaxChars ?? 0, maxWidthOfNodes);
  addEdgesToGraph(graph.edges, nodeRectMap, diaGraph);
};

const createAndResizeRect = (inputMaxChars: number): shapes.standard.Rectangle => {
  const rect = new shapes.standard.Rectangle();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const maxCharLabel = "x".repeat(inputMaxChars);

  if (context) {
    context.font = `${stylesGraphInput.node.font.size} ${stylesGraphInput.node.font.family}`;
    const textWidth = context.measureText(maxCharLabel).width;
    rect.resize(textWidth + (stylesGraphInput.node.padding * 2), stylesGraphInput.node.height);
  } else {
    console.error("Canvas context not available");
  }

  return rect;
};

const calculateMaxWidth = (nodes: CodeGraphNode[], type: string, inputMaxChars: number): number => {
  return nodes
    .filter(node => node.type.includes(type))
    .reduce((maxWidth, node) => {
      const rect = createAndResizeRect(inputMaxChars);
      return Math.max(maxWidth, rect.size().width);
    }, 0);
};

const positionNodes = (nodes: CodeGraphNode[], maxWidthOfNodes: number): void => {
  const sortNodes = (nodes: CodeGraphNode[]): CodeGraphNode[] => {
    const valueNodes = nodes.filter(node => node.type.includes("value"));
    const referenceNodes = nodes.filter(node => node.type.includes("reference"));
    return [...valueNodes, ...referenceNodes];
  };

  const setPosition = (nodes: CodeGraphNode[], isStack: boolean): void => {
    const isEmptyValueNodes = nodes.filter(node => node.type.includes("value")).length === 0;
    const yGap = stylesGraphInput.node.height + stylesGraphInput.node.gap.y;
    const yReferenceOffset = isEmptyValueNodes ? 0 : stylesGraphInput.referenceOffset;

    nodes.forEach((node, i) => {
      let xOffset = 0;
      xOffset = isStack ? 0 : maxWidthOfNodes + stylesGraphInput.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const stackNodes = sortNodes(nodes.filter(node => node.type.includes("stack")));
  const heapNodes = sortNodes(nodes.filter(node => node.type.includes("heap")));

  setPosition(stackNodes, true);
  setPosition(heapNodes, false);
};

const addNodesToGraph = (nodes: CodeGraphNode[], nodeRectMap: Map<string, shapes.standard.Rectangle>, diaGraph: dia.Graph, presetNodes: CodeGraphNode[], inputMaxChars: number, maxWidthOfNodes: number): void => {
  nodes.forEach((node) => {
    const rect = createAndResizeRect(inputMaxChars);
    const position = { x: node.position?.x ?? 0, y: node.position?.y ?? 0 }
    const presetNode = presetNodes.find((presetNode: CodeGraphNode) => presetNode.id === node.id);

    rect.position(position.x + stylesGraphInput.node.strokeWidth / 2, position.y + stylesGraphInput.node.strokeWidth / 2);
    rect.attr({
      body: {
        fill: presetNode?.label === "" ? (node?.label === "" ? "none" : stylesGraphInput.node.color.rect) : stylesGraphInput.node.color.getRectPreset(node.type),
        stroke: presetNode?.label === "" ? stylesGraphInput.node.color.rect : stylesGraphInput.node.color.getRectPreset(node.type),
        strokeWidth: 3,
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
        fontSize: stylesGraphInput.node.font.size,
        fontFamily: stylesGraphInput.node.font.family,
        fill: stylesGraphInput.node.color.text
      }
    });
    rect.prop('nodeId', node.id);
    rect.prop('maxChars', inputMaxChars);
    rect.prop('preset', presetNode?.label !== "");

    diaGraph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });
};

const addEdgesToGraph = (edges: CodeGraphEdge[], nodeRectMap: Map<string, shapes.standard.Rectangle>, diaGraph: dia.Graph): void => {
  edges.forEach((edge) => {
    const sourceNodeRect = nodeRectMap.get(edge.source);
    const targetNodeRect = nodeRectMap.get(edge.target);

    if (!sourceNodeRect || !targetNodeRect) {
      throw new Error("Invalid edge reference in the data");
    }

    const sourceBBox = sourceNodeRect.getBBox();
    const sourcePoint = {
      x: sourceBBox.x + sourceBBox.width,
      y: sourceBBox.y + sourceBBox.height / 2
    };

    const targetBBox = targetNodeRect.getBBox();
    const targetPoint = {
      x: targetBBox.x,
      y: targetBBox.y + targetBBox.height / 2
    };

    const link = new shapes.standard.Link({
      source: sourcePoint,
      target: targetPoint,
      attrs: {
        line: {
          stroke: stylesGraphInput.edge.getColor(edge.type),
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 6 -3 0 0 6 3 Z'
          }
        }
      }
    });

    diaGraph.addCell(link);
  });
};