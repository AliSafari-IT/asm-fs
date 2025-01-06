// E:\asm-fs\apps\frontends\asafarim-client\src\components\D3\TimeSeriesChart.tsx

import * as d3 from "d3";
import React from "react";

interface TimeSeriesChartProps {
    data: any;
    width: number;
    height: number;
}

const TimeSeriesChart = ({ data, width, height }: TimeSeriesChartProps) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y)
                .attr("r", 5)
                .style("fill", "steelblue");

            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y + 10)
                .text((d: any) => d.label);

            svg.selectAll("line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", (d: any) => d.x)
                .attr("y1", (d: any) => d.y)
                .attr("x2", (d: any, i: number) => data[(i + 1) % data.length].x)
                .attr("y2", (d: any, i: number) => data[(i + 1) % data.length].y)
                .style("stroke", "steelblue")
                .style("stroke-width", 2);

            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y + 10)
                .text((d: any) => d.label);
        }
    }, [data]);

    return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default TimeSeriesChart;