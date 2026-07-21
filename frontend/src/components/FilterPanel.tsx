'use client';

import { useState } from 'react';
import { Filter, Calendar, SlidersHorizontal } from 'lucide-react';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  dateRange: string;
  platforms: string[];
  categories: string[];
  ratingRange: [number, number];
  sentiment: string;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: '30d',
    platforms: [],
    categories: [],
    ratingRange: [1, 5],
    sentiment: 'all'
  });

  const platformOptions = ['google_play', 'app_store', 'twitter', 'reddit', 'quora'];
  const categoryOptions = ['delivery_speed', 'product_quality', 'app_experience', 'customer_support', 'pricing'];
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'all', label: 'All time' }
  ];

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    const newFilters = { ...filters, platforms: newPlatforms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      dateRange: '30d',
      platforms: [],
      categories: [],
      ratingRange: [1, 5],
      sentiment: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount = 
    filters.platforms.length + 
    filters.categories.length + 
    (filters.dateRange !== '30d' ? 1 : 0) +
    (filters.sentiment !== 'all' ? 1 : 0) +
    (filters.ratingRange[0] !== 1 || filters.ratingRange[1] !== 5 ? 1 : 0);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isOpen 
            ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg shadow-blue-500/30' 
            : 'bg-gradient-to-r from-[#25205c] to-[#1a1238] text-yellow-200 border border-purple-400/40 hover:from-blue-500/50 hover:to-pink-500/50 hover:text-white'
        }`}
      >
        <SlidersHorizontal size={20} />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="bg-yellow-300 text-purple-950 text-xs px-2 py-0.5 rounded-full font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-[#1b1d46] border border-pink-400/50 rounded-xl shadow-2xl shadow-pink-500/20 z-50 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-yellow-300" />
              <h3 className="text-lg font-semibold text-white">Filter Options</h3>
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Date Range
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => {
                const newFilters = { ...filters, dateRange: e.target.value };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Platforms */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Platforms</label>
            <div className="flex flex-wrap gap-2">
              {platformOptions.map(platform => (
                <button
                  key={platform}
                  onClick={() => handlePlatformToggle(platform)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.platforms.includes(platform)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {platform.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">Categories</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    filters.categories.includes(category)
                      ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {category.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Rating Range: {filters.ratingRange[0]} - {filters.ratingRange[1]} ★
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={filters.ratingRange[0]}
              onChange={(e) => {
                const newFilters = { 
                  ...filters, 
                  ratingRange: [Math.min(parseInt(e.target.value), filters.ratingRange[1]), filters.ratingRange[1]] as [number, number] 
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full accent-pink-500"
            />
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={filters.ratingRange[1]}
              onChange={(e) => {
                const newFilters = { 
                  ...filters, 
                  ratingRange: [filters.ratingRange[0], Math.max(parseInt(e.target.value), filters.ratingRange[0])] as [number, number] 
                };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full accent-pink-500 mt-2"
            />
          </div>

          {/* Sentiment */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sentiment</label>
            <select
              value={filters.sentiment}
              onChange={(e) => {
                const newFilters = { ...filters, sentiment: e.target.value };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All sentiments</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
