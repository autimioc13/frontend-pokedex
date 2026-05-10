'use client'

import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Info, X } from 'lucide-react'

import {
  type Toast,
  ToastContext,
  type ToastContextValue,
} from '@/hooks/use-toast'

// ============================================================
// ToastProvider — envuelve la app y expone useToast vía context
// ToastList — overlay fijo en esquina inferior derecha
// ToastItem — toast individual con animación y cierre
// ============================================================

// ── ToastProvider ────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID()
    const duration = toast.duration ?? 4000
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const value: ToastContextValue = { toasts, addToast, removeToast }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastList toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

// ── ToastList ────────────────────────────────────────────────

function ToastList({
  toasts,
  onRemove,
}: {
  toasts: Toast[]
  onRemove: (id: string) => void
}) {
  return (
    <div
      className="fixed right-4 bottom-4 z-50 flex flex-col gap-2"
      aria-live="polite"
      aria-label="Notificaciones"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// ── ToastItem ────────────────────────────────────────────────

const toastConfig = {
  error: {
    Icon: AlertCircle,
    iconClass: 'text-red-400',
    borderClass: 'border-red-900/50',
  },
  success: {
    Icon: CheckCircle,
    iconClass: 'text-emerald-400',
    borderClass: 'border-emerald-900/50',
  },
  info: {
    Icon: Info,
    iconClass: 'text-violet-400',
    borderClass: 'border-violet-900/50',
  },
} as const

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast
  onRemove: (id: string) => void
}) {
  const { Icon, iconClass, borderClass } = toastConfig[toast.type]

  return (
    <motion.div
      layout
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex w-80 items-start gap-3 rounded-lg border bg-zinc-900 px-4 py-3 shadow-lg ${borderClass} `}
    >
      <Icon
        className={`mt-0.5 h-4 w-4 shrink-0 ${iconClass}`}
        aria-hidden="true"
      />
      <p className="flex-1 font-sans text-sm text-zinc-100">{toast.message}</p>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        aria-label="Cerrar notificación"
        className="rounded text-zinc-500 transition-colors hover:text-zinc-300 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </motion.div>
  )
}
