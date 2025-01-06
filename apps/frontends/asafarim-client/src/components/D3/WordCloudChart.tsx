import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

interface WordCloudChartProps {
  data: { word: string; count: number }[];
  width: number;
  height: number;
}

const WordCloudChart: React.FC<WordCloudChartProps> = ({
  data,
  width,
  height
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // 1. If no SVG or empty data, do nothing
    if (!svgRef.current || data.length === 0) return;

    // 2. Clear any existing elements inside the SVG
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 3. Prepare the word cloud layout
    const layout = cloud<{ text: string; size: number }>()
      .size([width, height])
      .words(
        data.map((d) => ({
          text: d.word,
          // Adjust the multiplier or use a scale for better sizing
          size: d.count * 5 
        }))
      )
      .padding(5)
      .rotate(() => (Math.random() < 0.5 ? 0 : 90))
      .font("Impact")
      .fontSize((d) => d.size)
      .on("end", draw);

    // 4. Start the layout calculation
    layout.start();

    // 5. The 'draw' function to render words after layout is complete
    function draw(words: cloud.Word[]) {
      // Center all words in a <g> element
      svg
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-family", "Impact")
        .style("font-size", (d: cloud.Word) => `${d.size}px`)
        .attr("text-anchor", "middle")
        .attr("transform", (d: cloud.Word) => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text((d: cloud.Word) => d.text);
    }
  }, [data, width, height]);

  return <svg ref={svgRef} width={width} height={height} />;
};

export default WordCloudChart;
