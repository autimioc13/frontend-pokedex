export interface PokemonTypeEntry {
  slot: number
  pokemon_v2_type: { name: string }
}

export interface PokemonExplorerItem {
  id: number
  name: string
  pokemon_v2_pokemontypes: PokemonTypeEntry[]
  pokemon_v2_pokemonspecy: {
    generation_id: number
    is_legendary: boolean
    is_mythical: boolean
  } | null
}

export interface GetPokemonExplorerData {
  pokemon_v2_pokemon: PokemonExplorerItem[]
  pokemon_v2_pokemon_aggregate: {
    aggregate: { count: number }
  }
}
