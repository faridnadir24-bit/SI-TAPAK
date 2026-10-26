import { useState } from 'react';
import {
  stitchFlockData,
  stitchFeedMetrics,
  stitchSjphCompliance,
  stitchProfitability,
  stitchCvpData,
  stitchDigitalTwinNodes,
  stitchTelemetryLogs,
  farm1500FlockData,
  farm1500FeedMetrics,
  farm1500SjphCompliance,
  farm1500Profitability,
  farm1500CvpData,
  FeedMetrics,
  TelemetryLog,
  FlockOverview,
  SjphCompliance,
  ProfitabilityMetrics,
  CvpDataPoint,
  DigitalTwinNode,
} from './data/mockData';
import { Header } from './components/Header';
import { KpiBar } from './components/KpiBar';
import { FeedSection } from './components/FeedSection';
import { AuditProfitSection } from './components/AuditProfitSection';
import { DigitalTwinSection } from './components/DigitalTwinSection';
import { ExportModal } from './components/ExportModal';
import { InputFeedModal } from './components/InputFeedModal';
import { SupplierLogModal } from './components/SupplierLogModal';
import { Wheat, ShieldCheck, Cpu, LayoutGrid } from 'lucide-react';

export function App() {
  // Default to Stone Slate Editorial Light theme as shown in Stitch screenshot
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentPreset, setCurrentPreset] = useState<'stitch' | 'farm1500'>('stitch');

  const [flock, setFlock] = useState<FlockOverview>(stitchFlockData);
  const [feed, setFeed] = useState<FeedMetrics>(stitchFeedMetrics);
  const [sjph, setSjph] = useState<SjphCompliance>(stitchSjphCompliance);
  const [profit, setProfit] = useState<ProfitabilityMetrics>(stitchProfitability);
  const [cvpData, setCvpData] = useState<CvpDataPoint[]>(stitchCvpData);
  const [nodes, setNodes] = useState<DigitalTwinNode[]>(stitchDigitalTwinNodes);
  const [logs, setLogs] = useState<TelemetryLog[]>(stitchTelemetryLogs);

  // Mobile navigation tab state
  const [mobileTab, setMobileTab] = useState<'all' | 'feed' | 'audit' | 'digital-twin'>('all');

  // Modals state
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [feedModalOpen, setFeedModalOpen] = useState<boolean>(false);
  const [supplierLogModalOpen, setSupplierLogModalOpen] = useState<boolean>(false);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSelectPreset = (preset: 'stitch' | 'farm1500') => {
    setCurrentPreset(preset);
    if (preset === 'stitch') {
      setFlock(stitchFlockData);
      setFeed(stitchFeedMetrics);
      setSjph(stitchSjphCompliance);
      setProfit(stitchProfitability);
      setCvpData(stitchCvpData);
      setNodes(stitchDigitalTwinNodes);
      setLogs(stitchTelemetryLogs);
    } else {
      setFlock(farm1500FlockData);
      setFeed(farm1500FeedMetrics);
      setSjph(farm1500SjphCompliance);
      setProfit(farm1500Profitability);
      setCvpData(farm1500CvpData);
      // Adapted nodes for 1.500 flock
      setNodes([
        {
          id: "node-1",
          nodeNumber: "Node 01",
          title: "Silo & Pakan Halal",
          subtitle: "Batch: HALAL-FEED-OK #8821",
          status: "optimal",
          badgeText: "63% KAPASITAS",
          metrics: [
            { label: "Stok Total", value: "1.25 Ton", highlight: true },
            { label: "Suhu Silo", value: "24.0°C" },
            { label: "Kelembaban", value: "60% RH" },
          ],
        },
        {
          id: "node-2",
          nodeNumber: "Node 02",
          title: "Kandang Broiler Alpha-01",
          subtitle: "Animal Welfare Standard",
          status: "optimal",
          badgeText: "1.482 EKOR",
          metrics: [
            { label: "Suhu Kandang", value: "26.5°C" },
            { label: "Amonia (NH3)", value: "7.5 ppm", highlight: true },
            { label: "Fan SCADA", value: "2 / 4 On" },
          ],
        },
        {
          id: "node-3",
          nodeNumber: "Node 03",
          title: "Panen & RPA Terakreditasi",
          subtitle: "JULEHA Certified: ID-62",
          status: "normal",
          badgeText: "8 HARI LAGI",
          metrics: [
            { label: "Target Tonase", value: "3.19 Ton" },
            { label: "Sertifikasi RPA", value: "Terkunci (OK)", highlight: true },
          ],
        },
        {
          id: "node-4",
          nodeNumber: "Node 04",
          title: "Cold Storage & QR Label",
          subtitle: "Rantai Dingin Halal < -18°C",
          status: "standby",
          badgeText: "STANDBY",
          metrics: [
            { label: "Suhu Ruang", value: "-18.2°C" },
            { label: "QR Dispatch", value: "Auto-Gen Siap", highlight: true },
          ],
        },
      ]);
    }
  };

  const handleAddFeed = (amountKg: number, type: 'pre-starter' | 'finisher', costPerKg: number) => {
    const updatedStock = feed.feedStock + amountKg;
    const updatedAlpha = type === 'pre-starter' ? feed.siloAlphaStock + amountKg : feed.siloAlphaStock;
    const updatedBeta = type === 'finisher' ? feed.siloBetaStock + amountKg : feed.siloBetaStock;
    const updatedDays = Number((updatedStock / feed.dailyFeedConsumption).toFixed(1));

    setFeed((prev) => ({
      ...prev,
      feedStock: updatedStock,
      siloAlphaStock: updatedAlpha,
      siloBetaStock: updatedBeta,
      feedCostPerKg: costPerKg,
      daysRemainingStock: updatedDays,
      accumulatedFeedCost: prev.accumulatedFeedCost + amountKg * costPerKg,
    }));

    // Add new log entry
    const newLog: TelemetryLog = {
      id: `log-${Date.now()}`,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      source: type === 'pre-starter' ? 'Silo Alpha' : 'Silo Beta',
      message: `Penerimaan pakan ${amountKg} kg tercatat. Total stok kini ${updatedStock.toLocaleString('id-ID')} kg.`,
      level: 'success',
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-[#0a0e1a] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
    }`}>
      {/* Top Navigation Bar */}
      <Header
        flock={flock}
        isDark={isDark}
        sjphScore={sjph.sjphReadinessScore}
        currentPreset={currentPreset}
        onSelectPreset={handleSelectPreset}
        onToggleTheme={toggleTheme}
        onOpenExportModal={() => setExportModalOpen(true)}
      />

      {/* Main Dashboard Layout */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col gap-4 sm:gap-6">
        {/* KPI Summary Bar (4 Cards) */}
        <KpiBar
          sjph={sjph}
          feed={feed}
          profit={profit}
          isDark={isDark}
        />

        {/* Mobile View Tab Switcher (Visible only below lg breakpoint) */}
        <div className="lg:hidden flex items-center p-1 rounded-xl border bg-black/20 backdrop-blur-md overflow-x-auto no-scrollbar gap-1 border-white/10 text-xs">
          <button
            onClick={() => setMobileTab('all')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              mobileTab === 'all'
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Semua</span>
          </button>

          <button
            onClick={() => setMobileTab('feed')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              mobileTab === 'feed'
                ? isDark
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'bg-white text-cyan-800 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            <span>Pakan &amp; Sertifikat</span>
          </button>

          <button
            onClick={() => setMobileTab('audit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              mobileTab === 'audit'
                ? isDark
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-white text-emerald-800 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Audit &amp; BEP</span>
          </button>

          <button
            onClick={() => setMobileTab('digital-twin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition shrink-0 ${
              mobileTab === 'digital-twin'
                ? isDark
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-white text-amber-800 shadow-sm border border-slate-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Digital Twin</span>
          </button>
        </div>

        {/* 3-Column Core Grid Layout (Desktop shows all 3, Mobile reacts to tab) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Column 1: Parameter & Sertifikasi Pakan (4 Cols) */}
          <div className={`lg:col-span-4 ${mobileTab === 'all' || mobileTab === 'feed' ? 'block' : 'hidden lg:block'}`}>
            <FeedSection
              feed={feed}
              sjph={sjph}
              isDark={isDark}
              onOpenFeedModal={() => setFeedModalOpen(true)}
              onOpenLogModal={() => setSupplierLogModalOpen(true)}
            />
          </div>

          {/* Column 2: Audit Readiness & Profitability Engine (4 Cols) */}
          <div className={`lg:col-span-4 ${mobileTab === 'all' || mobileTab === 'audit' ? 'block' : 'hidden lg:block'}`}>
            <AuditProfitSection
              sjph={sjph}
              profit={profit}
              cvpData={cvpData}
              isDark={isDark}
            />
          </div>

          {/* Column 3: Digital Twin Alur Telusur & Telemetry Log (4 Cols) */}
          <div className={`lg:col-span-4 ${mobileTab === 'all' || mobileTab === 'digital-twin' ? 'block' : 'hidden lg:block'}`}>
            <DigitalTwinSection
              nodes={nodes}
              logs={logs}
              isDark={isDark}
            />
          </div>
        </div>
      </main>

      {/* Interactive Modals */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        flock={flock}
        feed={feed}
        sjph={sjph}
        profit={profit}
        isDark={isDark}
      />

      <InputFeedModal
        isOpen={feedModalOpen}
        onClose={() => setFeedModalOpen(false)}
        isDark={isDark}
        onAddFeed={handleAddFeed}
      />

      <SupplierLogModal
        isOpen={supplierLogModalOpen}
        onClose={() => setSupplierLogModalOpen(false)}
        isDark={isDark}
      />
    </div>
  );
}
export default App;
