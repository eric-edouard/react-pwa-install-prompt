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

    window.addEventListener('beforeinstallprompt', beforeinstallpromptHandler)
    window.addEventListener('appinstalled', onAppInstalled)

    return () => {
      // Cleanup event listeners
      window.removeEventListener('beforeinstallprompt', beforeinstallpromptHandler)
      window.removeEventListener('appinstalled', onAppInstalled)
    }
  }, [pwaInfos])

  return pwaInfos
}

export default usePWA
