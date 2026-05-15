'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ThemeToggle } from '@/components/layout/theme-toggle'
import { cn } from '@/lib/utils/cn'
import { Search, Users, Camera, Map, User } from '@/lib/utils/icons'

const NAV_LINKS = [
  { href: '/explorer', label: 'Explorador', icon: Search },
  { href: '/team', label: 'Equipo', icon: Users },
  { href: '/scanner', label: 'Scanner', icon: Camera },
  { href: '/regions', label: 'Regiones', icon: Map },
] as const

export function Navbar() {
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="font-semibold text-zinc-900 dark:text-zinc-100"
          >
            Pokédex OS
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-100',
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/profile"
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-lg transition-colors',
                'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800',
              )}
              aria-label="Perfil"
            >
              <User className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      <nav
        className="fixed right-0 bottom-0 left-0 z-50 flex border-t border-zinc-200 bg-white/90 backdrop-blur-sm md:hidden dark:border-zinc-800 dark:bg-zinc-950/90"
        aria-label="Navegación móvil"
      >
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-3 text-xs font-medium transition-colors',
                isActive
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
