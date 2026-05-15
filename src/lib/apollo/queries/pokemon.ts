import { gql } from '@apollo/client'

export const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }, limit: 1) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
        is_hidden
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonmoves(limit: 20, order_by: { level: asc }) {
        level
        pokemon_v2_move {
          name
          power
          accuracy
          pp
          pokemon_v2_type {
            name
          }
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
      pokemon_v2_pokemonspecy {
        is_legendary
        is_mythical
        generation_id
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _in: [7, 9] } }
          order_by: { language_id: asc }
          limit: 2
        ) {
          flavor_text
        }
        pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {
          name
        }
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(order_by: { order: asc }) {
            id
            name
            pokemon_v2_pokemonspeciesnames(where: { language_id: { _eq: 7 } }) {
              name
            }
            pokemon_v2_pokemons(limit: 1) {
              id
            }
          }
        }
      }
    }
  }
`

export const GET_POKEMON_EXPLORER = gql`
  query GetPokemonExplorer(
    $limit: Int!
    $offset: Int!
    $where: pokemon_v2_pokemon_bool_exp!
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: $where
      order_by: { id: asc }
    ) {
      id
      name
      pokemon_v2_pokemontypes(order_by: { slot: asc }) {
        slot
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        generation_id
        is_legendary
        is_mythical
      }
    }
    pokemon_v2_pokemon_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`
