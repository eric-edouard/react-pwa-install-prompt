import React from 'react'
import usePWA from 'react-pwa-install-prompt'

import 'react-pwa-install-prompt/dist/index.css'

const App = () => {
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA()

  const renderInstallButton = () => {
    if (isInstallPromptSupported && isStandalone)
      return (
        <button onClick={promptInstall}>Prompt PWA Install</button>
      )
    return null
  }

  return (<div style={{marginLeft: '2em'}}>
    <h2>PWA Infos</h2>
    <p>Is Install Prompt Supported ? {isInstallPromptSupported ? 'true' : 'false'}</p>
    <p>Is Standalone ? {isStandalone ? 'true' : 'false'}</p>
    {renderInstallButton()}
  </div>)
}

export default App
