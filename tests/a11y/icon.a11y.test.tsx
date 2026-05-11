import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Icon } from '@/components/ui/icon'
import { Star, Heart } from '@/lib/utils/icons'
import { checkA11y } from './setup'

describe('Icon — Accesibilidad', () => {
  it('tiene aria-hidden="true" por defecto (modo decorativo)', async () => {
    const { container } = render(<Icon icon={Star} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
  })

  it('no tiene violaciones en modo decorativo', async () => {
    const { container } = render(<Icon icon={Star} />)
    await checkA11y(container)
  })

  it('tiene role="img" y aria-label cuando decorative={false}', async () => {
    const { container } = render(
      <Icon icon={Heart} decorative={false} label="Agregar a favoritos" />,
    )
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('role', 'img')
    expect(svg).toHaveAttribute('aria-label', 'Agregar a favoritos')
  })

  it('no tiene violaciones en modo semántico con label', async () => {
    const { container } = render(
      <Icon icon={Heart} decorative={false} label="Agregar a favoritos" />,
    )
    await checkA11y(container)
  })

  it('los 6 tamaños no tienen violaciones en modo decorativo', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
    for (const size of sizes) {
      const { container } = render(<Icon icon={Star} size={size} />)
      await checkA11y(container)
    }
  })

  it('los 6 tamaños no tienen violaciones en modo semántico', async () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const
    for (const size of sizes) {
      const { container } = render(
        <Icon
          icon={Star}
          size={size}
          decorative={false}
          label={`Estrella tamaño ${size}`}
        />,
      )
      await checkA11y(container)
    }
  })
})
