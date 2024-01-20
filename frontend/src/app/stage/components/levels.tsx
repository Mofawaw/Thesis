import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import LevelButton, { LevelButtonProps } from './level-button';

interface LevelsProps {
}

const Levels: React.FC<LevelsProps> = () => {
  const d3Container = useRef<SVGSVGElement>(null);
  const [levels, setLevels] = useState<LevelButtonProps[]>([
    { name: "1", group: 1 }, { name: "2", group: 1 }, { name: "3", group: 1 }, { name: "4", group: 1 }, { name: "5", group: 1 }, { name: "6", group: 1 },
    { name: "7", group: 2 }, { name: "8", group: 2 }, { name: "9", group: 2 }, { name: "10", group: 2 }, { name: "11", group: 2 }, { name: "12", group: 2 }
  ].map(d => ({ ...d, x: 0, y: 0 })));
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (d3Container.current) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const radius = 50;
      const nodeWidth = 100;
      const nodeHeight = 100;
      const xOffset = nodeWidth / 2;
      const yOffset = nodeHeight / 2;

      const columnWidth = dimensions.width * 0.3;
      const horizontalBarHeight = dimensions.height * 0.4;
      const horizontalBarYStart = (dimensions.height / 2) - (horizontalBarHeight / 2);
      const horizontalBarYEnd = horizontalBarYStart + horizontalBarHeight;

      const isInsideCustomBoundary = (x: number, y: number) => {
        // Use outer scope variables for the check
        const inLeftColumn = x >= 0 && x < columnWidth;
        const inRightColumn = x > dimensions.width - columnWidth && x <= dimensions.width;
        const inHorizontalBar = (x >= columnWidth && x <= dimensions.width - columnWidth) && (y >= horizontalBarYStart && y <= horizontalBarYEnd);

        return inLeftColumn || inRightColumn || inHorizontalBar;
      };

      // Initialize simulation
      const simulation = d3.forceSimulation(levels)
        .force("x", d3.forceX<LevelButtonProps>().strength(d => d.group === 1 ? 0.2 : 0).x(width / 2))
        .force("y", d3.forceY<LevelButtonProps>().strength(d => d.group === 1 ? 0.4 : 0).y(height / 2))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(0.2))
        .force("collide", d3.forceCollide<LevelButtonProps>().strength(0.2).radius(d => d.group === 1 ? radius + 30 : radius + 120).iterations(1));

      // Run simulation
      simulation.nodes(levels).on("tick", ticked);

      function ticked() {
        d3.select(d3Container.current)
          .selectAll('foreignObject')
          .data(levels)
          .join('foreignObject')
          .attr("width", nodeWidth + 20)
          .attr("height", nodeHeight + 20)
          .each(function (d) {
            // Use the custom boundary function to check if the node is inside the boundary
            if (!isInsideCustomBoundary(d.x!, d.y!)) {
              // Node is outside the "H" shape, adjust its position
              // This is just an example, you'll need a more complex logic to handle this properly
              if (d.x! < columnWidth || d.x! > (width - columnWidth)) {
                d.x = Math.max(columnWidth, Math.min(width - columnWidth, d.x!));
              }
              if (d.y! < horizontalBarYStart) {
                d.y = Math.max(horizontalBarYStart, d.y!);
              }
              if (d.y! > horizontalBarYEnd) {
                d.y = Math.min(horizontalBarYEnd, d.y!);
              }
            }
          })
          .attr('x', d => d.x! - nodeWidth / 2)
          .attr('y', d => d.y! - nodeHeight / 2)
          .call(drag as any)
      }

      simulation.nodes(levels).on("tick", ticked);

      // Drag
      const drag = d3.drag<SVGForeignObjectElement, LevelButtonProps>()
        .on("start", dragStarted)
        .on("drag", (event, d) => {
          d.fx = Math.max(0, Math.min(width - xOffset, event.x));
          d.fy = Math.max(0, Math.min(height - yOffset, event.y));
        })
        .on("end", dragEnded);

      function dragStarted(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragEnded(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      // Cleanup
      return () => {
        simulation.stop();
      };
    }
    return () => { };
  }, [dimensions]);

  return (
    <svg ref={d3Container} className="w-full h-full" >
      {levels.map((level, index) => (
        <foreignObject
          key={index}
          width={100}
          height={100}
          x={level.x!}
          y={level.y!}
        >
          <LevelButton {...level} />
        </foreignObject>
      ))}
    </svg>
  );
};

export default Levels;
