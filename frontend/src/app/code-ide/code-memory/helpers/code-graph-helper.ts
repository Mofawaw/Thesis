import { dia, shapes } from 'jointjs';

import { thColors } from '@/utilities/th-color.ts';
import { thFont } from '@/utilities/th-font.ts';

import CodeGraph, { CodeGraphNode, CodeGraphEdge } from '../code-memory-types.ts'

export const stylesGraph = {
  node: {
    width: 100,
    height: 35,
    gap: { x: 50, y: 5 },
    padding: 10,
    font: { size: "15px", family: thFont['th-mono'][0] },
    color: {
      text: thColors['th-black'][100],
      rect: thColors['th-black'][10],
    },
    strokeWidth: 3
  },
  edge: {
    getColor: (type: string) => (type === "value" ? thColors['th-value'][100] : thColors['th-reference'][100])
  },
  referenceOffset: 20,
}

export function addDataToGraph(graph: CodeGraph, diaGraph: dia.Graph) {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();
  let maxWidthOfStackNodes = calculateMaxWidth(graph.nodes, "stack");

  positionNodes(graph.nodes, maxWidthOfStackNodes);
  addNodesToGraph(graph.nodes, nodeRectMap, diaGraph);
  addEdgesToGraph(graph.edges, nodeRectMap, diaGraph);
};

const createAndResizeRect = (labelText: string): shapes.standard.Rectangle => {
  const rect = new shapes.standard.Rectangle();
  rect.resize(stylesGraph.node.width, stylesGraph.node.height);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = `${stylesGraph.node.font.size} ${stylesGraph.node.font.family}`;
    const textWidth = context.measureText(labelText).width;
    rect.resize(textWidth + (stylesGraph.node.padding * 2), stylesGraph.node.height);
  } else {
    console.error("Canvas context not available");
  }

  return rect;
};

const calculateMaxWidth = (nodes: CodeGraphNode[], type: string): number => {
  return nodes
    .filter(node => node.type.includes(type))
    .reduce((maxWidth, node) => {
      const rect = createAndResizeRect(node.label);
      return Math.max(maxWidth, rect.size().width);
    }, 0);
};

const positionNodes = (nodes: CodeGraphNode[], maxWidthOfStackNodes: number): void => {
  const sortNodes = (nodes: CodeGraphNode[]): CodeGraphNode[] => {
    const valueNodes = nodes.filter(node => node.type.includes("value"));
    const referenceNodes = nodes.filter(node => node.type.includes("reference"));
    return [...valueNodes, ...referenceNodes];
  };

  const setPosition = (nodes: CodeGraphNode[], isStack: boolean): void => {
    const isEmptyValueNodes = nodes.filter(node => node.type.includes("value")).length === 0;
    const yGap = stylesGraph.node.height + stylesGraph.node.gap.y;
    const yReferenceOffset = isEmptyValueNodes ? 0 : stylesGraph.referenceOffset;

    nodes.forEach((node, i) => {
      let xOffset = 0;
      xOffset = isStack ? 0 : maxWidthOfStackNodes + stylesGraph.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const stackNodes = sortNodes(nodes.filter(node => node.type.includes("stack")));
  const heapNodes = sortNodes(nodes.filter(node => node.type.includes("heap")));

  setPosition(stackNodes, true);
  setPosition(heapNodes, false);
};

const addNodesToGraph = (nodes: CodeGraphNode[], nodeRectMap: Map<string, shapes.standard.Rectangle>, diaGraph: dia.Graph): void => {
  nodes.forEach((node) => {
    const rect = createAndResizeRect(node.label);
    const position = { x: node.position?.x ?? 0, y: node.position?.y ?? 0 }

    rect.position(position.x, position.y);
    rect.attr({
      body: {
        fill: stylesGraph.node.color.rect,
        stroke: "none",
        strokeWidth: stylesGraph.node.strokeWidth,
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
        fontSize: stylesGraph.node.font.size,
        fontFamily: stylesGraph.node.font.family,
        fill: stylesGraph.node.color.text
      }
    });

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
          stroke: stylesGraph.edge.getColor(edge.type),
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