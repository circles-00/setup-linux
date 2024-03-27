import { getHomeDirectory } from './utils/get-home-directory'
import { gitClone } from './utils/git-clone'
import { installUbuntuPackages } from './utils/package-manager'
import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const nvimSetup = () => {
  return performanceMeasure(() => {
    runCommand(`rm -rf ~/neovim`)

    runCommand(
      `mkdir -p ${getHomeDirectory()}/.local/share/nvim/site/pack/packer/start`,
    )
    gitClone(
      'https://github.com/wbthomason/packer.nvim',
      `${getHomeDirectory()}/.local/share/nvim/site/pack/packer/start`,
    )

    gitClone('https://github.com/neovim/neovim.git', `${getHomeDirectory()}`)

    runCommand(`cd ${getHomeDirectory()}/neovim && make -j 20`)

    runCommand(`cd ${getHomeDirectory()}/neovim && sudo make install`)

    installUbuntuPackages(['luarocks'])
  })
}
