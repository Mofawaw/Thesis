import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import ThRoundButton from '@/components/buttons/th-round-button';

interface DataItem {
  name: string;
  group: number;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  opacity?: number;
}

interface CustomNodeProps {
  data: DataItem;
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpacity(1);
    }, data.group === 1 ? 1000 : 2400);

    return () => clearTimeout(timeout);
  }, [data.group]);

  return (
    <div style={{ opacity, transition: 'opacity 800ms ease-in-out' }}>
      {data.group === 1 && <ThRoundButton thColor="th-tint" bgThColorShade={70} shadowThColorShade={100} textThColorShade={20} text={data.name} />}
      {data.group === 2 && <ThRoundButton thColor="th-value" text={data.name} />}
    </div>
  );
};

interface StageProps {
}

const Stage: React.FC<StageProps> = () => {
  const d3Container = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<DataItem[]>([
    { name: "A", group: 1 }, { name: "B", group: 1 }, { name: "C", group: 1 }, { name: "D", group: 1 }, { name: "E", group: 1 }, { name: "F", group: 1 },
    { name: "G", group: 2 }, { name: "H", group: 2 }, { name: "I", group: 2 }, { name: "J", group: 2 }, { name: "K", group: 2 }, { name: "L", group: 2 }
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

      // Initialize simulation
      const simulation = d3.forceSimulation(nodes)
        .force("x", d3.forceX<DataItem>().strength(d => d.group === 1 ? 0.2 : 0).x(width / 2))
        .force("y", d3.forceY<DataItem>().strength(d => d.group === 1 ? 0.4 : 0).y(height / 2))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(0.2))
        .force("collide", d3.forceCollide<DataItem>().strength(0.2).radius(d => d.group === 1 ? radius + 30 : radius + 120).iterations(1))
        .on("tick", ticked)

      // Run simulation
      simulation.nodes(nodes).on("tick", ticked);

      function ticked() {
        d3.select(d3Container.current)
          .selectAll('foreignObject')
          .data(nodes)
          .join('foreignObject')
          .attr("width", nodeWidth + 20)
          .attr("height", nodeHeight + 20)
          .attr('x', d => Math.max(0, Math.min(width - nodeWidth, d.x! - xOffset)))
          .attr('y', d => Math.max(0, Math.min(height - nodeHeight - 200, d.y! - yOffset - 100)))
          .call(drag as any);
      }

      const drag = d3.drag<SVGForeignObjectElement, DataItem>()
        .on("start", dragstarted)
        .on("drag", (event, d) => {
          d.fx = Math.max(0, Math.min(width - xOffset, event.x));
          d.fy = Math.max(0, Math.min(height - yOffset, event.y));
        })
        .on("end", dragended);

      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
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
    <svg ref={d3Container} className="bg-th-tint-20 w-screen h-screen" >
      {nodes.map((node, index) => (
        <foreignObject
          key={index}
          width={100}
          height={100}
          x={node.x!}
          y={node.y!}
        >
          <CustomNode data={node} />
        </foreignObject>
      ))}
    </svg>
  );
};

export default Stage;
