import type { Meta, StoryObj } from '@storybook/react'
import { Star } from '@/lib/utils/icons'
import { Button } from './button'
import { Icon } from './icon'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <Icon icon={Star} size="sm" />
      Favorito
    </Button>
  ),
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Primary
        </h3>
        <div className="flex gap-2">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Secondary
        </h3>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Outline
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="md">
            Medium
          </Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Ghost
        </h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Small
          </Button>
          <Button variant="ghost" size="md">
            Medium
          </Button>
          <Button variant="ghost" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Danger
        </h3>
        <div className="flex gap-2">
          <Button variant="danger" size="sm">
            Small
          </Button>
          <Button variant="danger" size="md">
            Medium
          </Button>
          <Button variant="danger" size="lg">
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
}
