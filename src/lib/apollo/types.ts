// ── Detail types ────────────────────────────────────────────

export interface PokemonDetailItem {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number | null
  pokemon_v2_pokemontypes: { pokemon_v2_type: { name: string } }[]
  pokemon_v2_pokemonabilities: {
    is_hidden: boolean
    pokemon_v2_ability: { name: string }
  }[]
  pokemon_v2_pokemonstats: {
    base_stat: number
    pokemon_v2_stat: { name: string }
  }[]
  pokemon_v2_pokemonmoves: {
    level: number
    pokemon_v2_move: {
      name: string
      power: number | null
      accuracy: number | null
      pp: number | null
      pokemon_v2_type: { name: string } | null
      pokemon_v2_movedamageclass: { name: string } | null
    }
  }[]
  pokemon_v2_pokemonspecy: {
    is_legendary: boolean
    is_mythical: boolean
    generation_id: number
    pokemon_v2_pokemonspeciesflavortexts: { flavor_text: string }[]
    pokemon_v2_pokemonspeciesnames: { name: string }[]
    pokemon_v2_evolutionchain: {
      pokemon_v2_pokemonspecies: {
        id: number
        name: string
        pokemon_v2_pokemonspeciesnames: { name: string }[]
        pokemon_v2_pokemons: { id: number }[]
      }[]
    } | null
  } | null
}

export interface GetPokemonDetailData {
  pokemon_v2_pokemon: PokemonDetailItem[]
}

// ── Explorer types ───────────────────────────────────────────

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
