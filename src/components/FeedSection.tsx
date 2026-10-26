import React, { useState } from 'react';
import { FeedMetrics, SjphCompliance } from '../data/mockData';
import {
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  History,
  TrendingDown,
  Flame,
  Layers,
} from 'lucide-react';

interface FeedSectionProps {
  feed: FeedMetrics;
  sjph: SjphCompliance;
  isDark: boolean;
  onOpenFeedModal: () => void;
  onOpenLogModal: () => void;
}

export const FeedSection: React.FC<FeedSectionProps> = ({
  feed,
  sjph,
  isDark,
  onOpenFeedModal,
  onOpenLogModal,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sjph.blockchainLedgerHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const capacityPercent = Math.round((feed.feedStock / feed.maxFeedCapacity) * 100);
  const siloAlphaPercent = Math.round((feed.siloAlphaStock / 1000) * 100);
  const siloBetaPercent = Math.round((feed.siloBetaStock / 1000) * 100);

  return (
    <section className="flex flex-col gap-4 sm:gap-5">
      {/* Column Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded bg-cyan-500 animate-pulse" />
          <h2 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            Parameter &amp; Sertifikasi Pakan
          </h2>
        </div>
        <span className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded border ${
          isDark
            ? 'bg-slate-800/80 text-cyan-300 border-cyan-500/30'
            : 'bg-white text-slate-600 border-slate-200'
        }`}>
          Real-Time Sensor
        </span>
      </div>

      {/* Card 1: Stok Pakan Aktif */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-3.5 sm:gap-4 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-start justify-between">
          <div>
            <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Stok Pakan Aktif
            </span>
            <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1">
              <span className={`font-mono-val text-2xl sm:text-3xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {feed.feedStock.toLocaleString('id-ID')}
              </span>
              <span className={`text-xs sm:text-sm font-semibold ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                kg
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-block px-2 sm:px-2.5 py-0.5 font-semibold text-[11px] sm:text-xs rounded border ${
              isDark
                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                : 'bg-emerald-50 border-emerald-200 text-[#166534]'
            }`}>
              {capacityPercent}% Kapasitas
            </span>
            <span className={`block text-[10px] sm:text-[11px] mt-1 ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`}>
              2 Silo Terkoneksi
            </span>
          </div>
        </div>

        {/* Silo Breakdown Progress */}
        <div className={`space-y-2.5 sm:space-y-3 p-3 sm:p-3.5 rounded-lg border ${
          isDark ? 'bg-[#0f172a]/80 border-white/5' : 'bg-slate-50 border-slate-100'
        }`}>
          {/* Silo Alpha */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className={`font-medium flex items-center gap-1.5 text-[11px] sm:text-xs truncate ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Silo Alpha (Pre-Starter)</span>
              </span>
              <span className="font-mono-val font-semibold text-[11px] sm:text-xs shrink-0">
                {feed.siloAlphaStock} kg{' '}
                <span className="text-slate-400 font-normal">/ 1.000</span>
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 overflow-hidden ${
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            }`}>
              <div
                className="bg-cyan-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${siloAlphaPercent}%` }}
              />
            </div>
          </div>

          {/* Silo Beta */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className={`font-medium flex items-center gap-1.5 text-[11px] sm:text-xs truncate ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                <Layers className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Silo Beta (Finisher)</span>
              </span>
              <span className="font-mono-val font-semibold text-[11px] sm:text-xs shrink-0">
                {feed.siloBetaStock} kg{' '}
                <span className="text-slate-400 font-normal">/ 1.000</span>
              </span>
            </div>
            <div className={`w-full rounded-full h-1.5 overflow-hidden ${
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            }`}>
              <div
                className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${siloBetaPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Consumption Pill */}
        <div className={`flex flex-wrap items-center justify-between gap-1.5 text-xs p-2.5 rounded-lg border ${
          isDark ? 'bg-[#0f172a] border-white/5' : 'bg-slate-50 border-slate-200/60'
        }`}>
          <div className={`flex items-center gap-1.5 text-[11px] sm:text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            <Flame className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Laju:{' '}
              <strong className={`font-mono-val ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {feed.dailyFeedConsumption} kg/hari
              </strong>
            </span>
          </div>
          <span className={`font-medium font-mono-val text-[11px] sm:text-xs px-2 py-0.5 rounded border ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-emerald-50 text-[#166534] border-emerald-200'
          }`}>
            Aman ~{feed.daysRemainingStock} Hari
          </span>
        </div>
      </div>

      {/* Card 2: Biaya Pakan */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-2.5 sm:gap-3 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Biaya Pakan per Kg
          </span>
          <span className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded border ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-emerald-50 text-[#166534] border-emerald-200'
          }`}>
            <TrendingDown className="w-3.5 h-3.5" />
            -Rp 250 vs Ref
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className={`font-mono-val text-xl sm:text-2xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Rp {feed.feedCostPerKg.toLocaleString('id-ID')}
            </span>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              /kg
            </span>
          </div>
          <div className="text-right">
            <div className={`text-[10px] sm:text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Akumulasi 1.500 Ekor
            </div>
            <div className={`font-mono-val text-xs sm:text-sm font-bold ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Rp {feed.accumulatedFeedCost.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Status Sertifikat Halal Pakan */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-3.5 sm:gap-4 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Sertifikasi Halal Pakan
          </span>
          <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded border ${
            isDark
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-emerald-50 text-[#166534] border-emerald-200'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            BPJPH Aktif
          </span>
        </div>

        {/* Certificate Pill Box */}
        <div className={`p-3 rounded-lg border ${
          isDark ? 'bg-[#0f172a]/90 border-white/5' : 'bg-slate-50 border-slate-200/70'
        }`}>
          <div className="flex items-center justify-between gap-1">
            <span className={`font-mono-val text-[11px] sm:text-xs font-bold truncate ${
              isDark ? 'text-slate-100' : 'text-slate-800'
            }`}>
              SH: {sjph.halalCertificateNumber}
            </span>
            <span className={`text-[9px] sm:text-[10px] font-bold uppercase px-1.5 sm:px-2 py-0.5 rounded border shrink-0 ${
              isDark
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40'
                : 'bg-white text-[#166534] border-emerald-200'
            }`}>
              Terdaftar
            </span>
          </div>
          <div className={`text-[11px] mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Berlaku s/d:{' '}
            <strong className={`font-mono-val ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              {sjph.halalValidUntil}
            </strong>
          </div>
        </div>

        {/* Raw Materials Verified List */}
        <div>
          <div className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`}>
            Bahan Baku Terverifikasi Halal:
          </div>
          <div className={`space-y-1.5 text-[11px] sm:text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            {sjph.rawMaterials.map((mat, i) => (
              <div key={i} className="flex items-center justify-between py-0.5 gap-2">
                <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{mat.name}</span>
                </div>
                <span className={`text-[9px] sm:text-[10px] shrink-0 font-mono-val px-1.5 py-0.2 rounded ${
                  isDark ? 'text-slate-400 bg-slate-800' : 'text-slate-500 bg-slate-100'
                }`}>
                  Lolos
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Hash */}
        <div className={`pt-2 border-t flex flex-wrap items-center justify-between gap-1 text-[11px] sm:text-xs ${
          isDark ? 'border-white/5' : 'border-slate-100'
        }`}>
          <div className="font-mono-val text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-none">
            HASH:{' '}
            <span
              onClick={handleCopyHash}
              className="font-semibold cursor-pointer underline hover:text-emerald-400"
              title="Klik untuk salin hash blockchain"
            >
              {copiedHash ? 'Tersalin!' : sjph.blockchainLedgerHash}
            </span>
          </div>
          <a
            href="https://halal.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-semibold transition shrink-0 ${
              isDark ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#166534] hover:text-[#14532d]'
            }`}
          >
            <span>Cek BPJPH</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Hardware Action Buttons (Mobile-Friendly 44px Height) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            onClick={onOpenFeedModal}
            className={`w-full py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 border min-h-[42px] ${
              isDark
                ? 'bg-[#0f172a] hover:bg-[#1e293b] text-slate-200 border-white/10'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">Input Pakan</span>
          </button>
          <button
            onClick={onOpenLogModal}
            className={`w-full py-2.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition active:scale-95 border min-h-[42px] ${
              isDark
                ? 'bg-[#0f172a] hover:bg-[#1e293b] text-slate-200 border-white/10'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            <History className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">Log Suplier</span>
          </button>
        </div>
      </div>
    </section>
  );
};
