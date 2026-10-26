import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, CheckCircle2, FileText } from 'lucide-react';

interface SupplierLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const SupplierLogModal: React.FC<SupplierLogModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  if (!isOpen) return null;

  const mockLogs = [
    {
      id: "LOG-01",
      date: "24 Okt 2026 · 09:30 WIB",
      supplier: "PT Agro Makmur Halal",
      batch: "LOT #PK-8821",
      volume: "600 kg (Finisher)",
      halalCert: "SH: ID32110001892830823",
      status: "Lolos Lab (Aflatoksin Negatif)",
    },
    {
      id: "LOG-02",
      date: "18 Okt 2026 · 14:15 WIB",
      supplier: "Koperasi Tani Nusantara",
      batch: "LOT #PK-8740",
      volume: "650 kg (Pre-Starter)",
      halalCert: "SH: ID3122000042190822",
      status: "Lolos Uji Mikrobiologi",
    },
    {
      id: "LOG-03",
      date: "10 Okt 2026 · 11:00 WIB",
      supplier: "Bio Feed Nutrition Ltd",
      batch: "LOT #PRM-092",
      volume: "50 kg Premix & Enzim Halal",
      halalCert: "SH: ID0011000318902123",
      status: "Lolos Lab (Bebas Porcine/Babi)",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-xl rounded-2xl border p-6 shadow-2xl relative ${
            isDark ? 'bg-[#0f172a] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-1.5 rounded-lg border transition ${
              isDark ? 'border-white/10 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-500 hover:text-slate-900'
            }`}
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center text-white">
              <History className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold">Log Riwayat Penerimaan Suplier Halal</h3>
              <p className="text-xs text-slate-400">Verifikasi Uji Laboratorium &amp; Sertifikat BPJPH</p>
            </div>
          </div>

          <div className="space-y-3 font-mono-val text-xs max-h-[60vh] overflow-y-auto">
            {mockLogs.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#0a0e1a] border-white/5' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-400">{item.batch}</span>
                  <span className="text-slate-400 text-[10px]">{item.date}</span>
                </div>
                <div className={`font-semibold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.supplier}
                </div>
                <div className="text-slate-400 mt-1">
                  Volume: <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>{item.volume}</strong>
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-cyan-400" />
                    {item.halalCert}
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border ${
                isDark ? 'border-white/10 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
