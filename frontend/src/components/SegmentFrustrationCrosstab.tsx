'use client';

interface CrosstabDatum {
  segment: string;
  frustration: string;
  count: number;
}

interface SegmentFrustrationCrosstabProps {
  data: CrosstabDatum[];
  title?: string;
}

const VIVID_STEPS = [
  { background: 'linear-gradient(135deg, #1d255a, #25205c)', glow: 'none' },
  { background: 'linear-gradient(135deg, #1e40af, #2563eb)', glow: '0 0 12px rgb(59 130 246 / 0.4)' },
  { background: 'linear-gradient(135deg, #4338ca, #7c3aed)', glow: '0 0 14px rgb(124 58 237 / 0.45)' },
  { background: 'linear-gradient(135deg, #7e22ce, #d946ef)', glow: '0 0 16px rgb(217 70 239 / 0.5)' },
  { background: 'linear-gradient(135deg, #be185d, #ec4899)', glow: '0 0 18px rgb(236 72 153 / 0.55)' },
  { background: 'linear-gradient(135deg, #ea580c, #fb923c)', glow: '0 0 20px rgb(251 146 60 / 0.6)' },
  { background: 'linear-gradient(135deg, #f59e0b, #facc15)', glow: '0 0 22px rgb(250 204 21 / 0.75)' },
];

export default function SegmentFrustrationCrosstab({
  data,
  title = 'Segment × Frustration Crosstab',
}: SegmentFrustrationCrosstabProps) {
  const segments = [...new Set(data.map((item) => item.segment))];
  const frustrations = [...new Set(data.map((item) => item.frustration))];
  const highestCount = Math.max(...data.map((item) => item.count), 1);

  const getCellStyle = (count: number) => {
    const index = Math.round((count / highestCount) * (VIVID_STEPS.length - 1));
    return VIVID_STEPS[index];
  };

  const getCount = (segment: string, frustration: string) => (
    data.find((item) => item.segment === segment && item.frustration === frustration)?.count ?? 0
  );

  const strongestPair = data.reduce((highest, item) => (item.count > highest.count ? item : highest), data[0]);

  return (
    <section className="bg-gradient-to-br from-[#172554] via-[#312e81] to-[#581c87] border border-pink-300/60 rounded-xl p-6 shadow-2xl shadow-pink-500/25">
      <h3 className="text-xl font-semibold tracking-tight text-white mb-6">{title}</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[850px]">
          <div className="grid" style={{ gridTemplateColumns: `112px repeat(${frustrations.length}, minmax(95px, 1fr))` }}>
            <div className="h-10" />
            {frustrations.map((frustration) => (
              <div key={frustration} className="h-10 px-2 flex items-end justify-center text-center text-[10px] font-medium text-cyan-100 leading-tight">
                {frustration.replaceAll('_', ' ')}
              </div>
            ))}

            {segments.map((segment) => (
              <div key={segment} className="contents">
                <div className="min-h-12 pr-3 flex items-center justify-end text-right text-[11px] font-medium text-yellow-100">
                  {segment.replaceAll('_', ' ')}
                </div>
                {frustrations.map((frustration) => {
                  const count = getCount(segment, frustration);
                  const cellStyle = getCellStyle(count);
                  return (
                    <div
                      key={`${segment}-${frustration}`}
                      className="min-h-12 border border-white/20 flex items-center justify-center text-[11px] font-bold text-white transition-all hover:z-10 hover:scale-110"
                      style={{ background: cellStyle.background, boxShadow: cellStyle.glow }}
                      title={`${segment.replaceAll('_', ' ')} × ${frustration.replaceAll('_', ' ')}: ${count}`}
                    >
                      {count}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-4 ml-28 flex items-center gap-3">
            <span className="text-[11px] font-medium text-cyan-200">Low</span>
            <div className="h-2 w-36 rounded-sm shadow-lg shadow-pink-500/40" style={{ background: 'linear-gradient(90deg, #2563eb, #7c3aed, #ec4899, #fb923c, #facc15)' }} />
            <span className="text-[11px] font-medium text-yellow-200">High</span>
          </div>
        </div>
      </div>
      {strongestPair && (
        <p className="mt-5 rounded-lg border border-yellow-300/30 bg-yellow-300/10 px-3 py-2 text-xs font-medium text-yellow-100">
          Highlight: {strongestPair.segment.replaceAll('_', ' ')} + {strongestPair.frustration.replaceAll('_', ' ')} = {strongestPair.count} reviews
        </p>
      )}
    </section>
  );
}
