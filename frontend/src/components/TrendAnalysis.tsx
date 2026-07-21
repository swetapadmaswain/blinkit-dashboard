'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TrendData {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface TrendAnalysisProps {
  data: TrendData[];
}

export default function TrendAnalysis({ data }: TrendAnalysisProps) {
  return (
    <div className="bg-gradient-to-br from-[#25205c]/90 to-[#1a1238]/90 border border-purple-400/40 rounded-xl p-6 shadow-xl shadow-purple-500/10">
      <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/15 via-pink-500/10 to-orange-500/15 p-4">
            <div>
              <p className="text-white font-medium">{item.metric}</p>
              <p className="text-sm text-gray-400">
                {item.current.toLocaleString()} (vs {item.previous.toLocaleString()})
              </p>
            </div>
            <div className="flex items-center gap-2">
              {item.trend === 'up' && (
                <div className="flex items-center gap-1 text-yellow-300">
                  <TrendingUp size={20} />
                  <span className="font-semibold">+{item.change}%</span>
                </div>
              )}
              {item.trend === 'down' && (
                <div className="flex items-center gap-1 text-pink-300">
                  <TrendingDown size={20} />
                  <span className="font-semibold">{item.change}%</span>
                </div>
              )}
              {item.trend === 'stable' && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Minus size={20} />
                  <span className="font-semibold">{item.change}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
