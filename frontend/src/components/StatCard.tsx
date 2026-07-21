'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink';
}

const colorClasses = {
  blue: 'from-blue-500/30 via-cyan-400/15 to-transparent text-cyan-300 border-blue-400/60 shadow-blue-500/20',
  green: 'from-orange-500/30 via-yellow-400/15 to-transparent text-yellow-300 border-orange-400/60 shadow-orange-500/20',
  yellow: 'from-yellow-400/30 via-orange-500/15 to-transparent text-yellow-200 border-yellow-300/60 shadow-yellow-500/20',
  red: 'from-orange-500/30 via-pink-500/15 to-transparent text-orange-300 border-orange-400/60 shadow-orange-500/20',
  purple: 'from-purple-500/30 via-pink-500/15 to-transparent text-pink-300 border-purple-400/60 shadow-purple-500/20',
  pink: 'from-pink-500/30 via-fuchsia-500/15 to-transparent text-pink-200 border-pink-400/60 shadow-pink-500/20',
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'blue' }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br border rounded-xl p-6 shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ${colorClasses[color]}`}> 
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend.isPositive ? 'text-yellow-300' : 'text-orange-300'
            }`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`rounded-xl border border-current/30 bg-white/10 p-3 ${colorClasses[color].split(' ').slice(3, 4).join(' ')}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
