import config from '../../../../tailwind.config.ts'
import { dia, shapes } from 'jointjs';
import CodeGraph from './CodeGraph.ts';

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

export const addData = (codeGraph: CodeGraph, graph: dia.Graph) => {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();
  let maxWidthOfStackNodes = 0;

  const createAndResizeRect = (labelText: string) => {
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

  const sortNodes = (nodes: any[]) => {
    const valueNodes = nodes.filter(node => node.type.includes("value"));
    const referenceNodes = nodes.filter(node => node.type.includes("reference"));
    return [...valueNodes, ...referenceNodes];
  };

  const stackNodes = sortNodes(codeGraph.nodes.filter(node => node.type.includes("stack")));
  stackNodes.forEach((node: any) => {
    const rect = createAndResizeRect(node.label);
    maxWidthOfStackNodes = Math.max(maxWidthOfStackNodes, rect.size().width);
  });

  const setPositions = (nodes: any, isStack: boolean) => {
    const yGap = styles.node.height + styles.node.gap.y;
    const yReferenceOffset = styles.referenceOffset;

    nodes.forEach((node: any, i: number) => {
      const xOffset = isStack ? 0 : maxWidthOfStackNodes + styles.node.gap.x;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  const heapNodes = sortNodes(codeGraph.nodes.filter(node => node.type.includes("heap")));

  setPositions(stackNodes, true);
  setPositions(heapNodes, false);

  codeGraph.nodes.forEach((node: any) => {
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
        fill: styles.node.color.text,
      },
    });

    graph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });

  codeGraph.edges.forEach((edge: any) => {
    const sourceNodeRect = nodeRectMap.get(edge.source);
    const targetNodeRect = nodeRectMap.get(edge.target);

    if (!sourceNodeRect || !targetNodeRect) {
      throw new Error("Invalid edge reference in the data");
    }

    // sourcePoint (end x, center y)
    const sourceBBox = sourceNodeRect.getBBox();
    const sourcePoint = {
      x: sourceBBox.x + sourceBBox.width,
      y: sourceBBox.y + sourceBBox.height / 2
    };

    // targetPoint (beginning x, center y)
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
