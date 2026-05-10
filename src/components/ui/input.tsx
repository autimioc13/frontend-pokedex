'use client'

import { useState } from 'react'
import { CheckCircle2, Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

// ============================================================
// INPUT — Componente base del design system
// Soporta: label, error, helperText, password toggle,
//          isValid (ícono ✓), showError (control de visibilidad)
// ============================================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  isValid?: boolean
  showError?: boolean
}

export function Input({
  label,
  error,
  helperText,
  isValid,
  showError,
  className,
  id,
  type,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  // Mostrar ícono ✓ solo en campos no-password cuando son válidos y sin error
  const showValidIcon = !isPassword && isValid === true && !error
  // showError: undefined → siempre mostrar (comportamiento original)
  const shouldShowError = showError !== false && !!error

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="font-sans text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          aria-invalid={shouldShowError}
          aria-describedby={
            shouldShowError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            `w-full rounded-lg border bg-white px-3 py-2.5 font-sans text-sm text-zinc-900 transition-colors duration-150 outline-none placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600`,
            !error &&
              `border-zinc-200 hover:border-zinc-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:hover:border-zinc-600 dark:focus:border-violet-500`,
            error &&
              `border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500`,
            // Reservar espacio para íconos de la derecha
            (isPassword || showValidIcon) && 'pr-10',
            className,
          )}
          {...props}
        />

        {/* Botón toggle password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded text-zinc-400 transition-colors hover:text-zinc-600 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none dark:hover:text-zinc-300"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}

        {/* Ícono de validación ✓ */}
        {showValidIcon && (
          <CheckCircle2
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-emerald-500"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Mensaje de error */}
      {shouldShowError && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="font-sans text-xs text-red-500 dark:text-red-400"
        >
          {error}
        </p>
      )}

      {/* Texto de ayuda */}
      {helperText && !error && (
        <p
          id={`${inputId}-helper`}
          className="font-sans text-xs text-zinc-500 dark:text-zinc-500"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
