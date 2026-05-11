import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TypeBadge } from '@/components/ui/type-badge'
import type { PokemonType } from '@/components/ui/type-badge'
import { checkA11y } from './setup'

const ALL_TYPES: PokemonType[] = [
  'normal',
  'fuego',
  'agua',
  'electrico',
  'planta',
  'hielo',
  'lucha',
  'veneno',
  'tierra',
  'volador',
  'psiquico',
  'bicho',
  'roca',
  'fantasma',
  'dragon',
  'siniestro',
  'acero',
  'hada',
]

describe('TypeBadge — Accesibilidad', () => {
  it('no tiene violaciones en los 18 tipos', async () => {
    for (const type of ALL_TYPES) {
      const { container } = render(<TypeBadge type={type} />)
      await checkA11y(container)
    }
  })

  it('el texto del tipo es legible por lectores de pantalla', async () => {
    render(<TypeBadge type="fuego" />)
    expect(screen.getByText(/fuego/i)).toBeInTheDocument()
  })

  it('funciona con tipos en inglés (normalización de PokéAPI)', async () => {
    render(<TypeBadge type="fire" />)
    expect(screen.getByText(/fuego/i)).toBeInTheDocument()
  })

  it('los tamaños sm, md, lg no tienen violaciones', async () => {
    const sizes = ['sm', 'md', 'lg'] as const
    for (const size of sizes) {
      const { container } = render(<TypeBadge type="fuego" size={size} />)
      await checkA11y(container)
    }
  })
})
