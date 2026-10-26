import React from 'react';
import { motion } from 'framer-motion';
import { SjphCompliance, FeedMetrics, ProfitabilityMetrics } from '../data/mockData';
import { CheckCircle2, ShieldCheck, Timer, TrendingUp } from 'lucide-react';

interface KpiBarProps {
  sjph: SjphCompliance;
  feed: FeedMetrics;
  profit: ProfitabilityMetrics;
  isDark: boolean;
}

export const KpiBar: React.FC<KpiBarProps> = ({
  sjph,
  feed,
  profit,
  isDark,
}) => {
  const cards = [
    {
      id: 'kpi-sjph',
      title: 'Kelengkapan Dokumen SJPH',
      badge: `${sjph.sjphReadinessScore}% Terverifikasi`,
      badgeColor: 'emerald',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
      mainValue: `${sjph.sjphReadinessScore}%`,
      subValue: `dari total ${sjph.totalDocuments} poin`,
      detailText: `${sjph.completedDocuments}/${sjph.totalDocuments} Dokumen Terverifikasi BPJPH`,
      progressPercent: sjph.sjphReadinessScore,
      progressColor: 'bg-emerald-500',
      glowClass: 'shadow-glow-emerald',
    },
    {
      id: 'kpi-traceability',
      title: 'Traceability Bahan Pakan',
      badge: '100% Valid',
      badgeColor: 'emerald',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />,
      mainValue: '100%',
      subValue: '4/4 Bahan Lolos',
      detailText: 'Lot #PK-8821 · Suplier Akreditasi Halal',
      progressPercent: 100,
      progressColor: 'bg-emerald-500',
      glowClass: 'shadow-glow-emerald',
    },
    {
      id: 'kpi-countdown',
      title: 'Hari Menuju Audit SJPH',
      badge: 'Countdown',
      badgeColor: 'amber',
      icon: <Timer className="w-3.5 h-3.5 text-amber-400" />,
      mainValue: `${sjph.auditCountdownDays}`,
      subValue: 'Hari Lagi',
      detailText: 'Simulasi Audit: 2 Nov 2026 (Alpha-01)',
      progressPercent: 75,
      progressColor: 'bg-amber-500',
      glowClass: 'shadow-glow-amber',
    },
    {
      id: 'kpi-savings',
      title: 'Potensi Penghematan Biaya',
      badge: 'Efisiensi FCR',
      badgeColor: 'emerald',
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />,
      mainValue: `Rp ${(profit.costSavingsEfficiency / 1000000).toFixed(2)} Jt`,
      subValue: `FCR ${feed.fcrActual} (Ref: ${feed.fcrTarget})`,
      detailText: `+14.2% Optimalisasi (1.500 Ekor)`,
      progressPercent: 82,
      progressColor: 'bg-emerald-500',
      glowClass: 'shadow-glow-emerald',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((card, idx) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: idx * 0.08 }}
          whileHover={{ y: -2 }}
          className={`relative rounded-xl p-4 sm:p-5 transition-all duration-200 border overflow-hidden ${
            isDark
              ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 hover:border-white/20 hover:' + card.glowClass
              : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-slate-300'
          }`}
        >
          {/* Subtle Top Accent Glow Line */}
          <div className={`absolute top-0 left-0 right-0 h-0.5 ${
            card.badgeColor === 'amber'
              ? 'bg-gradient-to-r from-amber-500/0 via-amber-500/60 to-amber-500/0'
              : 'bg-gradient-to-r from-emerald-500/0 via-emerald-500/60 to-emerald-500/0'
          }`} />

          {/* Card Header */}
          <div className="flex items-center justify-between mb-2 sm:mb-3 gap-2">
            <span className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider truncate ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {card.title}
            </span>
            <span className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold shrink-0 border ${
              card.badgeColor === 'amber'
                ? isDark
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-amber-50 text-amber-800 border-amber-200'
                : isDark
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                  : 'bg-emerald-50 text-[#166534] border-emerald-200/80'
            }`}>
              {card.icon}
              {card.badge}
            </span>
          </div>

          {/* Metric Value */}
          <div className="flex items-baseline gap-2 mb-1.5 sm:mb-2">
            <span className={`font-mono-val text-2xl sm:text-3xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {card.mainValue}
            </span>
            <span className={`text-xs font-medium truncate ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {card.subValue}
            </span>
          </div>

          {/* Detail Description */}
          <p className={`text-[11px] sm:text-xs mb-2.5 sm:mb-3 truncate ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {card.detailText}
          </p>

          {/* Mini Progress Bar */}
          <div className={`w-full rounded-full h-1.5 overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-slate-100'
          }`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${card.progressPercent}%` }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              className={`h-1.5 rounded-full ${card.progressColor}`}
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};
