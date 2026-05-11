import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Input } from '@/components/ui/input'
import { checkA11y } from './setup'

describe('Input — Accesibilidad', () => {
  it('tiene label asociado al input via htmlFor/id', async () => {
    render(<Input label="Email" type="email" />)
    const input = screen.getByRole('textbox', { name: /email/i })
    expect(input).toBeInTheDocument()
  })

  it('no tiene violaciones con label flotante vacío', async () => {
    const { container } = render(<Input label="Email" type="email" />)
    await checkA11y(container)
  })

  it('no tiene violaciones con label flotante con valor', async () => {
    const { container } = render(
      <Input label="Email" defaultValue="test@test.com" />,
    )
    await checkA11y(container)
  })

  it('tiene aria-invalid="true" cuando hay error', async () => {
    render(<Input label="Email" error="Email inválido" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('tiene aria-describedby apuntando al mensaje de error', async () => {
    render(<Input label="Email" error="Email inválido" />)
    const input = screen.getByRole('textbox')
    const describedBy = input.getAttribute('aria-describedby')
    expect(describedBy).toBeTruthy()
    const errorEl = document.getElementById(describedBy!)
    expect(errorEl).toHaveTextContent('Email inválido')
  })

  it('el mensaje de error tiene role="alert"', async () => {
    render(<Input label="Email" error="Email inválido" />)
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Email inválido')
  })

  it('el botón de toggle tiene aria-label descriptivo', async () => {
    render(<Input label="Contraseña" type="password" />)
    const toggle = screen.getByRole('button', { name: /mostrar contraseña/i })
    expect(toggle).toBeInTheDocument()
  })

  it('el aria-label del toggle cambia al activarse', async () => {
    const user = userEvent.setup()
    render(<Input label="Contraseña" type="password" />)
    const toggle = screen.getByRole('button', { name: /mostrar contraseña/i })
    await user.click(toggle)
    expect(
      screen.getByRole('button', { name: /ocultar contraseña/i }),
    ).toBeInTheDocument()
  })

  it('no tiene violaciones cuando está deshabilitado', async () => {
    const { container } = render(<Input label="Email" disabled />)
    await checkA11y(container)
  })

  it('el input recibe focus con Tab', async () => {
    const user = userEvent.setup()
    render(<Input label="Email" />)
    await user.tab()
    const input = screen.getByRole('textbox')
    expect(input).toHaveFocus()
  })
})
