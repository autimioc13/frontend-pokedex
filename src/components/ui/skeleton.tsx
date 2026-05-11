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
    <div aria-hidden="true" className={cn('space-y-6', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-1.5">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
        <Skeleton variant="circle" className="h-32 w-32" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 flex-1 rounded-full" />
            <Skeleton className="h-3 w-8" />
          </div>
        ))}
      </div>
    </div>
  )
}
