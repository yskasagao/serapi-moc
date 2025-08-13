/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ui: {
          background: '#ffffff',
          foreground: '#4a4a4a',
          border: '#e5e5e5',
          hover: '#f5f5f5',
          focus: '#e6f3ff',
          disabled: '#f3f4f6',
        },
        // ブランドカラー - インタラクション別統一システム
        brand: {
          // アイコン系統
          'icon': '#FE2C55',           // インタラクティブアイコン
          'icon-hover': '#E8254A',     // インタラクティブアイコンホバー
          'icon-static': '#FE2C55',    // 非インタラクティブアイコン（装飾等）
          
          // UIパーツ系統
          'ui': '#ff7e8a',             // インタラクティブUIパーツ
          'ui-hover': '#ff6b7a',       // インタラクティブUIパーツホバー
          'ui-static': '#ff7e8a',      // 非インタラクティブUIパーツ（装飾等）
          
          // 後方互換性維持（段階的移行用）
          primary: '#ff7e8a',
          secondary: '#4a4a4a',
          accent: '#d1d5db',
          light: '#ff9eb8',
          dark: '#ff6b7a',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate')],
}
