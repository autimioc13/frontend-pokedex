'use client'

import Image from 'next/image'

import { TypeBadge } from '@/components/ui/type-badge'
import { cn } from '@/lib/utils/cn'
import type { PokemonExplorerItem } from '@/lib/apollo/types'

interface PokemonCardProps {
  pokemon: PokemonExplorerItem
  onClick?: () => void
  className?: string
}

function getArtworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

function formatNumber(id: number): string {
  return `#${String(id).padStart(4, '0')}`
}

export function PokemonCard({ pokemon, onClick, className }: PokemonCardProps) {
  const types = pokemon.pokemon_v2_pokemontypes
    .slice()
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.pokemon_v2_type.name)

  const isLegendary = pokemon.pokemon_v2_pokemonspecy?.is_legendary ?? false
  const isMythical = pokemon.pokemon_v2_pokemonspecy?.is_mythical ?? false
  const isSpecial = isLegendary || isMythical

  const primaryType = types[0] ?? 'normal'

  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-xl border transition-all duration-200',
        'cursor-pointer border-zinc-200 bg-white select-none',
        'hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-sm',
        'active:translate-y-0 active:shadow-none',
        'dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700',
        className,
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      aria-label={`${pokemon.name}, tipo ${primaryType}`}
    >
      <span className="absolute top-2 left-3 font-mono text-xs text-zinc-400 tabular-nums dark:text-zinc-500">
        {formatNumber(pokemon.id)}
      </span>

      {isSpecial && (
        <span className="absolute top-2 right-2 rounded-full bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          {isMythical ? 'M' : 'L'}
        </span>
      )}

      <div className="relative mx-auto mt-6 mb-2 h-24 w-24">
        <Image
          src={getArtworkUrl(pokemon.id)}
          alt={pokemon.name}
          fill
          sizes="96px"
          className="object-contain drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <p className="truncate px-3 pb-1 text-center text-sm font-medium text-zinc-900 capitalize dark:text-zinc-100">
        {pokemon.name}
      </p>

      <div className="flex flex-wrap justify-center gap-1 px-3 pb-4">
        {types.map((type) => (
          <TypeBadge key={type} type={type} size="sm" />
        ))}
      </div>
    </article>
  )
}
