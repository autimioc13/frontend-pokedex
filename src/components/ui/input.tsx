'use client'

import { useState } from 'react'
import { CheckCircle2, Eye, EyeOff } from '@/lib/utils/icons'

import { cn } from '@/lib/utils/cn'

// ============================================================
// Input — campo con floating label
// Compatible con todas las props del Input anterior (PDX-54)
// Floating label: sube al hacer focus o cuando hay valor
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

  const showValidIcon = !isPassword && isValid === true && !error
  const shouldShowError = showError !== false && !!error
  const hasLabel = !!label

  return (
    <div className="flex flex-col gap-1.5">
      {/* Input wrapper con floating label */}
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          // Placeholder vacío es necesario para el selector :placeholder-shown
          placeholder=" "
          aria-invalid={shouldShowError}
          aria-describedby={
            shouldShowError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            'peer w-full rounded-lg border bg-white font-sans text-sm text-zinc-900 transition-all duration-200 outline-none',
            'dark:bg-zinc-900 dark:text-zinc-100',
            // Padding según si hay label flotante o no
            hasLabel ? 'px-3 pt-5 pb-2' : 'px-3 py-2.5',
            // Espacio para íconos a la derecha
            (isPassword || showValidIcon) && 'pr-10',
            // Estado normal
            !error &&
              'border-zinc-200 hover:border-zinc-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:hover:border-zinc-600 dark:focus:border-violet-500',
            // Estado error
            error &&
              'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-red-500',
            className,
          )}
          {...props}
        />

        {/* Label flotante */}
        {hasLabel && (
          <label
            htmlFor={inputId}
            className={cn(
              // Base: posicionado dentro del campo
              'pointer-events-none absolute left-3 font-sans transition-all duration-200 select-none',
              'top-3.5 text-sm text-zinc-500 dark:text-zinc-400',
              // Sube al hacer focus
              'peer-focus:top-1.5 peer-focus:text-xs',
              error ? 'peer-focus:text-red-500' : 'peer-focus:text-violet-500',
              // Sube cuando el campo tiene valor (placeholder no visible)
              'peer-[:not(:placeholder-shown)]:top-1.5',
              'peer-[:not(:placeholder-shown)]:text-xs',
            )}
          >
            {label}
          </label>
        )}

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
