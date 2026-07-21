'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import InsightCard from '@/components/InsightCard';
import FilterPanel, { FilterState } from '@/components/FilterPanel';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import HeatmapChart from '@/components/HeatmapChart';
import ScatterPlot from '@/components/ScatterPlot';
import GroupedBarChart from '@/components/GroupedBarChart';
import RankedBarChart from '@/components/RankedBarChart';
import SegmentFrustrationCrosstab from '@/components/SegmentFrustrationCrosstab';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import TrendAnalysis from '@/components/TrendAnalysis';
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Lightbulb,
  ShoppingCart,
  BarChart3,
  Activity,
  Brain,
  Zap,
  Target,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface DashboardData {
  data_aggregation: {
    total_reviews: number;
    total_social_posts: number;
    data_sources: Array<{ name: string; type: string; status: string }>;
    categories: Array<{ name: string; description: string }>;
    platform_distribution: Array<{ platform: string; count: number }>;
  };
  behavioral_analysis: {
    rating_distribution: Array<{ rating: number; count: number }>;
    recent_activity: Array<{ content: string; rating: number; platform: string; created_at: string }>;
    user_segments: { high_exploration: number; medium_exploration: number; low_exploration: number };
    segment_frustration_crosstab: Array<{ segment: string; frustration: string; count: number }>;
  };
  insight_generation: {
    barriers: Array<{ type: string; description: string; severity: number; platform: string }>;
    unmet_needs: Array<{ description: string; category: string; priority: number }>;
    top_frustrations: Array<{ theme: string; frequency: number; impact: string }>;
  };
  question_answers: {
    why_repeat_purchases: string;
    barriers_to_exploration: string;
    discovery_methods: string;
    habit_impact: string;
    information_needs: string;
    recurring_frustrations: string;
    experimental_segments: string;
    unmet_needs: string;
  };
  metadata: {
    last_updated: string;
    data_freshness: string;
  };
}

