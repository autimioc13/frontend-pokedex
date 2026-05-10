'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils/cn'

// ============================================================
// BUTTON — Componente base del design system
// Variantes: primary | secondary | ghost | danger | outline
// Tamaños: sm | md | lg
// ============================================================

const buttonVariants = cva(
  // Base — aplicado siempre
  `
    inline-flex items-center justify-center gap-2
    font-sans text-sm font-medium
    rounded-lg border
    transition-all duration-150
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-violet-500
    focus-visible:ring-offset-2
    focus-visible:ring-offset-white
    dark:focus-visible:ring-offset-zinc-950
    disabled:pointer-events-none
    disabled:opacity-40
    select-none
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-violet-600 text-white border-transparent
          hover:bg-violet-500
          active:bg-violet-700
        `,
        secondary: `
          bg-zinc-100 text-zinc-900 border-transparent
          hover:bg-zinc-200
          active:bg-zinc-300
          dark:bg-zinc-800 dark:text-zinc-100
          dark:hover:bg-zinc-700
          dark:active:bg-zinc-600
        `,
        outline: `
          bg-transparent text-zinc-900 border-zinc-200
          hover:bg-zinc-50
          active:bg-zinc-100
          dark:text-zinc-100 dark:border-zinc-700
          dark:hover:bg-zinc-800/60
          dark:active:bg-zinc-800
        `,
        ghost: `
          bg-transparent text-zinc-600 border-transparent
          hover:bg-zinc-100 hover:text-zinc-900
          dark:text-zinc-400
          dark:hover:bg-zinc-800 dark:hover:text-zinc-100
        `,
        danger: `
          bg-red-600 text-white border-transparent
          hover:bg-red-500
          active:bg-red-700
        `,
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-base',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  fullWidth?: boolean
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}
