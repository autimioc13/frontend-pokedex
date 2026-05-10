import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        'type-fire': {
          DEFAULT: 'rgba(249, 115, 22, 0.15)',
          text: 'rgb(234, 88, 12)',
        },
        'type-water': {
          DEFAULT: 'rgba(59, 130, 246, 0.15)',
          text: 'rgb(37, 99, 235)',
        },
        'type-grass': {
          DEFAULT: 'rgba(34, 197, 94, 0.15)',
          text: 'rgb(22, 163, 74)',
        },
        'type-electric': {
          DEFAULT: 'rgba(234, 179, 8, 0.15)',
          text: 'rgb(202, 138, 4)',
        },
        'type-psychic': {
          DEFAULT: 'rgba(236, 72, 153, 0.15)',
          text: 'rgb(219, 39, 119)',
        },
        'type-ice': {
          DEFAULT: 'rgba(103, 232, 249, 0.15)',
          text: 'rgb(8, 145, 178)',
        },
        'type-dragon': {
          DEFAULT: 'rgba(99, 102, 241, 0.15)',
          text: 'rgb(79, 70, 229)',
        },
        'type-dark': {
          DEFAULT: 'rgba(68, 64, 60, 0.15)',
          text: 'rgb(41, 37, 36)',
        },
        'type-fairy': {
          DEFAULT: 'rgba(244, 114, 182, 0.15)',
          text: 'rgb(236, 72, 153)',
        },
        'type-fighting': {
          DEFAULT: 'rgba(220, 38, 38, 0.15)',
          text: 'rgb(185, 28, 28)',
        },
        'type-poison': {
          DEFAULT: 'rgba(168, 85, 247, 0.15)',
          text: 'rgb(147, 51, 234)',
        },
        'type-ground': {
          DEFAULT: 'rgba(217, 119, 6, 0.15)',
          text: 'rgb(180, 83, 9)',
        },
        'type-flying': {
          DEFAULT: 'rgba(125, 211, 252, 0.15)',
          text: 'rgb(14, 165, 233)',
        },
        'type-bug': {
          DEFAULT: 'rgba(132, 204, 22, 0.15)',
          text: 'rgb(101, 163, 13)',
        },
        'type-rock': {
          DEFAULT: 'rgba(168, 162, 158, 0.15)',
          text: 'rgb(120, 113, 108)',
        },
        'type-ghost': {
          DEFAULT: 'rgba(139, 92, 246, 0.15)',
          text: 'rgb(109, 40, 217)',
        },
        'type-steel': {
          DEFAULT: 'rgba(148, 163, 184, 0.15)',
          text: 'rgb(100, 116, 139)',
        },
        'type-normal': {
          DEFAULT: 'rgba(161, 161, 170, 0.15)',
          text: 'rgb(113, 113, 122)',
        },
      },
    },
  },
  plugins: [],
}

export default config
