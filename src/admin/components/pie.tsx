import React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

const data: PieChartData[] = [
  { label: 'Group A', value: 70, color: '#0088FE' },
  { label: 'Group B', value: 20, color: '#00C49F' },
  { label: 'Group C', value: 10, color: '#FFBB28' },
];

const TOTAL = data.reduce((a, b) => a + b.value, 0);

const getArcLabel = (params: any) => {
  const percent = params.value / TOTAL;
  return `${(percent * 100).toFixed(0)}%`;
};

function PieChartWithCustomizedLabel() {
  return (
    <PieChart
      series={[
        {
          outerRadius: 120,
          data,
          arcLabel: getArcLabel,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontSize: 14,
        },
      }}
      width={300}
      height={300}
    />
  );
}

export default PieChartWithCustomizedLabel;
