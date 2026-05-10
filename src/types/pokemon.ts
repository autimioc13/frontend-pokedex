export enum PokemonType {
  Fire = 'FIRE',
  Water = 'WATER',
  Grass = 'GRASS',
  Electric = 'ELECTRIC',
  Psychic = 'PSYCHIC',
  Ice = 'ICE',
  Dragon = 'DRAGON',
  Dark = 'DARK',
  Fairy = 'FAIRY',
  Fighting = 'FIGHTING',
  Poison = 'POISON',
  Ground = 'GROUND',
  Flying = 'FLYING',
  Bug = 'BUG',
  Rock = 'ROCK',
  Ghost = 'GHOST',
  Steel = 'STEEL',
  Normal = 'NORMAL',
}

export interface PokemonStat {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  total: number
}

export interface PokemonAbility {
  name: string
  nameEs: string
  isHidden: boolean
}

export interface Pokemon {
  id: number
  name: string
  nameEs: string
  slug: string
  nationalNumber: number
  types: PokemonType[]
  stats: PokemonStat
  abilities: PokemonAbility[]
  height: number
  weight: number
  baseExperience: number
  captureRate: number
  isMythical: boolean
  isLegendary: boolean
  isBaby: boolean
  generation: number
  sprite: string
  spriteShiny: string
  artwork: string
  artworkShiny: string
  model3dUrl: string | null
  flavorText: string
  flavorTextEs: string
  genus: string
  genusEs: string
  eggGroups: string[]
  genderRate: number
  hatchCounter: number
  evolutionChainId: number | null
}

export interface EvolutionNode {
  pokemonId: number
  name: string
  nameEs: string
  sprite: string
  minLevel: number | null
  trigger: string | null
  item: string | null
  evolvesTo: EvolutionNode[]
}

export interface EvolutionChain {
  id: number
  root: EvolutionNode
}
