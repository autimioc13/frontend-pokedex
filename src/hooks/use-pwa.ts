'use client'

import { useEffect, useState, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface UsePWAReturn {
  isInstalled: boolean
  isInstallable: boolean
  installPrompt: (() => Promise<void>) | null
  install: () => Promise<void>
}

export function usePWA(): UsePWAReturn {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // Detectar si la app ya está instalada
    const checkInstalled = () => {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)',
      ).matches
      const isFullscreen = window.matchMedia(
        '(display-mode: fullscreen)',
      ).matches
      const isMinimalUi = window.matchMedia(
        '(display-mode: minimal-ui)',
      ).matches

      setIsInstalled(isStandalone || isFullscreen || isMinimalUi)
    }

    // Escuchar el evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Escuchar cuando la app se instala
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setDeferredPrompt(null)
    }

    checkInstalled()

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Limpiar event listeners
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    if (!deferredPrompt) {
      console.warn('Install prompt not available')
      return
    }

    try {
      await deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
        setIsInstallable(false)
      }

      setDeferredPrompt(null)
    } catch (error) {
      console.error('Installation failed:', error)
    }
  }, [deferredPrompt])

  return {
    isInstalled,
    isInstallable,
    installPrompt: deferredPrompt ? install : null,
    install,
  }
}
