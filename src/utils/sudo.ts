import { runCommand } from './run-command'

export const sudo = (command: string) => {
  return runCommand(`echo ${process.env.SUDO_PASSWORD} | sudo -S ${command}`)
}
