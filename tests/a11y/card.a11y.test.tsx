import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import { Card } from '@/components/ui/card'
import { checkA11y } from './setup'

describe('Card — Accesibilidad', () => {
  it('no tiene violaciones en variante default', async () => {
    const { container } = render(
      <Card>
        <p>Contenido de la card</p>
      </Card>,
    )
    await checkA11y(container)
  })

  it('no tiene violaciones en variante interactive con role="button"', async () => {
    // La variante interactive requiere role="button" + tabIndex={0}
    // para ser semánticamente correcta cuando se usa como elemento clickeable
    const { container } = render(
      <Card variant="interactive" role="button" tabIndex={0}>
        <p>Pokémon interactivo</p>
      </Card>,
    )
    await checkA11y(container)
  })

  it('no tiene violaciones en variante ghost', async () => {
    const { container } = render(
      <Card variant="ghost">
        <p>Ghost card</p>
      </Card>,
    )
    await checkA11y(container)
  })

  it('no tiene violaciones en variante elevated', async () => {
    const { container } = render(
      <Card variant="elevated">
        <p>Elevated card</p>
      </Card>,
    )
    await checkA11y(container)
  })

  it('Card.Header, Card.Body, Card.Footer no tienen violaciones', async () => {
    const { container } = render(
      <Card>
        <Card.Header>Título del Pokémon</Card.Header>
        <Card.Body>Descripción del Pokémon</Card.Body>
        <Card.Footer>Tipos y estadísticas</Card.Footer>
      </Card>,
    )
    await checkA11y(container)
  })

  it('acepta aria-label para identificación', async () => {
    const { container } = render(
      <Card aria-label="Card de Pikachu">
        <p>Pikachu #025</p>
      </Card>,
    )
    await checkA11y(container)
  })
})
