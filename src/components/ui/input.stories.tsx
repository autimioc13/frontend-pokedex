import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input } from './input'

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
    error: {
      control: 'text',
    },
    helperText: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    isValid: {
      control: 'boolean',
    },
    showError: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
}

function ControlledInput() {
  const [value, setValue] = useState('pikachu')
  return (
    <Input
      label="Pokemon"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter pokemon name"
    />
  )
}

export const WithValue: Story = {
  render: ControlledInput,
}

export const WithError: Story = {
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
    showError: true,
  },
}

export const WithSuccess: Story = {
  args: {
    label: 'Username',
    isValid: true,
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    placeholder: 'Cannot edit',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Display Name',
    helperText: 'Between 3 and 20 characters',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'your@email.com',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-6">
      <Input label="Default" placeholder="Enter text" />
      <Input label="With value" defaultValue="Prefilled value" />
      <Input label="With helper" helperText="This is helpful information" />
      <Input label="Valid" isValid={true} defaultValue="Valid input" />
      <Input
        label="Error"
        error="Something went wrong"
        defaultValue="invalid@"
      />
      <Input type="password" label="Password" placeholder="Type password" />
      <Input label="Disabled" disabled placeholder="Cannot edit" />
    </div>
  ),
}
