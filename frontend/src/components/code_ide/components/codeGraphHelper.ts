import config from '../../../../tailwind.config.ts'
import { Graph, codeIDEHelper } from '../codeIDEStore.ts';
import { dia, shapes } from 'jointjs';

const { colors } = config.theme
const { fontFamily } = config.theme

export const nodeStyles = {
  rect: {
    fill: colors['th-tint'][20],
  },
  text: {
    fontSize: 16,
    fontFamily: fontFamily['th-mono'][0],
    fill: colors['th-black'][100],
  }
}

export const addData = (data: Graph, graph: dia.Graph) => {
  const nodeRectMap = new Map<string, shapes.standard.Rectangle>();

  data.nodes.forEach(node => {
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
        text: node.label,
        fontSize: "15px",
        fontFamily: fontFamily['th-mono'][0],
        fill: colors['th-black'][100],
      },
    })
    graph.addCell(rect);
    nodeRectMap.set(node.id, rect);
  });

  data.edges.forEach(edge => {
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