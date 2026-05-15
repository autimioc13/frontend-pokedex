'use client'

import { Filter, X } from '@/lib/utils/icons'

import { Button } from '@/components/ui/button'
import { TypeBadge } from '@/components/ui/type-badge'
import { cn } from '@/lib/utils/cn'
import {
  usePokemonFilters,
  POKEMON_GENERATIONS,
} from '@/hooks/use-pokemon-filters'

interface FilterPanelProps {
  className?: string
}

export function FilterPanel({ className }: FilterPanelProps) {
  const {
    selectedTypes,
    selectedGenerations,
    toggleType,
    toggleGeneration,
    resetFilters,
    hasActiveFilters,
    availableTypes,
  } = usePokemonFilters()

  return (
    <aside
      className={cn(
        'flex flex-col gap-4 rounded-xl border bg-white p-4',
        'border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900',
        className,
      )}
      aria-label="Filtros de Pokémon"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-500" aria-hidden="true" />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Filtros
          </span>
          {hasActiveFilters && (
            <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              {selectedTypes.length + selectedGenerations.length}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            aria-label="Limpiar todos los filtros"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Limpiar
          </Button>
        )}
      </div>

      <section>
        <h3 className="mb-2 text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Tipos
        </h3>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filtrar por tipo"
        >
          {availableTypes.map((type) => {
            const isSelected = selectedTypes.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleType(type)}
                aria-pressed={isSelected}
                className={cn(
                  'rounded-full border-2 transition-all duration-150',
                  isSelected
                    ? 'border-violet-500 ring-2 ring-violet-500/20'
                    : 'border-transparent',
                )}
              >
                <TypeBadge type={type} size="sm" />
              </button>
            )
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Generación
        </h3>
        <div
          className="flex flex-wrap gap-1.5"
          role="group"
          aria-label="Filtrar por generación"
        >
          {POKEMON_GENERATIONS.map((gen) => {
            const isSelected = selectedGenerations.includes(gen.id)
            return (
              <button
                key={gen.id}
                type="button"
                onClick={() => toggleGeneration(gen.id)}
                aria-pressed={isSelected}
                className={cn(
                  'rounded-lg border px-2.5 py-1 text-xs font-medium transition-all duration-150',
                  isSelected
                    ? 'border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50',
                  'dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-800',
                )}
              >
                {gen.label}
              </button>
            )
          })}
        </div>
      </section>
    </aside>
  )
}
