import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PokemonMoves } from '@/components/pokemon/pokemon-moves'
import { checkA11y } from './setup'

const MOCK_MOVES = [
  {
    level: 1,
    pokemon_v2_move: {
      name: 'tackle',
      power: 40,
      accuracy: 100,
      pp: 35,
      pokemon_v2_type: { name: 'normal' },
      pokemon_v2_movedamageclass: { name: 'physical' },
    },
  },
  {
    level: 5,
    pokemon_v2_move: {
      name: 'growl',
      power: null,
      accuracy: 100,
      pp: 40,
      pokemon_v2_type: { name: 'normal' },
      pokemon_v2_movedamageclass: { name: 'status' },
    },
  },
  {
    level: 11,
    pokemon_v2_move: {
      name: 'vine-whip',
      power: 45,
      accuracy: 100,
      pp: 25,
      pokemon_v2_type: { name: 'grass' },
      pokemon_v2_movedamageclass: { name: 'physical' },
    },
  },
]

describe('PokemonMoves — Accesibilidad', () => {
  it('no tiene violaciones axe', async () => {
    const { container } = render(<PokemonMoves moves={MOCK_MOVES} />)
    await checkA11y(container)
  })

  it('no renderiza nada si la lista de movimientos está vacía', () => {
    const { container } = render(<PokemonMoves moves={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('la tabla tiene caption para lectores de pantalla', () => {
    render(<PokemonMoves moves={MOCK_MOVES} />)
    expect(screen.getByText('Movimientos aprendidos')).toBeInTheDocument()
  })

  it('deduplica movimientos con el mismo nombre', () => {
    const withDuplicate = [...MOCK_MOVES, MOCK_MOVES[0]]
    const { getAllByRole } = render(<PokemonMoves moves={withDuplicate} />)
    const rows = getAllByRole('row')
    // 1 fila de encabezado + 3 movimientos únicos (no 4)
    expect(rows).toHaveLength(4)
  })

  it('muestra "—" para movimientos sin power', () => {
    render(<PokemonMoves moves={MOCK_MOVES} />)
    const dashes = screen.getAllByText('—')
    expect(dashes.length).toBeGreaterThan(0)
  })
})
