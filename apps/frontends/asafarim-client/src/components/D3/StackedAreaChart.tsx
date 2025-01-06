import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Example interface for each row
interface DataRow {
  date: string;       // e.g. "2020-01-01"
  [key: string]: any; // e.g. "apples", "oranges", etc.
}

interface StackedAreaChartProps { 
  data: DataRow[];    // The array of data rows
  width: number;
  height: number;
}

const StackedAreaChart: React.FC<StackedAreaChartProps> = ({ data: parsedData, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // 1. Get the SVG element
    const svgElement = svgRef.current;
    if (!svgElement || !parsedData || parsedData.length === 0) {
      console.error("SVG element is undefined or the data array is empty.");
      return;
    }

    // 2. Clear any pre-existing content
    const svg = d3.select(svgElement);
    svg.selectAll("*").remove();

    // 3. Margins and inner dimensions
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // 4. Group element to hold the chart
    const chartArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // 5. Identify the keys to be stacked (all fields except "date")
    const keys = Object.keys(parsedData[0]).filter((k) => k !== "date");

    // 6. Convert your date strings to real Date objects and ensure numeric columns
    const parseTime = d3.timeParse("%Y-%m-%d");
    const finalData = parsedData.map((row) => {
      const copy: any = { ...row };
      copy.date = parseTime(row.date);  // e.g. "2020-01-01" -> Date
      keys.forEach((k) => {
        copy[k] = +row[k]; // parse numbers (e.g. "10" -> 10)
      });
      return copy;
    });

    // 7. Build the stack series
    // Each sub-array is one "layer" of the stack
    const stackGenerator = d3.stack<any>().keys(keys);
    const stackedSeries = stackGenerator(finalData);

    // 8. X scale (time)
    const xDomain = d3.extent(finalData, (d) => d.date as Date) as [Date, Date];
    const xScale = d3.scaleTime()
      .domain(xDomain)
      .range([0, innerWidth]);

    // 9. Y scale (linear), from 0 up to the max stacked value
    const maxValue = d3.max(stackedSeries[stackedSeries.length - 1], (d) => d[1]) || 0;
    const yScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([innerHeight, 0]);

    // 10. Color scale for the stacked layers
    const color = d3.scaleOrdinal<string>()
      .domain(keys)
      .range(d3.schemeCategory10);

    // 11. Define the area generator
    const areaGenerator = d3
      .area<[number, number]>()
      .x((d) => xScale(d.data.date))
      .y0((d) => yScale(d[0]))
      .y1((d) => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // 12. Render each stacked layer as a <path>
    chartArea
      .selectAll(".layer")
      .data(stackedSeries)
      .enter()
      .append("path")
      .attr("class", "layer")
      .attr("fill", (layer) => color(layer.key))
      .attr("d", areaGenerator);

    // 13. Draw the X axis
    const xAxis = d3.axisBottom<Date>(xScale).tickFormat(d3.timeFormat("%b %d") as any);
    chartArea
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    // 14. Draw the Y axis
    const yAxis = d3.axisLeft<number>(yScale);
    chartArea.append("g").call(yAxis);
  }, [parsedData, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default StackedAreaChart;
