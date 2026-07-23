'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Lightbulb, 
  MessageSquare, 
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  TrendingUp,
  Shield,
  Target,
  Network
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'behavioral', label: 'Behavioral Analysis', icon: TrendingUp },
    { id: 'barriers', label: 'Barriers', icon: Shield },
    { id: 'needs', label: 'Unmet Needs', icon: Lightbulb },
    { id: 'segments', label: 'User Segments', icon: Users },
    { id: 'discovery', label: 'Discovery Patterns', icon: ShoppingCart },
    { id: 'insights', label: 'AI Insights', icon: BarChart3 },
    { id: 'feedback', label: 'User Feedback', icon: MessageSquare },
    { id: 'architecture', label: 'Architecture', icon: Network },
  ];

  return (
    <div className={`bg-gradient-to-b from-[#171a43] via-[#25205c] to-[#1a1238] border-r border-pink-500/40 shadow-[8px_0_32px_rgba(236,72,153,0.12)] transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 flex items-center justify-between border-b border-pink-500/30">
        {!collapsed && (
          <div>
            <h1 className="bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-lg font-bold text-transparent">Blinkit</h1>
            <p className="text-xs text-gray-400">Discovery Engine</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-yellow-300 transition-colors hover:bg-pink-500/25 hover:text-white"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg shadow-pink-500/30'
                  : 'text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-orange-500/20 hover:text-yellow-200'
              }`}
              title={collapsed ? item.label : ''}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

    </div>
  );
}
