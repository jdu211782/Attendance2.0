import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

function LineChartComponent() {
  const daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const attendanceData: number[] = [64, 55, 74, 90, 66];

  return (
    <LineChart
      xAxis={[
        {
          scaleType: 'point',
          data: daysOfWeek,
        },
      ]}
      series={[
        {
          data: attendanceData,
        },
      ]}
      width={500}
      height={300}
    />
  );
}

export default LineChartComponent;

