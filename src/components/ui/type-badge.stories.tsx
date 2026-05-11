import type { Meta, StoryObj } from '@storybook/react'
import { TypeBadge } from './type-badge'
import type { PokemonType } from './type-badge'

const meta = {
  title: 'UI/TypeBadge',
  component: TypeBadge,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'normal',
        'fuego',
        'agua',
        'electrico',
        'planta',
        'hielo',
        'lucha',
        'veneno',
        'tierra',
        'volador',
        'psiquico',
        'bicho',
        'roca',
        'fantasma',
        'dragon',
        'siniestro',
        'acero',
        'hada',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof TypeBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Individual: Story = {
  args: {
    type: 'fuego',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    type: 'agua',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    type: 'planta',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    type: 'electrico',
    size: 'lg',
  },
}

export const AllTypes: Story = {
  args: { type: 'fuego' },
  render: () => {
    const types: PokemonType[] = [
      'normal',
      'fuego',
      'agua',
      'electrico',
      'planta',
      'hielo',
      'lucha',
      'veneno',
      'tierra',
      'volador',
      'psiquico',
      'bicho',
      'roca',
      'fantasma',
      'dragon',
      'siniestro',
      'acero',
      'hada',
    ]
    return (
      <div className="grid max-w-2xl grid-cols-3 gap-3">
        {types.map((type) => (
          <TypeBadge key={type} type={type} size="md" />
        ))}
      </div>
    )
  },
}

export const Sizes: Story = {
  args: { type: 'fuego' },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Small
        </p>
        <div className="flex gap-2">
          <TypeBadge type="fuego" size="sm" />
          <TypeBadge type="agua" size="sm" />
          <TypeBadge type="planta" size="sm" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Medium
        </p>
        <div className="flex gap-2">
          <TypeBadge type="fuego" size="md" />
          <TypeBadge type="agua" size="md" />
          <TypeBadge type="planta" size="md" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Large
        </p>
        <div className="flex gap-2">
          <TypeBadge type="fuego" size="lg" />
          <TypeBadge type="agua" size="lg" />
          <TypeBadge type="planta" size="lg" />
        </div>
      </div>
    </div>
  ),
}

export const NormalizationAPI: Story = {
  args: { type: 'fuego' },
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          Spanish (internal)
        </p>
        <TypeBadge type="fuego" size="md" />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400">
          English (API)
        </p>
        <TypeBadge type="fire" size="md" />
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Both render the same badge — normalizeType handles both formats
      </p>
    </div>
  ),
}
