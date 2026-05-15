'use client'

import { SkeletonCard } from '@/components/ui/skeleton'
import { EmptyState } from '@/components/explorer/empty-state'
import { ErrorState } from '@/components/explorer/error-state'
import { FilterPanel } from '@/components/explorer/filter-panel'
import { PokemonCard } from '@/components/explorer/pokemon-card'
import { SearchBar } from '@/components/explorer/search-bar'
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll'
import { usePokemonSearch } from '@/hooks/use-pokemon-search'
import { useExplorerStore } from '@/store/ui-store'

const SKELETON_COUNT = 24

export default function ExplorerPage() {
  const { selectedTypes, selectedGenerations } = useExplorerStore()
  const {
    pokemon,
    total,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    debouncedSearch,
  } = usePokemonSearch()
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading,
  })

  const showSkeleton = loading && pokemon.length === 0
  const showError = !!error && pokemon.length === 0
  const showEmpty = !loading && !error && pokemon.length === 0
  const hasActiveFilters =
    selectedTypes.length > 0 || selectedGenerations.length > 0

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Explorador
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {loading && pokemon.length === 0
                  ? 'Cargando…'
                  : `${total.toLocaleString('es')} Pokémon`}
              </p>
            </div>
            <SearchBar className="max-w-sm flex-1" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex gap-6">
          <div className="hidden w-60 flex-shrink-0 lg:block">
            <FilterPanel className="sticky top-20" />
          </div>

          <main className="min-w-0 flex-1" aria-label="Listado de Pokémon">
            {showSkeleton && (
              <div
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                aria-busy="true"
                aria-label="Cargando Pokémon"
              >
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {showError && <ErrorState onRetry={() => refetch()} />}

            {showEmpty && (
              <EmptyState
                search={debouncedSearch}
                hasFilters={hasActiveFilters}
              />
            )}

            {pokemon.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {pokemon.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} />
                ))}
              </div>
            )}

            <div ref={sentinelRef} className="h-1" aria-hidden="true" />

            {loading && pokemon.length > 0 && (
              <div
                className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                aria-busy="true"
                aria-label="Cargando más Pokémon"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={`more-${i}`} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
