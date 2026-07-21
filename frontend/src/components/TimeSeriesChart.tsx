'use client';

import RankedBarChart from '@/components/RankedBarChart';

interface TimeSeriesData {
  date: string;
  reviews: number;
  sentiment: number;
  barriers: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  title: string;
  type?: 'line' | 'area';
}

export default function TimeSeriesChart({ data, title }: TimeSeriesChartProps) {
  return (
    <RankedBarChart
      data={data.map((item) => ({
        label: `${item.date} · ${item.sentiment.toFixed(1)}★ · ${item.barriers} barriers`,
        value: item.reviews,
      }))}
      title={title}
      valueLabel="Reviews"
      xAxisLabel="Review volume per period"
      yAxisLabel="Period · sentiment · barriers"
      maxItems={10}
    />
  );
}
