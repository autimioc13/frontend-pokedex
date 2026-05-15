import { gql } from '@apollo/client'

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