export default function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30d',
    platforms: [],
    categories: [],
    ratingRange: [1, 5],
    sentiment: 'all'
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const data = await api.get('/v1/data/dashboard');
        setDashboardData(data);
      } catch (err) {
        setError('Failed to fetch data from backend');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Generate time series data (simulated)
  const generateTimeSeriesData = (scale: number) => {
    const data: Array<{ date: string; reviews: number; sentiment: number; barriers: number }> = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        reviews: Math.round((85 + ((i * 37) % 145)) * scale),
        sentiment: Number((2.8 + ((i * 13) % 18) / 10).toFixed(1)),
        barriers: Math.round((8 + ((i * 11) % 27)) * scale)
      });
    }
    return data;
  };

  // Generate heatmap data
  const generateHeatmapData = (scale: number) => {
    const categories = ['delivery', 'quality', 'app', 'support', 'pricing'];
    const timeSlots = ['morning', 'afternoon', 'evening', 'night'];
    return categories.flatMap((category, categoryIndex) => timeSlots.map((slot, slotIndex) => ({
      x: slot,
      y: category,
      value: Math.round((18 + ((categoryIndex + 2) * (slotIndex + 3) * 7)) * scale),
    })));
  }; 

  // Generate scatter plot data
  const generateScatterData = (scale: number) => {
    const categories = ['high', 'medium', 'low'];
    const total = Math.round(50 * scale);
    return Array.from({ length: total }, (_, index) => ({
      x: (index * 17) % 100,
      y: (index * 29) % 100,
      z: 10 + ((index * 7) % 50),
      name: `User ${index + 1}`,
      category: categories[index % categories.length],
    }));
  };

  // Generate grouped bar chart data
  const generateGroupedBarData = (scale: number) => [
    { category: 'Delivery Speed', 'Current Users': Math.round(85 * scale), 'New Users': Math.round(70 * scale), 'Churned Users': Math.round(45 * scale) },
    { category: 'Product Quality', 'Current Users': Math.round(90 * scale), 'New Users': Math.round(75 * scale), 'Churned Users': Math.round(50 * scale) },
    { category: 'App Experience', 'Current Users': Math.round(75 * scale), 'New Users': Math.round(80 * scale), 'Churned Users': Math.round(60 * scale) },
    { category: 'Customer Support', 'Current Users': Math.round(70 * scale), 'New Users': Math.round(65 * scale), 'Churned Users': Math.round(55 * scale) },
    { category: 'Pricing', 'Current Users': Math.round(80 * scale), 'New Users': Math.round(85 * scale), 'Churned Users': Math.round(40 * scale) },
    { category: 'Variety', 'Current Users': Math.round(88 * scale), 'New Users': Math.round(72 * scale), 'Churned Users': Math.round(48 * scale) },
  ];

  // Generate trend analysis data
  const generateTrendData = () => {
    return [
      { metric: 'Total Reviews', current: 4520, previous: 4030, change: 12.2, trend: 'up' as const },
      { metric: 'Avg Rating', current: 3.8, previous: 3.6, change: 5.6, trend: 'up' as const },
      { metric: 'Active Users', current: 12500, previous: 11800, change: 5.9, trend: 'up' as const },
      { metric: 'Barriers Detected', current: 156, previous: 189, change: -17.5, trend: 'down' as const },
      { metric: 'Unmet Needs', current: 42, previous: 45, change: -6.7, trend: 'down' as const },
      { metric: 'Conversion Rate', current: 8.5, previous: 8.3, change: 2.4, trend: 'up' as const }
    ];
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const normalizedPlatform = (platform: string) => platform.toLowerCase().replace(/[\s-]+/g, '_');
  const categoryKeywords: Record<string, string[]> = {
    delivery_speed: ['delivery', 'speed', 'late', 'order'],
    product_quality: ['quality', 'product', 'item', 'fresh'],
    app_experience: ['app', 'search', 'checkout', 'interface'],
    customer_support: ['support', 'service', 'refund', 'help'],
    pricing: ['price', 'cost', 'fee', 'discount'],
  };
  const dateRangeDays: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 };
  const dateLimit = dateRangeDays[filters.dateRange];
  const dateCutoff = dateLimit ? new Date(Date.now() - dateLimit * 24 * 60 * 60 * 1000) : null;

  const filteredRecentActivity = dashboardData.behavioral_analysis.recent_activity.filter((activity) => {
    const activityDate = new Date(activity.created_at);
    const hasMatchingPlatform = !filters.platforms.length || filters.platforms.includes(normalizedPlatform(activity.platform));
    const hasMatchingRating = activity.rating >= filters.ratingRange[0] && activity.rating <= filters.ratingRange[1];
    const activitySentiment = activity.rating >= 4 ? 'positive' : activity.rating <= 2 ? 'negative' : 'neutral';
    const hasMatchingSentiment = filters.sentiment === 'all' || filters.sentiment === activitySentiment;
    const activityContent = activity.content.toLowerCase();
    const hasMatchingCategory = !filters.categories.length || filters.categories.some((category) =>
      (categoryKeywords[category] ?? []).some((keyword) => activityContent.includes(keyword)),
    );
    const hasMatchingDate = !dateCutoff || Number.isNaN(activityDate.getTime()) || activityDate >= dateCutoff;

    return hasMatchingPlatform && hasMatchingRating && hasMatchingSentiment && hasMatchingCategory && hasMatchingDate;
  });

  const activityMatchRatio = dashboardData.behavioral_analysis.recent_activity.length
    ? filteredRecentActivity.length / dashboardData.behavioral_analysis.recent_activity.length
    : 1;
  const filteredReviewTotal = Math.round(dashboardData.data_aggregation.total_reviews * activityMatchRatio);
  const filteredSocialPostTotal = Math.round(dashboardData.data_aggregation.total_social_posts * activityMatchRatio);

  const ratingChartData = [1, 2, 3, 4, 5]
    .filter((rating) => rating >= filters.ratingRange[0] && rating <= filters.ratingRange[1])
    .map((rating) => ({
      name: `${rating}★`,
      value: filteredRecentActivity.filter((activity) => activity.rating === rating).length,
    }));

  const platformChartData = dashboardData.data_aggregation.platform_distribution
    .filter((item) => !filters.platforms.length || filters.platforms.includes(normalizedPlatform(item.platform)))
    .map((item) => ({
      name: item.platform,
      value: Math.round(item.count * activityMatchRatio),
    }));

  const segmentChartData = [
    { name: 'High Exploration', value: dashboardData.behavioral_analysis.user_segments.high_exploration },
    { name: 'Medium Exploration', value: dashboardData.behavioral_analysis.user_segments.medium_exploration },
    { name: 'Low Exploration', value: dashboardData.behavioral_analysis.user_segments.low_exploration },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="bg-gradient-to-r from-pink-400 via-yellow-300 to-orange-400 bg-clip-text text-3xl font-bold text-transparent mb-2">
                  Blinkit Discovery Engine
                </h1>
                <p className="text-gray-400">
                  AI-Powered insights for quick-commerce
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FilterPanel onFilterChange={handleFilterChange} />
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(dashboardData.metadata.last_updated).toLocaleString()}
                  </p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-pink-500/25 to-orange-500/25 text-yellow-200 border border-pink-400/40 rounded-full text-xs mt-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                    Real-time
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Reviews"
                  value={filteredReviewTotal.toLocaleString()}
                  icon={MessageSquare}
                  color="blue"
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  title="Social Posts"
                  value={filteredSocialPostTotal.toLocaleString()}
                  icon={Users}
                  color="green"
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  title="Data Sources"
                  value={dashboardData.data_aggregation.data_sources.length}
                  icon={Activity}
                  color="purple"
                />
                <StatCard
                  title="Categories"
                  value={dashboardData.data_aggregation.categories.length}
                  icon={ShoppingCart}
                  color="pink"
                />
              </div>

              {/* Trend Analysis */}
              <TrendAnalysis data={generateTrendData()} />

              {/* Time Series Chart */}
              <TimeSeriesChart 
                data={generateTimeSeriesData(activityMatchRatio)} 
                title="Reviews, Sentiment & Barriers Over Time"
                type="area"
              />

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RankedBarChart
                  data={ratingChartData.map((item) => ({ label: item.name, value: item.value }))}
                  title="Rating Distribution"
                  valueLabel="Reviews"
                  xAxisLabel="Number of reviews at each rating"
                  yAxisLabel="Star rating"
                />
                <RankedBarChart
                  data={platformChartData.map((item) => ({ label: item.name, value: item.value }))}
                  title="Platform Distribution"
                  valueLabel="Mentions"
                  xAxisLabel="Review mentions by platform"
                  yAxisLabel="Review platform"
                />
              </div>

              {/* User Segments */}
              <RankedBarChart
                data={segmentChartData.map((item) => ({ label: item.name, value: item.value }))}
                title="User Segments"
                valueLabel="Users (%)"
                xAxisLabel="Share of analyzed users (%)"
                yAxisLabel="Exploration segment"
              />

              {/* Advanced Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScatterPlot
                  data={generateScatterData(activityMatchRatio)}
                  title="User Behavior Analysis"
                  xLabel="Exploration Score"
                  yLabel="Satisfaction Score"
                  zLabel="Order Frequency"
                />
                <GroupedBarChart
                  data={generateGroupedBarData(activityMatchRatio)}
                  title="User Segment Comparison"
                  metrics={['Current Users', 'New Users', 'Churned Users']}
                />
              </div>

              {/* Heatmap */}
              <HeatmapChart
                data={generateHeatmapData(activityMatchRatio)}
                title="Issue Intensity by Category & Time"
                xLabel="Time of Day"
                yLabel="Category"
              />

              {/* Insight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <InsightCard
                  title="Top Barrier"
                  description={dashboardData.insight_generation.barriers[0]?.description || 'No data'}
                  icon={AlertTriangle}
                  color="red"
                  metric={`Severity: ${dashboardData.insight_generation.barriers[0]?.severity || 0}`}
                />
                <InsightCard
                  title="Priority Need"
                  description={dashboardData.insight_generation.unmet_needs[0]?.description || 'No data'}
                  icon={Lightbulb}
                  color="yellow"
                  metric={`Priority: ${dashboardData.insight_generation.unmet_needs[0]?.priority || 0}`}
                />
                <InsightCard
                  title="Top Frustration"
                  description={dashboardData.insight_generation.top_frustrations[0]?.theme || 'No data'}
                  icon={TrendingUp}
                  color="blue"
                  metric={`${dashboardData.insight_generation.top_frustrations[0]?.frequency || 0} mentions`}
                />
              </div>
            </div>
          )}

          {/* Behavioral Analysis Tab */}
          {activeTab === 'behavioral' && (
            <div className="space-y-6">
              <TimeSeriesChart 
                data={generateTimeSeriesData(activityMatchRatio)} 
                title="User Activity Over Time"
                type="line"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScatterPlot
                  data={generateScatterData(activityMatchRatio)}
                  title="User Exploration vs Satisfaction"
                  xLabel="Exploration Score"
                  yLabel="Satisfaction Score"
                  zLabel="Order Frequency"
                />
                <GroupedBarChart
                  data={generateGroupedBarData(activityMatchRatio)}
                  title="Behavioral Patterns by Segment"
                  metrics={['Current Users', 'New Users', 'Churned Users']}
                />
              </div>

              <SegmentFrustrationCrosstab data={dashboardData.behavioral_analysis.segment_frustration_crosstab} />

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredRecentActivity.map((activity, idx) => (
                    <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer">
                      <p className="text-gray-300 mb-2">{activity.content}</p>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 capitalize">{activity.platform}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400">{'★'.repeat(activity.rating)}</span>
                          <span className="text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Habit Impact</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.habit_impact}</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Discovery Methods</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.discovery_methods}</p>
                </div>
              </div>
            </div>
          )}

          {/* Barriers Tab */}
          {activeTab === 'barriers' && (
            <div className="space-y-6">
              <HeatmapChart
                data={generateHeatmapData(activityMatchRatio)}
                title="Barrier Intensity by Category & Time"
                xLabel="Time of Day"
                yLabel="Barrier Type"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.insight_generation.barriers.map((barrier, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-red-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white capitalize">{barrier.type}</h3>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        Severity: {barrier.severity}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{barrier.description}</p>
                    <p className="text-sm text-gray-500 capitalize">Platform: {barrier.platform}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Barriers to Exploration</h3>
                <p className="text-gray-400">{dashboardData.question_answers.barriers_to_exploration}</p>
              </div>

              <TrendAnalysis data={[
                { metric: 'Price Barriers', current: 34, previous: 38, change: -10.5, trend: 'down' },
                { metric: 'Trust Barriers', current: 28, previous: 32, change: -12.5, trend: 'down' },
                { metric: 'Information Barriers', current: 24, previous: 26, change: -7.7, trend: 'down' },
                { metric: 'Convenience Barriers', current: 14, previous: 18, change: -22.2, trend: 'down' }
              ]} />
            </div>
          )}

          {/* Needs Tab */}
          {activeTab === 'needs' && (
            <div className="space-y-6">
              <GroupedBarChart
                data={generateGroupedBarData(activityMatchRatio)}
                title="Unmet Needs by Category"
                metrics={['Delivery Speed', 'Product Quality', 'App Experience', 'Customer Support', 'Pricing', 'Variety']}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.insight_generation.unmet_needs.map((need, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white capitalize">{need.category}</h3>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                        Priority: {need.priority}
                      </span>
                    </div>
                    <p className="text-gray-400">{need.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10 border border-yellow-400/30 rounded-xl p-6 shadow-lg shadow-yellow-500/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Consistent Unmet Needs</h3>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-medium">
                    {dashboardData.insight_generation.unmet_needs.length} Identified
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed mb-4">{dashboardData.question_answers.unmet_needs}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {dashboardData.insight_generation.unmet_needs.slice(0, 4).map((need, idx) => (
                    <div key={idx} className="bg-gray-800/50 border border-yellow-400/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-yellow-300 capitalize">{need.category}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          need.priority >= 4 ? 'bg-red-500/30 text-red-300' :
                          need.priority >= 3 ? 'bg-orange-500/30 text-orange-300' :
                          'bg-yellow-500/30 text-yellow-300'
                        }`}>
                          P{need.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">{need.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <TrendAnalysis data={[
                { metric: 'Delivery Speed Needs', current: 4.5, previous: 4.2, change: 7.1, trend: 'up' },
                { metric: 'Quality Needs', current: 4.0, previous: 3.8, change: 5.3, trend: 'up' },
                { metric: 'App Experience Needs', current: 3.8, previous: 4.0, change: -5.0, trend: 'down' },
                { metric: 'Support Needs', current: 3.5, previous: 3.6, change: -2.8, trend: 'down' }
              ]} />
            </div>
          )}

          {/* Segments Tab */}
          {activeTab === 'segments' && (
            <div className="space-y-6">
              <ScatterPlot
                data={generateScatterData(activityMatchRatio)}
                title="User Segment Distribution"
                xLabel="Exploration Score"
                yLabel="Purchase Frequency"
                zLabel="Order Value"
              />

              <GroupedBarChart
                data={generateGroupedBarData(activityMatchRatio)}
                title="Segment Characteristics"
                metrics={['High Exploration', 'Medium Exploration', 'Low Exploration']}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Experimental Segments</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.experimental_segments}</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Repeat Purchase Behavior</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.why_repeat_purchases}</p>
                </div>
              </div>

              <TrendAnalysis data={[
                { metric: 'High Exploration Users', current: 35, previous: 32, change: 9.4, trend: 'up' },
                { metric: 'Medium Exploration Users', current: 45, previous: 48, change: -6.3, trend: 'down' },
                { metric: 'Low Exploration Users', current: 20, previous: 20, change: 0, trend: 'stable' }
              ]} />
            </div>
          )}

          {/* Discovery Tab */}
          {activeTab === 'discovery' && (
            <div className="space-y-6">
              <TimeSeriesChart 
                data={generateTimeSeriesData(activityMatchRatio)} 
                title="Discovery Patterns Over Time"
                type="line"
              />

              <HeatmapChart
                data={generateHeatmapData(activityMatchRatio)}
                title="Discovery by Category & Time"
                xLabel="Time of Day"
                yLabel="Category"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Information Needs Before Exploration</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.information_needs}</p>
                </div>

                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Discovery Methods</h3>
                  <p className="text-gray-400">{dashboardData.question_answers.discovery_methods}</p>
                </div>
              </div>

              <TrendAnalysis data={[
                { metric: 'Category Exploration Rate', current: 12.5, previous: 10.8, change: 15.7, trend: 'up' },
                { metric: 'New Product Trials', current: 8.3, previous: 7.5, change: 10.7, trend: 'up' },
                { metric: 'Discovery Time', current: 45, previous: 52, change: -13.5, trend: 'down' },
                { metric: 'Success Rate', current: 67, previous: 62, change: 8.1, trend: 'up' }
              ]} />
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div className="space-y-6">
              <TimeSeriesChart 
                data={generateTimeSeriesData(activityMatchRatio)} 
                title="AI Insights Over Time"
                type="area"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ScatterPlot
                  data={generateScatterData(activityMatchRatio)}
                  title="Insight Clustering"
                  xLabel="Sentiment Score"
                  yLabel="Impact Score"
                  zLabel="Frequency"
                />
                <GroupedBarChart
                  data={generateGroupedBarData(activityMatchRatio)}
                  title="Insight Categories"
                  metrics={['Delivery', 'Quality', 'App', 'Support', 'Pricing', 'Variety']}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dashboardData.insight_generation.top_frustrations.map((frustration, idx) => (
                  <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{frustration.theme}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        frustration.impact === 'high' ? 'bg-red-500/20 text-red-400' :
                        frustration.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {frustration.impact}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-white">{frustration.frequency} mentions</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recurring Frustrations</h3>
                <p className="text-gray-400">{dashboardData.question_answers.recurring_frustrations}</p>
              </div>

              <TrendAnalysis data={[
                { metric: 'Insights Generated', current: 156, previous: 142, change: 9.9, trend: 'up' },
                { metric: 'Pattern Detected', current: 89, previous: 78, change: 14.1, trend: 'up' },
                { metric: 'False Positives', current: 12, previous: 15, change: -20.0, trend: 'down' },
                { metric: 'Accuracy Rate', current: 92, previous: 88, change: 4.5, trend: 'up' }
              ]} />
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div className="space-y-6">
              <TimeSeriesChart 
                data={generateTimeSeriesData(activityMatchRatio)} 
                title="Feedback Volume Over Time"
                type="line"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent User Feedback</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredRecentActivity.map((activity, idx) => (
                      <div key={idx} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors cursor-pointer">
                        <p className="text-gray-300 mb-2">{activity.content}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 capitalize">{activity.platform}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">{'★'.repeat(activity.rating)}</span>
                            <span className="text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <HeatmapChart
                  data={generateHeatmapData(activityMatchRatio)}
                  title="Feedback Intensity by Category & Time"
                  xLabel="Time of Day"
                  yLabel="Feedback Category"
                />
              </div>

              <TrendAnalysis data={[
                { metric: 'Total Feedback', current: 4520, previous: 4030, change: 12.2, trend: 'up' },
                { metric: 'Positive Feedback', current: 68, previous: 65, change: 4.6, trend: 'up' },
                { metric: 'Negative Feedback', current: 18, previous: 22, change: -18.2, trend: 'down' },
                { metric: 'Response Time', current: 2.5, previous: 3.2, change: -21.9, trend: 'down' }
              ]} />
            </div>
          )}

          {activeTab === 'architecture' && (
            <ArchitectureDiagram
              reviewCount={dashboardData.data_aggregation.total_reviews}
              sourceCount={dashboardData.data_aggregation.data_sources.length}
              categoryCount={dashboardData.data_aggregation.categories.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}
