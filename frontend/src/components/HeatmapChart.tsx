'use client';

import RankedBarChart from '@/components/RankedBarChart';

interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapData[];
  title: string;
  xLabel: string;
  yLabel: string;
}

export default function HeatmapChart({ data, title, xLabel, yLabel }: HeatmapChartProps) {
  const rankedData = Object.entries(
    data.reduce<Record<string, number>>((result, item) => {
      result[item.y] = (result[item.y] ?? 0) + item.value;
      return result;
    }, {}),
  ).map(([label, value]) => ({ label, value }));

  return (
    <RankedBarChart
      data={rankedData}
      title={title}
      valueLabel="Total intensity"
      xAxisLabel={`Aggregated intensity across ${xLabel.toLowerCase()}`}
      yAxisLabel={yLabel}
    />
  );
}
