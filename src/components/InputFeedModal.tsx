import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlusCircle, CheckCircle2 } from 'lucide-react';

interface InputFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onAddFeed: (amountKg: number, type: 'pre-starter' | 'finisher', costPerKg: number) => void;
}

export const InputFeedModal: React.FC<InputFeedModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onAddFeed,
}) => {
  const [feedType, setFeedType] = useState<'pre-starter' | 'finisher'>('finisher');
  const [amountKg, setAmountKg] = useState<number>(250);
  const [costPerKg, setCostPerKg] = useState<number>(8500);
  const [supplier, setSupplier] = useState<string>('PT Agro Makmur Halal');
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFeed(amountKg, feedType, costPerKg);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative ${
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
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Input Penerimaan Pakan Halal</h3>
              <p className="text-xs text-slate-400">Verifikasi Silo Kandang Alpha-01</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-emerald-400">Pakan Berhasil Ditambahkan!</p>
              <p className="text-xs text-slate-400">Silo otomatis terkalibrasi dan tercatat di blockchain.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1 font-semibold text-slate-400">Target Silo Pakan</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedType('pre-starter')}
                    className={`p-2.5 rounded-lg border text-center transition font-semibold ${
                      feedType === 'pre-starter'
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300'
                        : isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Silo Alpha (Pre-Starter)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedType('finisher')}
                    className={`p-2.5 rounded-lg border text-center transition font-semibold ${
                      feedType === 'finisher'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300'
                        : isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Silo Beta (Finisher)
                  </button>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-400">Jumlah Volume (kg)</label>
                <input
                  type="number"
                  min={50}
                  max={1000}
                  step={25}
                  value={amountKg}
                  onChange={(e) => setAmountKg(Number(e.target.value))}
                  className={`w-full p-2.5 rounded-lg border font-mono-val font-semibold text-sm ${
                    isDark ? 'bg-[#0a0e1a] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-400">Harga Satuan Pakan (Rp/kg)</label>
                <input
                  type="number"
                  min={6000}
                  max={12000}
                  step={50}
                  value={costPerKg}
                  onChange={(e) => setCostPerKg(Number(e.target.value))}
                  className={`w-full p-2.5 rounded-lg border font-mono-val font-semibold text-sm ${
                    isDark ? 'bg-[#0a0e1a] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-semibold text-slate-400">Suplier Terakreditasi Halal</label>
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border ${
                    isDark ? 'bg-[#0a0e1a] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="PT Agro Makmur Halal">PT Agro Makmur Halal (SH No: ID3211...0823)</option>
                  <option value="Koperasi Tani Nusantara">Koperasi Tani Nusantara (SH No: ID3122...9901)</option>
                  <option value="Bio Feed Nutrition Ltd">Bio Feed Nutrition Ltd (SH No: ID0011...4321)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className={`px-3 py-2 rounded-lg border ${
                    isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md transition"
                >
                  Simpan &amp; Kalibrasi
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
