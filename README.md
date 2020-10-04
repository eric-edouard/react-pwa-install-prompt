# react-pwa-install-prompt

> A react hook to prompt the install of your PWA in supported browers (Chrome desktop &amp; mobile)



[![NPM](https://img.shields.io/npm/v/react-pwa-install-prompt.svg)](https://www.npmjs.com/package/react-pwa-install-prompt) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add react-pwa-install-prompt
```

## Usage

```tsx
import React from 'react'
import usePWA from 'react-pwa-install-prompt'

const Example = () => {
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

export default Example

```

## License

MIT © [eric-edouard](https://github.com/eric-edouard)
