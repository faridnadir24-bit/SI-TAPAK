import React from 'react';
import { motion } from 'framer-motion';
import { DigitalTwinNode, TelemetryLog } from '../data/mockData';
import {
  PackageCheck,
  Building2,
  Truck,
  Snowflake,
  Radio,
} from 'lucide-react';

interface DigitalTwinSectionProps {
  nodes: DigitalTwinNode[];
  logs: TelemetryLog[];
  isDark: boolean;
  onSelectNode?: (nodeId: string) => void;
}

export const DigitalTwinSection: React.FC<DigitalTwinSectionProps> = ({
  nodes,
  logs,
  isDark,
}) => {
  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'node-1':
        return <PackageCheck className="w-4 h-4 text-cyan-400" />;
      case 'node-2':
        return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'node-3':
        return <Truck className="w-4 h-4 text-amber-400" />;
      case 'node-4':
        return <Snowflake className="w-4 h-4 text-cyan-300" />;
      default:
        return <PackageCheck className="w-4 h-4" />;
    }
  };

  return (
    <section className="flex flex-col gap-4 sm:gap-5">
      {/* Column Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded bg-amber-500 animate-pulse" />
          <h2 className={`text-xs font-bold uppercase tracking-wider ${
            isDark ? 'text-slate-200' : 'text-slate-800'
          }`}>
            Digital Twin Alur Telusur
          </h2>
        </div>
        <span className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded border ${
          isDark
            ? 'bg-slate-800 text-amber-300 border-amber-500/30'
            : 'bg-white text-slate-600 border-slate-200'
        }`}>
          4 Node Aktif
        </span>
      </div>

      {/* Vertical Supply Chain Pipeline Container */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-2.5 sm:gap-3 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        {nodes.map((node, index) => (
          <React.Fragment key={node.id}>
            {/* Node Card */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className={`p-3 sm:p-3.5 rounded-lg border relative transition-all ${
                isDark
                  ? 'bg-[#0f172a]/90 border-white/5 hover:border-emerald-500/40 shadow-sm'
                  : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Node Header */}
              <div className="flex items-center justify-between mb-2 gap-2">
                <div className="flex items-center gap-2 sm:gap-2.5 truncate">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 border ${
                    isDark
                      ? 'bg-[#172033] border-white/10'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    {getNodeIcon(node.id)}
                  </div>
                  <div className="truncate">
                    <div className={`text-[11px] sm:text-xs font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {node.nodeNumber}: {node.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-val truncate">
                      {node.subtitle}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold font-mono-val border ${
                    node.status === 'optimal'
                      ? isDark
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-emerald-50 text-[#166534] border-emerald-200'
                      : node.status === 'normal'
                      ? isDark
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                      : isDark
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {node.badgeText}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    node.status === 'optimal'
                      ? 'bg-emerald-500 shadow-glow-emerald'
                      : node.status === 'normal'
                      ? 'bg-amber-500'
                      : 'bg-slate-400'
                  }`} />
                </div>
              </div>

              {/* Node Metrics Grid */}
              <div className={`grid ${node.metrics.length === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded border text-center ${
                isDark ? 'bg-[#0a0e1a]/70 border-white/5' : 'bg-white border-slate-200/60'
              }`}>
                {node.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="truncate">
                    <span className="block text-[9px] sm:text-[10px] text-slate-400 uppercase font-semibold truncate">
                      {metric.label}
                    </span>
                    <span className={`font-mono-val text-[11px] sm:text-xs font-bold truncate ${
                      metric.highlight
                        ? 'text-emerald-400'
                        : isDark ? 'text-slate-100' : 'text-slate-800'
                    }`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Animated Flow Connector Arrow */}
            {index < nodes.length - 1 && (
              <div className="flex items-center justify-center -my-1 py-0.5 relative">
                <div className="flex flex-col items-center">
                  <div className="relative w-0.5 h-3.5 sm:h-4 bg-slate-700/60 overflow-hidden rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-cyan-400 to-emerald-400 rounded-full"
                      animate={{
                        y: [-8, 16],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.35,
                      }}
                    />
                  </div>
                  <span className="material-symbols-outlined text-[12px] sm:text-[13px] -mt-1 text-emerald-400 animate-pulse">
                    arrow_downward
                  </span>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Telemetry & BPJPH Live Event Log */}
      <div className={`rounded-xl p-4 sm:p-5 border transition-all duration-200 flex flex-col gap-3 ${
        isDark
          ? 'bg-[#131b2e]/85 backdrop-blur-md border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
          : 'bg-white border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      }`}>
        <div className="flex items-center justify-between">
          <span className={`text-[11px] sm:text-xs font-semibold uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Log Verifikasi &amp; Telemetri
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-emerald-400">
            <Radio className="w-3 h-3 animate-ping" />
            Live Feed
          </span>
        </div>

        <div className={`space-y-2 font-mono-val text-[11px] sm:text-xs p-2.5 sm:p-3 rounded-lg border max-h-48 overflow-y-auto ${
          isDark ? 'bg-[#0f172a]/90 border-white/5' : 'bg-slate-50 border-slate-100'
        }`}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-1.5 sm:gap-2"
            >
              <span className="text-slate-400 text-[10px] sm:text-[11px] shrink-0 font-medium">
                {log.time}
              </span>
              <span className={`font-semibold shrink-0 text-[10px] sm:text-[11px] ${
                log.level === 'success'
                  ? 'text-emerald-400'
                  : log.level === 'warning'
                  ? 'text-amber-400'
                  : 'text-cyan-400'
              }`}>
                [{log.source}]
              </span>
              <span className={`text-[11px] sm:text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {log.message}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
