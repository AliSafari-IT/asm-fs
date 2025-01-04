// src\components\D3\Scatterplot.tsx

import React from 'react';
import * as d3 from 'd3';

interface ScatterplotProps {
    data: { x: number; y: number }[];
    width: number;
    height: number;
}

const Scatterplot: React.FC<ScatterplotProps> = ({ data, width = 700, height = 400 }) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            const margin = 50;

            const xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.x) as [number, number])
                .range([margin, width - margin]);

            const yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.y) as [number, number])
                .range([height - margin, margin]);

           // add x and y axis
            svg.append('g')
                .attr('transform', `translate(0, ${height - margin})`)
                .call(d3.axisBottom(xScale));

            svg.append('g')
                .attr('transform', `translate(${margin}, 0)`)
                .call(d3.axisLeft(yScale));

            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', 5)
                .attr('fill', 'blue');
        }
    }, [data, width, height]);

    return <svg ref={svgRef} width={width} height={height} />;
};

export default Scatterplot;