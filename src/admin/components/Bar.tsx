import React, { useState, useRef, useLayoutEffect } from "react"; // Import useLayoutEffect and useRef
import { BarChart } from "@mui/x-charts";


const data = [61, 77, 54, 89, 65, 86];
const xLabels = ["Admstr", "Sales", "HR", "Mrkt", "Social", "IT"];




export default function SimpleBarChart() {
  
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartWidth, setChartWidth] = useState<number>(470); 
  
  useLayoutEffect(() => {
    if (chartRef.current) {
      setChartWidth(chartRef.current.offsetWidth); // Get actual width on mount and resize
    }
  }, []);

  return (
    <BarChart
      width={chartWidth}
      height={300}
      series={[
        {
          data,
          label: "department attendance",
          id: "pvId",
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
    >
      {/* Custom bar labels */}
      {data.map((value, index) => (
        <text
          key={index}
          x={index * 62 + 80} // Adjust positioning as needed
          y={236} // Adjust positioning as needed
          textAnchor="middle"
          dominantBaseline="central"
          fill="black"
        >
          {((value / 100) * 100).toFixed(0)}%
        </text>
      ))}
    </BarChart>
  );
}