'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface RankedBarDatum {
  label: string;
  value: number;
}

interface RankedBarChartProps {
  data: RankedBarDatum[];
  title: string;
  valueLabel?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  maxItems?: number;
}

const VIVID_SCALE = ['#facc15', '#fb923c', '#ec4899', '#a855f7', '#38bdf8', '#2563eb'];

export default function RankedBarChart({
  data,
  title,
  valueLabel = 'Count',
  xAxisLabel,
  yAxisLabel = 'Category',
  maxItems = 8,
}: RankedBarChartProps) {
  const chartData = data
    .filter((item) => Number.isFinite(item.value) && item.value >= 0)
    .sort((left, right) => right.value - left.value)
    .slice(0, maxItems);

  return (
    <section className="bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border border-pink-400/40 rounded-xl p-6 shadow-xl shadow-pink-500/10">
      <h3 className="text-xl font-semibold tracking-tight text-white mb-5">{title}</h3>
      {chartData.length ? (
        <ResponsiveContainer width="100%" height={Math.max(260, chartData.length * 42)}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 56, bottom: 4, left: 138 }}
          >
            <defs>
              <linearGradient id="ranked-vivid" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="48%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            <CartesianGrid horizontal={false} stroke="#8b5cf6" strokeOpacity={0.22} strokeDasharray="3 3" />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#737373', fontSize: 11 }}
              label={{ value: xAxisLabel ?? valueLabel, position: 'insideBottom', offset: -2, fill: '#a5b4fc', fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#c7d2fe', fontSize: 11 }}
              label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -118, fill: '#a5b4fc', fontSize: 11 }}
              width={130}
            />
            <Tooltip
              cursor={{ fill: '#ec489922' }}
              contentStyle={{ backgroundColor: '#171a43', border: '1px solid #f472b6', borderRadius: '8px' }}
              labelStyle={{ color: '#fef3c7' }}
              itemStyle={{ color: '#facc15' }}
              formatter={(value: number) => [value, valueLabel]}
            />
            <Bar dataKey="value" radius={[0, 3, 3, 0]}>
              <LabelList dataKey="value" position="right" fill="#fef3c7" fontSize={11} formatter={(value: number) => value.toLocaleString()} />
              {chartData.map((item, index) => (
                <Cell key={item.label} fill={index === 0 ? 'url(#ranked-vivid)' : VIVID_SCALE[Math.min(index, VIVID_SCALE.length - 1)]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center text-sm text-neutral-500">No data available</div>
      )}
    </section>
  );
}
