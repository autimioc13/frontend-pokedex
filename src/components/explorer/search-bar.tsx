'use client'

import { Search, X } from '@/lib/utils/icons'
import { cn } from '@/lib/utils/cn'
import { useExplorerStore } from '@/store/ui-store'

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const { search, setSearch } = useExplorerStore()

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search
        className="absolute left-3 h-4 w-4 text-zinc-400 dark:text-zinc-500"
        aria-hidden="true"
      />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar Pokémon..."
        className={cn(
          'h-10 w-full rounded-lg border bg-white pr-9 pl-9 text-sm',
          'border-zinc-200 text-zinc-900 placeholder-zinc-400',
          'focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:outline-none',
          'dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100',
          'dark:placeholder-zinc-500 dark:focus:ring-offset-zinc-950',
          'transition-colors duration-150',
        )}
        aria-label="Buscar Pokémon por nombre"
      />
      {search && (
        <button
          type="button"
          onClick={() => setSearch('')}
          className="absolute right-3 rounded text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
          aria-label="Limpiar búsqueda"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
