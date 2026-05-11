'use client'

import { type LucideIcon } from '@/lib/utils/icons'
import { cn } from '@/lib/utils/cn'

// ============================================================
// Icon — wrapper estandarizado para íconos Lucide React
// Garantiza strokeWidth=1.5, tamaños semánticos y accesibilidad
// ============================================================

export interface IconProps {
  icon: LucideIcon
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  className?: string
  decorative?: boolean
  label?: string
}

const SIZE_MAP = {
  xs: 'h-3 w-3',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
  '2xl': 'h-8 w-8',
} as const

export function Icon({
  icon: IconComponent,
  size = 'md',
  className,
  decorative = true,
  label,
}: IconProps) {
  return (
    <IconComponent
      className={cn(SIZE_MAP[size], className)}
      strokeWidth={1.5}
      aria-hidden={decorative ? true : undefined}
      role={!decorative ? 'img' : undefined}
      aria-label={!decorative ? label : undefined}
    />
  )
}
