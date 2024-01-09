import config from '../../../../tailwind.config.ts'
import { dia, shapes } from 'jointjs';
import CodeGraph, { CodeGraphNode, CodeGraphEdge } from './codeGraph.ts'
import CodeIDEConfig from '../codeIDEConfig.ts';

const { colors } = config.theme
const { fontFamily } = config.theme

export const styles = {
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

export const addData = (graph: CodeGraph, diaGraph: dia.Graph, config: CodeIDEConfig, presetGraph?: CodeGraph) => {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();
  let maxWidthOfStackNodes = calculateMaxWidth(graph.nodes, "stack");
  let maxWidthOfHeapNodes = calculateMaxWidth(graph.nodes, "heap");

  if (config.mode === "write") {
    maxWidthOfStackNodes = Math.max(maxWidthOfStackNodes, maxWidthOfHeapNodes);
  }

  positionNodes(graph.nodes, maxWidthOfStackNodes);
  addNodesToGraph(graph.nodes, graph.inputMaxChars ?? 0, diaGraph, nodeRectMap, maxWidthOfStackNodes, maxWidthOfHeapNodes, config, presetGraph?.nodes);
  addEdgesToGraph(graph.edges, nodeRectMap, diaGraph);
};

const createAndResizeRect = (labelText: string, maxWidth: number, mode: "write" | "read"): shapes.standard.Rectangle => {
  const rect = new shapes.standard.Rectangle();
  rect.resize(styles.node.width, styles.node.height);

  if (mode === "write") {
    rect.resize(maxWidth, styles.node.height);
  } else {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      context.font = `${styles.node.font.size} ${styles.node.font.family}`;
      const textWidth = context.measureText(labelText).width;
      rect.resize(textWidth + (styles.node.padding * 2), styles.node.height);
    } else {
      console.error("Canvas context not available");
    }
  }

  return rect;
};

const calculateMaxWidth = (nodes: CodeGraphNode[], type: string): number => {
  return nodes
    .filter(node => node.type.includes(type))
    .reduce((maxWidth, node) => {
      const rect = createAndResizeRect(node.label, 0, "read");
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
    const yGap = styles.node.height + styles.node.gap.y;
    const yReferenceOffset = styles.referenceOffset;

    nodes.forEach((node, i) => {
      let xOffset = 0;
      xOffset = isStack ? 0 : maxWidthOfStackNodes + styles.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const stackNodes = sortNodes(nodes.filter(node => node.type.includes("stack")));
  const heapNodes = sortNodes(nodes.filter(node => node.type.includes("heap")));

  setPosition(stackNodes, true);
  setPosition(heapNodes, false);
};

const addNodesToGraph = (nodes: CodeGraphNode[], inputMaxChars: number, diaGraph: dia.Graph, nodeRectMap: Map<string, shapes.standard.Rectangle>, maxWidthOfStackNodes: number, maxWidthOfHeapNodes: number, config: CodeIDEConfig, presetNodes?: CodeGraphNode[]): void => {
  nodes.forEach((node) => {
    const maxWidth = node.type.includes("stack") ? maxWidthOfStackNodes : maxWidthOfHeapNodes;
    const rect = createAndResizeRect(node.label, maxWidth, config.mode);
    const position = { x: node.position?.x ?? 0, y: node.position?.y ?? 0 }
    const presetNode = presetNodes?.find((presetNode: CodeGraphNode) => presetNode.id === node.id);

    if (config.mode === "write") {
      rect.position(position.x + styles.node.strokeWidth / 2, position.y + styles.node.strokeWidth / 2);
      rect.attr({
        body: {
          fill: presetNode?.label === "" ? (node?.label === "" ? "none" : styles.node.color.rect) : styles.node.color.getRectPreset(node.type),
          stroke: presetNode?.label === "" ? styles.node.color.rect : styles.node.color.getRectPreset(node.type),
          strokeWidth: 3,
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
      rect.prop('nodeId', node.id);
      rect.prop('maxChars', inputMaxChars);
      rect.prop('preset', presetNode?.label !== "");
    } else {
      rect.position(position.x, position.y);
      rect.attr({
        body: {
          fill: styles.node.color.rect,
          stroke: "none",
          strokeWidth: styles.node.strokeWidth,
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
    }
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
          stroke: styles.edge.getColor(edge.type),
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