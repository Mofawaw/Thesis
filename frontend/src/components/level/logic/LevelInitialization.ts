import CodeIDEMode from '../../code_ide/types/CodeIDEMode';
import ThLevel from '../types/ThLevel';
import LevelNode, { LevelNodeSize } from '../types/LevelNode';

export function generateLevelNodes(thLevel: ThLevel): LevelNode[] {
  const category = thLevel.category;

  let currentPositionX = 0;
  const levelNodes = category.nodes.map(node => {
    const size = LevelNodeSize.fromString(node.size);

    const nodeTypeParts = node.type.split('-');
    const isMain = node.id.includes("main");

    const nodePositionX = currentPositionX;
    currentPositionX += size.width + 20;

    if (nodeTypeParts[0] === "codeIDE") {
      const modeString = nodeTypeParts.slice(1).join('-');
      return {
        id: node.id,
        type: "codeIDE",
        position: { x: nodePositionX, y: 0 },
        data: {
          initialSize: size,
          isMain: isMain,
          props: {
            scopeId: node.id,
            mode: CodeIDEMode.fromString(modeString),
            initialCode: thLevel.initialCode,
            initialGraph: thLevel.initialGraph
          }
        }
      };
    } else if (node.type === 'task') {
      return {
        id: node.id,
        type: node.type,
        position: { x: nodePositionX, y: 0 },
        data: {
          initialSize: size,
          isMain: isMain,
          description: thLevel.task
        }
      };
    }
  });

  return levelNodes.filter(node => node !== undefined) as LevelNode[];
}