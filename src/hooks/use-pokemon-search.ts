'use client'

import { useQuery } from '@apollo/client/react'
import { useMemo } from 'react'

import { useExplorerStore } from '@/store/ui-store'
import { useDebounce } from '@/hooks/use-debounce'
import { GET_POKEMON_EXPLORER } from '@/lib/apollo/queries/pokemon'
import type {
  GetPokemonExplorerData,
  PokemonExplorerItem,
} from '@/lib/apollo/types'

const PAGE_SIZE = 24

export function buildExplorerWhere(
  search: string,
  types: string[],
  generations: number[],
): Record<string, unknown> {
  const conditions: Record<string, unknown>[] = []

  if (search.trim()) {
    conditions.push({ name: { _ilike: `%${search.trim()}%` } })
  }

  if (types.length > 0) {
    conditions.push({
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: { name: { _in: types } },
      },
    })
  }

  if (generations.length > 0) {
    conditions.push({
      pokemon_v2_pokemonspecy: { generation_id: { _in: generations } },
    })
  }

  return conditions.length > 0 ? { _and: conditions } : {}
}

export function usePokemonSearch() {
  const { search, selectedTypes, selectedGenerations } = useExplorerStore()
  const debouncedSearch = useDebounce(search, 300)

  const where = useMemo(
    () =>
      buildExplorerWhere(debouncedSearch, selectedTypes, selectedGenerations),
    [debouncedSearch, selectedTypes, selectedGenerations],
  )

  const { data, loading, error, fetchMore, refetch } =
    useQuery<GetPokemonExplorerData>(GET_POKEMON_EXPLORER, {
      variables: { limit: PAGE_SIZE, offset: 0, where },
      notifyOnNetworkStatusChange: true,
    })

  const pokemon: PokemonExplorerItem[] = data?.pokemon_v2_pokemon ?? []
  const total: number =
    data?.pokemon_v2_pokemon_aggregate?.aggregate?.count ?? 0
  const hasMore = pokemon.length < total

  const loadMore = () => {
    if (loading || !hasMore) return
    fetchMore({
      variables: { limit: PAGE_SIZE, offset: pokemon.length, where },
      updateQuery: (
        prev: GetPokemonExplorerData,
        { fetchMoreResult }: { fetchMoreResult?: GetPokemonExplorerData },
      ) => {
        if (!fetchMoreResult) return prev
        return {
          ...fetchMoreResult,
          pokemon_v2_pokemon: [
            ...prev.pokemon_v2_pokemon,
            ...fetchMoreResult.pokemon_v2_pokemon,
          ],
        }
      },
    })
  }

  return {
    pokemon,
    total,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
    debouncedSearch,
    where,
  }
}
