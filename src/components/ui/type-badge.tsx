import { cn } from '@/lib/utils/cn'

// ============================================================
// TypeBadge — badge de tipo Pokémon
// Usa variables CSS de tokens.css (nombres en inglés)
// normalizeType acepta tanto inglés (PokéAPI) como español (interno)
// ============================================================

export type PokemonType =
  | 'normal'
  | 'fuego'
  | 'agua'
  | 'electrico'
  | 'planta'
  | 'hielo'
  | 'lucha'
  | 'veneno'
  | 'tierra'
  | 'volador'
  | 'psiquico'
  | 'bicho'
  | 'roca'
  | 'fantasma'
  | 'dragon'
  | 'siniestro'
  | 'acero'
  | 'hada'

// Mapa español → inglés (para CSS variables y PokéAPI)
export const POKEMON_TYPE_EN: Record<PokemonType, string> = {
  normal: 'normal',
  fuego: 'fire',
  agua: 'water',
  electrico: 'electric',
  planta: 'grass',
  hielo: 'ice',
  lucha: 'fighting',
  veneno: 'poison',
  tierra: 'ground',
  volador: 'flying',
  psiquico: 'psychic',
  bicho: 'bug',
  roca: 'rock',
  fantasma: 'ghost',
  dragon: 'dragon',
  siniestro: 'dark',
  acero: 'steel',
  hada: 'fairy',
}

// Normaliza tipos de PokéAPI (inglés) o internos (español) → PokemonType
export function normalizeType(apiType: string): PokemonType {
  const map: Record<string, PokemonType> = {
    // Inglés — PokéAPI
    fire: 'fuego',
    water: 'agua',
    electric: 'electrico',
    grass: 'planta',
    ice: 'hielo',
    fighting: 'lucha',
    poison: 'veneno',
    ground: 'tierra',
    flying: 'volador',
    psychic: 'psiquico',
    bug: 'bicho',
    rock: 'roca',
    ghost: 'fantasma',
    dragon: 'dragon',
    dark: 'siniestro',
    steel: 'acero',
    fairy: 'hada',
    normal: 'normal',
    // Español — pass-through
    fuego: 'fuego',
    agua: 'agua',
    electrico: 'electrico',
    planta: 'planta',
    hielo: 'hielo',
    lucha: 'lucha',
    veneno: 'veneno',
    tierra: 'tierra',
    volador: 'volador',
    psiquico: 'psiquico',
    bicho: 'bicho',
    roca: 'roca',
    fantasma: 'fantasma',
    siniestro: 'siniestro',
    acero: 'acero',
    hada: 'hada',
  }
  return map[apiType.toLowerCase()] ?? 'normal'
}

interface TypeBadgeProps {
  type: PokemonType | string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TypeBadge({ type, size = 'md', className }: TypeBadgeProps) {
  const normalizedType = normalizeType(type as string)
  const englishType = POKEMON_TYPE_EN[normalizedType]

  return (
    <span
      style={{
        backgroundColor: `var(--type-${englishType}-bg)`,
        color: `var(--type-${englishType}-text)`,
      }}
      className={cn(
        'inline-flex items-center justify-center',
        'font-sans font-medium capitalize',
        'rounded-full border border-current/20',
        'transition-colors duration-150',
        size === 'sm' && 'px-2 py-0.5 text-xs',
        size === 'md' && 'px-2.5 py-1 text-xs',
        size === 'lg' && 'px-3 py-1 text-sm',
        className,
      )}
    >
      {normalizedType}
    </span>
  )
}
