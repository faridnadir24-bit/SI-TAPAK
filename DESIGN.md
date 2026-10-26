# SI-TAPAK — Design System & Specification

> **Project:** SI-TAPAK Halal Farm Dashboard  
> **Origin:** Google Stitch (`projects/13482656772309186431`)  
> **Theme Name:** Halal Poultry Telemetry & Profit Engine  
> **Design Philosophy:** Industrial Glassmorphism with Cybernetic Precision  

---

## 1. Brand & Aesthetic Direction

The SI-TAPAK interface is designed as an ultra-precise, mission-critical **SCADA & Agritech Control Interface** tailored for industrial smart poultry operations and regulatory halal tracking (BPJPH / SJPH).

- **Authority & Sterile Precision**: Evokes the surgical precision of an aerospace cockpit fused with strict compliance monitoring.
- **High-Density Information Architecture**: Optimized for industrial farm kiosks, multi-monitor control desks, and field tablets.
- **Strict Semantic Color Rails**: Color is used strictly functional—never decorative—to prevent cognitive overload across dense telemetry streams.
- **Tactile Component Hardware**: Razor-thin glass boundaries, micro-illuminated edge highlights, and zero non-functional visual noise.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Foundation Layers (Dark Void — SCADA Mode)

| Token | Hex / Value | Role / Usage |
| :--- | :--- | :--- |
| **Base Canvas** | `#0a0e1a` | Deepest navy-black ambient backdrop |
| **Surface Mid** | `#0f172a` | Container & docked grid pane backdrop (80% opacity) |
| **Surface Raised** | `#131b2e` | Active telemetry cards, metric blocks, widgets |
| **Glass Highlight** | `rgba(255, 255, 255, 0.05)` | Frosted glass overlay fills |
| **Structural Borders** | `rgba(255, 255, 255, 0.08)` | Neutral 1px card outlines |
| **Active Border** | `rgba(255, 255, 255, 0.12)` | Focused or elevated card borders |

### 2.2 Semantic Telemetry Rails

| Semantic Rail | Primary Hex | Accent / Gradient | Meaning / Application |
| :--- | :--- | :--- | :--- |
| **Halal & Compliance** | `#10b981` *(Emerald)* | `#166534` *(Forest)* | Unbroken cold chain, verified feed provenance, BPJPH / SJPH certification, passing biosafety indices |
| **Physical Telemetry** | `#06b6d4` *(Technical Cyan)* | `#4cd7f6` | Sensor feeds: ambient temperature, ammonia (NH3 ppm), humidity (% RH), ventilation CFM |
| **Profit & Volatility** | `#f59e0b` *(Amber-Gold)* | `#b45309` *(Ochre)* | FCR (Feed Conversion Ratio), BEP thresholds, live margin per bird, feed cost shifts |
| **Critical Alert** | `#f43f5e` *(Rose Red)* | `#93000a` | Biosafety breaches, extreme heat spikes, sensor loss, compliance violation flags |

### 2.3 Light Mode / Audit View Tokens (from Screen Implementation)

| Token | Value | Role |
| :--- | :--- | :--- |
| **Audit Canvas** | `#f8fafc` | Clean slate background for printable/audit export |
| **Card Surface** | `#ffffff` | Pure white card surfaces with `border-slate-200/80` |
| **Brand Primary** | `#166534` | Deep forest green for primary headers & CTAs |
| **Brand Accent** | `#15803d` | Mid emerald for gauge arcs and active indicators |
| **Warning / Ochre** | `#b45309` | BEP line charts, alert markers, time countdowns |

### 2.4 Contrast & Typography Neutrals

- **Primary Data / Numbers**: `#f8fafc` (Dark Mode) / `#0f172a` (Light Mode)
- **Secondary Descriptors**: `#94a3b8` (Slate 400) / `#64748b` (Slate 500)
- **Inactive Units / Subdued**: `#475569` (Slate 600) / `#94a3b8`
- **Glow Constraints**: Ambient chromatic glow must remain tight (`blur(8px)` to `blur(16px)` max) to prevent visual bleeding.

---

## 3. Typography System

The typography strictly bifurcates into **two operational disciplines**:

