import { create } from 'zustand'

export type SortOption = 'id' | 'name'
export type ViewMode = 'grid' | 'list'

interface ExplorerState {
  search: string
  selectedTypes: string[]
  selectedGenerations: number[]
  sortBy: SortOption
  viewMode: ViewMode

  setSearch: (search: string) => void
  toggleType: (type: string) => void
  toggleGeneration: (gen: number) => void
  setSortBy: (sort: SortOption) => void
  setViewMode: (mode: ViewMode) => void
  resetFilters: () => void
}

export const useExplorerStore = create<ExplorerState>((set) => ({
  search: '',
  selectedTypes: [],
  selectedGenerations: [],
  sortBy: 'id',
  viewMode: 'grid',

  setSearch: (search) => set({ search }),

  toggleType: (type) =>
    set((state) => ({
      selectedTypes: state.selectedTypes.includes(type)
        ? state.selectedTypes.filter((t) => t !== type)
        : [...state.selectedTypes, type],
    })),

  toggleGeneration: (gen) =>
    set((state) => ({
      selectedGenerations: state.selectedGenerations.includes(gen)
        ? state.selectedGenerations.filter((g) => g !== gen)
        : [...state.selectedGenerations, gen],
    })),

  setSortBy: (sortBy) => set({ sortBy }),
  setViewMode: (viewMode) => set({ viewMode }),

  resetFilters: () =>
    set({
      search: '',
      selectedTypes: [],
      selectedGenerations: [],
      sortBy: 'id',
    }),
}))
