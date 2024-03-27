import { chromeSetup } from './chrome-setup'
import { coreSetup } from './core-setup'
import { dotfilesSetup } from './dotfiles-setup'
import { gitSetup } from './git-setup'
import { luaSetup } from './lua-setup'
import { nvimSetup } from './nvim-setup'
import { sshSetup } from './ssh-setup'
import { zshSetup } from './zsh-setup'

export const executeSetup = async () => {
  // Order matters, as some tasks depend on others
  // TODO: Should make this more robust
  const tasks = [
    coreSetup,
    dotfilesSetup,
    gitSetup,
    sshSetup,
    zshSetup,
    nvimSetup,
    chromeSetup,
    luaSetup,
  ]

  for (const task of tasks) {
    await task()
  }
}

executeSetup()
