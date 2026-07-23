'use client';

import { Database, GitBranch, Globe2, Server, Sparkles, Cloud, Clock, Shield, Zap, Code, Layers, ArrowRight, AlertTriangle, CheckCircle, FileText, FolderTree, Lock, Cpu, HardDrive, Wifi, BarChart3, Eye, Terminal } from 'lucide-react';

interface ArchitectureDiagramProps {
  reviewCount: number;
  sourceCount: number;
  categoryCount: number;
}

interface NodeProps {
  label: string;
  detail?: string;
  accent?: 'green' | 'blue' | 'purple' | 'neutral' | 'red' | 'cyan';
}

const accentClasses: Record<string, string> = {
  green: 'border-emerald-400/60 bg-emerald-400/15 text-emerald-200',
  blue: 'border-blue-400/60 bg-blue-500/20 text-cyan-200',
  purple: 'border-violet-400/60 bg-violet-500/20 text-violet-200',
  neutral: 'border-orange-400/50 bg-orange-500/15 text-orange-100',
  red: 'border-rose-400/60 bg-rose-500/15 text-rose-200',
  cyan: 'border-cyan-400/60 bg-cyan-500/15 text-cyan-200',
};

function ArchNode({ label, detail, accent = 'neutral' }: NodeProps) {
  return (
    <div className={`min-w-[120px] rounded-xl border-2 px-3 py-2.5 text-center shadow-lg backdrop-blur-sm ${accentClasses[accent]}`}>
      <p className="text-[11px] font-bold">{label}</p>
      {detail && <p className="mt-1 text-[9px] opacity-70">{detail}</p>}
    </div>
  );
}

function FlowArrow({ label }: { label?: string }) {
  return (
    <div className="flex min-w-10 flex-1 flex-col items-center justify-center">
      {label && <span className="mb-1 text-[9px] text-yellow-300 font-medium whitespace-nowrap">{label}</span>}
      <div className="relative h-0.5 w-full bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 rounded-full after:absolute after:-right-1 after:-top-[3px] after:border-b-4 after:border-l-6 after:border-t-4 after:border-b-transparent after:border-l-pink-400 after:border-t-transparent" />
    </div>
  );
}

