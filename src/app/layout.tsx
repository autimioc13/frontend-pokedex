import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { ApolloClientProvider } from '@/components/providers/apollo-provider'
import { ToastProvider } from '@/components/ui/toast'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pokédex OS',
  description: 'Tu Pokédex premium — construida con Next.js',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Pokédex OS',
  },
  formatDetection: {
    telephone: false,
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '192x192',
      url: '/icons/icon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '512x512',
      url: '/icons/icon-512x512.png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/icons/icon-192x192.png',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white antialiased dark:bg-zinc-950">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ApolloClientProvider>
            <ToastProvider>{children}</ToastProvider>
          </ApolloClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
