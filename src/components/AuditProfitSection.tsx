import React, { useState } from 'react';
import {
  SjphCompliance,
  ProfitabilityMetrics,
  CvpDataPoint,
  mockTelemetryTrends,
} from '../data/mockData';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  ReferenceDot,
  LineChart,
} from 'recharts';
import { Sliders, Activity } from 'lucide-react';

interface AuditProfitSectionProps {
  sjph: SjphCompliance;
  profit: ProfitabilityMetrics;
  cvpData: CvpDataPoint[];
  isDark: boolean;
}

export const AuditProfitSection: React.FC<AuditProfitSectionProps> = ({
  sjph,
  profit,
  cvpData,
  isDark,
}) => {
  const [activeTab, setActiveTab] = useState<'cvp' | 'trend'>('cvp');
  const [sellingPrice, setSellingPrice] = useState<number>(profit.sellingPricePerKg);
  const [showSimSlider, setShowSimSlider] = useState<boolean>(false);

  // Dynamically calculate simulated CVP points if user tweaks the price slider
  const dynamicCvpData = cvpData.map((pt) => {
    const rev = pt.birds * 2.15 * sellingPrice;
    return {
      ...pt,
      revenue: Math.round(rev),
      profit: Math.round(rev - pt.totalCost),
    };
  });

  // Calculate dynamic BEP: FixedCost / (PricePerBird - VarCostPerBird)
  const revenuePerBird = 2.15 * sellingPrice;
  const contributionPerBird = revenuePerBird - profit.variableCostPerBird;
  const calculatedBepBirds = contributionPerBird > 0
    ? Math.round(profit.fixedCost / contributionPerBird)
    : profit.bepBirds;

  // Semi-circle gauge arc computation (0 to 100% maps to 180 degrees)
  const gaugePercent = sjph.sjphReadinessScore;
  const angleRad = (Math.min(100, Math.max(0, gaugePercent)) / 100) * Math.PI;
  const gaugeEndX = 100 - 80 * Math.cos(angleRad);
  const gaugeEndY = 100 - 80 * Math.sin(angleRad);

  return (
    <section className="flex flex-col gap-4 sm:gap-5">
      {/* Column Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded bg-emerald-500 animate-pulse" />
          <h2 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            Audit SJPH &amp; Profit Engine
          </h2>
        </div>
        <span className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded border ${
          isDark
            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
            : 'bg-emerald-50 text-[#166534] border-emerald-200'
        }`}>
          CVP Live Engine
        </span>
      </div>

      {/* Card 1: Kesiapan Audit SJPH (Semi-Circle Gauge) */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between mb-1">
          <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Kesiapan Audit SJPH
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold border ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-emerald-50 text-[#166534] border-emerald-200'
          }`}>
            {gaugePercent >= 90 ? 'Sangat Siap (Audit-Ready)' : gaugePercent >= 80 ? 'Siap' : `Tahap Pemenuhan (${gaugePercent}%)`}
          </span>
        </div>

        {/* SVG Semi-Circle Gauge */}
        <div className="relative w-44 h-24 sm:w-48 sm:h-28 mx-auto flex items-end justify-center my-1">
          <svg className="w-44 h-24 sm:w-48 sm:h-28" viewBox="0 0 200 110">
            {/* Background Arch Track */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={isDark ? '#1e293b' : '#f1f5f9'}
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Active Gauge Arc for 78% */}
            <path
              d={`M 20 100 A 80 80 0 0 1 ${gaugeEndX} ${gaugeEndY}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="14"
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute bottom-0 sm:bottom-1 text-center">
            <div className={`font-mono-val text-2xl sm:text-3xl font-bold leading-none ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {sjph.sjphReadinessScore}
              <span className="text-base sm:text-lg text-emerald-400 font-semibold">%</span>
            </div>
            <div className={`text-[9px] sm:text-[10px] uppercase font-bold mt-1 tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Indeks SJPH / 100
            </div>
          </div>
        </div>

        {/* 4 Pillars Checklist */}
        <div className={`space-y-2 mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-lg border text-[11px] sm:text-xs ${
          isDark ? 'bg-[#0f172a]/90 border-white/5' : 'bg-slate-50 border-slate-100'
        }`}>
          {sjph.pillars.map((pillar) => (
            <div key={pillar.id} className="flex justify-between items-center gap-2">
              <span className={`truncate ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {pillar.title}
              </span>
              <span className={`font-mono-val font-bold shrink-0 ${
                pillar.score === 100
                  ? 'text-emerald-400'
                  : pillar.score >= 75
                  ? isDark ? 'text-cyan-300' : 'text-[#166534]'
                  : 'text-amber-400'
              }`}>
                {pillar.score}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: BEP Predictor Card */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-2.5 sm:gap-3 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Prediksi Titik Impas (BEP)
          </span>
          <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${
            isDark
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-amber-50 text-amber-800 border-amber-200'
          }`}>
            Hari ke-{profit.bepHarvestDay}
          </span>
        </div>

        <div className={`p-3 rounded-lg border flex flex-col gap-1 ${
          isDark ? 'bg-amber-950/20 border-amber-500/20' : 'bg-amber-50/60 border-amber-200/50'
        }`}>
          <div className={`text-[10px] sm:text-[11px] font-medium ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
            Ambang Batas BEP Panen ({profit.bepBirds > 2000 ? '4.850 Ekor' : '1.500 Ekor'})
          </div>
          <div className={`font-mono-val text-xl sm:text-2xl font-bold ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {calculatedBepBirds.toLocaleString('id-ID')} Ekor{' '}
            <span className={`text-[11px] sm:text-xs font-normal ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              / Rp {sellingPrice.toLocaleString('id-ID')}
            </span>
          </div>
          <div className={`flex items-center justify-between text-[11px] sm:text-xs pt-1 border-t mt-1 ${
            isDark ? 'border-amber-500/20 text-slate-300' : 'border-amber-200/60 text-slate-600'
          }`}>
            <span>
              Bobot:{' '}
              <strong className={isDark ? 'text-white font-mono-val' : 'text-slate-900 font-mono-val'}>
                2.15 kg
              </strong>
            </span>
            <span>
              Margin:{' '}
              <strong className="text-emerald-400 font-mono-val">
                {profit.profitMarginPercent}%
              </strong>
            </span>
          </div>
        </div>

        <div className={`flex items-center justify-between px-3 py-2 rounded-lg border text-[11px] sm:text-xs ${
          isDark ? 'bg-[#0f172a] border-white/5' : 'bg-slate-50 border-slate-200/70'
        }`}>
          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>
            Proyeksi Laba Bersih Panen
          </span>
          <span className="font-mono-val font-bold text-emerald-400 text-xs sm:text-sm">
            Rp {profit.projectedNetProfit.toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      {/* Card 3: CVP & Trend Chart with Recharts */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-3 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('cvp')}
              className={`text-[11px] sm:text-xs font-semibold px-2 py-1 rounded transition ${
                activeTab === 'cvp'
                  ? isDark
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-emerald-50 text-[#166534] border border-emerald-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CVP
            </button>
            <button
              onClick={() => setActiveTab('trend')}
              className={`text-[11px] sm:text-xs font-semibold px-2 py-1 rounded transition flex items-center gap-1 ${
                activeTab === 'trend'
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3 h-3" />
              Tren 7 Hari
            </button>
          </div>

          <button
            onClick={() => setShowSimSlider(!showSimSlider)}
            className={`text-[11px] sm:text-xs font-semibold flex items-center gap-1 transition px-2 py-1 rounded border shrink-0 ${
              showSimSlider
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : isDark
                ? 'text-slate-300 hover:text-white border-white/10'
                : 'text-slate-600 hover:text-slate-900 border-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Simulasi</span>
          </button>
        </div>

        {/* Interactive Simulation Slider Drawer */}
        {showSimSlider && (
          <div className={`p-3 rounded-lg border text-xs transition-all ${
            isDark ? 'bg-[#0f172a] border-amber-500/30' : 'bg-amber-50/50 border-amber-200'
          }`}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-semibold text-amber-400 text-[11px] sm:text-xs">Harga Live-Bird (per kg):</span>
              <span className="font-mono-val font-bold text-white text-[11px] sm:text-xs">
                Rp {sellingPrice.toLocaleString('id-ID')}
              </span>
            </div>
            <input
              type="range"
              min={17000}
              max={26000}
              step={250}
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono-val">
              <span>Rp 17k</span>
              <span>Ref: 21.5k</span>
              <span>Rp 26k</span>
            </div>
          </div>
        )}

        {/* Recharts Chart View */}
        <div className={`w-full p-1.5 sm:p-2 rounded-lg border relative ${
          isDark ? 'bg-[#0a0e1a]/80 border-white/5' : 'bg-slate-50 border-slate-100'
        }`}>
          {activeTab === 'cvp' ? (
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={dynamicCvpData}
                  margin={{ top: 12, right: 10, left: -22, bottom: 0 }}
                >
                  <XAxis
                    dataKey="birds"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(val) => `${val}`}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                  />
                  <YAxis
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                    tickFormatter={(val) => `${(val / 1000000).toFixed(0)}Jt`}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as CvpDataPoint;
                        return (
                          <div className={`p-2 rounded-lg border text-[11px] shadow-xl font-mono-val ${
                            isDark ? 'bg-[#0f172a] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-800'
                          }`}>
                            <div className="font-bold border-b pb-0.5 mb-1 border-white/10 text-emerald-400">
                              Populasi: {label} Ekor
                            </div>
                            <div className="text-emerald-400">
                              Rev: Rp {(data.revenue / 1000000).toFixed(2)} Jt
                            </div>
                            <div className="text-amber-400">
                              Cost: Rp {(data.totalCost / 1000000).toFixed(2)} Jt
                            </div>
                            <div className={`mt-0.5 font-bold pt-0.5 border-t border-white/10 ${
                              data.revenue >= data.totalCost ? 'text-emerald-400' : 'text-rose-400'
                            }`}>
                              Net: Rp {((data.revenue - data.totalCost) / 1000000).toFixed(2)} Jt
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    fill="#10b981"
                    fillOpacity={isDark ? 0.08 : 0.06}
                    stroke="none"
                  />
                  <Line
                    type="monotone"
                    dataKey="fixedCost"
                    stroke="#94a3b8"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalCost"
                    stroke="#f59e0b"
                    strokeWidth={2.2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <ReferenceDot
                    x={calculatedBepBirds}
                    y={profit.fixedCost + calculatedBepBirds * profit.variableCostPerBird}
                    r={5}
                    fill="#f59e0b"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockTelemetryTrends}
                  margin={{ top: 12, right: 10, left: -22, bottom: 0 }}
                >
                  <XAxis
                    dataKey="day"
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                  />
                  <YAxis
                    yAxisId="fcr"
                    domain={[1.3, 1.6]}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 9, fontFamily: 'JetBrains Mono' }}
                    axisLine={{ stroke: isDark ? '#334155' : '#cbd5e1' }}
                  />
                  <YAxis
                    yAxisId="env"
                    orientation="right"
                    domain={[0, 32]}
                    tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 8, fontFamily: 'JetBrains Mono' }}
                    axisLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className={`p-2 rounded-lg border text-[11px] shadow-xl font-mono-val ${
                            isDark ? 'bg-[#0f172a] border-white/20 text-white' : 'bg-white border-slate-200 text-slate-800'
                          }`}>
                            <div className="font-bold border-b pb-0.5 mb-1 border-white/10 text-cyan-400">
                              {label}
                            </div>
                            <div className="text-emerald-400">FCR: {d.fcr}</div>
                            <div className="text-amber-400">Suhu: {d.temperature}°C</div>
                            <div className="text-cyan-400">NH3: {d.ammonia} ppm</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    yAxisId="fcr"
                    type="monotone"
                    dataKey="fcr"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 3, fill: '#10b981' }}
                  />
                  <Line
                    yAxisId="env"
                    type="monotone"
                    dataKey="temperature"
                    stroke="#f59e0b"
                    strokeWidth={1.8}
                    dot={false}
                  />
                  <Line
                    yAxisId="env"
                    type="monotone"
                    dataKey="ammonia"
                    stroke="#06b6d4"
                    strokeWidth={1.8}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] text-slate-400 px-1 pt-0.5">
          {activeTab === 'cvp' ? (
            <>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-emerald-500 rounded-full" />
                <span>Pendapatan</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-amber-500 rounded-full" />
                <span>Total Biaya</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-slate-400 rounded-full" />
                <span>Biaya Tetap</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-emerald-500 rounded-full" />
                <span>FCR Real</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-amber-500 rounded-full" />
                <span>Suhu (°C)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-cyan-400 rounded-full" />
                <span>NH3 (ppm)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
