import config from '../../../../tailwind.config.ts'
import { dia, shapes } from 'jointjs';

const { colors } = config.theme
const { fontFamily } = config.theme

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

export const addData = (jsonData: any, graph: dia.Graph) => {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();

  // Helper function to generate positions
  const generatePositions = (nodes: any) => {
    const xStack = 0;
    const xHeap = codeIDEHelper.graph.node.getWidth('stack') + codeIDEHelper.graph.node.gap.x;
    const yGap = codeIDEHelper.graph.node.height + codeIDEHelper.graph.node.gap.y;
    const yReferenceOffset = codeIDEHelper.graph.referenceOffset;

    nodes.forEach((node: any, i: any) => {
      const xOffset = node.type.includes("stack") ? xStack : xHeap;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  // Separate nodes by type
  const stackNodes = jsonData.nodes.filter((node: any) => node.type.includes("stack"));
  const heapNodes = jsonData.nodes.filter((node: any) => node.type.includes("heap"));

  // Generate positions for each group
  generatePositions(stackNodes);
  generatePositions(heapNodes);

  // Process all nodes
  jsonData.nodes.forEach((node: any) => {
    const rect = new shapes.standard.Rectangle();
    rect.position(node.position.x, node.position.y);
    rect.resize(100, 35);

    const labelText = node.label;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      context.font = `15px ${fontFamily['th-mono'][0]}`;
      const textWidth = context.measureText(labelText).width;
      rect.resize(textWidth + 20, 35);
    } else {
      console.error("Canvas context not available");
    }

    rect.attr({
      body: {
        fill: colors['th-black'][10],
        stroke: "none",
        rx: 5,
        ry: 5
      },
      label: {
        text: labelText,
        fontSize: "15px",
        fontFamily: fontFamily['th-mono'][0],
        fill: colors['th-black'][100],
      },
    });
    graph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });

  // Process edges
  jsonData.edges.forEach((edge: any) => {
    const sourceNodeRect = nodeRectMap.get(edge.source);
    const targetNodeRect = nodeRectMap.get(edge.target);

    if (!sourceNodeRect || !targetNodeRect) {
      throw new Error("Invalid edge reference in the data");
    }

    const link = new shapes.standard.Link({
      source: sourceNodeRect,
      target: targetNodeRect,
    });

    graph.addCell(link);
  });
};
