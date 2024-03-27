import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const luaSetup = () => {
  return performanceMeasure(() => {
    runCommand('sudo apt-get install -y lua5.1')
  })
}
