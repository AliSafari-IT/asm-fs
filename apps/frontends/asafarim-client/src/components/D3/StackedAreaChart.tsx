import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface StackedAreaChartProps { 
    data: any;
    width: number;
    height: number;
}
const StackedAreaChart = ({ data: parsedData, width, height }: StackedAreaChartProps) => {
    const ref = useRef();
    const stackedData = d3.area()
        .x(d => x(/* x-value */))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]));
    useEffect(() => {
        // set the dimensions and margins of the graph
        const margin = { top: 30, right: 30, bottom: 70, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        const svg = d3
            .select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the Data
        parsedData.then(function (data) {
            // X axis
            const x = d3
                .scaleBand()
                .range([0, width])
                .domain(data.map((d) => d.Country))
                .padding(0.2);
            svg
                .append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Add Y axis
            const y = d3.scaleLinear().domain([0, 150]).range([height, 0]);
            svg.append("g").call(d3.axisLeft(y));

            // color palette
            const color = d3
                .scaleOrdinal()
                .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

            // Show the bars
            svg
                .append("g")
                .selectAll("g")
                // Enter in the stack data = loop key per key = group per group
                .data(d3.stack().keys(["2015", "2016"])(data))
                .enter()
                .append("g")
                .attr("fill", (d) => color(d.key))
                .selectAll("rect")
                // enter a second time = loop grouping per grouping
                .data((d) => d)
                .enter();

            svg.selectAll("path")
                .data(stackedData)
                .enter()
                .append("path")
                .attr("fill", d => color(d.key))
                .attr("d", area);
        });
    }, []);
    return <svg width={460} height={400} id="stackedAreaChart" ref={ref} />;
};

export default StackedAreaChart;