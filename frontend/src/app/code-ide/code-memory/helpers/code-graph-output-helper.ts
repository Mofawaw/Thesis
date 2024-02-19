import { dia, shapes } from 'jointjs';

import { thFont } from '@/utilities/th-font.ts';
import { thColors } from '@/utilities/th-color.ts';

import CodeGraph, { CodeGraphNode, CodeGraphEdge } from '../code-memory-types.ts'

export const stylesGraphOutput = {
  node: {
    width: 100,
    height: 40,
    gap: { x: 100, y: 10 },
    padding: 10,
    font: { size: "15px", family: thFont['th-mono'][0] },
    color: {
      text: thColors['th-black'][100],
      rect: thColors['th-black'][10],
      getRectMatch: (type: string) => (type.includes("value") ? thColors['th-value'][20] : thColors['th-reference'][20])
    },
    strokeWidth: 3
  },
  edge: {
    color: thColors['th-black'][20],
    getColorMatch: (type: string) => (type === "value" ? thColors['th-value'][100] : thColors['th-reference'][100])
  },
  referenceOffset: 20,
}

export function addDataToGraphOutput(graph: CodeGraph, initialGraph: CodeGraph, graphOutput: { nodeIds: Set<string>, edgeIds: Set<string> }, diaGraph: dia.Graph) {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();

  let maxWidthOfStackNodes = calculateMaxWidth(graph.nodes, "stack", graph.inputMaxChars ?? 0);
  let maxWidthOfHeapNodes = calculateMaxWidth(graph.nodes, "heap", graph.inputMaxChars ?? 0);
  const maxWidthOfNodes = Math.max(maxWidthOfStackNodes, maxWidthOfHeapNodes);

  positionNodes(graph.nodes, maxWidthOfNodes);
  addNodesToGraph(graph.nodes, nodeRectMap, diaGraph, initialGraph.nodes, graphOutput.nodeIds, graph.inputMaxChars ?? 0);
  addEdgesToGraph(graph.edges, nodeRectMap, diaGraph, graphOutput.edgeIds,);
};

const createAndResizeRect = (inputMaxChars: number): shapes.standard.Rectangle => {
  const rect = new shapes.standard.Rectangle();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const maxCharLabel = "x".repeat(inputMaxChars);

  if (context) {
    context.font = `${stylesGraphOutput.node.font.size} ${stylesGraphOutput.node.font.family}`;
    const textWidth = context.measureText(maxCharLabel).width;
    rect.resize(textWidth + (stylesGraphOutput.node.padding * 2), stylesGraphOutput.node.height);
  } else {
    console.error("Canvas context not available");
  }

  return rect;
};

const calculateMaxWidth = (nodes: CodeGraphNode[], type: string, inputMaxChars: number): number => {
  return nodes
    .filter(node => node.type.includes(type))
    .reduce((maxWidth, _) => {
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
    const yGap = stylesGraphOutput.node.height + stylesGraphOutput.node.gap.y;
    const yReferenceOffset = isEmptyValueNodes ? 0 : stylesGraphOutput.referenceOffset;

    nodes.forEach((node, i) => {
      let xOffset = 0;
      xOffset = isStack ? 0 : maxWidthOfNodes + stylesGraphOutput.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const stackNodes = sortNodes(nodes.filter(node => node.type.includes("stack")));
  const heapNodes = sortNodes(nodes.filter(node => node.type.includes("heap")));

  setPosition(stackNodes, true);
  setPosition(heapNodes, false);
};

const addNodesToGraph = (nodes: CodeGraphNode[], nodeRectMap: Map<string, shapes.standard.Rectangle>, diaGraph: dia.Graph, initialNodes: CodeGraphNode[], outputNodeIds: Set<string>, inputMaxChars: number): void => {
  nodes.forEach((node) => {
    const rect = createAndResizeRect(inputMaxChars);
    const position = { x: node.position?.x ?? 0, y: node.position?.y ?? 0 }
    const initialNode = initialNodes.find((initialNode: CodeGraphNode) => initialNode.id === node.id);

    rect.position(position.x + stylesGraphOutput.node.strokeWidth / 2, position.y + stylesGraphOutput.node.strokeWidth / 2);
    rect.attr({
      body: {
        fill: initialNode?.label === "" ? (outputNodeIds.has(node?.id) ? stylesGraphOutput.node.color.getRectMatch(node.type) : "none") : stylesGraphOutput.node.color.getRectMatch(node.type),
        stroke: initialNode?.label === "" ? (outputNodeIds.has(node?.id) ? stylesGraphOutput.node.color.getRectMatch(node.type) : stylesGraphOutput.node.color.rect) : stylesGraphOutput.node.color.getRectMatch(node.type),
        strokeWidth: 3,
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
        fontSize: stylesGraphOutput.node.font.size,
        fontFamily: stylesGraphOutput.node.font.family,
        fill: initialNode?.label === "" ? (outputNodeIds.has(node?.id) ? stylesGraphOutput.node.color.text : "none") : stylesGraphOutput.node.color.text
      }
    });
    rect.prop('nodeId', node.id);
    rect.prop('maxChars', inputMaxChars);
    rect.prop('preset', initialNode?.label !== "");

    diaGraph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });
};

const addEdgesToGraph = (edges: CodeGraphEdge[], nodeRectMap: Map<string, shapes.standard.Rectangle>, diaGraph: dia.Graph, outputEdgeIds: Set<string>): void => {
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
          stroke: outputEdgeIds.has(edge?.id) ? stylesGraphOutput.edge.getColorMatch(edge.type) : stylesGraphOutput.edge.color,
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