export interface FlockOverview {
  flockSize: number;
  unitName: string;
  batchId: string;
  currentDay: number;
  targetHarvestDay: number;
  mortalityCount: number;
  currentPopulation: number;
  targetAvgWeightKg: number;
  currentAvgWeightKg: number;
}

export interface FeedMetrics {
  feedStock: number; // in kg
  maxFeedCapacity: number; // in kg
  feedCostPerKg: number; // in IDR
  dailyFeedConsumption: number; // in kg/day
  daysRemainingStock: number;
  fcrActual: number;
  fcrTarget: number;
  accumulatedFeedCost: number;
  siloAlphaStock: number;
  siloBetaStock: number;
}

export interface SjphCompliance {
  sjphReadinessScore: number; // in percent (78%)
  completedDocuments: number;
  totalDocuments: number;
  auditCountdownDays: number;
  halalCertificateNumber: string;
  halalValidUntil: string;
  blockchainLedgerHash: string;
  feedHalalStatus: string;
  rawMaterials: {
    name: string;
    status: 'verified' | 'pending' | 'review';
    supplier: string;
  }[];
  pillars: {
    id: number;
    title: string;
    score: number;
    description: string;
  }[];
}

export interface ProfitabilityMetrics {
  fixedCost: number;
  variableCostPerBird: number;
  sellingPricePerKg: number;
  bepBirds: number;
  bepHarvestDay: number;
  projectedGrossRevenue: number;
  projectedTotalCost: number;
  projectedNetProfit: number;
  costSavingsEfficiency: number;
  profitMarginPercent: number;
}

export interface CvpDataPoint {
  birds: number;
  fixedCost: number;
  totalCost: number;
  revenue: number;
  isBep?: boolean;
}

export interface TelemetryTrendPoint {
  day: string;
  fcr: number;
  temperature: number;
  ammonia: number;
  feedIntake: number;
}

export interface DigitalTwinNode {
  id: string;
  nodeNumber: string;
  title: string;
  subtitle: string;
  status: 'normal' | 'optimal' | 'standby' | 'alert';
  badgeText: string;
  metrics: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
}

export interface TelemetryLog {
  id: string;
  time: string;
  source: string;
  message: string;
  level: 'info' | 'success' | 'warning';
}

export const mockFlockData: FlockOverview = {
  flockSize: 1500,
  unitName: "Closed-House Alpha-01",
  batchId: "#BR-2026-04",
  currentDay: 24,
  targetHarvestDay: 32,
  mortalityCount: 18,
  currentPopulation: 1482,
  currentAvgWeightKg: 1.62,
  targetAvgWeightKg: 2.15,
};

export const mockFeedMetrics: FeedMetrics = {
  feedStock: 1250, // 1.250 kg as instructed
  maxFeedCapacity: 2000,
  feedCostPerKg: 8500, // 8.500 Rp as instructed
  dailyFeedConsumption: 148, // kg per day for 1.500 birds
  daysRemainingStock: 8.4,
  fcrActual: 1.46,
  fcrTarget: 1.52,
  accumulatedFeedCost: 28475000,
  siloAlphaStock: 750,
  siloBetaStock: 500,
};

export const mockSjphCompliance: SjphCompliance = {
  sjphReadinessScore: 78, // 78 % as instructed
  completedDocuments: 39,
  totalDocuments: 50,
  auditCountdownDays: 6,
  halalCertificateNumber: "ID32110001892830823",
  halalValidUntil: "28 November 2027",
  blockchainLedgerHash: "0x8F92D74B4A9E...B31A",
  feedHalalStatus: "BPJPH Aktif & Terverifikasi",
  rawMaterials: [
    { name: "Bungkil Kedelai Halal (Non-GMO Verified)", status: "verified", supplier: "PT Agro Makmur Halal" },
    { name: "Jagung Pipil Grade-A Domestik", status: "verified", supplier: "Koperasi Tani Nusantara" },
    { name: "Premix & Suplemen Mineral Halal MUI", status: "verified", supplier: "Bio Feed Nutrition Ltd" },
    { name: "Enzim Fitase Terakreditasi Halal", status: "verified", supplier: "Enzyme Prime Asia" },
  ],
  pillars: [
    { id: 1, title: "1. Komitmen & Manajemen Halal", score: 100, description: "Kebijakan halal & penunjukan penyelia halal tersertifikasi" },
    { id: 2, title: "2. Bahan Baku & Air Minum", score: 92, description: "Traceability pakan 100% halal, uji laboratorium air bersih" },
    { id: 3, title: "3. Pemeliharaan & Animal Welfare", score: 68, description: "Log book brooding & recording sirkulasi udara (tahap finalisasi)" },
    { id: 4, title: "4. Kemitraan RPA JULEHA & Logistik", score: 75, description: "Verifikasi sertifikat RPH mitra & checklist armada bersih" },
  ],
};

