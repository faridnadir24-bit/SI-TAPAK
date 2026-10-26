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
  siloAlphaCapacity: number;
  siloBetaCapacity: number;
}

export interface SjphCompliance {
  sjphReadinessScore: number; // in percent (98.4 or 78)
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

// Preset 1: Exact Stitch Original Design (4.850 Ekor / 12.450 kg / 98.4% / BEP 3.120 Ekor)
export const stitchFlockData: FlockOverview = {
  flockSize: 5000,
  unitName: "Closed-House Alpha-01",
  batchId: "#BR-2025-04",
  currentDay: 24,
  targetHarvestDay: 32,
  mortalityCount: 150,
  currentPopulation: 4850,
  currentAvgWeightKg: 1.68,
  targetAvgWeightKg: 2.15,
};

export const stitchFeedMetrics: FeedMetrics = {
  feedStock: 12450,
  maxFeedCapacity: 15000,
  feedCostPerKg: 8750,
  dailyFeedConsumption: 480,
  daysRemainingStock: 25.9,
  fcrActual: 1.48,
  fcrTarget: 1.55,
  accumulatedFeedCost: 108937500,
  siloAlphaStock: 7200,
  siloBetaStock: 5250,
  siloAlphaCapacity: 8000,
  siloBetaCapacity: 7000,
};

export const stitchSjphCompliance: SjphCompliance = {
  sjphReadinessScore: 98.4,
  completedDocuments: 49,
  totalDocuments: 50,
  auditCountdownDays: 6,
  halalCertificateNumber: "ID32110001892830823",
  halalValidUntil: "28 November 2027",
  blockchainLedgerHash: "0x8F92...B31A",
  feedHalalStatus: "BPJPH Aktif & Terverifikasi",
  rawMaterials: [
    { name: "Bungkil Kedelai Halal (Non-GMO Verified)", status: "verified", supplier: "PT Agro Makmur Halal" },
    { name: "Jagung Pipil Grade-A Domestik", status: "verified", supplier: "Koperasi Tani Nusantara" },
    { name: "Premix & Suplemen Mineral Halal MUI", status: "verified", supplier: "Bio Feed Nutrition Ltd" },
  ],
  pillars: [
    { id: 1, title: "1. Komitmen & Tanggung Jawab", score: 100, description: "Kebijakan halal & penunjukan penyelia halal tersertifikasi" },
    { id: 2, title: "2. Bahan Pakan & Air Minum", score: 100, description: "Traceability pakan 100% halal, uji laboratorium air bersih" },
    { id: 3, title: "3. Pemeliharaan Halal (Animal Welfare)", score: 96.0, description: "Log book brooding & recording sirkulasi udara terpenuhi" },
    { id: 4, title: "4. Kemitraan RPA Halal & Distribusi", score: 98.0, description: "RPA JULEHA ID-62 terakreditasi & armada rantai dingin" },
  ],
};

export const stitchProfitability: ProfitabilityMetrics = {
  fixedCost: 22500000,
  variableCostPerBird: 17200,
  sellingPricePerKg: 21500,
  bepBirds: 3120,
  bepHarvestDay: 28,
  projectedGrossRevenue: 224198750,
  projectedTotalCost: 105920000,
  projectedNetProfit: 38620000,
  costSavingsEfficiency: 14850000,
  profitMarginPercent: 24.8,
};

export const stitchCvpData: CvpDataPoint[] = [
  { birds: 0, fixedCost: 22500000, totalCost: 22500000, revenue: 0 },
  { birds: 1500, fixedCost: 22500000, totalCost: 48300000, revenue: 69337500 },
  { birds: 3120, fixedCost: 22500000, totalCost: 76164000, revenue: 144222000, isBep: true },
  { birds: 4000, fixedCost: 22500000, totalCost: 91300000, revenue: 184900000 },
  { birds: 4850, fixedCost: 22500000, totalCost: 105920000, revenue: 224198750 },
];

export const stitchDigitalTwinNodes: DigitalTwinNode[] = [
  {
    id: "node-1",
    nodeNumber: "Node 01",
    title: "Silo & Pakan Halal",
    subtitle: "Batch: HALAL-FEED-OK #8821",
    status: "optimal",
    badgeText: "83% KAPASITAS",
    metrics: [
      { label: "Stok Total", value: "12.45 Ton", highlight: true },
      { label: "Suhu Silo", value: "24.2°C" },
      { label: "Kelembaban", value: "62% RH" },
    ],
  },
  {
    id: "node-2",
    nodeNumber: "Node 02",
    title: "Kandang Broiler Alpha-01",
    subtitle: "Animal Welfare Standard",
    status: "optimal",
    badgeText: "4.850 EKOR",
    metrics: [
      { label: "Suhu Kandang", value: "26.8°C" },
      { label: "Amonia (NH3)", value: "8.2 ppm", highlight: true },
      { label: "Fan SCADA", value: "4 / 6 On" },
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
      { label: "Target Tonase", value: "10.42 Ton" },
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

export const stitchTelemetryLogs: TelemetryLog[] = [
  {
    id: "log-1",
    time: "14:47",
    source: "Silo 1",
    message: "Sensor Amonia normal: 5.1 ppm (Aman)",
    level: "success",
  },
  {
    id: "log-2",
    time: "14:35",
    source: "BPJPH",
    message: "Validasi berkala batch pakan #PK-8821 lolos",
    level: "success",
  },
  {
    id: "log-3",
    time: "14:10",
    source: "Storage",
    message: "Kalibrasi temperatur cold storage -18.4°C",
    level: "info",
  },
  {
    id: "log-4",
    time: "13:20",
    source: "Kandang",
    message: "Tunnel ventilation SCADA switch: Fan 4 aktif otomatis.",
    level: "info",
  },
];

// Preset 2: 1.500 Ekor (Khusus bila peternak memilih batch skala mikro)
export const farm1500FlockData: FlockOverview = {
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

export const farm1500FeedMetrics: FeedMetrics = {
  feedStock: 1250,
  maxFeedCapacity: 2000,
  feedCostPerKg: 8500,
  dailyFeedConsumption: 148,
  daysRemainingStock: 8.4,
  fcrActual: 1.46,
  fcrTarget: 1.52,
  accumulatedFeedCost: 28475000,
  siloAlphaStock: 750,
  siloBetaStock: 500,
  siloAlphaCapacity: 1000,
  siloBetaCapacity: 1000,
};

export const farm1500SjphCompliance: SjphCompliance = {
  sjphReadinessScore: 78,
  completedDocuments: 39,
  totalDocuments: 50,
  auditCountdownDays: 6,
  halalCertificateNumber: "ID32110001892830823",
  halalValidUntil: "28 November 2027",
  blockchainLedgerHash: "0x8F92...B31A",
  feedHalalStatus: "BPJPH Aktif & Terverifikasi",
  rawMaterials: [
    { name: "Bungkil Kedelai Halal (Non-GMO Verified)", status: "verified", supplier: "PT Agro Makmur Halal" },
    { name: "Jagung Pipil Grade-A Domestik", status: "verified", supplier: "Koperasi Tani Nusantara" },
    { name: "Premix & Suplemen Mineral Halal MUI", status: "verified", supplier: "Bio Feed Nutrition Ltd" },
  ],
  pillars: [
    { id: 1, title: "1. Komitmen & Tanggung Jawab", score: 100, description: "Kebijakan halal & penunjukan penyelia halal tersertifikasi" },
    { id: 2, title: "2. Bahan Pakan & Air Minum", score: 92, description: "Traceability pakan 100% halal, uji laboratorium air bersih" },
    { id: 3, title: "3. Pemeliharaan Halal (Animal Welfare)", score: 68, description: "Log book brooding & recording sirkulasi udara" },
    { id: 4, title: "4. Kemitraan RPA Halal & Distribusi", score: 75, description: "RPA JULEHA ID-62 terakreditasi & checklist armada" },
  ],
};

export const farm1500Profitability: ProfitabilityMetrics = {
  fixedCost: 8200000,
  variableCostPerBird: 18500,
  sellingPricePerKg: 21500,
  bepBirds: 980,
  bepHarvestDay: 28,
  projectedGrossRevenue: 68504000,
  projectedTotalCost: 35617000,
  projectedNetProfit: 32887000,
  costSavingsEfficiency: 4650000,
  profitMarginPercent: 24.8,
};

export const farm1500CvpData: CvpDataPoint[] = [
  { birds: 0, fixedCost: 8200000, totalCost: 8200000, revenue: 0 },
  { birds: 300, fixedCost: 8200000, totalCost: 13750000, revenue: 13867500 },
  { birds: 600, fixedCost: 8200000, totalCost: 19300000, revenue: 27735000 },
  { birds: 980, fixedCost: 8200000, totalCost: 26330000, revenue: 45300500, isBep: true },
  { birds: 1200, fixedCost: 8200000, totalCost: 30400000, revenue: 55470000 },
  { birds: 1500, fixedCost: 8200000, totalCost: 35950000, revenue: 69337500 },
];

export const mockTelemetryTrends: TelemetryTrendPoint[] = [
  { day: "H-18", fcr: 1.40, temperature: 28.2, ammonia: 6.1, feedIntake: 420 },
  { day: "H-19", fcr: 1.42, temperature: 27.8, ammonia: 6.4, feedIntake: 435 },
  { day: "H-20", fcr: 1.44, temperature: 27.4, ammonia: 7.0, feedIntake: 450 },
  { day: "H-21", fcr: 1.45, temperature: 26.9, ammonia: 7.2, feedIntake: 460 },
  { day: "H-22", fcr: 1.46, temperature: 26.6, ammonia: 7.5, feedIntake: 470 },
  { day: "H-23", fcr: 1.47, temperature: 26.5, ammonia: 7.8, feedIntake: 475 },
  { day: "H-24", fcr: 1.48, temperature: 26.8, ammonia: 8.2, feedIntake: 480 },
];

// Default exports for backward compatibility & easy import
export const mockFlockData = stitchFlockData;
export const mockFeedMetrics = stitchFeedMetrics;
export const mockSjphCompliance = stitchSjphCompliance;
export const mockProfitability = stitchProfitability;
export const mockCvpData = stitchCvpData;
export const mockDigitalTwinNodes = stitchDigitalTwinNodes;
export const mockTelemetryLogs = stitchTelemetryLogs;

