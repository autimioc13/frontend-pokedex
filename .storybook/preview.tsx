import type { Preview } from '@storybook/react'
import { withThemeByDataAttribute } from '@storybook/addon-themes'

import '../src/styles/tokens.css'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#09090b' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        dark: 'dark',
        light: 'light',
      },
      defaultTheme: 'dark',
      attributeName: 'data-theme',
    }),
    (Story, context) => {
      const currentTheme =
        context.globals.theme ||
        (context.globals.backgrounds?.value === '#09090b' ? 'dark' : 'light')

      return (
        <div
          className={`font-sans antialiased ${
            currentTheme === 'dark' ? 'dark bg-zinc-950' : 'bg-white'
          } flex min-h-20 items-center justify-center p-6`}
          data-theme={currentTheme}
        >
          <Story />
        </div>
      )
    },
  ],
}

export default preview
