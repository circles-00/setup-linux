import { runCommand } from './run-command'
import { sudo } from './sudo'

export const installUbuntuPackages = (packages: string[]) => {
  console.log(`Installing packages: ${packages.join(', ')}`)
  sudo(
    `DEBIAN_FRONTEND=noninteractive apt-get install -y ${packages.join(' ')}`,
  )
}

export const installUbuntuPackageFromPpa = (
  ppa: string,
  packages: string[],
) => {
  sudo(`add-apt-repository -y ${ppa}`)
  sudo('DEBIAN_FRONTEND=noninteractive apt-get update -y')
  installUbuntuPackages(packages)
}

export const installNpmGlobalPackages = (packages: string[]) => {
  console.log(`Installing npm packages: ${packages.join(', ')}`)
  runCommand(`npm install -g ${packages.join(' ')}`)
}
