import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils/cn'

// ============================================================
// Card — contenedor base del design system
// Variantes: default | interactive | ghost | elevated
// Sub-componentes: Card.Header | Card.Body | Card.Footer
// ============================================================

const cardVariants = cva('rounded-xl border transition-all duration-200', {
  variants: {
    variant: {
      default: 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800',
      interactive: `
        bg-white border-zinc-200 cursor-pointer
        hover:border-zinc-300 hover:shadow-sm hover:-translate-y-0.5
        active:translate-y-0 active:shadow-none
        dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700
      `,
      ghost: 'bg-transparent border-zinc-200 dark:border-zinc-800',
      elevated:
        'bg-white border-zinc-100 shadow-sm dark:bg-zinc-900 dark:border-zinc-800',
    },
    padding: {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})

export interface CardProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function CardBase({
  variant,
  padding,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('px-4 pt-4 pb-2 font-sans font-medium', className)}>
      {children}
    </div>
  )
}

function CardBody({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn('px-4 py-2', className)}>{children}</div>
}

function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'border-t border-zinc-100 px-4 pt-2 pb-4 dark:border-zinc-800',
        className,
      )}
    >
      {children}
    </div>
  )
}

export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
})
