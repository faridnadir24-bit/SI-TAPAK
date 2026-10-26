import React, { useState, useEffect } from 'react';
import { FlockOverview } from '../data/mockData';
import { FileDown, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  flock: FlockOverview;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenExportModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  flock,
  isDark,
  onToggleTheme,
  onOpenExportModal,
}) => {
  const [clock, setClock] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const pad = (n: number) => String(n).padStart(2, '0');
      const d = pad(now.getDate());
      const m = months[now.getMonth()];
      const y = now.getFullYear();
      const hh = pad(now.getHours());
      const mm = pad(now.getMinutes());
      const ss = pad(now.getSeconds());
      setClock(`${d} ${m} ${y} · ${hh}:${mm}:${ss} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full overflow-hidden transition-colors duration-200 border-b ${
      isDark
        ? 'bg-[#0a0e1a]/95 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
        : 'bg-white/95 backdrop-blur-md border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
    }`}>
      {/* Primary Top Bar */}
      <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand & Context */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-brand-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/30">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`font-extrabold tracking-tight text-sm sm:text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  SI-TAPAK
                </span>
                <span className="px-1.5 py-0.2 sm:py-0.5 rounded text-[9px] sm:text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  v4.2
                </span>
              </div>
              <p className={`text-[10px] sm:text-[11px] font-medium hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Sistem Telusur Halal &amp; Profitabilitas
              </p>
            </div>
          </div>

          <div className={`hidden xl:block h-6 w-px ${isDark ? 'bg-white/10' : 'bg-slate-200'} mx-1`} />

          {/* Desktop Operational Context Chips */}
          <div className="hidden lg:flex items-center gap-2">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border ${
              isDark ? 'bg-[#0f172a] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <span className="material-symbols-outlined text-slate-400 text-[16px]">domain</span>
              <span className="text-slate-400">Unit:</span>
              <span className="font-semibold">{flock.unitName}</span>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border ${
              isDark ? 'bg-[#0f172a] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <span className="material-symbols-outlined text-amber-500 text-[16px]">inventory_2</span>
              <span className="text-slate-400">Batch:</span>
              <span className="font-mono-val font-semibold text-amber-400">{flock.batchId}</span>
              <span className="text-slate-400 font-normal">(Hari ke-{flock.currentDay})</span>
            </div>

            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border ${
              isDark ? 'bg-[#0f172a] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}>
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">groups</span>
              <span className="text-slate-400">Populasi:</span>
              <span className="font-mono-val font-semibold text-emerald-400">
                {flock.currentPopulation.toLocaleString('id-ID')} / {flock.flockSize.toLocaleString('id-ID')} Ekor
              </span>
            </div>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Live System Status (Tablet/Desktop) */}
          <div className={`hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs border ${
            isDark
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-emerald-50 border-emerald-200 text-[#166534]'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">SCADA</span>
            <span className="opacity-40">|</span>
            <span className="font-medium">SJPH 78%</span>
          </div>

          {/* Clock in WIB (Desktop) */}
          <div className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono-val border ${
            isDark ? 'bg-[#0f172a] border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <span className="material-symbols-outlined text-slate-400 text-[15px]">schedule</span>
            <span>{clock}</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "Ganti ke Mode Audit (Terang)" : "Ganti ke Mode SCADA (Gelap)"}
            className={`p-1.5 sm:p-2 rounded-lg border transition-all duration-150 flex items-center justify-center ${
              isDark
                ? 'bg-[#0f172a] hover:bg-[#131b2e] border-white/10 text-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          </button>

          {/* Export Action */}
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] sm:text-xs shadow-md shadow-emerald-900/30 transition-all duration-150 active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Ekspor Laporan</span>
            <span className="sm:hidden">Audit</span>
          </button>

          {/* Profile Avatar */}
          <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-semibold text-xs cursor-pointer border ${
            isDark
              ? 'bg-[#131b2e] border-white/10 text-slate-300 hover:bg-[#1e293b]'
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
          }`}>
            <span className="material-symbols-outlined text-[16px] sm:text-[18px]">account_circle</span>
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Sub-Bar: Clean Scrollable Operational Badges */}
      <div className={`lg:hidden w-full overflow-x-auto flex items-center gap-2 px-3 py-1.5 border-t text-[11px] no-scrollbar ${
        isDark ? 'bg-[#070b14] border-white/5 text-slate-300' : 'bg-slate-100/70 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>SCADA</span>
        </div>
        <div className="shrink-0 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
          <span className="text-slate-400">Unit:</span> <strong className="font-medium">{flock.unitName}</strong>
        </div>
        <div className="shrink-0 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono-val">
          <span className="text-slate-400">Batch:</span> <span className="text-amber-400 font-semibold">{flock.batchId}</span> (H-{flock.currentDay})
        </div>
        <div className="shrink-0 px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono-val">
          <span className="text-slate-400">Populasi:</span> <span className="text-emerald-400 font-bold">{flock.currentPopulation}</span> Ekor
        </div>
      </div>
    </header>
  );
};
