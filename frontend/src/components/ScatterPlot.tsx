'use client';

import RankedBarChart from '@/components/RankedBarChart';

interface ScatterData {
  x: number;
  y: number;
  z: number;
  name: string;
  category?: string;
}

interface ScatterPlotProps {
  data: ScatterData[];
  title: string;
  xLabel: string;
  yLabel: string;
  zLabel?: string;
}

export default function ScatterPlot({ data, title, xLabel, yLabel, zLabel = 'Count' }: ScatterPlotProps) {
  const groupedData = data.reduce<Record<string, { total: number; count: number }>>((result, item) => {
    const key = item.category || 'Unclassified';
    if (!result[key]) result[key] = { total: 0, count: 0 };
    result[key].total += item.z;
    result[key].count += 1;
    return result;
  }, {});

  const chartData = Object.entries(groupedData)
    .map(([label, { total, count }]) => ({ label, value: Math.round(total / count) }))
    .sort((a, b) => b.value - a.value);

  return (
    <RankedBarChart
      data={chartData}
      title={title}
      valueLabel={zLabel}
      xAxisLabel={`${zLabel} by ${xLabel.toLowerCase()}`}
      yAxisLabel={yLabel}
    />
  );
}
