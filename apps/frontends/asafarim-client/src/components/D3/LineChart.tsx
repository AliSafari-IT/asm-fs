import * as React from "react";
import * as d3 from "d3";

interface Data {
  date: Date | null;
  price: number;
}

interface Line {
  name: string;
  values: Data[];
}

interface LineChartProps {
  data: Line[];
  width: number;
  height: number;
}

export const LineChart: React.FunctionComponent<LineChartProps> = ({ data, width, height }) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);
  const margin = 50;
  const duration = 250;
  // const tooltip = { width: 100, height: 100, x: 10, y: -30 };

  const lineOpacity = "1";
  const lineOpacityHover = "0.85";
  const otherLinesOpacityHover = "0.1";
  const lineStroke = "3.5";
  const lineStrokeHover = "5";

  const circleOpacity = "0.85";
  const circleOpacityOnLineHover = "0.85";
  const circleRadius = 5;
  const circleRadiusHover = 6;

  /* Scale */
  const [minX, maxX] = d3.extent(data[0].values, (d) => d.date);

  const xScale = d3
    .scaleTime()
    .domain([minX!, maxX!])
    .range([0, width - margin]);

  const [minY, maxY] = d3.extent(data[0].values, (d) => d.price);

  const yScale = d3
    .scaleLinear()
    .domain([minY!, maxY!])
    .range([height - margin, 0]);

  /* Add SVG */
  svg
    .attr("width", width + margin + "px")
    .attr("height", height + margin + "px")
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(height - margin)
    .tickSizeOuter(0)
    .tickFormat( d => d3.timeFormat("%Y-%m-%d")(d as Date))
    .tickPadding(15);

  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(margin - width)
    .tickSizeOuter(0)
    .ticks(12)
    .tickPadding(20);

  // Add the X Axis
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(xAxis);

  // Add the Y Axis
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin}, ${margin})`)
    .attr("font-weight", "100")
    .attr("font-family", '"Roboto", "sans-serif"')
    .call(yAxis)
    .append("text")
    .attr("y", 15)
    .attr("transform", "rotate(-90)");

  /* Add line into SVG */
  const line = d3
    .line<Data>()
    .x((d) => xScale(d.date!))
    .y((d) => yScale(d.price));

  const lines = svg
    .append("g")
    .attr("class", "lines")
    .attr("transform", `translate(${margin}, ${margin})`);

  // draws out line and different points
  lines
    .selectAll("line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .on("mouseover", function (_e: MouseEvent, d) {
      svg
        .append("text")
        .attr("class", "title-text")
        .style("fill", "#33BBFF")
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width - margin) / 2)
        .attr("y", 70);
    })
    .on("mouseout", function () {
        svg.select(".title-text").remove();
    })
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    // line color that connects dots
    .style("stroke", "#33BBFF")
    .style("fill", "none")
    .style("opacity", lineOpacity)
    .on("mouseover", function () {
      d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function () {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });

  // /* Add circles in the line */
  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", "#33BBFF")
    .selectAll("circle")
    .data((d: Line) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function (_e: MouseEvent, d) {
      // display amount on hovering of points
      d3.select<SVGGElement, Data>(this)
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.price}`)
        .attr("x", (d) => xScale(d.date!) + 5)
        .attr("y", (d) => yScale(d.price) - 10);
    })
    .on("mouseout", function () {
      d3.select(this)
        .style("cursor", "none")
        .transition()
        .duration(duration)
        .selectAll(".text")
        .remove();
    })
    .append("circle")
    .attr("cx", (d) => xScale(d.date!))
    .attr("cy", (d) => yScale(d.price))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity)
    .on("mouseover", function () {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);
    })
    .on("mouseout", function () {
      d3.select(this).transition().duration(duration).attr("r", circleRadius);
    });

  }, [data, height, svgRef, width]);

  return <svg ref={svgRef} className="h-full bg-white dark:bg-gray-600 dark:text-gray-100 m-1 rounded "/>;
};

export default LineChart;