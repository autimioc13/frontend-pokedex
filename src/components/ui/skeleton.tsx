import { cn } from '@/lib/utils/cn'

// ============================================================
// Skeleton — placeholders de carga con animación pulse
// Skeleton base + SkeletonText + SkeletonCard + SkeletonDetailPage
// ============================================================

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangle' | 'circle' | 'text'
}

export function Skeleton({
  variant = 'rectangle',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-zinc-200 dark:bg-zinc-800',
        variant === 'rectangle' && 'rounded-md',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-4 w-full rounded',
        className,
      )}
      {...props}
    />
  )
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  return (
    <div aria-hidden="true" className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          className={i === lines - 1 ? 'w-3/4' : 'w-full'}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'rounded-xl border border-zinc-200 p-4 dark:border-zinc-800',
        className,
      )}
    >
      <Skeleton variant="circle" className="mx-auto mb-3 h-20 w-20" />
      <Skeleton variant="text" className="mx-auto mb-2 h-3 w-8" />
      <Skeleton variant="text" className="mx-auto mb-3 h-4 w-24" />
      <div className="flex justify-center gap-1.5">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonDetailPage({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('mx-auto max-w-3xl px-4 py-6 sm:px-6', className)}
    >
      {/* Hero */}
      <div className="mb-6 flex flex-col items-center gap-6 sm:mb-8 sm:flex-row sm:items-start">
        <Skeleton className="h-44 w-44 shrink-0 rounded-2xl sm:h-56 sm:w-56" />
        <div className="flex w-full flex-col gap-3">
          <div className="space-y-2 text-center sm:text-left">
            <Skeleton className="mx-auto h-3 w-12 sm:mx-0" />
            <Skeleton className="mx-auto h-8 w-40 sm:mx-0" />
            <Skeleton className="mx-auto h-4 w-24 sm:mx-0" />
          </div>
          <div className="flex justify-center gap-1.5 sm:justify-start">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <Skeleton className="h-12 w-full rounded-md" />
          <div className="flex justify-center gap-6 sm:justify-start">
            <Skeleton className="h-8 w-14 rounded-md" />
            <Skeleton className="h-8 w-14 rounded-md" />
            <Skeleton className="h-8 w-14 rounded-md" />
          </div>
        </div>
      </div>

      {/* Abilities */}
      <div className="mb-6 sm:mb-8">
        <Skeleton className="mb-3 h-3 w-24" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 rounded-lg" />
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>
      </div>

      {/* Stats + Evolution */}
      <div className="mb-6 grid gap-6 sm:mb-8 sm:gap-8 lg:grid-cols-2">
        <div className="space-y-2.5">
          <Skeleton className="mb-3 h-3 w-24" />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-3 w-10 shrink-0" />
              <Skeleton className="h-3 w-8 shrink-0" />
              <Skeleton className="h-1.5 flex-1 rounded-full" />
            </div>
          ))}
        </div>
        <div>
          <Skeleton className="mb-3 h-3 w-20" />
          <div className="flex gap-3">
            <Skeleton className="h-20 w-20 rounded-xl" />
            <Skeleton className="h-4 w-4 self-center rounded" />
            <Skeleton className="h-20 w-20 rounded-xl" />
            <Skeleton className="h-4 w-4 self-center rounded" />
            <Skeleton className="h-20 w-20 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Moves table */}
      <Skeleton className="mb-3 h-3 w-24" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}
