'use client'

import { createContext, useContext } from 'react'

// ============================================================
// Toast context + hook
// El provider y la UI viven en components/ui/toast.tsx
// ============================================================

export interface Toast {
  id: string
  message: string
  type: 'error' | 'success' | 'info'
  duration?: number
}

export interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}
