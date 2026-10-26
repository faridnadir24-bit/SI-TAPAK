/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          emerald: '#10b981',
        },
        scada: {
          void: '#0a0e1a',
          mid: '#0f172a',
          raised: '#131b2e',
          border: 'rgba(255, 255, 255, 0.08)',
          borderActive: 'rgba(255, 255, 255, 0.16)',
          cyan: '#06b6d4',
          cyanLight: '#4cd7f6',
          amber: '#f59e0b',
          ochre: '#b45309',
          alert: '#f43f5e',
        }
      },
      boxShadow: {
        'glow-emerald': '0 0 20px -2px rgba(16, 185, 129, 0.35)',
        'glow-cyan': '0 0 20px -2px rgba(6, 182, 212, 0.35)',
        'glow-amber': '0 0 20px -2px rgba(245, 158, 11, 0.35)',
        'glow-rose': '0 0 20px -2px rgba(244, 63, 94, 0.35)',
        'glass-card': '0 8px 32px -4px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
