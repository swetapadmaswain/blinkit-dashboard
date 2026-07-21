'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface DataStats {
  raw_reviews_count: number;
  social_posts_count: number;
}

export default function Home() {
  const [stats, setStats] = useState<DataStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await api.get('/v1/data/stats');
        setStats(data);
      } catch (err) {
        setError('Failed to fetch data from backend');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">
        Blinkit Discovery Engine Dashboard
      </h1>
      <p className="text-gray-600 mb-8">
        AI-Powered insights for quick-commerce
      </p>

      {loading && <p className="text-gray-500">Loading data...</p>}
      
      {error && <p className="text-red-500">{error}</p>}

      {stats && (
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Raw Reviews</h2>
            <p className="text-4xl font-bold text-blue-600">{stats.raw_reviews_count}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Social Posts</h2>
            <p className="text-4xl font-bold text-green-600">{stats.social_posts_count}</p>
          </div>
        </div>
      )}
    </main>
  )
}
