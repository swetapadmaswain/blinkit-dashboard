'use client';

import { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  metric?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink';
}

const colorClasses = {
  blue: 'from-blue-500/35 via-cyan-400/15 to-transparent border-blue-400/60 shadow-blue-500/20',
  green: 'from-orange-500/35 via-yellow-400/15 to-transparent border-orange-400/60 shadow-orange-500/20',
  yellow: 'from-yellow-400/35 via-orange-500/15 to-transparent border-yellow-300/60 shadow-yellow-500/20',
  red: 'from-orange-500/35 via-pink-500/15 to-transparent border-pink-400/60 shadow-pink-500/20',
  purple: 'from-purple-500/35 via-pink-500/15 to-transparent border-purple-400/60 shadow-purple-500/20',
  pink: 'from-pink-500/35 via-fuchsia-500/15 to-transparent border-pink-400/60 shadow-pink-500/20',
};

const iconColorClasses = {
  blue: 'text-cyan-300',
  green: 'text-yellow-300',
  yellow: 'text-orange-300',
  red: 'text-pink-300',
  purple: 'text-fuchsia-300',
  pink: 'text-pink-200',
};

export default function InsightCard({ 
  title, 
  description, 
  icon: Icon, 
  metric, 
  trend, 
  color = 'blue' 
}: InsightCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`rounded-xl border border-white/15 bg-white/10 p-3 ${iconColorClasses[color]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            <span>{trend.isPositive ? '↑' : '↓'}</span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      {metric && (
        <div className="text-2xl font-bold text-white">{metric}</div>
      )}
    </div>
  );
}
