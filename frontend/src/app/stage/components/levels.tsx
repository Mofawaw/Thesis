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

      function enforceHBoundary(d: LevelButtonProps) {
        // Define "H" shape parameters inside this function
        const columnWidth = dimensions.width * 0.25;
        const horizontalBarYStart = dimensions.width * 0.15;
        const horizontalBarYEnd = dimensions.height - dimensions.width * 0.3;

        // Check if the node is inside the "H" boundaries
        const inLeftColumn = d.x! >= 0 && d.x! < columnWidth;
        const inRightColumn = d.x! > dimensions.width - columnWidth && d.x! <= dimensions.width;
        const inHorizontalBar = (d.x! >= columnWidth && d.x! <= dimensions.width - columnWidth) && (d.y! >= horizontalBarYStart && d.y! <= horizontalBarYEnd);

        // If the node is outside the "H", adjust its position gradually
        if (!(inLeftColumn || inRightColumn || inHorizontalBar)) {
          if (d.x! < columnWidth || d.x! > (dimensions.width - columnWidth)) {
            d.x = Math.max(columnWidth, Math.min(dimensions.width - columnWidth, d.x!));
          }

          // If the node's y-position is above the top boundary, push it down towards the boundary
          if (d.y! < horizontalBarYStart) {
            d.y! += (horizontalBarYStart - d.y!) * 0.1; // Adjust the multiplier as needed for the effect
          }
          // If the node's y-position is below the bottom boundary, push it up towards the boundary
          else if (d.y! > horizontalBarYEnd) {
            d.y! -= (d.y! - horizontalBarYEnd) * 0.1; // Adjust the multiplier as needed for the effect
          }
        }
      }

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
          .each(enforceHBoundary)
          .attr('x', d => d.x! - nodeWidth / 2)
          .attr('y', d => d.y! - nodeHeight / 2)
          .call(drag as any)
      }

      simulation.nodes(levels).on("tick", ticked);

      // Drag
      const drag = d3.drag<SVGForeignObjectElement, LevelButtonProps>()
        .on("start", dragStarted)
        .on("drag", (event, d) => {
          d.fx = Math.max(xOffset, Math.min(width - xOffset, event.x));
          d.fy = Math.max(yOffset, Math.min(height - yOffset, event.y));
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
          overflow="visible"
        >
          <LevelButton {...level} />
        </foreignObject>
      ))}
    </svg>
  );
};

export default Levels;
