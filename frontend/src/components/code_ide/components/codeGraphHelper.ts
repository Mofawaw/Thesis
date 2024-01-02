import config from '../../../../tailwind.config.ts'
import { dia, shapes } from 'jointjs';
import CodeGraph, { Node, Edge } from './CodeGraph.ts';

const { colors } = config.theme
const { fontFamily } = config.theme

const styles = {
  node: {
    width: 100,
    height: 35,
    gap: { x: 50, y: 5 },
    padding: 10,
    font: { size: "15px", family: fontFamily['th-mono'][0] },
    color: { text: colors['th-black'][100], rect: colors['th-black'][10] }
  },
  edge: {
    getColor: (type: string) => (type == "value" ? colors['th-value'][100] : colors['th-reference'][100])
  },
  referenceOffset: 20,
}

export enum Mode {
  default = 'default',
  input = 'input'
}

export const addData = (codeGraph: CodeGraph, graph: dia.Graph, mode: Mode) => {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();
  const maxWidthOfStackNodes = calculateMaxWidth(codeGraph.nodes, "stack");
  const maxWidthOfHeapNodes = calculateMaxWidth(codeGraph.nodes, "heap");

  positionNodes(codeGraph.nodes, maxWidthOfStackNodes);
  addNodesToGraph(codeGraph.nodes, graph, nodeRectMap);
  addEdgesToGraph(codeGraph.edges, nodeRectMap, graph);
};

const createAndResizeRect = (labelText: string): shapes.standard.Rectangle => {
  const rect = new shapes.standard.Rectangle();
  rect.resize(styles.node.width, styles.node.height);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (context) {
    context.font = `${styles.node.font.size} ${styles.node.font.family}`;
    const textWidth = context.measureText(labelText).width;
    rect.resize(textWidth + (styles.node.padding * 2), styles.node.height);
  } else {
    console.error("Canvas context not available");
  }

  return rect;
};

const calculateMaxWidth = (nodes: Node[], type: string): number => {
  return nodes
    .filter(node => node.type.includes(type))
    .reduce((maxWidth, node) => {
      const rect = createAndResizeRect(node.label);
      return Math.max(maxWidth, rect.size().width);
    }, 0);
};

const positionNodes = (nodes: Node[], maxWidthOfStackNodes: number): void => {
  const sortNodes = (nodes: Node[]): Node[] => {
    const valueNodes = nodes.filter(node => node.type.includes("value"));
    const referenceNodes = nodes.filter(node => node.type.includes("reference"));
    return [...valueNodes, ...referenceNodes];
  };

  const setPosition = (nodes: Node[], isStack: boolean, maxWidthOfStackNodes: number): void => {
    const yGap = styles.node.height + styles.node.gap.y;
    const yReferenceOffset = styles.referenceOffset;

    nodes.forEach((node, i) => {
      const xOffset = isStack ? 0 : maxWidthOfStackNodes + styles.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const stackNodes = sortNodes(nodes.filter(node => node.type.includes("stack")));
  const heapNodes = sortNodes(nodes.filter(node => node.type.includes("heap")));

  setPosition(stackNodes, true, maxWidthOfStackNodes);
  setPosition(heapNodes, false, maxWidthOfStackNodes);
};

const addNodesToGraph = (nodes: Node[], graph: dia.Graph, nodeRectMap: Map<string, shapes.standard.Rectangle>): void => {
  nodes.forEach((node) => {
    const rect = createAndResizeRect(node.label);
    rect.position(node.position.x, node.position.y);
    rect.attr({
      body: {
        fill: styles.node.color.rect,
        stroke: "none",
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
        fontSize: styles.node.font.size,
        fontFamily: styles.node.font.family,
        fill: styles.node.color.text
      }
    });

    graph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });
};

const addEdgesToGraph = (edges: Edge[], nodeRectMap: Map<string, shapes.standard.Rectangle>, graph: dia.Graph): void => {
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
          stroke: styles.edge.getColor(edge.type),
          strokeWidth: 2,
          targetMarker: {
            'type': 'path',
            'd': 'M 8 -4 0 0 8 4 Z'
          }
        }
      }
    });

    graph.addCell(link);
  });
};