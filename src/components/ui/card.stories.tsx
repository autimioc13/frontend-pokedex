import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'interactive', 'ghost', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="font-semibold">Card Title</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This is the default card variant with standard styling.
        </p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: (
      <div>
        <h3 className="font-semibold">Interactive Card</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Hover over this card to see the interaction effect.
        </p>
      </div>
    ),
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: (
      <div>
        <h3 className="font-semibold">Ghost Card</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This is a transparent card variant.
        </p>
      </div>
    ),
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 className="font-semibold">Elevated Card</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This card has a subtle shadow effect.
        </p>
      </div>
    ),
  },
}

export const WithSubComponents: Story = {
  render: () => (
    <Card>
      <Card.Header>Card Header</Card.Header>
      <Card.Body>
        <p>This is the main content area of the card.</p>
      </Card.Body>
      <Card.Footer>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Footer content
        </p>
      </Card.Footer>
    </Card>
  ),
}

export const PaddingShowcase: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          None
        </p>
        <Card padding="none">
          <div className="h-20 bg-violet-100 dark:bg-violet-900" />
        </Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Small
        </p>
        <Card padding="sm">Content with small padding</Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Medium
        </p>
        <Card padding="md">Content with medium padding</Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Large
        </p>
        <Card padding="lg">Content with large padding</Card>
      </div>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Default
        </p>
        <Card>Default variant</Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Interactive
        </p>
        <Card variant="interactive">Interactive variant</Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Ghost
        </p>
        <Card variant="ghost">Ghost variant</Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Elevated
        </p>
        <Card variant="elevated">Elevated variant</Card>
      </div>
    </div>
  ),
}
