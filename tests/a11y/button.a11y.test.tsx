import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/button'
import { checkA11y } from './setup'

describe('Button — Accesibilidad', () => {
  it('no tiene violaciones en variante primary', async () => {
    const { container } = render(<Button>Iniciar sesión</Button>)
    await checkA11y(container)
  })

  it('no tiene violaciones en variante secondary', async () => {
    const { container } = render(
      <Button variant="secondary">Secundario</Button>,
    )
    await checkA11y(container)
  })

  it('no tiene violaciones en variante outline', async () => {
    const { container } = render(<Button variant="outline">Outline</Button>)
    await checkA11y(container)
  })

  it('no tiene violaciones en variante ghost', async () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>)
    await checkA11y(container)
  })

  it('no tiene violaciones en variante danger', async () => {
    const { container } = render(<Button variant="danger">Eliminar</Button>)
    await checkA11y(container)
  })

  it('tiene aria-busy="true" cuando loading={true}', async () => {
    render(<Button loading>Cargando</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(button).toBeDisabled()
  })

  it('está deshabilitado correctamente', async () => {
    const { container } = render(<Button disabled>Deshabilitado</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await checkA11y(container)
  })

  it('no tiene violaciones en size sm', async () => {
    const { container } = render(<Button size="sm">Pequeño</Button>)
    await checkA11y(container)
  })

  it('no tiene violaciones en size lg', async () => {
    const { container } = render(<Button size="lg">Grande</Button>)
    await checkA11y(container)
  })

  it('es alcanzable con Tab', async () => {
    const user = userEvent.setup()
    render(<Button>Click</Button>)
    const button = screen.getByRole('button')
    await user.tab()
    expect(button).toHaveFocus()
  })

  it('se activa con Enter y Space', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    const button = screen.getByRole('button')
    button.focus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('tiene focus-visible cuando se navega con teclado', async () => {
    const user = userEvent.setup()
    render(<Button>Focus</Button>)
    const button = screen.getByRole('button')
    await user.tab()
    expect(button).toHaveFocus()
  })
})
