import { render } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { PokemonEvolution } from '@/components/pokemon/pokemon-evolution'
import { checkA11y } from './setup'

vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode
    href: string
    [key: string]: unknown
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

vi.mock('@/lib/utils/icons', () => ({
  ChevronRight: () => <svg aria-hidden="true" />,
}))

const MOCK_CHAIN = [
  {
    id: 1,
    name: 'bulbasaur',
    pokemon_v2_pokemonspeciesnames: [{ name: 'Bulbasaur' }],
    pokemon_v2_pokemons: [{ id: 1 }],
  },
  {
    id: 2,
    name: 'ivysaur',
    pokemon_v2_pokemonspeciesnames: [{ name: 'Ivysaur' }],
    pokemon_v2_pokemons: [{ id: 2 }],
  },
  {
    id: 3,
    name: 'venusaur',
    pokemon_v2_pokemonspeciesnames: [{ name: 'Venusaur' }],
    pokemon_v2_pokemons: [{ id: 3 }],
  },
]

describe('PokemonEvolution — Accesibilidad', () => {
  it('no tiene violaciones axe', async () => {
    const { container } = render(
      <PokemonEvolution chain={MOCK_CHAIN} currentId={1} />,
    )
    await checkA11y(container)
  })

  it('no renderiza nada si la cadena tiene un solo miembro', () => {
    const { container } = render(
      <PokemonEvolution chain={[MOCK_CHAIN[0]]} currentId={1} />,
    )
    expect(container.firstChild).toBeNull()
  })

  it('marca el Pokémon actual con aria-current="true"', () => {
    const { getByRole } = render(
      <PokemonEvolution chain={MOCK_CHAIN} currentId={2} />,
    )
    const currentLink = getByRole('link', { name: /Ivysaur/i })
    expect(currentLink).toHaveAttribute('aria-current', 'true')
  })

  it('los otros miembros de la cadena no tienen aria-current', () => {
    const { getByRole } = render(
      <PokemonEvolution chain={MOCK_CHAIN} currentId={2} />,
    )
    const otherLink = getByRole('link', { name: /Bulbasaur/i })
    expect(otherLink).not.toHaveAttribute('aria-current')
  })

  it('renderiza todos los miembros de la cadena', () => {
    const { getAllByRole } = render(
      <PokemonEvolution chain={MOCK_CHAIN} currentId={1} />,
    )
    const links = getAllByRole('link')
    expect(links).toHaveLength(MOCK_CHAIN.length)
  })
})
