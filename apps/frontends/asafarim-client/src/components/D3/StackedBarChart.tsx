import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import ChartContainer from "./ChartContainer";

interface StackedBarChartProps {
  data: { label: string; value: number }[];
  width?: number;
  height?: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  width = 700,
  height = 500,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);
      svg.selectAll("*").remove(); // Clear the previous chart

      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = d3
        .scaleBand()
        .domain(data.map((d) => d.label))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) || 0])
        .nice()
        .range([innerHeight, 0]);

      const colorScale = d3
        .scaleOrdinal<string>()
        .domain(data.map((d) => d.label))
        .range(d3.schemeCategory10);

      const chartGroup = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add bars
      chartGroup
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => xScale(d.label) || 0)
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => innerHeight - yScale(d.value))
        .attr("fill", (d) => colorScale(d.label) || "steelblue");

      // Add X axis
      chartGroup
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

      // Add Y axis
      chartGroup.append("g").call(d3.axisLeft(yScale).ticks(5));

      // Add axis labels
      chartGroup
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Categories");

      chartGroup
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Values");
    }
  }, [data, width, height]);

  return (
    <ChartContainer
      containerRef={useRef<HTMLDivElement>(null)}
      style={{ width: "100%", height: "100%" }}
    >
      <svg ref={chartRef} width={width} height={height} />
    </ChartContainer>
  );
};

export default StackedBarChart;
