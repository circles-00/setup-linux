import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const gitSetup = () => {
  return performanceMeasure(() => {
    const gitUsername = process.env.GIT_USERNAME
    const gitEmail = process.env.GIT_EMAIL

    runCommand(`git config --global user.name "${gitUsername}"`)
    runCommand(`git config --global user.email "${gitEmail}"`)
  })
}
