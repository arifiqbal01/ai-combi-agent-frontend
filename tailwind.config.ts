import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(var(--brand))',

        bg: {
          app: 'rgb(var(--bg-app))',
          surface: 'rgb(var(--bg-surface))',
          soft: 'rgb(var(--bg-surface-soft))',
          muted: 'rgb(var(--bg-muted))',
          sidebar: 'rgb(var(--bg-sidebar))',
        },

        /* 🔥 ADD THIS BLOCK */
        ai: {
          strip: 'rgb(var(--ai-strip) / <alpha-value>)',
          surface: 'rgb(var(--ai-surface) / <alpha-value>)',
          accent: 'rgb(var(--ai-accent) / <alpha-value>)',
          strong: 'rgb(var(--ai-strong) / <alpha-value>)',
          border: 'rgb(var(--ai-border) / <alpha-value>)',
        },

        text: {
          primary: 'rgb(var(--text-primary))',
          secondary: 'rgb(var(--text-secondary))',
          muted: 'rgb(var(--text-muted))',
          inverse: 'rgb(var(--text-inverse))',
        },

        border: {
          subtle: 'rgb(var(--border-subtle))',
          strong: 'rgb(var(--border-strong))',
        },
      },

      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      boxShadow: {
        sm: '0 1px 1px rgba(0,0,0,0.02)',
        md: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

export default config