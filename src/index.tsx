import * as React from 'react'

const checkStandalone = () => {
  return (
    // @ts-ignore
    navigator?.standalone ||
    window?.matchMedia('(display-mode: standalone)').matches
  )
}

type PwaInfos = {
  isInstallPromptSupported: boolean
  promptInstall: () => Promise<boolean> | null
  isStandalone: boolean
}

const initialState: PwaInfos = {
  isInstallPromptSupported: false,
  promptInstall: () => null,
  isStandalone: checkStandalone()
}

const usePWA = () => {
  const [pwaInfos, setPwaInfos] = React.useState<PwaInfos>(initialState)

  React.useEffect(() => {
    const beforeinstallpromptHandler = (e: Event) => {
      // Prevent install prompt from showing so we can prompt it later
      e.preventDefault()

      const promptInstall = async () => {
        // @ts-ignore
        const promptRes = await e.prompt()
        if (promptRes.outcome === 'accepted') {
          setPwaInfos({
            ...pwaInfos,
            isStandalone: checkStandalone()
          })
          return true
        }
        return false
      }

      setPwaInfos({
        isInstallPromptSupported: true,
        promptInstall,
        isStandalone: checkStandalone()
      })
    }

    const onAppInstalled = () => {
      setTimeout(() => setPwaInfos({ ...pwaInfos, isStandalone: checkStandalone() }), 200)
    }

    const onMatchMedia = () => {
      setPwaInfos({
        ...pwaInfos,
        isStandalone: checkStandalone()
      });
    }

    // Listen on the installation prompt. If this listener is triggered,
    // it means PWA install is possible.
    window.addEventListener('beforeinstallprompt', beforeinstallpromptHandler)

    // It's also possible to know when the user installed the app by
    // listening the app installed event
    window.addEventListener('appinstalled', onAppInstalled)

    // On Chrome, when user opens the previous installed app
    // from the website (via the shortcut in the address bar),
    // we want to check again if the app is in standalone mode.
    window.matchMedia('(display-mode: standalone)').addListener(onMatchMedia)

    return () => {
      // Cleanup event listeners
      window.removeEventListener('beforeinstallprompt', beforeinstallpromptHandler)
      window.removeEventListener('appinstalled', onAppInstalled)
      window.matchMedia('(display-mode: standalone)').removeEventListener("change", onMatchMedia)
    }
  }, [pwaInfos])

  return pwaInfos
}

export default usePWA
