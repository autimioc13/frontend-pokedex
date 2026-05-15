'use client'

import { AlertTriangle, RefreshCw } from '@/lib/utils/icons'

import { Button } from '@/components/ui/button'

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 text-center"
      role="alert"
    >
      <div className="mb-4 rounded-full bg-red-50 p-4 dark:bg-red-900/20">
        <AlertTriangle
          className="h-6 w-6 text-red-500 dark:text-red-400"
          aria-hidden="true"
        />
      </div>
      <h2 className="mb-1 text-base font-semibold text-zinc-800 dark:text-zinc-200">
        Error al cargar Pokémon
      </h2>
      <p className="mb-4 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
        No se pudo conectar con la PokéAPI. Revisa tu conexión e intenta de
        nuevo.
      </p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reintentar
        </Button>
      )}
    </div>
  )
}
