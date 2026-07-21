'use client';

import { Database, GitBranch, Globe2, Server, Sparkles } from 'lucide-react';

interface ArchitectureDiagramProps {
  reviewCount: number;
  sourceCount: number;
  categoryCount: number;
}

interface NodeProps {
  label: string;
  detail?: string;
  accent?: 'green' | 'blue' | 'purple' | 'neutral';
}

const accentClasses = {
  green: 'border-yellow-400/60 bg-yellow-400/15 text-yellow-200',
  blue: 'border-blue-400/60 bg-blue-500/20 text-cyan-200',
  purple: 'border-pink-400/60 bg-pink-500/20 text-pink-200',
  neutral: 'border-orange-400/50 bg-orange-500/15 text-orange-100',
};

function ArchitectureNode({ label, detail, accent = 'neutral' }: NodeProps) {
  return (
    <div className={`min-w-28 rounded-lg border px-3 py-2 text-center shadow-lg ${accentClasses[accent]}`}>
      <p className="text-xs font-semibold">{label}</p>
      {detail && <p className="mt-1 text-[10px] text-gray-400">{detail}</p>}
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex min-w-12 flex-1 flex-col items-center justify-center">
      {label && <span className="mb-1 text-[10px] text-yellow-300">{label}</span>}
      <div className="relative h-px w-full bg-gradient-to-r from-blue-400 via-pink-400 to-orange-400 after:absolute after:-right-1 after:-top-1 after:border-b-4 after:border-l-6 after:border-t-4 after:border-b-transparent after:border-l-pink-400 after:border-t-transparent" />
    </div>
  );
}

export default function ArchitectureDiagram({ reviewCount, sourceCount, categoryCount }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <GitBranch className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Architecture</h2>
        </div>

        <div className="space-y-7 overflow-x-auto pb-2">
          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Data sources and ingestion</p>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-2">
                <ArchitectureNode label="Google Play" detail="Blinkit reviews" accent="green" />
                <ArchitectureNode label="App Store" detail="Blinkit reviews" accent="green" />
                <ArchitectureNode label="Reddit / X" detail="Social signals" accent="neutral" />
                <ArchitectureNode label="Seed Data" detail="Development data" accent="neutral" />
              </div>
              <Arrow label="scrape / import" />
              <ArchitectureNode label="Ingestion Layer" detail="Python scrapers" accent="blue" />
              <Arrow label="raw reviews" />
              <ArchitectureNode label="MongoDB" detail="raw_reviews · social_posts" accent="green" />
              <Arrow label="index" />
              <ArchitectureNode label="Elasticsearch" detail="Search index" accent="purple" />
            </div>
          </div>

          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Analysis and API layer</p>
            <div className="flex items-center gap-2">
              <ArchitectureNode label="MongoDB" detail="Review content" accent="green" />
              <Arrow label="classify" />
              <ArchitectureNode label="Insight Engine" detail="Segments · frustrations" accent="purple" />
              <Arrow label="persist" />
              <ArchitectureNode label="PostgreSQL" detail="Barriers · unmet needs" accent="blue" />
              <Arrow label="serve" />
              <ArchitectureNode label="FastAPI" detail="/api/v1/data/dashboard" accent="green" />
              <Arrow label="JSON" />
              <ArchitectureNode label="Redis + Celery" detail="Background processing" accent="neutral" />
            </div>
          </div>

          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Experience layer</p>
            <div className="flex items-center gap-2">
              <ArchitectureNode label="FastAPI" detail="Dashboard API" accent="green" />
              <Arrow label="fetch" />
              <ArchitectureNode label="Next.js Dashboard" detail="Filters · charts · insights" accent="blue" />
              <Arrow label="render" />
              <ArchitectureNode label="Discovery Views" detail="Overview · feedback · architecture" accent="purple" />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <h3 className="mb-5 text-lg font-semibold text-white">Pipeline Stats</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Globe2 size={14} /> Reviews</div>
            <p className="text-2xl font-semibold text-yellow-300">{reviewCount.toLocaleString()}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Database size={14} /> Sources</div>
            <p className="text-2xl font-semibold text-yellow-300">{sourceCount}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Sparkles size={14} /> Insight Categories</div>
            <p className="text-2xl font-semibold text-yellow-300">{categoryCount}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Server size={14} /> API Services</div>
            <p className="text-2xl font-semibold text-yellow-300">FastAPI + Next.js</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a href="https://github.com" target="_blank" rel="noreferrer" className="rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 px-4 py-3 text-center text-sm font-bold text-purple-950 shadow-lg shadow-orange-500/20 transition-colors hover:bg-yellow-200">
          View Project Repository
        </a>
        <a href="/" className="rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 px-4 py-3 text-center text-sm font-bold text-purple-950 shadow-lg shadow-orange-500/20 transition-colors hover:bg-yellow-200">
          Return to Dashboard Overview
        </a>
      </section>
    </div>
  );
}
