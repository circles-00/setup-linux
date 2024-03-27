import { readdir } from 'fs/promises'
import { getHomeDirectory } from './utils/get-home-directory'
import { performanceMeasure } from './utils/performance-measure'
import { runCommand } from './utils/run-command'

export const sshSetup = async () => {
  return await performanceMeasure(async () => {
    runCommand(
      `cp -r ${getHomeDirectory()}/dotfiles/.ssh ${getHomeDirectory()}`,
    )

    runCommand(`chmod 700 ${getHomeDirectory()}/.ssh`)
    const files = await readdir(`${getHomeDirectory()}/.ssh`)

    const ansiblePasswordFilePath = `${getHomeDirectory()}/.ssh/ansible_password`
    const ansiblePassword = process.env.ANSIBLE_PASSWORD
    runCommand(`echo ${ansiblePassword} > ${ansiblePasswordFilePath}`)

    for (const file of files) {
      if (
        file.endsWith('.pub') ||
        file.includes('ansible_password') ||
        file.includes('config') ||
        file.includes('known_hosts')
      ) {
        runCommand(`chmod 644 ${getHomeDirectory()}/.ssh/${file}`)
        continue
      }

      runCommand(`chmod 600 ${getHomeDirectory()}/.ssh/${file}`)

      if (file !== 'config') {
        runCommand(
          `ansible-vault decrypt ${getHomeDirectory()}/.ssh/${file} --vault-password-file ${ansiblePasswordFilePath}`,
        )
      }
    }

    runCommand(`rm ${ansiblePasswordFilePath}`)
  })
}
