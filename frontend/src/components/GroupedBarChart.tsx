'use client';

import RankedBarChart from '@/components/RankedBarChart';

interface GroupedBarData {
  category: string;
  [key: string]: string | number;
}

interface GroupedBarChartProps {
  data: GroupedBarData[];
  title: string;
  metrics: string[];
}

export default function GroupedBarChart({ data, title, metrics }: GroupedBarChartProps) {
  const metricKeys = metrics.filter((metric) => data.some((item) => typeof item[metric] === 'number'));
  const numericKeys = metricKeys.length
    ? metricKeys
    : Object.keys(data[0] ?? {}).filter((key) => key !== 'category' && typeof data[0][key] === 'number');

  const rankedData = data.map((item) => ({
    label: item.category,
    value: Math.round(numericKeys.reduce((total, key) => total + Number(item[key] ?? 0), 0) / Math.max(numericKeys.length, 1)),
  }));

  return (
    <RankedBarChart
      data={rankedData}
      title={title}
      valueLabel="Score"
      xAxisLabel="Average score across selected user groups"
      yAxisLabel="Category"
    />
  );
}
