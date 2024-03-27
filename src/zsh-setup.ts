import { spawn } from 'child_process'
import { getHomeDirectory } from './utils/get-home-directory'
import { gitClone } from './utils/git-clone'
import { installUbuntuPackages } from './utils/package-manager'
import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const zshSetup = () => {
  return performanceMeasure(() => {
    installUbuntuPackages(['zsh'])

    const chsh = spawn('chsh', ['-s', '/bin/zsh'])

    runCommand(
      'curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh > ~/.oh-my-installer && chmod +x ~/.oh-my-installer && ~/.oh-my-installer -y',
    )

    gitClone(
      'https://github.com/zsh-users/zsh-autosuggestions.git',
      `${getHomeDirectory()}/.oh-my-zsh/plugins`,
    )
  })
}
