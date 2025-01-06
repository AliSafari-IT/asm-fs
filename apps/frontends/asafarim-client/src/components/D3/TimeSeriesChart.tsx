import React from "react";
import * as d3 from "d3";

interface TimeSeriesChartProps {
  data: { [key: string]: any }[]; // We’ll use xKey, yKey to access the fields
  width: number;
  height: number;
  xKey: string; // Typically "DateTime"
  yKey: string; // Typically "value"
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({
  data,
  width,
  height,
  xKey,
  yKey,
}) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    // 1. Clear previous SVG content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 2. Set up margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 3. Create main group element
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 4. Parse and prepare data
    //    Ensure xKey is a Date object. If not, parse as needed (e.g. d3.timeParse).
    //    This example assumes `data` already has `Date` objects in d[xKey].
    //    If your xKey is a string date, parse them here.
    //    e.g. `const parseTime = d3.timeParse("%Y-%m-%d");`

    // 5. Define scales
    //    a) xScale (time-based)
    const xDomain = d3.extent(data, (d) => d[xKey]) as [Date, Date];
    const xScale = d3.scaleTime().domain(xDomain).range([0, innerWidth]);

    //    b) yScale (linear)
    const yMax = d3.max(data, (d) => d[yKey]) || 0;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([innerHeight, 0]);

    // 6. Create axes
    const xAxis = d3.axisBottom<Date>(xScale).tickFormat(d3.timeFormat("%Y-%m-%d") as any);
    const yAxis = d3.axisLeft<number>(yScale).ticks(5);

    // 7. Append axes
    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append("g")
      .attr("class", "axis axis--y")
      .call(yAxis);

    // 8. Define the line generator
    const lineGenerator = d3
      .line<{ [key: string]: any }>()
      .x((d) => xScale(d[xKey]))
      .y((d) => yScale(d[yKey]))
      .curve(d3.curveMonotoneX); // optional smoothing

    // 9. Append the path
    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", lineGenerator);

    // 10. (Optional) Title
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", margin.top / 1.5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Time Series Chart");

    // 11. (Optional) X Axis Label
    svg
      .append("text")
      .attr("x", margin.left + innerWidth / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .style("font-size", "12px")
      .text("Date/Time");

    // 12. (Optional) Y Axis Label
    svg
      .append("text")
      .attr("transform", `translate(${margin.left / 3}, ${margin.top})`)
      .attr("dy", "-1em")
      .style("font-size", "12px")
      .style("text-anchor", "start")
      .text("Value");
  }, [data, width, height, xKey, yKey]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default TimeSeriesChart;
