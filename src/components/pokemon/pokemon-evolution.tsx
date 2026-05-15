import Image from 'next/image'
import Link from 'next/link'

import { ChevronRight } from '@/lib/utils/icons'

interface EvolutionSpecies {
  id: number
  name: string
  pokemon_v2_pokemonspeciesnames: { name: string }[]
  pokemon_v2_pokemons: { id: number }[]
}

interface PokemonEvolutionProps {
  chain: EvolutionSpecies[]
  currentId: number
}

function getArtworkUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function PokemonEvolution({ chain, currentId }: PokemonEvolutionProps) {
  if (chain.length <= 1) return null

  return (
    <section aria-label="Cadena evolutiva">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
        Evolución
      </h2>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max items-center justify-center gap-2">
          {chain.map((species, index) => {
            const pokemonId = species.pokemon_v2_pokemons[0]?.id ?? species.id
            const displayName =
              species.pokemon_v2_pokemonspeciesnames[0]?.name ?? species.name
            const isCurrent = pokemonId === currentId

            return (
              <div key={species.id} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-zinc-400"
                    aria-hidden="true"
                  />
                )}
                <Link
                  href={`/pokemon/${pokemonId}`}
                  className={`group flex flex-col items-center gap-1 rounded-xl p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60 ${
                    isCurrent
                      ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-zinc-950'
                      : ''
                  }`}
                  aria-current={isCurrent ? 'true' : undefined}
                >
                  <div className="relative h-16 w-16">
                    <Image
                      src={getArtworkUrl(pokemonId)}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-700 capitalize dark:text-zinc-300">
                    {displayName}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
