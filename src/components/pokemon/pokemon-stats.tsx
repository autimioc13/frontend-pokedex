'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils/cn'

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATQ',
  defense: 'DEF',
  'special-attack': 'ATQE',
  'special-defense': 'DEFE',
  speed: 'VEL',
}

function getStatColor(value: number) {
  if (value >= 100) return 'bg-emerald-500'
  if (value >= 60) return 'bg-yellow-500'
  return 'bg-red-400'
}

interface Stat {
  base_stat: number
  pokemon_v2_stat: { name: string }
}

interface PokemonStatsProps {
  stats: Stat[]
}

export function PokemonStats({ stats }: PokemonStatsProps) {
  const [animated, setAnimated] = useState(false)
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0)

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section aria-label="Estadísticas base">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
        Estadísticas
      </h2>
      <div className="space-y-2.5">
        {stats.map((stat) => {
          const label =
            STAT_LABELS[stat.pokemon_v2_stat.name] ?? stat.pokemon_v2_stat.name
          const pct = Math.round((stat.base_stat / 255) * 100)
          return (
            <div
              key={stat.pokemon_v2_stat.name}
              className="flex items-center gap-3"
            >
              <span className="w-10 shrink-0 text-right font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {label}
              </span>
              <span className="w-8 shrink-0 text-right font-mono text-xs font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
                {stat.base_stat}
              </span>
              <div
                className="flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
                style={{ height: 6 }}
              >
                <div
                  className={cn(
                    'h-full rounded-full transition-[width] duration-700 ease-out',
                    getStatColor(stat.base_stat),
                  )}
                  style={{ width: animated ? `${pct}%` : '0%' }}
                  role="progressbar"
                  aria-valuenow={stat.base_stat}
                  aria-valuemin={0}
                  aria-valuemax={255}
                  aria-label={`${label}: ${stat.base_stat}`}
                />
              </div>
            </div>
          )
        })}
        <div className="flex items-center gap-3 border-t border-zinc-100 pt-2 dark:border-zinc-800">
          <span className="w-10 shrink-0 text-right font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
            TOT
          </span>
          <span className="w-8 shrink-0 text-right font-mono text-xs font-bold text-zinc-900 tabular-nums dark:text-zinc-100">
            {total}
          </span>
        </div>
      </div>
    </section>
  )
}
