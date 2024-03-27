import { gitClone } from './utils/git-clone'
import { performanceMeasure } from './utils/performance-measure'
import { readdir, lstat } from 'fs/promises'
import { getHomeDirectory } from './utils/get-home-directory'
import { runCommand } from './utils/run-command'

export const dotfilesSetup = async () => {
  return await performanceMeasure(async () => {
    const excludedSymlinkDirs = ['.ssh', 'bin', '.tmux.conf']
    gitClone('https://github.com/circles-00/dotfiles.git')

    const files = await readdir('./dotfiles')
    runCommand(`mkdir -p ~/.config`)
    for (const file of files) {
      if (file.endsWith('.git')) {
        continue
      }

      const isDirectory = (await lstat(`dotfiles/${file}`)).isDirectory()

      if (isDirectory && !excludedSymlinkDirs.includes(file)) {
        runCommand(`ln -s ~/dotfiles/${file} ~/.config`)
      }

      if (file.includes('.tmux.conf')) {
        runCommand(`ln -s ~/dotfiles/${file} ~/.tmux.conf`)
      }
    }

    const scripts = await readdir('./dotfiles/bin')
    runCommand(`mkdir -p ${getHomeDirectory()}/.local/bin`)
    for (const script of scripts) {
      runCommand(
        `ln -s ~/dotfiles/bin/.local/scripts/${script} ${getHomeDirectory()}/.local/bin`,
      )
    }
  })
}