function InfoCard({ title, items, icon, gradient }: { title: string; items: { label: string; value: string }[]; icon?: React.ReactNode; gradient?: string }) {
  return (
    <div className={`rounded-xl border border-white/10 p-4 ${gradient || 'bg-white/5'}`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs gap-2">
            <span className="text-gray-400">{item.label}</span>
            <span className="text-yellow-300 font-semibold text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-gradient-to-br from-[#211a52]/95 via-[#1a1d4c]/95 to-[#381542]/95 p-6 shadow-2xl ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      {subtitle && <p className="text-xs text-gray-400 ml-12">{subtitle}</p>}
    </div>
  );
}

export default function ArchitectureDiagram({ reviewCount, sourceCount, categoryCount }: ArchitectureDiagramProps) {
  return (
    <div className="space-y-6">

      {/* ===== SECTION 1: SYSTEM OVERVIEW DIAGRAM ===== */}
      <SectionCard className="border-cyan-400/30">
        <SectionHeader icon={<Cloud className="text-cyan-300" size={20} />} title="Production System Overview" subtitle="Complete deployed architecture — all services running on free tier ($0/month)" />

        {/* Visual System Diagram */}
        <div className="relative rounded-xl border border-cyan-500/20 bg-black/30 p-6 mb-6 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(56,189,248,0.05),transparent_50%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
            {/* Data Sources */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-3">Data Sources</p>
              <div className="space-y-2">
                <div className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 p-3 text-center">
                  <p className="text-[10px] font-bold text-emerald-300">Google Play</p>
                  <p className="text-[8px] text-emerald-400/70 mt-0.5">com.blinkit.storeob</p>
                </div>
                <div className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 p-3 text-center">
                  <p className="text-[10px] font-bold text-emerald-300">Google Play</p>
                  <p className="text-[8px] text-emerald-400/70 mt-0.5">com.grofers.customerapp</p>
                </div>
                <div className="rounded-lg border-2 border-gray-600/40 bg-gray-700/20 p-3 text-center opacity-50">
                  <p className="text-[10px] font-bold text-gray-400">App Store</p>
                  <p className="text-[8px] text-gray-500 mt-0.5">ID: 1466967163 (blocked)</p>
                </div>
              </div>
            </div>

            {/* Scheduler */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-3">Scheduler</p>
              <div className="rounded-lg border-2 border-orange-500/40 bg-orange-500/10 p-3 text-center">
                <p className="text-[10px] font-bold text-orange-300">GitHub Actions</p>
                <p className="text-[8px] text-orange-400/70 mt-0.5">Cron: 0 */6 * * *</p>
                <p className="text-[8px] text-orange-400/70">+ Manual Dispatch</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-0.5 h-6 bg-gradient-to-b from-orange-400 to-blue-400 rounded-full" />
              </div>
              <div className="rounded-lg border-2 border-orange-500/30 bg-orange-500/5 p-2 text-center">
                <p className="text-[8px] text-orange-300/80 font-mono">curl -X POST</p>
                <p className="text-[8px] text-orange-300/80 font-mono">/api/v1/ingest/trigger</p>
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">Backend (Render)</p>
              <div className="rounded-lg border-2 border-blue-500/50 bg-blue-500/10 p-3">
                <p className="text-[10px] font-bold text-blue-300 text-center">FastAPI</p>
                <p className="text-[8px] text-blue-400/70 text-center">Python 3.11.9 + Uvicorn</p>
                <div className="mt-2 space-y-1">
                  <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[7px] text-blue-300 font-mono">/api/v1/data/dashboard</div>
                  <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[7px] text-blue-300 font-mono">/api/v1/ingest/trigger</div>
                  <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[7px] text-blue-300 font-mono">/api/v1/ingest/status</div>
                  <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[7px] text-blue-300 font-mono">/api/v1/barriers</div>
                  <div className="rounded bg-blue-500/10 px-2 py-0.5 text-[7px] text-blue-300 font-mono">/api/v1/needs</div>
                </div>
              </div>
              <p className="text-[8px] text-gray-500 text-center">blinkit-backend-9jtp.onrender.com</p>
            </div>

            {/* Databases */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-3">Databases</p>
              <div className="space-y-2">
                <div className="rounded-lg border-2 border-emerald-500/40 bg-emerald-500/10 p-2.5 text-center">
                  <p className="text-[10px] font-bold text-emerald-300">MongoDB Atlas</p>
                  <p className="text-[8px] text-emerald-400/70">M0 Free (512MB)</p>
                  <p className="text-[8px] text-emerald-400/70">raw_reviews collection</p>
                </div>
                <div className="rounded-lg border-2 border-blue-500/40 bg-blue-500/10 p-2.5 text-center">
                  <p className="text-[10px] font-bold text-blue-300">PostgreSQL</p>
                  <p className="text-[8px] text-blue-400/70">Render Managed (256MB)</p>
                  <p className="text-[8px] text-blue-400/70">barriers, needs, sources</p>
                </div>
                <div className="rounded-lg border-2 border-orange-500/30 bg-orange-500/5 p-2.5 text-center">
                  <p className="text-[10px] font-bold text-orange-300">Redis</p>
                  <p className="text-[8px] text-orange-400/70">Render Managed (25MB)</p>
                </div>
              </div>
            </div>

            {/* Frontend */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold text-pink-400 uppercase tracking-widest mb-3">Frontend (Vercel)</p>
              <div className="rounded-lg border-2 border-pink-500/40 bg-pink-500/10 p-3 text-center">
                <p className="text-[10px] font-bold text-pink-300">Next.js 14</p>
                <p className="text-[8px] text-pink-400/70">React 18 + TypeScript</p>
                <p className="text-[8px] text-pink-400/70">TailwindCSS + Recharts</p>
              </div>
              <div className="rounded-lg border-2 border-pink-500/30 bg-pink-500/5 p-2 text-center">
                <p className="text-[8px] text-pink-300/80">8 Dashboard Tabs</p>
                <p className="text-[7px] text-pink-400/60 mt-1">Overview | Behavioral | Barriers | Needs | Segments | Discovery | Insights | Architecture</p>
              </div>
              <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-2 text-center">
                <p className="text-[8px] text-pink-300/70">API Proxy via next.config.js</p>
                <p className="text-[7px] text-pink-400/50 font-mono mt-0.5">/api/* → Render backend</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 2: DATA FLOW PIPELINE ===== */}
      <SectionCard className="border-emerald-400/20">
        <SectionHeader icon={<GitBranch className="text-emerald-300" size={20} />} title="Data Flow Pipeline" subtitle="4-layer architecture from scraping to rendering" />

        <div className="space-y-6 overflow-x-auto pb-2">
          {[
            { layer: 'Layer 1', title: 'Data Ingestion', subtitle: 'Automated every 6 hours via GitHub Actions', color: 'emerald', nodes: [
              { items: [{ label: 'Google Play', detail: 'com.blinkit.storeob' }, { label: 'Google Play', detail: 'com.grofers.customerapp' }], grid: true },
              { arrow: 'google-play-scraper' },
              { label: 'Ingest API', detail: '/api/v1/ingest/trigger', accent: 'blue' as const },
              { arrow: 'dedup by source_id' },
              { label: 'MongoDB Atlas', detail: 'raw_reviews collection', accent: 'green' as const },
            ]},
            { layer: 'Layer 2', title: 'Processing & Classification', subtitle: 'Real-time on each /dashboard request', color: 'violet', nodes: [
              { label: 'MongoDB', detail: `${reviewCount.toLocaleString()} raw reviews`, accent: 'green' as const },
              { arrow: 'sample & classify' },
              { label: 'NLP Engine', detail: 'Keyword-based rules', accent: 'purple' as const },
              { arrow: 'segments + frustrations' },
              { label: 'PostgreSQL', detail: 'barriers, needs, categories', accent: 'blue' as const },
              { arrow: 'aggregation' },
              { label: 'JSON Builder', detail: 'Complete metrics', accent: 'cyan' as const },
            ]},
            { layer: 'Layer 3', title: 'API & Serving', subtitle: 'FastAPI → Vercel proxy → Browser', color: 'blue', nodes: [
              { label: 'FastAPI', detail: 'Render Web Service', accent: 'blue' as const },
              { arrow: '/api/v1/data/dashboard' },
              { label: 'JSON Response', detail: 'All metrics computed', accent: 'cyan' as const },
              { arrow: 'Vercel rewrite proxy' },
              { label: 'Next.js 14', detail: 'Vercel Edge CDN', accent: 'purple' as const },
              { arrow: 'React render' },
              { label: 'Dashboard UI', detail: '8 tabs, 12+ charts', accent: 'green' as const },
            ]},
            { layer: 'Layer 4', title: 'Scheduling & CI/CD', subtitle: 'GitHub Actions cron + auto-deploy on git push', color: 'orange', nodes: [
              { label: 'GitHub Actions', detail: 'Cron: 0 */6 * * *', accent: 'neutral' as const },
              { arrow: 'HTTP POST' },
              { label: 'Ingest Endpoint', detail: 'Background thread', accent: 'blue' as const },
              { arrow: 'batch 200/req' },
              { label: 'Scrapers', detail: '5000 × 2 sources', accent: 'purple' as const },
              { arrow: 'upsert' },
              { label: 'MongoDB Atlas', detail: 'Grows continuously', accent: 'green' as const },
            ]},
          ].map((layer, li) => (
            <div key={li} className="min-w-[900px]">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-black uppercase tracking-widest text-${layer.color}-400`}>{layer.layer}:</span>
                <span className="text-xs font-semibold text-white">{layer.title}</span>
                <span className="text-[10px] text-gray-500">— {layer.subtitle}</span>
              </div>
              <div className="flex items-center gap-2">
                {layer.nodes.map((node: any, ni: number) => {
                  if (node.arrow) return <FlowArrow key={ni} label={node.arrow} />;
                  if (node.grid) return (
                    <div key={ni} className="grid grid-cols-2 gap-1.5">
                      {node.items.map((item: any, ii: number) => <ArchNode key={ii} label={item.label} detail={item.detail} accent="green" />)}
                    </div>
                  );
                  return <ArchNode key={ni} label={node.label} detail={node.detail} accent={node.accent} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ===== SECTION 3: REAL-TIME COMPUTATION PIPELINE ===== */}
      <SectionCard className="border-violet-400/20">
        <SectionHeader icon={<Cpu className="text-violet-300" size={20} />} title="Real-Time Computation Pipeline" subtitle="12-step process executed on every /dashboard API call" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {[
            { step: '1', text: 'Count total reviews in MongoDB', result: 'total_reviews', color: 'emerald' },
            { step: '2', text: 'Aggregate reviews by platform', result: 'platform_distribution', color: 'blue' },
            { step: '3', text: 'Aggregate reviews by rating (1-5)', result: 'rating_distribution', color: 'violet' },
            { step: '4', text: 'Sample up to 5000 reviews for NLP', result: 'review_sample', color: 'orange' },
            { step: '5', text: 'Classify each review into user segment', result: 'segment_counts', color: 'cyan' },
            { step: '6', text: 'Classify each review for frustrations', result: 'frustration_counts', color: 'pink' },
            { step: '7', text: 'Compute segment percentages', result: 'user_segments (high/med/low)', color: 'emerald' },
            { step: '8', text: 'Rank frustrations by frequency', result: 'top_frustrations', color: 'rose' },
            { step: '9', text: 'Compute avg rating via $avg', result: 'avg_rating', color: 'yellow' },
            { step: '10', text: 'Aggregate daily counts (30 days)', result: 'time_series', color: 'blue' },
            { step: '11', text: 'Compare 7d vs prev 7d reviews', result: 'review_trend_pct', color: 'violet' },
            { step: '12', text: 'Query PostgreSQL for structured data', result: 'barriers, needs, sources', color: 'emerald' },
          ].map((item, i) => (
            <div key={i} className={`rounded-lg border border-${item.color}-500/20 bg-${item.color}-500/5 p-3`}>
              <div className="flex items-start gap-2">
                <span className={`flex-shrink-0 w-5 h-5 rounded-full bg-${item.color}-500/30 text-${item.color}-300 text-[10px] font-black flex items-center justify-center`}>{item.step}</span>
                <div>
                  <p className="text-[11px] text-gray-300">{item.text}</p>
                  <p className="text-[9px] text-yellow-400 font-mono mt-1">{item.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Classification Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-cyan-500/20 bg-black/20 p-4">
            <h4 className="text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2"><Eye size={14} /> Segment Classification Rules</h4>
            <div className="space-y-2">
              {[
                { segment: 'delivery_focused', keywords: 'delivery, rider, late, 10-minute', color: 'emerald' },
                { segment: 'value_seeker', keywords: 'price, coupon, discount, cost, offer', color: 'yellow' },
                { segment: 'app_first', keywords: 'app, payment, checkout, crash, gateway', color: 'blue' },
                { segment: 'grocery_planner', keywords: 'stock, grocery, vegetable, fresh, packaging', color: 'violet' },
                { segment: 'general_shopper', keywords: '(default — no keywords match)', color: 'gray' },
              ].map((seg, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className={`w-2 h-2 rounded-full bg-${seg.color}-400`} />
                  <span className="text-white font-semibold w-32">{seg.segment}</span>
                  <span className="text-gray-500 font-mono">{seg.keywords}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-rose-500/20 bg-black/20 p-4">
            <h4 className="text-sm font-bold text-rose-300 mb-3 flex items-center gap-2"><AlertTriangle size={14} /> Frustration Classification Rules</h4>
            <div className="space-y-2">
              {[
                { frustration: 'delivery_delay', keywords: 'delivery took, late, slow delivery, rider', color: 'rose' },
                { frustration: 'stock_availability', keywords: 'out of stock, unavailable, not available', color: 'orange' },
                { frustration: 'order_accuracy', keywords: 'missing item, wrong item, wrong order', color: 'yellow' },
                { frustration: 'app_or_payment', keywords: 'app crash, payment, gateway, checkout', color: 'blue' },
                { frustration: 'customer_support', keywords: 'customer care, support, resolve my issue', color: 'violet' },
                { frustration: 'pricing_or_coupon', keywords: 'price, coupon, discount, expensive', color: 'emerald' },
                { frustration: 'product_quality', keywords: 'quality, fresh, packaging, damaged', color: 'cyan' },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <span className={`w-2 h-2 rounded-full bg-${f.color}-400`} />
                  <span className="text-white font-semibold w-32">{f.frustration}</span>
                  <span className="text-gray-500 font-mono">{f.keywords}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 4: API ENDPOINTS ===== */}
      <SectionCard className="border-blue-400/20">
        <SectionHeader icon={<Terminal className="text-blue-300" size={20} />} title="Backend API Endpoints" subtitle="FastAPI routes powering the dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {[
              { method: 'GET', path: '/', desc: 'Root — version info', badge: 'green' },
              { method: 'GET', path: '/health', desc: 'Health probe', badge: 'green' },
              { method: 'GET', path: '/api/v1/data/dashboard', desc: 'Main dashboard data (all metrics)', badge: 'cyan' },
              { method: 'GET', path: '/api/v1/data/stats', desc: 'Quick review count stats', badge: 'green' },
            ].map((ep, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${ep.badge}-500/20 text-${ep.badge}-300`}>{ep.method}</span>
                <span className="text-[11px] font-mono text-gray-300">{ep.path}</span>
                <span className="text-[10px] text-gray-500 ml-auto">{ep.desc}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { method: 'GET/POST', path: '/api/v1/ingest/trigger', desc: 'Start background ingestion', badge: 'orange' },
              { method: 'GET', path: '/api/v1/ingest/status', desc: 'Review count by platform', badge: 'green' },
              { method: 'GET', path: '/api/v1/barriers/', desc: 'List adoption barriers', badge: 'green' },
              { method: 'GET', path: '/api/v1/needs/', desc: 'List unmet needs', badge: 'green' },
              { method: 'GET', path: '/docs', desc: 'Swagger UI (interactive)', badge: 'blue' },
            ].map((ep, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-${ep.badge}-500/20 text-${ep.badge}-300 whitespace-nowrap`}>{ep.method}</span>
                <span className="text-[11px] font-mono text-gray-300">{ep.path}</span>
                <span className="text-[10px] text-gray-500 ml-auto">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 5: DATABASE SCHEMA ===== */}
      <SectionCard className="border-emerald-400/20">
        <SectionHeader icon={<Database className="text-emerald-300" size={20} />} title="Database Schema & Storage" subtitle="MongoDB Atlas + PostgreSQL + Redis" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* MongoDB */}
          <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-4">
            <h4 className="text-sm font-bold text-emerald-300 mb-1">MongoDB Atlas</h4>
            <p className="text-[9px] text-gray-500 mb-3">cluster0.t9ajn7r.mongodb.net &middot; M0 Free (512MB)</p>
            <p className="text-[10px] font-bold text-white mb-2">Collection: raw_reviews</p>
            <div className="space-y-1 text-[9px] font-mono text-gray-400 bg-black/30 rounded-lg p-3">
              <p><span className="text-emerald-300">_id</span>: ObjectId</p>
              <p><span className="text-emerald-300">source</span>: &quot;blinkit_google_play&quot;</p>
              <p><span className="text-emerald-300">source_id</span>: &quot;gp_abc123&quot; <span className="text-yellow-400/60">(dedup key)</span></p>
              <p><span className="text-emerald-300">content</span>: String</p>
              <p><span className="text-emerald-300">rating</span>: Number (1-5)</p>
              <p><span className="text-emerald-300">author</span>: String</p>
              <p><span className="text-emerald-300">platform</span>: &quot;google_play&quot;</p>
              <p><span className="text-emerald-300">metadata</span>: {'{'} review_id, thumbs_up_count, at {'}'}</p>
              <p><span className="text-emerald-300">created_at</span>: ISODate</p>
              <p><span className="text-emerald-300">ingested_at</span>: ISODate</p>
            </div>
            <p className="text-[9px] text-gray-500 mt-2">Indexes: source_id, created_at, platform, rating</p>
          </div>

          {/* PostgreSQL */}
          <div className="rounded-xl border-2 border-blue-500/30 bg-blue-500/5 p-4">
            <h4 className="text-sm font-bold text-blue-300 mb-1">PostgreSQL</h4>
            <p className="text-[9px] text-gray-500 mb-3">Render Managed &middot; Free (256MB, 90-day)</p>
            {[
              { table: 'data_sources', cols: 'id, name, type, sync_status', rows: '3 rows' },
              { table: 'categories', cols: 'id, name, description', rows: '4 rows' },
              { table: 'barriers', cols: 'id, type, description, severity_score, platform', rows: '5 rows' },
              { table: 'unmet_needs', cols: 'id, description, category, priority_score', rows: '5 rows' },
            ].map((t, i) => (
              <div key={i} className="mb-2 bg-black/30 rounded-lg p-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-300">{t.table}</span>
                  <span className="text-[8px] text-gray-500">{t.rows}</span>
                </div>
                <p className="text-[8px] text-gray-500 font-mono">{t.cols}</p>
              </div>
            ))}
            <p className="text-[9px] text-gray-500 mt-1">Initialized via init_db.py on every deploy</p>
          </div>

          {/* Redis */}
          <div className="rounded-xl border-2 border-orange-500/30 bg-orange-500/5 p-4">
            <h4 className="text-sm font-bold text-orange-300 mb-1">Redis</h4>
            <p className="text-[9px] text-gray-500 mb-3">Render Managed &middot; Free (25MB)</p>
            <div className="bg-black/30 rounded-lg p-3 text-center">
              <p className="text-[11px] text-orange-300 font-semibold">Currently Available</p>
              <p className="text-[9px] text-gray-500 mt-1">Reserved for future caching</p>
              <p className="text-[9px] text-gray-500">& rate limiting</p>
            </div>
            <div className="mt-3 space-y-1 text-[9px] text-gray-500">
              <p>Planned: 5-min TTL cache for /dashboard</p>
              <p>Planned: Rate limiting per IP</p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 6: INFRASTRUCTURE & COST ===== */}
      <SectionCard className="border-yellow-400/20">
        <SectionHeader icon={<Layers className="text-yellow-300" size={20} />} title="Infrastructure & Cost Analysis" subtitle="Complete cost breakdown — $0/month total" />

        {/* Big Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
          {[
            { label: 'Monthly Cost', value: '$0', sub: 'All free tier', color: 'emerald', border: 'emerald' },
            { label: 'Reviews', value: reviewCount.toLocaleString(), sub: 'In database', color: 'yellow', border: 'yellow' },
            { label: 'Data Sources', value: String(sourceCount), sub: 'Active feeds', color: 'blue', border: 'blue' },
            { label: 'Categories', value: String(categoryCount), sub: 'Insight types', color: 'violet', border: 'violet' },
            { label: 'Freshness', value: '6h', sub: 'Cron interval', color: 'cyan', border: 'cyan' },
            { label: 'Cold Start', value: '~30s', sub: 'Render free tier', color: 'orange', border: 'orange' },
          ].map((s, i) => (
            <div key={i} className={`rounded-xl border-2 border-${s.border}-500/30 bg-${s.border}-500/10 p-3 text-center`}>
              <p className="text-[10px] text-gray-400 mb-0.5">{s.label}</p>
              <p className={`text-xl font-black text-${s.color}-400`}>{s.value}</p>
              <p className="text-[9px] text-gray-500">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Cost Table + Limitations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InfoCard icon={<CheckCircle size={14} className="text-emerald-400" />} title="Service Cost Breakdown" items={[
            { label: 'Vercel (Frontend)', value: 'Free — Hobby Plan' },
            { label: 'Render (Backend)', value: 'Free — 750 hrs/month' },
            { label: 'Render (PostgreSQL)', value: 'Free — 256MB' },
            { label: 'Render (Redis)', value: 'Free — 25MB' },
            { label: 'MongoDB Atlas', value: 'Free — M0 (512MB)' },
            { label: 'GitHub Actions', value: 'Free — 2000 min/month' },
            { label: 'TOTAL', value: '$0/month' },
          ]} gradient="bg-emerald-500/5" />
          <InfoCard icon={<AlertTriangle size={14} className="text-orange-400" />} title="Limitations & Known Issues" items={[
            { label: 'Render cold start', value: 'Spins down after 15min idle' },
            { label: 'Request timeout', value: '30s (bg threads mitigate)' },
            { label: 'PostgreSQL expiry', value: '90-day free limit' },
            { label: 'MongoDB capacity', value: '512MB (~200K reviews)' },
            { label: 'App Store scraper', value: 'Blocked by Apple API' },
            { label: 'Classification', value: 'Keyword rules (not ML)' },
          ]} gradient="bg-orange-500/5" />
        </div>

        {/* Performance */}
        <InfoCard icon={<Zap size={14} className="text-cyan-400" />} title="Performance Characteristics" items={[
          { label: 'Backend cold start', value: '~30s (Render free tier spin-up)' },
          { label: 'Dashboard API response', value: '~2-5s (Mongo query + classification)' },
          { label: 'Frontend TTFB', value: '<100ms (Vercel Edge CDN)' },
          { label: 'Ingestion throughput', value: '~100 reviews/min (Google Play API)' },
          { label: 'Max reviews per run', value: '10,200 (5000+5000+200)' },
          { label: 'Classification speed', value: '~5000 reviews in <1s (keyword match)' },
        ]} gradient="bg-cyan-500/5" />
      </SectionCard>

      {/* ===== SECTION 7: SECURITY ===== */}
      <SectionCard className="border-rose-400/20">
        <SectionHeader icon={<Shield className="text-rose-300" size={20} />} title="Security Measures" subtitle="Authentication, encryption, and network isolation" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { title: 'MongoDB Atlas', detail: 'IP whitelist + username/password auth via SRV connection string', icon: <Lock size={12} className="text-emerald-400" /> },
            { title: 'PostgreSQL', detail: 'Internal Render network only — not publicly exposed', icon: <Shield size={12} className="text-blue-400" /> },
            { title: 'Redis', detail: 'Internal Render network only — no public access', icon: <Shield size={12} className="text-orange-400" /> },
            { title: 'CORS', detail: 'Configured to allow * (suitable for public dashboard)', icon: <Wifi size={12} className="text-violet-400" /> },
            { title: 'HTTPS', detail: 'Enforced by both Vercel and Render (TLS everywhere)', icon: <Lock size={12} className="text-cyan-400" /> },
            { title: 'JWT Auth', detail: 'Secret auto-generated by Render (auth endpoints available)', icon: <Lock size={12} className="text-yellow-400" /> },
          ].map((sec, i) => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-2 mb-1">{sec.icon}<span className="text-[11px] font-bold text-white">{sec.title}</span></div>
              <p className="text-[10px] text-gray-400">{sec.detail}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ===== SECTION 8: TECHNOLOGY STACK ===== */}
      <SectionCard className="border-pink-400/20">
        <SectionHeader icon={<Zap className="text-pink-300" size={20} />} title="Complete Technology Stack" subtitle="All libraries and frameworks used in production" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="text-xs font-bold text-pink-300 uppercase tracking-wider mb-3">Frontend (13 packages)</h4>
            <div className="space-y-1.5">
              {[
                { name: 'Next.js', ver: '14.0.4', desc: 'React framework' },
                { name: 'React', ver: '18.2.0', desc: 'UI library' },
                { name: 'TypeScript', ver: '5.3.3', desc: 'Type safety' },
                { name: 'TailwindCSS', ver: '3.4.0', desc: 'Utility CSS' },
                { name: 'Recharts', ver: '2.10.3', desc: 'Charts' },
                { name: 'Lucide React', ver: '0.294.0', desc: 'Icons' },
                { name: 'Axios', ver: '1.6.2', desc: 'HTTP client' },
                { name: '@tanstack/react-query', ver: '5.12.2', desc: 'Data fetching' },
                { name: 'Zustand', ver: '4.4.7', desc: 'State management' },
                { name: 'Radix UI', ver: 'Multiple', desc: 'Primitives' },
              ].map((pkg, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <ArrowRight size={9} className="text-pink-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{pkg.name}</span>
                  <span className="text-pink-400/60 font-mono">{pkg.ver}</span>
                  <span className="text-gray-600 ml-auto">{pkg.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-3">Backend (24 packages)</h4>
            <div className="space-y-1.5">
              {[
                { name: 'FastAPI', ver: '0.104.0', desc: 'Web framework' },
                { name: 'Uvicorn', ver: '0.24.0', desc: 'ASGI server' },
                { name: 'PyMongo', ver: '4.6.0', desc: 'MongoDB driver' },
                { name: 'psycopg2', ver: '2.9.9', desc: 'PostgreSQL driver' },
                { name: 'SQLAlchemy', ver: '2.0.23', desc: 'ORM' },
                { name: 'Pydantic', ver: '2.5.3', desc: 'Validation' },
                { name: 'google-play-scraper', ver: '1.2.7', desc: 'Play Store' },
                { name: 'app-store-scraper', ver: '0.3.5', desc: 'App Store' },
                { name: 'Redis', ver: '5.0.1', desc: 'Cache client' },
                { name: 'python-jose', ver: '3.3.0', desc: 'JWT auth' },
              ].map((pkg, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <ArrowRight size={9} className="text-blue-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{pkg.name}</span>
                  <span className="text-blue-400/60 font-mono">{pkg.ver}</span>
                  <span className="text-gray-600 ml-auto">{pkg.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3">Infrastructure</h4>
            <div className="space-y-1.5">
              {[
                { name: 'Vercel', ver: 'Hobby', desc: 'Frontend CDN + SSR' },
                { name: 'Render', ver: 'Free', desc: 'Backend + DBs' },
                { name: 'MongoDB Atlas', ver: 'M0', desc: 'Document DB (512MB)' },
                { name: 'PostgreSQL', ver: '16', desc: 'Relational DB (256MB)' },
                { name: 'Redis', ver: '7', desc: 'Cache/Queue (25MB)' },
                { name: 'GitHub Actions', ver: 'Free', desc: 'CI/CD + Cron scheduler' },
                { name: 'Git', ver: 'main branch', desc: 'Version control' },
                { name: 'HTTPS/TLS', ver: 'Auto', desc: 'SSL by Vercel + Render' },
              ].map((pkg, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px]">
                  <ArrowRight size={9} className="text-emerald-400 flex-shrink-0" />
                  <span className="text-white font-semibold">{pkg.name}</span>
                  <span className="text-emerald-400/60 font-mono">{pkg.ver}</span>
                  <span className="text-gray-600 ml-auto">{pkg.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 9: REPOSITORY STRUCTURE ===== */}
      <SectionCard className="border-orange-400/20">
        <SectionHeader icon={<FolderTree className="text-orange-300" size={20} />} title="Repository Structure" subtitle="Complete file tree of the deployed project" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-orange-500/20 bg-black/20 p-4">
            <h4 className="text-[11px] font-bold text-orange-300 mb-3">Backend (Python)</h4>
            <div className="space-y-1 text-[9px] font-mono text-gray-400">
              <p className="text-orange-300">backend/</p>
              <p className="ml-3">app/</p>
              <p className="ml-6">main.py <span className="text-gray-600">- FastAPI entry point</span></p>
              <p className="ml-6">config.py <span className="text-gray-600">- Pydantic Settings</span></p>
              <p className="ml-6">database.py <span className="text-gray-600">- DB connections</span></p>
              <p className="ml-6">api/v1/</p>
              <p className="ml-9">data.py <span className="text-gray-600">- /dashboard + /stats</span></p>
              <p className="ml-9">ingest.py <span className="text-gray-600">- /trigger + /status</span></p>
              <p className="ml-9">barriers.py <span className="text-gray-600">- Barriers CRUD</span></p>
              <p className="ml-9">needs.py <span className="text-gray-600">- Unmet needs CRUD</span></p>
              <p className="ml-6">ingestors/</p>
              <p className="ml-9">google_play_reviews_scraper.py</p>
              <p className="ml-9">app_store_reviews_scraper.py</p>
              <p className="ml-3">init_db.py <span className="text-gray-600">- PostgreSQL schema</span></p>
              <p className="ml-3">build.sh <span className="text-gray-600">- Render build script</span></p>
              <p className="ml-3">requirements.txt <span className="text-gray-600">- 24 packages</span></p>
              <p className="ml-3">render.yaml <span className="text-gray-600">- IaC config</span></p>
            </div>
          </div>
          <div className="rounded-xl border border-pink-500/20 bg-black/20 p-4">
            <h4 className="text-[11px] font-bold text-pink-300 mb-3">Frontend (TypeScript)</h4>
            <div className="space-y-1 text-[9px] font-mono text-gray-400">
              <p className="text-pink-300">frontend/</p>
              <p className="ml-3">src/app/</p>
              <p className="ml-6">page.tsx <span className="text-gray-600">- Dashboard (900+ lines)</span></p>
              <p className="ml-6">layout.tsx <span className="text-gray-600">- Root layout</span></p>
              <p className="ml-6">globals.css <span className="text-gray-600">- Tailwind imports</span></p>
              <p className="ml-3">src/components/</p>
              <p className="ml-6">ArchitectureDiagram.tsx <span className="text-gray-600">- This view</span></p>
              <p className="ml-6">TimeSeriesChart.tsx <span className="text-gray-600">- Line chart</span></p>
              <p className="ml-6">HeatmapChart.tsx <span className="text-gray-600">- Heatmap</span></p>
              <p className="ml-6">ScatterPlot.tsx <span className="text-gray-600">- Scatter chart</span></p>
              <p className="ml-6">GroupedBarChart.tsx <span className="text-gray-600">- Bar chart</span></p>
              <p className="ml-6">RankedBarChart.tsx <span className="text-gray-600">- Ranked bars</span></p>
              <p className="ml-6">TrendAnalysis.tsx <span className="text-gray-600">- Trend table</span></p>
              <p className="ml-6">StatCard.tsx <span className="text-gray-600">- KPI cards</span></p>
              <p className="ml-6">Sidebar.tsx <span className="text-gray-600">- Navigation</span></p>
              <p className="ml-6">FilterPanel.tsx <span className="text-gray-600">- Filters</span></p>
              <p className="ml-3">next.config.js <span className="text-gray-600">- API proxy</span></p>
              <p className="ml-3">package.json <span className="text-gray-600">- Node deps</span></p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ===== SECTION 10: END-TO-END FLOW ===== */}
      <SectionCard className="border-cyan-400/20">
        <SectionHeader icon={<Wifi className="text-cyan-300" size={20} />} title="End-to-End Request Flow" subtitle="How data travels from app stores to your screen" />

        <div className="space-y-3">
          {[
            { step: 1, icon: <Clock size={14} />, title: 'GitHub Actions fires every 6 hours', detail: 'POST /api/v1/ingest/trigger', color: 'orange' },
            { step: 2, icon: <Server size={14} />, title: 'Render backend spawns background thread', detail: 'Avoids 30s HTTP timeout on free tier', color: 'blue' },
            { step: 3, icon: <Globe2 size={14} />, title: 'Scrapers fetch from Google Play (2 apps)', detail: 'com.blinkit.storeob + com.grofers.customerapp in batches of 200', color: 'emerald' },
            { step: 4, icon: <Database size={14} />, title: 'Reviews deduplicated and stored in MongoDB Atlas', detail: 'Checked by source_id before insert — prevents duplicates', color: 'emerald' },
            { step: 5, icon: <Eye size={14} />, title: 'User visits dashboard', detail: 'Vercel serves Next.js → calls /api/v1/data/dashboard on page load', color: 'pink' },
            { step: 6, icon: <ArrowRight size={14} />, title: 'Vercel proxies request to Render backend', detail: 'next.config.js rewrite: /api/* → blinkit-backend.onrender.com', color: 'violet' },
            { step: 7, icon: <Database size={14} />, title: 'Backend queries MongoDB + PostgreSQL', detail: 'Reviews, ratings, platforms from Mongo; barriers, needs from PG', color: 'blue' },
            { step: 8, icon: <Cpu size={14} />, title: 'Classifies 5000 reviews into segments/frustrations', detail: 'Keyword-based NLP: 5 segments, 7 frustration types', color: 'violet' },
            { step: 9, icon: <FileText size={14} />, title: 'Full computed JSON returned to frontend', detail: 'data_aggregation, behavioral_analysis, insight_generation, metrics', color: 'cyan' },
            { step: 10, icon: <BarChart3 size={14} />, title: 'Frontend renders 8 tabs of charts', detail: 'All driven by real data — no hardcoded values', color: 'pink' },
          ].map((item, i) => (
            <div key={i} className={`flex items-start gap-4 rounded-xl border border-${item.color}-500/20 bg-${item.color}-500/5 p-3`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${item.color}-500/20 border border-${item.color}-500/40 flex items-center justify-center text-${item.color}-300 font-black text-sm`}>
                {item.step}
              </div>
              <div className="flex items-start gap-2 flex-1">
                <span className={`mt-0.5 text-${item.color}-400`}>{item.icon}</span>
                <div>
                  <p className="text-[12px] font-bold text-white">{item.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* ===== SECTION 11: ENVIRONMENT VARIABLES ===== */}
      <SectionCard className="border-yellow-400/20">
        <SectionHeader icon={<Lock className="text-yellow-300" size={20} />} title="Environment Configuration" subtitle="All environment variables powering the production deployment" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoCard icon={<Server size={14} className="text-blue-400" />} title="Render Backend Variables" items={[
            { label: 'database_url', value: 'Render PostgreSQL (auto)' },
            { label: 'mongodb_url', value: 'mongodb+srv://...@cluster0' },
            { label: 'redis_url', value: 'Render Redis (auto)' },
            { label: 'jwt_secret_key', value: 'Auto-generated by Render' },
            { label: 'cors_origins', value: '*, http://localhost:3000' },
            { label: 'PYTHON_VERSION', value: '3.11.9' },
          ]} gradient="bg-blue-500/5" />
          <InfoCard icon={<Globe2 size={14} className="text-pink-400" />} title="Vercel Frontend Variables" items={[
            { label: 'NEXT_PUBLIC_API_URL', value: '(optional — uses proxy)' },
            { label: 'API Proxy', value: '/api/* → Render backend' },
            { label: 'Build Command', value: 'next build' },
            { label: 'Output', value: 'standalone' },
            { label: 'Node.js', value: '18.x' },
          ]} gradient="bg-pink-500/5" />
        </div>
      </SectionCard>

      {/* ===== LINKS ===== */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <a href="https://github.com/swetapadmaswain/blinkit-dashboard" target="_blank" rel="noreferrer" className="rounded-xl bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 px-5 py-3.5 text-center text-sm font-black text-purple-950 shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] hover:shadow-orange-500/40">
          View Project Repository
        </a>
        <a href="https://blinkit-backend-9jtp.onrender.com/docs" target="_blank" rel="noreferrer" className="rounded-xl bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 px-5 py-3.5 text-center text-sm font-black text-purple-950 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40">
          View API Documentation (Swagger)
        </a>
      </section>
    </div>
  );
}
