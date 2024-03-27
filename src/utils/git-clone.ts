import { getHomeDirectory } from './get-home-directory'
import { runCommand } from './run-command'

export const gitClone = (url: string, destination?: string) => {
  const homeDir = getHomeDirectory()
  const destinationPath = destination ? destination : homeDir

  runCommand(`cd ${destinationPath} && git clone ${url}`)
}
