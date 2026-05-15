'use client'

import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'

import { Moon, Sun, Monitor } from '@/lib/utils/icons'
import { cn } from '@/lib/utils/cn'

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) return <div className="h-8 w-8" />

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light')
    else if (theme === 'light') setTheme('system')
    else setTheme('dark')
  }

  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor
  const label =
    theme === 'dark' ? 'Oscuro' : theme === 'light' ? 'Claro' : 'Sistema'

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
        'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
        className,
      )}
      aria-label={`Tema: ${label}. Click para cambiar`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
