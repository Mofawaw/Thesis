import LevelNode from '../types/LevelNode';
import ThLevel from '../types/ThLevel';

export function generateLevelNodes(thLevel: ThLevel): LevelNode[] {
  const category = thLevel.category;

  let currentPositionX = 0;
  const levelNodes = category.nodes.map(node => {

    const nodePositionX = currentPositionX;
    currentPositionX += node.size.width + 20;

    if (node.type === "codeIDE" && node.codeIDE) {
      return {
        id: node.id,
        type: "codeIDE",
        position: { x: nodePositionX, y: 0 },
        data: {
          initialSize: node.size,
          props: {
            scopeId: node.id,
            isMain: node.codeIDE.isMain,
            mode: node.codeIDE.mode,
            initialCode: node.codeIDE.hasInitialCode ? thLevel.initialCode : "",
            initialGraph: node.codeIDE.hasInitialGraph ? thLevel.initialGraph : { nodes: [], edges: [] }
          }
        }
      };
    } else if (node.type === 'text') { // Assuming only Task has type text
      return {
        id: node.id,
        type: node.type,
        position: { x: nodePositionX, y: 0 },
        data: {
          title: "Aufgabe",
          initialSize: node.size,
          description: thLevel.task
        }
      };
    }
  });

  return levelNodes.filter(node => node !== undefined) as LevelNode[];
}