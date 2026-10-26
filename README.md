# SI-TAPAK — Sistem Telusur Halal & Profitabilitas Peternakan

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2.13-22c55e)](https://recharts.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)](https://www.framer.com/motion/)

> **SI-TAPAK** adalah dashboard enterprise agritech cerdas berbasis SCADA dan audit syariah BPJPH untuk peternakan ayam broiler modern. Mengintegrasikan pemantauan lingkungan IoT (suhu, amonia, ventilasi), rantai pasok halal terverifikasi blockchain, prediksi titik impas (BEP), serta analisis margin berbasis *Cost-Volume-Profit* (CVP).

---

## 🚀 Fitur Unggulan

- **Kesiapan Audit SJPH Mandiri**: Evaluasi otomatis 4 pilar standar Halal BPJPH Kemenag RI dengan skor kesiapan (78%) dan visualisasi semi-gauge.
- **Analisis Cost-Volume-Profit (CVP) Interaktif**: Kurva titik impas panen (BEP 980 ekor pada hari ke-28) dengan slider simulasi harga pasar live-bird.
- **Digital Twin Rantai Pasok 4-Node**:
  - `Node 01`: Silo & Pakan Halal (Stok 1.250 kg)
  - `Node 02`: Kandang Closed-House Alpha-01 (1.482 / 1.500 Ekor)
  - `Node 03`: Panen & Rumah Potong Ayam (RPA) JULEHA Mitra
  - `Node 04`: Cold Storage & QR Dispatch Rantai Dingin
- **Full Responsif (Mobile-First Optimization)**:
  - Tampilan mulus tanpa *overflow* horizontal di layar HP (iPhone/Android).
  - *Segmented View Controller* mobile untuk fokus per kategori (*Semua*, *Pakan*, *Audit & BEP*, *Digital Twin*).
- **Dual Mode Tampilan**: Mode Gelap *Industrial SCADA* & Mode Terang *Audit Dokumen*.
- **Ekspor Laporan Audit**: Unduh laporan berstandar BPJPH format `.json` atau cetak langsung ke PDF.

---

## 🛠️ Stack Teknologi

- **Frontend Core:** React 18, TypeScript, Vite
- **Styling & Design System:** Tailwind CSS, JetBrains Mono, Plus Jakarta Sans, Google Material Symbols
- **Visualisasi Grafik:** Recharts (CVP Curve & Tren Lingkungan 7 Hari)
- **Animasi UI:** Framer Motion (Breathing KPI Glow & Aliran Node Digital Twin)
- **Deployment Ready:** Vercel (`vercel.json` SPA routing support)

---

## 📦 Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/faridnadir24-bit/SI-TAPAK.git
cd SI-TAPAK

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser Anda.

---

## 🚢 Deploy ke Vercel

### Opsi A: Lewat Dashboard Vercel (Rekomendasi)
1. Buka [vercel.com/new](https://vercel.com/new).
2. Hubungkan akun GitHub Anda dan pilih repositori **`faridnadir24-bit/SI-TAPAK`**.
3. Framework Preset akan otomatis terdeteksi sebagai **Vite**.
4. Klik **Deploy** — Vercel akan otomatis melakukan build dan menyajikan URL production Anda!

### Opsi B: Lewat Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## 📄 Lisensi

Proyek ini dikembangkan untuk standarisasi industri peternakan halal digital di Indonesia.
