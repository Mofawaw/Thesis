import { Node } from "reactflow";
import { ThLevel, ThLevelNode } from "../types/thTypes";
import { CodeIDENodeData, ComponentNodeData, TextNodeData, ThNodeSize } from "../types/nodeTypes"

export function generateReactflowNodes(level: ThLevel): Node[] {
  let currentPositionX = 0;

  const reactflowNodes = level.nodes.map(levelNode => {
    const node = convertToReactflowNode(levelNode);

    node.position = { x: currentPositionX, y: 0 };
    currentPositionX += node.data.width + 20;

    return node;
  });

  return reactflowNodes;
}

export function convertToReactflowNode(levelNode: ThLevelNode) {
  // Node Size
  const nodeSize = ThNodeSize.fromString(levelNode.node.data.size);

  // Merge ComponentNode Data
  const componentNodeData: ComponentNodeData = {
    title: levelNode.node.data.title ?? "",
    width: nodeSize.width,
    height: nodeSize.height
  }

  if (levelNode.node.type === "codeIDE" && levelNode.data.codeIDE && levelNode.node.data.codeIDE) {
    // Merge CodeIDENode Data
    const codeIDEData: CodeIDENodeData = {
      ...componentNodeData,
      codeIDE: {
        isMain: levelNode.node.data.codeIDE.isMain,
        scopeId: levelNode.node.data.codeIDE.scopeId,
        config: levelNode.node.data.codeIDE.config,
        initialCode: levelNode.data.codeIDE.initialCode ?? "",
        initialGraph: levelNode.data.codeIDE.initialGraph ?? { nodes: [], edges: [] }
      }
    }
    return { id: levelNode.node.id, type: levelNode.node.type, position: { x: 0, y: 0 }, data: codeIDEData };

  } else if (levelNode.node.type === "text" && levelNode.data.text) {
    // Merge TextNode Data
    const textData: TextNodeData = {
      ...componentNodeData,
      text: {
        description: levelNode.data.text.description
      }
    }
    return { id: levelNode.node.id, type: levelNode.node.type, position: { x: 0, y: 0 }, data: textData };
  }

  return { id: levelNode.node.id, type: levelNode.node.type, position: { x: 0, y: 0 }, data: componentNodeData };
}