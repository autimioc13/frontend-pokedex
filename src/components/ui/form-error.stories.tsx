import type { Meta, StoryObj } from '@storybook/react'
import { FormError } from './form-error'

const meta = {
  title: 'UI/FormError',
  component: FormError,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success'],
    },
  },
} satisfies Meta<typeof FormError>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    message: 'Please enter a valid email address',
    variant: 'error',
  },
}

export const Success: Story = {
  args: {
    message: 'Email verified successfully',
    variant: 'success',
  },
}

export const Null: Story = {
  args: {
    message: null,
  },
}

export const LongMessage: Story = {
  args: {
    message:
      'This is a longer error message that explains what went wrong in detail. It might span multiple lines and provide helpful guidance on how to fix the issue.',
    variant: 'error',
  },
}

export const SuccessLong: Story = {
  args: {
    message:
      'Your account has been created successfully. You can now log in with your credentials and start exploring the Pokédex.',
    variant: 'success',
  },
}

export const AllStates: Story = {
  args: { message: 'Dummy' },
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <FormError message="Invalid username or password" variant="error" />
      <FormError
        message="Registration successful! Check your email to confirm."
        variant="success"
      />
      <FormError message={null} />
    </div>
  ),
}
