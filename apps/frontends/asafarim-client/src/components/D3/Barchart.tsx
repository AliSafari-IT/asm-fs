import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface BarchartProps {
  data: { name: string; value: number | undefined }[];
  width: number;
  height: number;
}

const Barchart = ({ data, width, height }: BarchartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 };

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    /* Add SVG */
    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const filteredData = data.filter(
      (d): d is { name: string; value: number } => d.value !== undefined
    );

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(filteredData.map((d) => d.name))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(filteredData, (d) => d.value) || 0])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(filteredData)
      .join("rect")
      .attr("x", (d) => x(d.name) || 0)
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .attr("fill", "#5f0f40");
  }, [data, height, width]);

  return <svg ref={svgRef} />;
};

export default Barchart;
