'use client'

import { useExplorerStore } from '@/store/ui-store'

export const POKEMON_TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'fighting',
  'poison',
  'ground',
  'flying',
  'bug',
  'rock',
  'ghost',
  'steel',
  'normal',
] as const

export const POKEMON_GENERATIONS = [
  { id: 1, label: 'Gen I', range: '1–151' },
  { id: 2, label: 'Gen II', range: '152–251' },
  { id: 3, label: 'Gen III', range: '252–386' },
  { id: 4, label: 'Gen IV', range: '387–493' },
  { id: 5, label: 'Gen V', range: '494–649' },
  { id: 6, label: 'Gen VI', range: '650–721' },
  { id: 7, label: 'Gen VII', range: '722–809' },
  { id: 8, label: 'Gen VIII', range: '810–905' },
  { id: 9, label: 'Gen IX', range: '906–1025' },
] as const

export function usePokemonFilters() {
  const {
    selectedTypes,
    selectedGenerations,
    toggleType,
    toggleGeneration,
    resetFilters,
  } = useExplorerStore()

  const hasActiveFilters =
    selectedTypes.length > 0 || selectedGenerations.length > 0

  return {
    selectedTypes,
    selectedGenerations,
    toggleType,
    toggleGeneration,
    resetFilters,
    hasActiveFilters,
    availableTypes: POKEMON_TYPES,
    availableGenerations: POKEMON_GENERATIONS,
  }
}
