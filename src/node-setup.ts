import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const nodeSetup = () => {
  return performanceMeasure(() => {
    console.log('Installing NVM...')
    const nvmInstallCommand = `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`
    runCommand(nvmInstallCommand)
    runCommand('source ~/.bashrc')

    console.log('Installing Node.js 18...')
    runCommand('nvm install 18')
  })
}
