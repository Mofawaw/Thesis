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
  let maxWidthOfStackNodes = 0;

  const createAndResizeRect = (labelText: string) => {
    const rect = new shapes.standard.Rectangle();
    rect.resize(100, 35); // Initial size

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context) {
      context.font = `15px ${fontFamily['th-mono'][0]}`;
      const textWidth = context.measureText(labelText).width;
      rect.resize(textWidth + 20, 35); // Resize based on text width
    } else {
      console.error("Canvas context not available");
    }

    return rect;
  };

  // First, process stack nodes to find the maximum width
  jsonData.nodes.filter((node: any) => node.type.includes("stack")).forEach((node: any) => {
    const rect = createAndResizeRect(node.label);
    maxWidthOfStackNodes = Math.max(maxWidthOfStackNodes, rect.size().width);
  });

  // Helper function to set positions
  const setPositions = (nodes: any, isStack: boolean) => {
    const yGap = codeIDEHelper.graph.node.height + codeIDEHelper.graph.node.gap.y;
    const yReferenceOffset = codeIDEHelper.graph.referenceOffset;

    nodes.forEach((node: any, i: number) => {
      const xOffset = isStack ? 0 : maxWidthOfStackNodes + 30;
      const yOffset = node.type.startsWith('reference') ? yReferenceOffset : 0;
      node.position = { x: xOffset, y: yOffset + i * yGap };
    });
  };

  // Separate nodes by type again
  const stackNodes = jsonData.nodes.filter((node: any) => node.type.includes("stack"));
  const heapNodes = jsonData.nodes.filter((node: any) => node.type.includes("heap"));

  // Set positions
  setPositions(stackNodes, true);
  setPositions(heapNodes, false);

  // Process all nodes again
  jsonData.nodes.forEach((node: any) => {
    const rect = createAndResizeRect(node.label);
    rect.position(node.position.x, node.position.y);

    rect.attr({
      body: {
        fill: colors['th-black'][10],
        stroke: "none",
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
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
