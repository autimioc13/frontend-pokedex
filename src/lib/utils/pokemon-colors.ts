export type PokemonTypeName =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'steel'
  | 'normal'

interface TypeColor {
  bg: string
  text: string
  border: string
  hex: string
}

export const POKEMON_TYPE_COLORS: Record<PokemonTypeName, TypeColor> = {
  fire: {
    bg: 'bg-orange-500/15',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/30',
    hex: '#f97316',
  },
  water: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    hex: '#3b82f6',
  },
  grass: {
    bg: 'bg-green-500/15',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500/30',
    hex: '#22c55e',
  },
  electric: {
    bg: 'bg-yellow-500/15',
    text: 'text-yellow-600 dark:text-yellow-400',
    border: 'border-yellow-500/30',
    hex: '#eab308',
  },
  psychic: {
    bg: 'bg-pink-500/15',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'border-pink-500/30',
    hex: '#ec4899',
  },
  ice: {
    bg: 'bg-cyan-400/15',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-400/30',
    hex: '#67e8f9',
  },
  dragon: {
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500/30',
    hex: '#6366f1',
  },
  dark: {
    bg: 'bg-stone-700/15',
    text: 'text-stone-700 dark:text-stone-400',
    border: 'border-stone-700/30',
    hex: '#44403c',
  },
  fairy: {
    bg: 'bg-pink-400/15',
    text: 'text-pink-500 dark:text-pink-300',
    border: 'border-pink-400/30',
    hex: '#f472b6',
  },
  fighting: {
    bg: 'bg-red-600/15',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-600/30',
    hex: '#dc2626',
  },
  poison: {
    bg: 'bg-purple-500/15',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    hex: '#a855f7',
  },
  ground: {
    bg: 'bg-amber-600/15',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-600/30',
    hex: '#d97706',
  },
  flying: {
    bg: 'bg-sky-400/15',
    text: 'text-sky-600 dark:text-sky-400',
    border: 'border-sky-400/30',
    hex: '#7dd3fc',
  },
  bug: {
    bg: 'bg-lime-500/15',
    text: 'text-lime-600 dark:text-lime-400',
    border: 'border-lime-500/30',
    hex: '#84cc16',
  },
  rock: {
    bg: 'bg-stone-400/15',
    text: 'text-stone-500 dark:text-stone-400',
    border: 'border-stone-400/30',
    hex: '#a8a29e',
  },
  ghost: {
    bg: 'bg-violet-500/15',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/30',
    hex: '#8b5cf6',
  },
  steel: {
    bg: 'bg-slate-400/15',
    text: 'text-slate-500 dark:text-slate-400',
    border: 'border-slate-400/30',
    hex: '#94a3b8',
  },
  normal: {
    bg: 'bg-zinc-400/15',
    text: 'text-zinc-500 dark:text-zinc-400',
    border: 'border-zinc-400/30',
    hex: '#a1a1aa',
  },
}
