import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormError } from '@/components/ui/form-error'
import { checkA11y } from './setup'

describe('FormError — Accesibilidad', () => {
  it('tiene role="alert" cuando hay mensaje', async () => {
    render(<FormError message="Error de autenticación" />)
    const alert = screen.getByRole('alert')
    expect(alert).toBeInTheDocument()
  })

  it('no renderiza nada cuando message={null}', async () => {
    render(<FormError message={null} />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('no tiene violaciones en variante error', async () => {
    const { container } = render(
      <FormError message="Credenciales incorrectas" />,
    )
    await checkA11y(container)
  })

  it('no tiene violaciones en variante success', async () => {
    const { container } = render(
      <FormError message="Registro exitoso" variant="success" />,
    )
    await checkA11y(container)
  })

  it('el ícono de alerta es decorativo (aria-hidden="true")', async () => {
    const { container } = render(<FormError message="Error de validación" />)
    const svgs = container.querySelectorAll('svg')
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('el ícono de éxito es decorativo (aria-hidden="true")', async () => {
    const { container } = render(
      <FormError message="Operación exitosa" variant="success" />,
    )
    const svgs = container.querySelectorAll('svg')
    svgs.forEach((svg) => {
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  it('el texto del mensaje es legible por lectores de pantalla', async () => {
    render(<FormError message="Error de autenticación" />)
    expect(screen.getByText('Error de autenticación')).toBeInTheDocument()
  })
})