```
UI & Structural Hierarchy       ──►  Plus Jakarta Sans  (High x-height, clear readability)
Instruments, Metrics & Hashes   ──►  JetBrains Mono    (Tabular figures, zero jitter)
```

### 3.1 Type Scale

| Style Token | Font Family | Size | Weight | Line Height | Application |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`headline-xl`** | Plus Jakarta Sans | `36px` | 700 (Bold) | `44px` | Master dashboard banner, KPI hero |
| **`headline-xl-mobile`** | Plus Jakarta Sans | `26px` | 700 (Bold) | `34px` | Responsive hero for small screens |
| **`headline-lg`** | Plus Jakarta Sans | `28px` | 600 (Semi) | `36px` | Section titles, modal headers |
| **`headline-lg-mobile`** | Plus Jakarta Sans | `22px` | 600 (Semi) | `30px` | Section titles (tablet/mobile) |
| **`headline-md`** | Plus Jakarta Sans | `20px` | 600 (Semi) | `28px` | Column headers, widget titles |
| **`body-lg`** | Plus Jakarta Sans | `16px` | 400 (Regular)| `24px` | Explanatory text, card summaries |
| **`body-md`** | Plus Jakarta Sans | `14px` | 400 (Regular)| `20px` | Default body copy, table text |
| **`body-sm`** | Plus Jakarta Sans | `12px` | 400 (Regular)| `16px` | Inline notes, helper captions |
| **`telemetry-metric-lg`** | JetBrains Mono | `32px` | 700 (Bold) | `36px` | Primary KPI numbers (e.g. 98.4%, 12.450 kg) |
| **`telemetry-metric-lg-m`** | JetBrains Mono | `24px` | 700 (Bold) | `28px` | KPI numbers on compact viewports |
| **`telemetry-metric-md`** | JetBrains Mono | `20px` | 600 (Semi) | `24px` | Secondary card metrics, BEP values |
| **`telemetry-metric-sm`** | JetBrains Mono | `14px` | 500 (Medium)| `18px` | Table values, inline telemetry chips |
| **`label-caps`** | JetBrains Mono | `11px` | 600 (Semi) | `14px` | Uppercase tracking (`letter-spacing: 0.08em`) for hardware badges |

---

## 4. Layout & Spacing Rules

### 4.1 Responsive Grid Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│ Top Navigation & Status Bar (Sticky, h-16, max-w-[1720px])             │
├────────────────────────────────────────────────────────────────────────┤
│ 4-Card Summary KPI Bar (1 col sm:2 col lg:4 col, gap-4)               │
├────────────────────────────────┬───────────────────┬───────────────────┤
│ Column 1 (4 cols)              │ Column 2 (4 cols) │ Column 3 (4 cols) │
│ Parameter & Sertifikasi Pakan  │ Audit & Profit    │ Digital Twin      │
│ - Stok Pakan (Silo 1 & 2)      │ - SJPH Semi-Gauge │ - 4 Flow Nodes    │
│ - Biaya per Kg                 │ - BEP Predictor   │ - Telemetry Event │
│ - BPJPH Status & Hash          │ - CVP Curve Chart │   Stream Log      │
└────────────────────────────────┴───────────────────┴───────────────────┘
```

- **Desktop / Control Desk (1440px+)**:
  - Max container width: `1720px`
  - 12-column responsive grid (`lg:grid-cols-12`, 3 columns × 4 cols each)
  - Outer margins: `2rem` (`margin-lg`)
  - Gutters: `1.5rem` (`gutter-lg`)
- **Industrial Tablet / Kiosk (768px – 1439px)**:
  - 8-column layout / stacked cards
  - Outer margins: `1.5rem` (`margin-md`)
  - Gutters: `1rem` (`gutter`)
- **Mobile Handheld (< 768px)**:
  - Single column fluid layout (`grid-cols-1`)
  - Margins: `1rem` (`margin`)
  - Sticky bottom/top alert rail

### 4.2 Spacing Constants

```yaml
spacing:
  space-xs: 0.25rem   # 4px  - Label-to-metric proximity
  space-sm: 0.5rem    # 8px  - Connected node gaps, tag internal spacing
  space-md: 1.0rem    # 16px - Sensor card inner padding, default gutters
  space-lg: 1.5rem    # 24px - Section dividers, primary column gaps
  space-xl: 2.0rem    # 32px - Layout outer bounds
