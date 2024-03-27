import { getHomeDirectory } from './utils/get-home-directory'
import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'
import { sudo } from './utils/sudo'

export const chromeSetup = () => {
  return performanceMeasure(() => {
    runCommand(
      `cd ~ && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb`,
    )

    sudo(
      `apt-get install -y ${getHomeDirectory()}/google-chrome-stable_current_amd64.deb`,
    )

    sudo('apt --fix-broken install -y')
  })
}
