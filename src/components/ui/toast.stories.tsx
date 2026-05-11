import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider } from './toast'
import { useToast } from '@/hooks/use-toast'
import { Button } from './button'

const ToastDemoContent = () => {
  const { addToast } = useToast()

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="primary"
        onClick={() =>
          addToast({
            type: 'success',
            message: 'This is a success message!',
          })
        }
      >
        Show Success
      </Button>
      <Button
        variant="danger"
        onClick={() =>
          addToast({
            type: 'error',
            message: 'An error occurred!',
          })
        }
      >
        Show Error
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          addToast({
            type: 'info',
            message: 'This is an informational message.',
          })
        }
      >
        Show Info
      </Button>
    </div>
  )
}

const meta = {
  title: 'UI/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

export const WithProvider: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <ToastDemoContent />
    </ToastProvider>
  ),
}

export const Success: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Click the button to show a success toast
        </p>
        <Button
          variant="primary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const button = e.currentTarget
            button.textContent = 'Check bottom right...'
            setTimeout(() => {
              button.textContent = 'Show Success'
            }, 3000)
          }}
        >
          Show Success
        </Button>
      </div>
    </ToastProvider>
  ),
}

export const Error: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Click the button to show an error toast
        </p>
        <Button
          variant="danger"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const button = e.currentTarget
            button.textContent = 'Check bottom right...'
            setTimeout(() => {
              button.textContent = 'Show Error'
            }, 3000)
          }}
        >
          Show Error
        </Button>
      </div>
    </ToastProvider>
  ),
}

export const Info: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Click the button to show an info toast
        </p>
        <Button
          variant="secondary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const button = e.currentTarget
            button.textContent = 'Check bottom right...'
            setTimeout(() => {
              button.textContent = 'Show Info'
            }, 3000)
          }}
        >
          Show Info
        </Button>
      </div>
    </ToastProvider>
  ),
}

export const MultipleToasts: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Click to show multiple toasts
        </p>
        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            const button = e.currentTarget
            button.textContent = 'Check bottom right...'
            setTimeout(() => {
              button.textContent = 'Show Multiple'
            }, 4000)
          }}
        >
          Show Multiple
        </Button>
      </div>
    </ToastProvider>
  ),
}

export const AllToastTypes: Story = {
  args: { children: null },
  render: () => (
    <ToastProvider>
      <ToastDemoContent />
    </ToastProvider>
  ),
}
