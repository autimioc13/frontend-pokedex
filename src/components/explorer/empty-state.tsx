import { Search } from '@/lib/utils/icons'

interface EmptyStateProps {
  search?: string
  hasFilters?: boolean
}

export function EmptyState({ search, hasFilters }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
        <Search
          className="h-6 w-6 text-zinc-400 dark:text-zinc-500"
          aria-hidden="true"
        />
      </div>
      <h2 className="mb-1 text-base font-semibold text-zinc-800 dark:text-zinc-200">
        {search || hasFilters ? 'Sin resultados' : 'Explorador vacío'}
      </h2>
      <p className="max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
        {search
          ? `No se encontró ningún Pokémon que coincida con "${search}".`
          : hasFilters
            ? 'Ningún Pokémon coincide con los filtros seleccionados.'
            : 'Ajusta los filtros o busca por nombre.'}
      </p>
    </div>
  )
}
