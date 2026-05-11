'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle } from '@/lib/utils/icons'

import { cn } from '@/lib/utils/cn'

// ============================================================
// FormError — bloque de error/éxito del servidor reutilizable
// Reemplaza el JSX duplicado en Login y Registro
// ============================================================

interface FormErrorProps {
  message: string | null
  variant?: 'error' | 'success'
  className?: string
}

export function FormError({
  message,
  variant = 'error',
  className,
}: FormErrorProps) {
  if (!message) return null

  const isError = variant === 'error'

  return (
    <motion.div
      role="alert"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'flex items-start gap-2.5 rounded-lg border px-3.5 py-3',
        isError
          ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30'
          : 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30',
        className,
      )}
    >
      {isError ? (
        <AlertCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400"
          aria-hidden="true"
        />
      ) : (
        <CheckCircle
          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500 dark:text-emerald-400"
          aria-hidden="true"
        />
      )}
      <p
        className={cn(
          'font-sans text-sm',
          isError
            ? 'text-red-600 dark:text-red-400'
            : 'text-emerald-600 dark:text-emerald-400',
        )}
      >
        {message}
      </p>
    </motion.div>
  )
}
