import type { NextConfig } from 'next'
// @ts-expect-error - next-pwa doesn't have TypeScript types
import withPWA from 'next-pwa'

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/PokeAPI/sprites/**',
      },
    ],
  },
}

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    // Cache-first strategy para assets estáticos (imágenes, sprites, fonts)
    {
      urlPattern:
        /^https:\/\/.*\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Cache-first para imágenes de Pokémon (API externa)
    {
      urlPattern:
        /^https:\/\/raw\.githubusercontent\.com.*\.(png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'pokemon-sprites',
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Network-first para rutas de la app
    {
      urlPattern: /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'app-routes',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 24 * 60 * 60, // 1 día
        },
      },
    },
    // Stale-while-revalidate para API calls
    {
      urlPattern: /^https:\/\/.*\/api\/.*$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 1 día
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
})(nextConfig)
