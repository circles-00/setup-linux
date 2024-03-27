#!/bin/bash

username="nikola"

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

prepare_system() {
  if command_exists apt; then
    apt update
    apt install sudo
    sudo apt install -y curl
  elif command_exists yum; then
    yum update
    yum install sudo
    sudo yum install -y curl
  else
    echo "Unsupported package manager. Please install curl manually."
    exit 1
  fi
}

# Add user with sudo privileges and configure no password sudo
add_user() {
  sudo adduser --gecos "" "$username" # "--gecos" flag sets empty user details
  sudo usermod -aG sudo "$username"   # Add user to the sudo group
  sudo usermod -d "/home/$username" "$username" # Set user's home directory
  sudo chown -R "$username:$username" "/home/$username" # Set ownership of user's home directory
  echo "$username ALL=(ALL:ALL) NOPASSWD:ALL" | sudo tee "/etc/sudoers.d/$username" # Configure no password sudo
}

# Main script
main() {
  prepare_system
  add_user
}

# Run main
main
