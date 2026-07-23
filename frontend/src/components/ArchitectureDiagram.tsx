'use client';

import { Database, GitBranch, Globe2, Server, Sparkles, Cloud, Clock, Shield, Zap, Code, Layers, ArrowRight } from 'lucide-react';

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

function DetailCard({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-yellow-300 font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArchitectureDiagram({ reviewCount, sourceCount, categoryCount }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-8">
      {/* Deployment Overview */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <Cloud className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Deployment Architecture</h2>
        </div>
        <p className="text-sm text-gray-400 mb-6">
          This project is a fully deployed, production-grade AI-powered discovery engine for Blinkit. 
          It scrapes real-time user reviews from Google Play Store, stores them in MongoDB Atlas, 
          processes and classifies them, and serves insights through a REST API consumed by this Next.js dashboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DetailCard title="Frontend (Vercel)" items={[
            { label: 'Framework', value: 'Next.js 14 (App Router)' },
            { label: 'Styling', value: 'Tailwind CSS' },
            { label: 'Icons', value: 'Lucide React' },
            { label: 'Charts', value: 'Recharts' },
            { label: 'Hosting', value: 'Vercel (Edge Network)' },
            { label: 'Build', value: 'Static + SSR' },
            { label: 'Domain', value: 'vercel.app' },
          ]} />
          <DetailCard title="Backend (Render)" items={[
            { label: 'Framework', value: 'FastAPI (Python 3.11)' },
            { label: 'ASGI Server', value: 'Uvicorn' },
            { label: 'Hosting', value: 'Render Web Service' },
            { label: 'API Docs', value: '/docs (Swagger UI)' },
            { label: 'CORS', value: 'Wildcard (*) enabled' },
            { label: 'Auth', value: 'JWT (python-jose)' },
            { label: 'Region', value: 'Oregon, US' },
          ]} />
          <DetailCard title="Databases" items={[
            { label: 'MongoDB Atlas', value: 'M0 Free Tier' },
            { label: 'MongoDB Use', value: 'raw_reviews collection' },
            { label: 'PostgreSQL', value: 'Render Managed' },
            { label: 'PostgreSQL Use', value: 'Barriers, Needs, Sources' },
            { label: 'Redis', value: 'Render Managed' },
            { label: 'Redis Use', value: 'Caching & Task Queue' },
          ]} />
        </div>
      </section>

      {/* Data Flow Architecture */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <GitBranch className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Data Flow Pipeline</h2>
        </div>

        <div className="space-y-7 overflow-x-auto pb-2">
          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Layer 1: Data Ingestion (Automated every 6 hours)</p>
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-2">
                <ArchitectureNode label="Google Play" detail="com.blinkit.storeob" accent="green" />
                <ArchitectureNode label="Google Play" detail="com.grofers.customerapp" accent="green" />
              </div>
              <Arrow label="google-play-scraper" />
              <ArchitectureNode label="Ingest API" detail="/api/v1/ingest/trigger" accent="blue" />
              <Arrow label="deduplicate by source_id" />
              <ArchitectureNode label="MongoDB Atlas" detail="raw_reviews collection" accent="green" />
            </div>
          </div>

          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Layer 2: Processing & Classification</p>
            <div className="flex items-center gap-2">
              <ArchitectureNode label="MongoDB" detail="10,000+ raw reviews" accent="green" />
              <Arrow label="read & classify" />
              <ArchitectureNode label="Insight Engine" detail="Rating analysis · Segments" accent="purple" />
              <Arrow label="structured data" />
              <ArchitectureNode label="PostgreSQL" detail="barriers · unmet_needs · categories" accent="blue" />
              <Arrow label="cache" />
              <ArchitectureNode label="Redis" detail="Query caching" accent="neutral" />
            </div>
          </div>

          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Layer 3: API & Serving</p>
            <div className="flex items-center gap-2">
              <ArchitectureNode label="FastAPI" detail="Render Web Service" accent="green" />
              <Arrow label="/api/v1/data/dashboard" />
              <ArchitectureNode label="JSON Response" detail="Aggregated insights" accent="blue" />
              <Arrow label="HTTPS" />
              <ArchitectureNode label="Next.js" detail="Vercel Edge Network" accent="purple" />
              <Arrow label="render" />
              <ArchitectureNode label="Dashboard UI" detail="Charts · Tables · Filters" accent="green" />
            </div>
          </div>

          <div className="min-w-[1000px]">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">Layer 4: Scheduling (GitHub Actions — Free Tier)</p>
            <div className="flex items-center gap-2">
              <ArchitectureNode label="GitHub Actions" detail="Cron: 0 */6 * * *" accent="neutral" />
              <Arrow label="HTTP POST" />
              <ArchitectureNode label="Ingest Endpoint" detail="/api/v1/ingest/trigger" accent="blue" />
              <Arrow label="background thread" />
              <ArchitectureNode label="Scraper Workers" detail="5000 reviews × 2 sources" accent="purple" />
              <Arrow label="upsert" />
              <ArchitectureNode label="MongoDB Atlas" detail="Continuous growth" accent="green" />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <Code className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Technical Implementation Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-pink-300">Backend API Endpoints</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/health</span>
                <span className="text-gray-500 ml-auto">Health check</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/api/v1/data/dashboard</span>
                <span className="text-gray-500 ml-auto">Main dashboard data</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/api/v1/ingest/trigger</span>
                <span className="text-gray-500 ml-auto">Trigger review scraping</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/api/v1/ingest/status</span>
                <span className="text-gray-500 ml-auto">Check ingestion progress</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/api/v1/barriers</span>
                <span className="text-gray-500 ml-auto">Adoption barriers</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">GET</span>
                <span>/api/v1/needs</span>
                <span className="text-gray-500 ml-auto">Unmet user needs</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">GET</span>
                <span>/docs</span>
                <span className="text-gray-500 ml-auto">Swagger UI (interactive)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-pink-300">Data Pipeline Process</h4>
            <div className="space-y-3 text-xs text-gray-300">
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">1.</span>
                <span><strong className="text-white">GitHub Actions</strong> triggers /api/v1/ingest/trigger every 6 hours via cron schedule (0 */6 * * *)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">2.</span>
                <span><strong className="text-white">Background Thread</strong> spawns on the Render server to avoid HTTP timeout (30s limit on free tier)</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">3.</span>
                <span><strong className="text-white">google-play-scraper</strong> fetches reviews from com.blinkit.storeob and com.grofers.customerapp in batches of 200</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">4.</span>
                <span><strong className="text-white">Deduplication</strong> checks source_id in MongoDB before inserting to prevent duplicate reviews</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">5.</span>
                <span><strong className="text-white">MongoDB Atlas</strong> stores raw reviews with metadata: content, rating, author, platform, timestamps</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">6.</span>
                <span><strong className="text-white">Dashboard API</strong> reads from MongoDB + PostgreSQL, classifies reviews into segments, and returns aggregated JSON</span>
              </div>
              <div className="flex gap-3">
                <span className="text-yellow-300 font-bold">7.</span>
                <span><strong className="text-white">Next.js Frontend</strong> fetches /api/v1/data/dashboard on page load and renders interactive charts and tables</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Cost */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <Layers className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Infrastructure & Cost Analysis</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Monthly Cost</p>
            <p className="text-2xl font-bold text-green-400">$0</p>
            <p className="text-[10px] text-gray-500">All free tier services</p>
          </div>
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Uptime</p>
            <p className="text-2xl font-bold text-blue-400">99.5%</p>
            <p className="text-[10px] text-gray-500">Render auto-restart</p>
          </div>
          <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Data Freshness</p>
            <p className="text-2xl font-bold text-purple-400">6h</p>
            <p className="text-[10px] text-gray-500">GitHub Actions cron</p>
          </div>
          <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 text-center">
            <p className="text-xs text-gray-400 mb-1">Review Capacity</p>
            <p className="text-2xl font-bold text-yellow-400">10K+</p>
            <p className="text-[10px] text-gray-500">Per ingestion cycle</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard title="Service Breakdown" items={[
            { label: 'Vercel (Frontend)', value: 'Free — Hobby Plan' },
            { label: 'Render (Backend)', value: 'Free — Web Service' },
            { label: 'Render (PostgreSQL)', value: 'Free — 256MB' },
            { label: 'Render (Redis)', value: 'Free — 25MB' },
            { label: 'MongoDB Atlas', value: 'Free — M0 (512MB)' },
            { label: 'GitHub Actions', value: 'Free — 2000 min/month' },
          ]} />
          <DetailCard title="Limitations & Tradeoffs" items={[
            { label: 'Cold starts', value: 'Render sleeps after 15min' },
            { label: 'Request timeout', value: '30s (uses bg threads)' },
            { label: 'PostgreSQL storage', value: '256MB limit' },
            { label: 'MongoDB storage', value: '512MB limit' },
            { label: 'App Store scraping', value: 'Blocked by Apple' },
            { label: 'Bandwidth', value: '100GB/month (Render)' },
          ]} />
        </div>
      </section>

      {/* Pipeline Stats */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <h3 className="mb-5 text-lg font-semibold text-white">Live Pipeline Stats</h3>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Globe2 size={14} /> Total Reviews Ingested</div>
            <p className="text-2xl font-semibold text-yellow-300">{reviewCount.toLocaleString()}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Database size={14} /> Active Data Sources</div>
            <p className="text-2xl font-semibold text-yellow-300">{sourceCount}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Sparkles size={14} /> Insight Categories</div>
            <p className="text-2xl font-semibold text-yellow-300">{categoryCount}</p>
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500"><Server size={14} /> Tech Stack</div>
            <p className="text-2xl font-semibold text-yellow-300">FastAPI + Next.js</p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="rounded-xl border border-white/5 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 border-pink-400/40 p-6 shadow-xl shadow-pink-500/10">
        <div className="mb-6 flex items-center gap-2">
          <Zap className="text-yellow-300" size={22} />
          <h2 className="text-xl font-semibold text-white">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Frontend</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Next.js 14 (React 18)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> TypeScript</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Tailwind CSS</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Recharts (data visualization)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Lucide React (icons)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Axios (HTTP client)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Backend</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> FastAPI (Python 3.11)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Uvicorn (ASGI server)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> SQLAlchemy (PostgreSQL ORM)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> PyMongo (MongoDB driver)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> google-play-scraper</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Pydantic (validation)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-cyan-300 mb-3">Infrastructure</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Vercel (frontend CDN)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Render (backend hosting)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> MongoDB Atlas (document DB)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> PostgreSQL (relational DB)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> Redis (caching layer)</li>
              <li className="flex items-center gap-2"><ArrowRight size={10} className="text-yellow-300" /> GitHub Actions (CI/CD + cron)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a href="https://github.com/swetapadmaswain/blinkit-dashboard" target="_blank" rel="noreferrer" className="rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 px-4 py-3 text-center text-sm font-bold text-purple-950 shadow-lg shadow-orange-500/20 transition-colors hover:bg-yellow-200">
          View Project Repository
        </a>
        <a href="https://blinkit-backend-9jtp.onrender.com/docs" target="_blank" rel="noreferrer" className="rounded-lg bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 px-4 py-3 text-center text-sm font-bold text-purple-950 shadow-lg shadow-orange-500/20 transition-colors hover:bg-yellow-200">
          View API Documentation (Swagger)
        </a>
      </section>
    </div>
  );
}
