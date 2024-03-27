import {
  installUbuntuPackageFromPpa,
  installUbuntuPackages,
} from './utils/package-manager'
import { performanceMeasure } from './utils/performance-measure'

export const coreSetup = () => {
  return performanceMeasure(() => {
    const packages = [
      'build-essential',
      'cmake',
      'pkg-config',
      'libpthread-stubs0-dev',
      'git',
      'lua5.1',
      'unzip',
      'libtool',
      'libtool-bin',
      'gettext',
      'compton',
      'curl',
      'htop',
      'golang',
      'lsof',
      'i3',
      'ccache',
      'ninja-build',
      'python3-pip',
      'dconf-editor',
      'nvidia-settings',
      'pavucontrol',
      'moreutils',
      'clangd',
      'ubuntu-mate-desktop',
      'flameshot',
      'tmux',
      'wireshark',
      'fzf',
      'kdenlive',
      'gimp',
      'xclip',
      'screenkey',
      'tldr',
      'ripgrep',
      'shutter',
      'software-properties-common',
      'apt-transport-https',
    ]

    installUbuntuPackages(packages)

    installUbuntuPackageFromPpa('ppa:ansible/ansible', ['ansible'])
    installUbuntuPackageFromPpa('ppa:kdenlive/kdenlive-stable', ['kdenlive'])
  })
}
