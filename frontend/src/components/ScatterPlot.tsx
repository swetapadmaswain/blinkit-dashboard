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
  const groupedData = data.reduce<Record<string, number>>((result, item) => {
    const key = item.category || 'Unclassified';
    result[key] = (result[key] ?? 0) + 1;
    return result;
  }, {});

  return (
    <RankedBarChart
      data={Object.entries(groupedData).map(([label, value]) => ({ label, value }))}
      title={title}
      valueLabel={zLabel}
      xAxisLabel={`${zLabel} by ${xLabel.toLowerCase()}`}
      yAxisLabel={yLabel}
    />
  );
}
