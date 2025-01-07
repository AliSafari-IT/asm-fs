import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface StackedBarChartProps {
  data: any;
  width: number;
  height: number;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data, width, height }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const svg = d3.select(chartRef.current);

      svg.selectAll("*").remove();

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) as unknown as number])
        .range([innerHeight, 0]);

      const color = d3.scaleOrdinal()
        .domain(data.map(d => d.label))
        .range(d3.schemeCategory10);

      svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));

      svg.append("g")
        .attr("transform", `translate(${margin.left}, ${innerHeight + margin.top})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => innerHeight - y(d.value))
        .attr("fill", d => color(d.label));
    }

  }, [data, width, height]);
  
  return <svg ref={chartRef} />;
};

export default StackedBarChart;