export const mockProfitability: ProfitabilityMetrics = {
  fixedCost: 8200000,
  variableCostPerBird: 18500,
  sellingPricePerKg: 21500,
  bepBirds: 980, // BEP reached at 980 birds
  bepHarvestDay: 28,
  projectedGrossRevenue: 68504000, // 1482 birds * 2.15 kg * 21500 Rp
  projectedTotalCost: 35617000,
  projectedNetProfit: 32887000,
  costSavingsEfficiency: 4650000, // Efisiensi penghematan biaya pakan berkat FCR 1.46
  profitMarginPercent: 24.8,
};

// CVP Curve dataset for 0 to 1,500 birds (scaled to 1.500 ekor)
export const mockCvpData: CvpDataPoint[] = [
  { birds: 0, fixedCost: 8200000, totalCost: 8200000, revenue: 0 },
  { birds: 300, fixedCost: 8200000, totalCost: 13750000, revenue: 13867500 },
  { birds: 600, fixedCost: 8200000, totalCost: 19300000, revenue: 27735000 },
  { birds: 980, fixedCost: 8200000, totalCost: 26330000, revenue: 45300500, isBep: true },
  { birds: 1200, fixedCost: 8200000, totalCost: 30400000, revenue: 55470000 },
  { birds: 1500, fixedCost: 8200000, totalCost: 35950000, revenue: 69337500 },
];

export const mockTelemetryTrends: TelemetryTrendPoint[] = [
  { day: "H-18", fcr: 1.38, temperature: 28.2, ammonia: 5.1, feedIntake: 125 },
  { day: "H-19", fcr: 1.40, temperature: 27.8, ammonia: 5.4, feedIntake: 130 },
  { day: "H-20", fcr: 1.42, temperature: 27.4, ammonia: 6.0, feedIntake: 136 },
  { day: "H-21", fcr: 1.43, temperature: 26.9, ammonia: 6.2, feedIntake: 140 },
  { day: "H-22", fcr: 1.45, temperature: 26.6, ammonia: 6.5, feedIntake: 144 },
  { day: "H-23", fcr: 1.45, temperature: 26.5, ammonia: 6.7, feedIntake: 146 },
  { day: "H-24", fcr: 1.46, temperature: 26.4, ammonia: 6.8, feedIntake: 148 },
];

export const mockDigitalTwinNodes: DigitalTwinNode[] = [
  {
    id: "node-1",
    nodeNumber: "Node 01",
    title: "Silo & Pakan Halal",
    subtitle: "Batch: HALAL-FEED-OK #8821",
    status: "optimal",
    badgeText: "STOK AMAN",
    metrics: [
      { label: "Stok Total", value: "1.250 kg", highlight: true },
      { label: "Suhu Silo", value: "24.2°C" },
      { label: "Kelembaban", value: "58% RH" },
    ],
  },
  {
    id: "node-2",
    nodeNumber: "Node 02",
    title: "Kandang Broiler Alpha-01",
    subtitle: "Animal Welfare & Biosafety Std",
    status: "optimal",
    badgeText: "1.482 EKOR",
    metrics: [
      { label: "Suhu Kandang", value: "26.4°C" },
      { label: "Amonia (NH3)", value: "6.8 ppm", highlight: true },
      { label: "Fan SCADA", value: "3 / 4 On" },
    ],
  },
  {
    id: "node-3",
    nodeNumber: "Node 03",
    title: "Panen & RPA Terakreditasi",
    subtitle: "JULEHA Mitra ID-62 Tersertifikasi",
    status: "normal",
    badgeText: "8 HARI LAGI",
    metrics: [
      { label: "Target Tonase", value: "3.18 Ton" },
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
      { label: "Suhu Ruang", value: "-18.5°C" },
      { label: "QR Dispatch", value: "Auto-Gen Siap", highlight: true },
    ],
  },
];

export const mockTelemetryLogs: TelemetryLog[] = [
  {
    id: "log-1",
    time: "13:12",
    source: "Silo 1",
    message: "Sensor ultrasonik mendeteksi sisa stok pakan: 1.250 kg (Optimal).",
    level: "success",
  },
  {
    id: "log-2",
    time: "12:55",
    source: "BPJPH",
    message: "Verifikasi otomatis sertifikat bahan premix ID32110001892830823 lolos.",
    level: "success",
  },
  {
    id: "log-3",
    time: "12:30",
    source: "SCADA",
    message: "Ventilasi tunnel fan otomatis aktif: sensor NH3 terbaca 6.8 ppm.",
    level: "info",
  },
  {
    id: "log-4",
    time: "11:45",
    source: "Storage",
    message: "Kalibrasi berkala sensor termal buffer rantai dingin: -18.5°C normal.",
    level: "info",
  },
  {
    id: "log-5",
    time: "10:15",
    source: "SJPH",
    message: "Checklist audit pilar 3 (Animal welfare log) diperbarui: skor 78%.",
    level: "warning",
  },
];
