import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonDetailPage,
} from '@/components/ui/skeleton'
import { checkA11y } from './setup'

// Los skeletons son decorativos: aria-hidden="true" evita ruido en lectores de
// pantalla. El estado de carga lo anuncia el aria-live del contenedor padre.

describe('Skeleton — Accesibilidad', () => {
  it('Skeleton base tiene aria-hidden="true"', async () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('SkeletonText tiene aria-hidden="true"', async () => {
    const { container } = render(<SkeletonText />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('SkeletonCard tiene aria-hidden="true"', async () => {
    const { container } = render(<SkeletonCard />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('SkeletonDetailPage tiene aria-hidden="true"', async () => {
    const { container } = render(<SkeletonDetailPage />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('Skeleton base no tiene violaciones de estructura', async () => {
    const { container } = render(<Skeleton className="h-20 w-40" />)
    await checkA11y(container)
  })

  it('SkeletonText no tiene violaciones de estructura', async () => {
    const { container } = render(<SkeletonText lines={3} />)
    await checkA11y(container)
  })

  it('SkeletonCard no tiene violaciones de estructura', async () => {
    const { container } = render(<SkeletonCard />)
    await checkA11y(container)
  })

  it('SkeletonDetailPage no tiene violaciones de estructura', async () => {
    const { container } = render(<SkeletonDetailPage />)
    await checkA11y(container)
  })
})
