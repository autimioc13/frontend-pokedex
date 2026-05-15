import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PokemonStats } from '@/components/pokemon/pokemon-stats'
import { checkA11y } from './setup'

const MOCK_STATS = [
  { base_stat: 45, pokemon_v2_stat: { name: 'hp' } },
  { base_stat: 49, pokemon_v2_stat: { name: 'attack' } },
  { base_stat: 49, pokemon_v2_stat: { name: 'defense' } },
  { base_stat: 65, pokemon_v2_stat: { name: 'special-attack' } },
  { base_stat: 65, pokemon_v2_stat: { name: 'special-defense' } },
  { base_stat: 45, pokemon_v2_stat: { name: 'speed' } },
]

describe('PokemonStats — Accesibilidad', () => {
  it('no tiene violaciones axe', async () => {
    const { container } = render(<PokemonStats stats={MOCK_STATS} />)
    await checkA11y(container)
  })

  it('cada barra tiene role="progressbar" con atributos aria correctos', () => {
    const { getAllByRole } = render(<PokemonStats stats={MOCK_STATS} />)
    const bars = getAllByRole('progressbar')
    expect(bars).toHaveLength(MOCK_STATS.length)
    bars.forEach((bar, i) => {
      expect(bar).toHaveAttribute(
        'aria-valuenow',
        String(MOCK_STATS[i].base_stat),
      )
      expect(bar).toHaveAttribute('aria-valuemin', '0')
      expect(bar).toHaveAttribute('aria-valuemax', '255')
    })
  })

  it('muestra el total correcto de estadísticas', () => {
    const { getByText } = render(<PokemonStats stats={MOCK_STATS} />)
    const total = MOCK_STATS.reduce((sum, s) => sum + s.base_stat, 0)
    expect(getByText(String(total))).toBeInTheDocument()
  })

  it('la sección tiene aria-label="Estadísticas base"', () => {
    const { getByRole } = render(<PokemonStats stats={MOCK_STATS} />)
    expect(
      getByRole('region', { name: 'Estadísticas base' }),
    ).toBeInTheDocument()
  })
})
