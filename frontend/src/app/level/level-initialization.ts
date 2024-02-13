import { Node } from "reactflow";
import { ThLevel, ThNode } from "@/types/th-types.ts";
import { CodeIDENodeData, ComponentNodeData, TextNodeData, ThNodeSize, TutorialNodeData } from "./nodes/types/node-types.ts"

export function generateReactFlowNodes(level: ThLevel): Node[] {
  let currentPositionX = 0;

  const reactFlowNodes = level.nodes.map(node => {
    const reactFlowNode = convertToReactFlowNode(node);

    reactFlowNode.id = level.id + "-" + reactFlowNode.id
    reactFlowNode.position = { x: currentPositionX, y: 0 };
    currentPositionX += reactFlowNode.data.width + 20;

    return reactFlowNode;
  });

  return reactFlowNodes;
}

export function convertToReactFlowNode(node: ThNode) {
  // Node Size
  const nodeSize = ThNodeSize.fromString(node.baseNode.data.size);

  // Merge ComponentNode Data
  const componentNodeData: ComponentNodeData = {
    title: node.baseNode.data.title ?? "",
    width: nodeSize.width,
    height: nodeSize.height,
  }

  if (node.baseNode.type === "codeIDE" && node.data.codeIDE && node.baseNode.data.codeIDE) {
    // Merge CodeIDENode Data
    const codeIDEData: CodeIDENodeData = {
      ...componentNodeData,
      codeIDE: {
        main: node.baseNode.data.codeIDE.main,
        scopeId: node.baseNode.data.codeIDE.scopeId,
        config: node.baseNode.data.codeIDE.config,
        initialCode: node.data.codeIDE.initialCode ?? "",
        initialGraph: node.data.codeIDE.initialGraph ?? { nodes: [], edges: [] }
      }
    }
    return { id: node.baseNode.id, type: node.baseNode.type, position: { x: 0, y: 0 }, data: codeIDEData };

  } else if (node.baseNode.type === "text" && node.data.text) {
    // Merge TextNode Data
    const textData: TextNodeData = {
      ...componentNodeData,
      text: {
        description: node.data.text.description
      }
    }
    return { id: node.baseNode.id, type: node.baseNode.type, position: { x: 0, y: 0 }, data: textData };

  } else if (node.baseNode.type === "tutorial") {
    // Merge TutorialNode Data
    const tutorialData: TutorialNodeData = {
      ...componentNodeData,
      tutorial: {
        tutorial: true
      }
    }
    return { id: node.baseNode.id, type: node.baseNode.type, position: { x: 0, y: 0 }, data: tutorialData };
  }

  return { id: node.baseNode.id, type: node.baseNode.type, position: { x: 0, y: 0 }, data: componentNodeData };
}