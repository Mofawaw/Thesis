import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface DataItem {
  name: string;
  group: number;
  x: number;
  y: number;
}

interface SimulatedDataItem extends d3.SimulationNodeDatum {
  name: string;
  group: number;
  x: number;
  y: number;
}

interface StageProps {
}

const Stage: React.FC<StageProps> = ({

}) => {
  const d3Container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (d3Container.current) {
      d3.select(d3Container.current).selectAll("svg").remove();

      const width = window.innerWidth;
      const height = window.innerHeight;
      const radius = 50;

      // Append the SVG object
      const svg = d3.select(d3Container.current)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      // Dummy data
      const data = [
        { "name": "A", "group": 1 }, { "name": "B", "group": 1 }, { "name": "C", "group": 1 }, { "name": "D", "group": 1 }, { "name": "E", "group": 1 }, { "name": "F", "group": 1 },
        { "name": "G", "group": 2 }, { "name": "H", "group": 2 }, { "name": "I", "group": 2 }, { "name": "J", "group": 2 }, { "name": "K", "group": 2 }, { "name": "L", "group": 2 }
      ].map(d => ({ ...d, x: 0, y: 0 }));

      // A color scale
      const color = d3.scaleOrdinal<number, string>()
        .domain([1, 2]) // Assuming your groups are numeric
        .range(["#F8766D", "#00BA38"]);

      const dragBehavior = d3.drag<SVGCircleElement, DataItem>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

      // Drag functions
      function dragstarted(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        if (!event.active) simulation.alphaTarget(0.03).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event: d3.D3DragEvent<SVGCircleElement, any, any>, d: any) {
        if (!event.active) simulation.alphaTarget(0.03);
        d.fx = null;
        d.fy = null;
      }

      // Initialize the circles
      const node = svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", radius)
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", (d: DataItem) => color(d.group))
        .style("opacity", 0)
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .call(dragBehavior as any);

      // Forces and simulation
      const simulation = d3.forceSimulation<SimulatedDataItem>(data)
        .force("x", d3.forceX<SimulatedDataItem>().strength(d => d.group === 1 ? 0.4 : 0).x(width / 2))
        .force("y", d3.forceY<SimulatedDataItem>().strength(d => d.group === 1 ? 0.4 : 0).y(height / 2))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(0.2))
        .force("collide", d3.forceCollide<SimulatedDataItem>().strength(0.2).radius(d => d.group === 1 ? radius + 30 : radius + 240).iterations(1));

      simulation.on("tick", function () {
        node
          .attr("cx", function (d) {
            return d.x = Math.max(radius, Math.min(width - radius - 10, d.x));
          })
          .attr("cy", function (d) {
            return d.y = Math.max(radius, Math.min(height - radius - 10, d.y));
          });
      });

      // Fade-in transitions
      setTimeout(() => {
        node.filter(d => d.group === 1)
          .transition()
          .duration(800)
          .style("opacity", 1);
      }, 1000);

      setTimeout(() => {
        node.filter(d => d.group === 2)
          .transition()
          .duration(800)
          .style("opacity", 1);
      }, 2400);

      // Cleanup
      return () => {
        svg.selectAll("*").remove();
        svg.remove();
        simulation.stop();
      };
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-th-tint-20" ref={d3Container}></div>
  );
};

export default Stage;