```

- **Visual Proximity Rule**: Status labels sit exactly `space-xs` (`0.25rem`) directly above their corresponding monospace readout.
- **Sensor Density Rule**: Internal telemetry cards utilize `space-md` (`1rem`) padding to maximize packing density without visual collision.
- **Node Pipeline Rule**: Inter-connected operational nodes utilize `space-sm` (`0.5rem`) gaps with centered SVG vector connectors.

---

## 5. Elevation, Glassmorphism & Shapes

### 5.1 Elevation Levels

- **Level 0 (Base Canvas)**: Flat `#0a0e1a` (Dark) / `#f8fafc` (Light).
- **Level 1 (Docked Containers & Headers)**:
  - Background: `rgba(15, 23, 42, 0.8)` with `backdrop-filter: blur(12px)`.
  - Border: 1px solid `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Active Telemetry Cards)**:
  - Background: `rgba(19, 27, 46, 0.75)` with `backdrop-filter: blur(16px)`.
  - Border: 1px solid `rgba(255, 255, 255, 0.12)`.
  - Inner Top Highlight: Inset `0 1px 0 rgba(255, 255, 255, 0.10)`.
  - Ambient Shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.5)`.
- **Level 3 (Modals & Deep Diagnostics)**:
  - Background: `rgba(19, 27, 46, 0.95)` with `backdrop-filter: blur(24px)`.
  - Ambient Shadow: `0 20px 40px -8px rgba(0, 0, 0, 0.8)`.

### 5.2 Shapes & Radius Tokens

```yaml
rounded:
  sm: 0.125rem   # 2px  - Micro-tags, sparkline markers
  DEFAULT: 0.25rem # 4px - Hardware cards, buttons, telemetry cells (ROUND_FOUR)
  md: 0.375rem   # 6px  - Sub-containers, data inputs
  lg: 0.5rem    # 8px  - Chart frames, diagnostic panels
  xl: 0.75rem   # 12px - Master container panels
  full: 9999px  # Fully rounded - Status LEDs, pulse indicators only
```

> **Design Principle:** Standard structural panels and interactive controls maintain a crisp `4px` (`0.25rem`) manufactured hardware corner. `rounded-full` is strictly reserved for live pulse LEDs and status chips.

---

## 6. Signature Hardware Components

### 6.1 Telemetry Metric Blocks
- Header bar containing `label-caps` indicator and a 6px status LED.
- Primary number in `telemetry-metric-lg` (`JetBrains Mono`, `font-feature-settings: 'tnum' on`).
- Units (kg, ppm, °C, %) inline in `body-sm`.
- Integrated 2px progress rail or SVG sparkline at the base.

### 6.2 Semi-Circle SJPH Audit Gauge
- 180° / 220° arc gauge with background track (`#e2e8f0` or `rgba(255,255,255,0.06)`).
- Forest green stroke (`#15803d` / `#10b981`) for readiness percentage.
- Centered digital readout with index denomination (`/ 100`).

### 6.3 Digital Twin Node Pipeline
- Vertical 4-stage pipeline:
  1. **Node 01:** Silo & Pakan Halal (Feed stock, temperature, humidity)
  2. **Node 02:** Kandang Closed House (Bird count, NH3 ppm, SCADA ventilation)
  3. **Node 03:** Panen & RPA Mitra (JULEHA slaughterhouse verification)
  4. **Node 04:** Cold Storage & QR Dispatch (Sub-zero chain custody)
- Connected by vertical directional SVG vector arrows with live pulse status.

### 6.4 Cost-Volume-Profit (CVP) Interactive Chart
- Linear SVG break-even chart visualizing:
  - **Fixed Cost Line**: Dashed slate (`#94a3b8`)
  - **Total Cost Curve**: Warm ochre (`#b45309`)
  - **Revenue Curve**: Muted forest green (`#15803d`)
  - **BEP Point Marker**: Dual concentric circle with highlight tooltip label
