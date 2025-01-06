// E:\asm-fs\apps\frontends\asafarim-client\src\components\D3\StackedLineChart.tsx

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataPoint {
    x: number;
    y: number;
}

interface StackedLineChartProps {
    data: DataPoint[];
    width: number;
    height: number;
}

const StackedLineChart = ({ data, width, height }: StackedLineChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);

            svg.selectAll("*").remove();

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x) as [number, number])
                .range([0, innerWidth]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y) as [number, number])
                .range([innerHeight, 0]);

            const line = d3.line<DataPoint>()
                .x(d => xScale(d.x))
                .y(d => yScale(d.y));

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            svg.append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(xScale));

            svg.append("g")
                .call(d3.axisLeft(yScale));

            svg.append("text")
                .attr("x", (innerWidth / 2))
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("X Axis");

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (height / 2))
                .attr("y", 0 - margin.left)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .text("Y Axis");

            svg.append("text")
                .attr("x", (innerWidth / 2))
                .attr("y", innerHeight + margin.bottom)
                .attr("text-anchor", "middle")
                .style("font-size", "24px")
                .text("Stacked Line Chart");

            svg.attr("width", width).attr("height", height);

            svg.attr("viewBox", `0 0 ${width} ${height}`)
                .attr("preserveAspectRatio", "xMinYMin meet");

            svg.attr("transform", `translate(${margin.left}, ${margin.top})`);

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => xScale(d.x))
                .attr("cy", d => yScale(d.y))
                .attr("r", 5)
                .attr("fill", "blue");

            svg.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", d => colorScale(d.key))
                .attr("d", line);

        }
    }, [data, height, width]);

    return <svg ref={svgRef} />;
};

export default StackedLineChart;

function colorScale(key: any): string | number | boolean | readonly (string | number)[] | null {
   
    const colors = ["#ff0000", "#00ff00", "#0000ff"];
    return colors[key % colors.length];
}
