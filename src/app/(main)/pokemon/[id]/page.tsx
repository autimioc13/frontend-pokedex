'use client'

import { useQuery } from '@apollo/client/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { PokemonDetail } from '@/components/pokemon/pokemon-detail'
import { SkeletonDetailPage } from '@/components/ui/skeleton'
import { ArrowLeft } from '@/lib/utils/icons'
import { GET_POKEMON_DETAIL } from '@/lib/apollo/queries/pokemon'
import type { GetPokemonDetailData } from '@/lib/apollo/types'

export default function PokemonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const pokemonId = Number(id)

  const { data, loading, error } = useQuery<GetPokemonDetailData>(
    GET_POKEMON_DETAIL,
    { variables: { id: pokemonId } },
  )

  const pokemon = data?.pokemon_v2_pokemon[0]

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="sticky top-14 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-11 max-w-3xl items-center px-4 sm:px-6">
          <Link
            href="/explorer"
            className="flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Explorador
          </Link>
        </div>
      </div>

      {loading && <SkeletonDetailPage />}

      {error && !loading && (
        <div
          role="alert"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            No se pudo cargar el Pokémon. Intenta de nuevo.
          </p>
        </div>
      )}

      {pokemon && <PokemonDetail pokemon={pokemon} />}

      {!loading && !error && !pokemon && (
        <div
          role="status"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Pokémon #{pokemonId} no encontrado.
          </p>
        </div>
      )}
    </div>
  )
}
