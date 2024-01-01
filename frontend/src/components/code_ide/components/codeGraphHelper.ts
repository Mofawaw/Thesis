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
    rect.resize(codeIDEHelper.graph.node.getWidth(node.type), 35);
    rect.attr({
      body: {
        fill: colors['th-black'][10],
        stroke: "none",
        rx: 5,
        ry: 5
      },
      label: {
        text: node.label,
        fontSize: 15,
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
      target: targetNodeRect
    });
    graph.addCell(link);
  });
};