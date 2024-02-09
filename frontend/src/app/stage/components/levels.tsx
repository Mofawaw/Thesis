import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import LevelButton, { LevelButtonProps } from './level-button';
import useUserStore from '@/stores/user-store';
import { ThStage } from '@/types/th-types';

interface LevelsProps {
  stage: ThStage;
}

const Levels: React.FC<LevelsProps> = ({
  stage,
}) => {
  const [levelButtons, setLevelButtons] = useState<LevelButtonProps[]>([]);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const d3Container = useRef<SVGSVGElement>(null);

  const stagesProgress = useUserStore(state => state.stagesProgress);

  useEffect(() => {
    const newLevelButtons: LevelButtonProps[] = stage.levels
      .sort((a, b) => a.order - b.order)
      .map((level) => {
        const levelStatus = stagesProgress[stage.id].levelsStatus.find(levelStatus => levelStatus.id === level.id);

        return {
          stage: stage,
          levelId: level.id,
          label: level.id.match(/l(\d+)/)?.[1] ?? null,
          icon: (level.id.match(/l(\D+)/)?.[1] === "final" ? stage.logo : null) ?? null,
          group: levelStatus?.status === "locked" ? 2 : 1,
          x: 0,
          y: 0,
        };
      });
    setLevelButtons(newLevelButtons);
  }, [stage]);

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

      // Initialize simulation
      const simulation = d3.forceSimulation(levelButtons)
        .force("x", d3.forceX<LevelButtonProps>().strength(d => d.group === 1 ? 0.2 : 0).x(width / 2))
        .force("y", d3.forceY<LevelButtonProps>().strength(d => d.group === 1 ? 0.4 : 0).y(height / 2))
        .force("center", d3.forceCenter(width / 2, height / 2 - height * 0.05))
        .force("charge", d3.forceManyBody().strength(0.2))
        .force("collide", d3.forceCollide<LevelButtonProps>().strength(0.2).radius(d => d.group === 1 ? radius + 30 : radius + 100).iterations(1));

      // Run simulation
      simulation.nodes(levelButtons).on("tick", ticked);

      function ticked() {
        d3.select(d3Container.current)
          .selectAll('foreignObject')
          .data(levelButtons)
          .join('foreignObject')
          .attr("width", nodeWidth)
          .attr("height", nodeHeight + 20)
          .each(enforceHBoundary)
          .attr('x', d => d.x! - nodeWidth / 2)
          .attr('y', d => d.y! - nodeHeight / 2)
          .call(drag as any)
      }

      simulation.nodes(levelButtons).on("tick", ticked);

      // Boundary
      function enforceHBoundary(d: LevelButtonProps) {
        const columnWidth = dimensions.width * 0.25;
        const horizontalBarYStart = dimensions.width * 0.15;
        const horizontalBarYEnd = dimensions.height - dimensions.width * 0.3;

        const inLeftColumn = d.x! >= 0 && d.x! < columnWidth;
        const inRightColumn = d.x! > dimensions.width - columnWidth && d.x! <= dimensions.width;
        const inHorizontalBar = (d.x! >= columnWidth && d.x! <= dimensions.width - columnWidth) && (d.y! >= horizontalBarYStart && d.y! <= horizontalBarYEnd);

        if (!(inLeftColumn || inRightColumn || inHorizontalBar)) {
          if (d.x! < columnWidth || d.x! > (dimensions.width - columnWidth)) {
            d.x = Math.max(columnWidth, Math.min(dimensions.width - columnWidth, d.x!));
          }
          if (d.y! < horizontalBarYStart) {
            d.y! += (horizontalBarYStart - d.y!) * 0.1;
          }
          else if (d.y! > horizontalBarYEnd) {
            d.y! -= (d.y! - horizontalBarYEnd) * 0.1;
          }
        }
      }

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
  }, [dimensions, levelButtons]);

  return (
    <svg ref={d3Container} className="w-full h-full" >
      {levelButtons.map((levelButton) => (
        <foreignObject
          key={levelButton.levelId}
          width={100}
          height={100}
          x={levelButton.x!}
          y={levelButton.y!}
          overflow="visible"
        >
          <LevelButton {...levelButton} />
        </foreignObject>
      ))}
    </svg>
  );
};

export default Levels;
