import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import ChartContainer from "./ChartContainer";

interface DataRow {
  date: Date; // e.g., "2020-01-01"
  [key: string]: number | Date | unknown; // e.g., "apples", "oranges", etc.
}

interface StackedAreaChartProps {
  data: DataRow[]; // The array of data rows
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data: rawData }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderChart = () => {
      if (!svgRef.current || !containerRef.current || rawData.length === 0) {
        console.error("SVG element, container, or data is missing.");
        return;
      }

      // Get container dimensions
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const containerHeight = containerWidth * 0.6; // Maintain aspect ratio (e.g., 3:2)

      // Clear any previous SVG content
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      // Define margins and inner dimensions
      const margin = { top: 20, right: 20, bottom: 40, left: 50 };
      const innerWidth = containerWidth - margin.left - margin.right;
      const innerHeight = containerHeight - margin.top - margin.bottom;

      // Create chart area
      const chartArea = svg
        .attr("width", containerWidth)
        .attr("height", containerHeight)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Identify keys for stacking (exclude "date")
      const keys = Object.keys(rawData[0]).filter((key) => key !== "date");

      // Parse data and convert numbers
      const parsedData = rawData.map((row) => {
        const newRow: DataRow = { ...row, date: new Date(row.date as unknown as string) };
        keys.forEach((key) => {
          newRow[key] = Number(row[key]) || 0; // Ensure numeric values
        });
        return newRow;
      });

      // Create stack generator and stacked data
      const stackGenerator = d3.stack<DataRow>().keys(keys);
      const stackedData = stackGenerator(parsedData);

      // Create scales
      const xScale = d3
        .scaleTime()
        .domain(d3.extent(parsedData, (d) => d.date as Date) as [Date, Date])
        .range([0, innerWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(stackedData[stackedData.length - 1], (d) => d[1]) || 0,
        ])
        .range([innerHeight, 0]);

      const colorScale = d3
        .scaleOrdinal<string>()
        .domain(keys)
        .range(d3.schemeCategory10);

      // Create area generator
      const areaGenerator = d3
        .area<d3.SeriesPoint<DataRow>>()
        .x((d) => xScale(d.data.date as Date))
        .y0((d) => yScale(d[0]))
        .y1((d) => yScale(d[1]));

      // Render areas
      chartArea
        .selectAll(".layer")
        .data(stackedData)
        .join("path")
        .attr("class", "layer")
        .attr("fill", (layer) => colorScale(layer.key))
        .attr("d", areaGenerator);

      // Add axes
      const xAxis = d3.axisBottom<Date>(xScale).tickFormat(
        d3.timeFormat("%b %d") as unknown as (d: Date) => string
      );
      chartArea
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(xAxis);

      const yAxis = d3.axisLeft(yScale);
      chartArea.append("g").call(yAxis);

      // Add axis labels (optional)
      chartArea
        .append("text")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .attr("text-anchor", "middle")
        .text("Date");

      chartArea
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -margin.left + 15)
        .attr("text-anchor", "middle")
        .text("Value");
    };

    // Render the chart on initial load and resize
    renderChart();
    window.addEventListener("resize", renderChart);
    return () => {
      window.removeEventListener("resize", renderChart);
    };
  }, [rawData]);

  return (
    <ChartContainer containerRef={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </ChartContainer>
  );
};

export default StackedAreaChart;
