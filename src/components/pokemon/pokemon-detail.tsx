import Image from 'next/image'

import { PokemonEvolution } from '@/components/pokemon/pokemon-evolution'
import { PokemonMoves } from '@/components/pokemon/pokemon-moves'
import { PokemonStats } from '@/components/pokemon/pokemon-stats'
import { TypeBadge } from '@/components/ui/type-badge'
import { cn } from '@/lib/utils/cn'
import type { PokemonDetailItem } from '@/lib/apollo/types'

interface PokemonDetailProps {
  pokemon: PokemonDetailItem
}

function getArtworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

const GENERATION_LABEL: Record<number, string> = {
  1: 'Generación I',
  2: 'Generación II',
  3: 'Generación III',
  4: 'Generación IV',
  5: 'Generación V',
  6: 'Generación VI',
  7: 'Generación VII',
  8: 'Generación VIII',
  9: 'Generación IX',
}

export function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const species = pokemon.pokemon_v2_pokemonspecy
  const nameEs =
    species?.pokemon_v2_pokemonspeciesnames[0]?.name ?? pokemon.name
  const flavorText =
    species?.pokemon_v2_pokemonspeciesflavortexts[0]?.flavor_text
      ?.replace(/\f/g, ' ')
      .replace(/\n/g, ' ')
  const types = pokemon.pokemon_v2_pokemontypes.map(
    (t) => t.pokemon_v2_type.name,
  )
  const evolutionChain =
    species?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies ?? []

  return (
    <article className="motion-safe:animate-fade-slide-in mx-auto max-w-3xl px-4 py-6 sm:px-6">
      {/* Hero */}
      <div className="mb-6 flex flex-col items-center gap-6 sm:mb-8 sm:flex-row sm:items-start">
        <div className="relative h-44 w-44 shrink-0 sm:h-56 sm:w-56">
          <Image
            src={getArtworkUrl(pokemon.id)}
            alt={nameEs}
            fill
            sizes="224px"
            className="object-contain drop-shadow-lg"
            priority
          />
        </div>

        <div className="flex flex-col gap-3 text-center sm:text-left">
          <div>
            <p className="font-mono text-sm text-zinc-400">
              #{String(pokemon.id).padStart(4, '0')}
            </p>
            <h1 className="text-3xl font-bold text-zinc-900 capitalize dark:text-zinc-100">
              {nameEs}
            </h1>
            {species?.generation_id && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {GENERATION_LABEL[species.generation_id]}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {types.map((t) => (
              <TypeBadge key={t} type={t} size="lg" />
            ))}
          </div>

          {flavorText && (
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {flavorText}
            </p>
          )}

          <dl className="flex justify-center gap-6 sm:justify-start">
            <div className="text-center">
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">
                Altura
              </dt>
              <dd className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {(pokemon.height / 10).toFixed(1)} m
              </dd>
            </div>
            <div className="text-center">
              <dt className="text-xs text-zinc-500 dark:text-zinc-400">Peso</dt>
              <dd className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {(pokemon.weight / 10).toFixed(1)} kg
              </dd>
            </div>
            {pokemon.base_experience && (
              <div className="text-center">
                <dt className="text-xs text-zinc-500 dark:text-zinc-400">
                  Exp. base
                </dt>
                <dd className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {pokemon.base_experience}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {/* Abilities */}
      <section aria-label="Habilidades" className="mb-6 sm:mb-8">
        <h2 className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
          Habilidades
        </h2>
        <ul className="flex flex-wrap gap-2">
          {pokemon.pokemon_v2_pokemonabilities.map((a) => (
            <li
              key={a.pokemon_v2_ability.name}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-medium text-zinc-800 capitalize dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            >
              {a.pokemon_v2_ability.name.replace(/-/g, ' ')}
              {a.is_hidden && (
                <span className="ml-1.5 text-xs text-zinc-400">(oculta)</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Stats + Evolution: 2 columns on lg when evolution exists */}
      <div
        className={cn(
          'mb-6 grid gap-6 sm:mb-8 sm:gap-8',
          evolutionChain.length > 1 && 'lg:grid-cols-2',
        )}
      >
        <PokemonStats stats={pokemon.pokemon_v2_pokemonstats} />
        {evolutionChain.length > 1 && (
          <PokemonEvolution chain={evolutionChain} currentId={pokemon.id} />
        )}
      </div>

      <PokemonMoves moves={pokemon.pokemon_v2_pokemonmoves} />
    </article>
  )
}
