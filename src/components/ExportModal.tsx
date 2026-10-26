import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlockOverview, FeedMetrics, SjphCompliance, ProfitabilityMetrics } from '../data/mockData';
import { X, FileDown, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  flock: FlockOverview;
  feed: FeedMetrics;
  sjph: SjphCompliance;
  profit: ProfitabilityMetrics;
  isDark: boolean;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  flock,
  feed,
  sjph,
  profit,
  isDark,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadReport = () => {
    const reportData = {
      project: "SI-TAPAK Halal Farm Dashboard",
      auditDate: new Date().toISOString(),
      unit: flock.unitName,
      batch: flock.batchId,
      flockSize: flock.flockSize,
      currentPopulation: flock.currentPopulation,
      day: flock.currentDay,
      sjphReadinessScore: `${sjph.sjphReadinessScore}%`,
      documentsVerified: `${sjph.completedDocuments}/${sjph.totalDocuments}`,
      halalFeedStockKg: feed.feedStock,
      feedCostPerKg: feed.feedCostPerKg,
      fcrActual: feed.fcrActual,
      bepBirds: profit.bepBirds,
      bepHarvestDay: profit.bepHarvestDay,
      projectedNetProfit: profit.projectedNetProfit,
      blockchainLedgerHash: sjph.blockchainLedgerHash,
      halalCert: sjph.halalCertificateNumber,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SI-TAPAK_Audit_Report_${flock.batchId}_Day${flock.currentDay}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            isDark
              ? 'bg-[#0f172a] border-white/10 text-white'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-1.5 rounded-lg border transition ${
              isDark ? 'border-white/10 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Ringkasan Dokumen Audit SJPH &amp; Panen</h3>
              <p className="text-xs text-slate-400">
                Sistem Telusur Halal Mandiri Berbasis BPJPH Kemenag RI
              </p>
            </div>
          </div>

          {/* Summary Box */}
          <div className={`p-4 rounded-xl border mb-6 space-y-3 font-mono-val text-xs ${
            isDark ? 'bg-[#0a0e1a] border-white/5' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Unit Peternakan:</span>
              <span className="font-semibold text-emerald-400">{flock.unitName}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Populasi Ternak (Batch):</span>
              <span className="font-semibold">{flock.currentPopulation} / {flock.flockSize} Ekor ({flock.batchId})</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Skor Kesiapan SJPH:</span>
              <span className="font-semibold text-emerald-400">
                {sjph.sjphReadinessScore}% ({sjph.completedDocuments}/{sjph.totalDocuments} Poin Terpenuhi)
              </span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Sisa Stok Pakan Halal:</span>
              <span className="font-semibold">{feed.feedStock.toLocaleString('id-ID')} kg (FCR: {feed.fcrActual})</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Biaya Pakan per Kg:</span>
              <span className="font-semibold">Rp {feed.feedCostPerKg.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Prediksi Titik Impas (BEP):</span>
              <span className="font-semibold text-amber-400">{profit.bepBirds} Ekor (Hari ke-{profit.bepHarvestDay})</span>
            </div>
            <div className="flex justify-between border-b pb-2 border-white/5">
              <span className="text-slate-400">Sertifikat Halal:</span>
              <span className="font-semibold text-emerald-400">SH No: {sjph.halalCertificateNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Blockchain Audit Ledger:</span>
              <span className="font-semibold text-cyan-400">{sjph.blockchainLedgerHash}</span>
            </div>
          </div>

          {/* Pillars Status Checklist */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
              Evaluasi 4 Pilar SJPH
            </h4>
            <div className="space-y-2">
              {sjph.pillars.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs ${
                    isDark ? 'bg-[#0f172a] border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${p.score >= 90 ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span className="font-medium">{p.title}</span>
                  </div>
                  <span className="font-mono-val font-bold text-emerald-400">{p.score}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download feedback */}
          {downloadSuccess && (
            <div className="mb-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Berkas laporan audit berhasil diunduh (JSON Standar BPJPH)!</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              onClick={handlePrint}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition ${
                isDark ? 'border-white/10 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={handleDownloadReport}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition"
            >
              <FileDown className="w-4 h-4" />
              <span>Unduh Berkas Audit (.JSON)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
