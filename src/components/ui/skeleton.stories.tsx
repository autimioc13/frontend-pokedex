import type { Meta, StoryObj } from '@storybook/react'
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonDetailPage,
} from './skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['rectangle', 'circle', 'text'],
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Rectangle: Story = {
  args: {
    variant: 'rectangle',
    className: 'h-24 w-48',
  },
}

export const Circle: Story = {
  args: {
    variant: 'circle',
    className: 'h-20 w-20',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
    className: 'w-full',
  },
}

export const SkeletonTextStory: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          1 line
        </p>
        <SkeletonText lines={1} />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          3 lines
        </p>
        <SkeletonText lines={3} />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          5 lines
        </p>
        <SkeletonText lines={5} />
      </div>
    </div>
  ),
}

export const SkeletonCardStory: Story = {
  render: () => <SkeletonCard />,
}

export const SkeletonGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  ),
}

export const SkeletonDetailPageStory: Story = {
  render: () => <SkeletonDetailPage />,
}

export const AllSkeletons: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Base Skeleton
        </p>
        <Skeleton className="h-20 w-40" />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Text Lines
        </p>
        <SkeletonText lines={3} />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Card
        </p>
        <SkeletonCard />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Detail Page
        </p>
        <SkeletonDetailPage />
      </div>
    </div>
  ),
}
