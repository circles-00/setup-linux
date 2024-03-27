import { installNpmGlobalPackages } from './utils/package-manager'
import { performanceMeasure } from './utils/performance-measure'

export const npmPackagesSetup = async () => {
  return performanceMeasure(() => {
    installNpmGlobalPackages([
      'yarn',
      'eslint',
      'typescript-language-server',
      'typescript',
      'ts-node',
    ])
  })
}
