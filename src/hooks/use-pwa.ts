import { useState, useEffect, useCallback } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export interface PWAState {
  hasInstalled: boolean
  canInstall: boolean
  isStandalone: boolean
  promptInstall: () => Promise<boolean>
  dismissPrompt: () => void
  showPrompt: boolean
}

export const useNewInstallPrompt = (): PWAState => {
  const [hasInstalled, setHasInstalled] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if running as standalone
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true

    setIsStandalone(Boolean(isStandaloneMode))

    const dismissed = localStorage.getItem('pwa-dismissed') === 'true'
    const installed = localStorage.getItem('pwa-installed') === 'true' || Boolean(isStandaloneMode)

    setHasInstalled(installed)

    if (!installed && !dismissed) {
      // Show prompt after brief delay
      const timer = setTimeout(() => setShowPrompt(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      const event = e as BeforeInstallPromptEvent
      setDeferredPrompt(event)
      const dismissed = localStorage.getItem('pwa-dismissed') === 'true'
      if (!dismissed) {
        setShowPrompt(true)
      }
    }

    const handleAppInstalled = () => {
      setHasInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
      localStorage.setItem('pwa-installed', 'true')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async (): Promise<boolean> => {
    if (!deferredPrompt) {
      return false
    }

    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setHasInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
      localStorage.setItem('pwa-installed', 'true')
      return true
    }
    return false
  }, [deferredPrompt])

  const dismissPrompt = useCallback(() => {
    setShowPrompt(false)
    localStorage.setItem('pwa-dismissed', 'true')
  }, [])

  return {
    hasInstalled,
    canInstall: Boolean(deferredPrompt),
    isStandalone,
    promptInstall,
    dismissPrompt,
    showPrompt,
  }
}