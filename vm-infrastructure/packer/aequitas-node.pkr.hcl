# Aequitas Protocol Zone - VM Image Template
# Builds a pre-configured blockchain node image for distribution

packer {
  required_plugins {
    qemu = {
      version = "~> 1"
      source  = "github.com/hashicorp/qemu"
    }
  }
}

variable "vm_name" {
  type    = string
  default = "aequitas-zone-node"
}

variable "iso_url" {
  type    = string
  default = "https://releases.ubuntu.com/22.04/ubuntu-22.04.3-live-server-amd64.iso"
}

variable "iso_checksum" {
  type    = string
  default = "sha256:a4acfda10b18da50e2ec50ccaf860d7f20b389df8765611142305c0e911d16fd"
}

source "qemu" "aequitas-node" {
  iso_url      = var.iso_url
  iso_checksum = var.iso_checksum
  
  vm_name        = "${var.vm_name}.qcow2"
  output_directory = "output"
  
  disk_size      = "100G"
  format         = "qcow2"
  accelerator    = "kvm"
  
  cpus           = 4
  memory         = 8192
  
  headless       = true
  
  http_directory = "http"
  
  boot_wait      = "5s"
  boot_command   = [
    "<esc><wait>",
    "linux /casper/vmlinuz --- autoinstall ds='nocloud-net;s=http://{{ .HTTPIP }}:{{ .HTTPPort }}/' ",
    "<enter><wait>",
    "initrd /casper/initrd<enter><wait>",
    "boot<enter>"
  ]
  
  ssh_username   = "aequitas"
  ssh_password   = "aequitas"
  ssh_timeout    = "30m"
  
  shutdown_command = "echo 'aequitas' | sudo -S shutdown -P now"
}

build {
  sources = ["source.qemu.aequitas-node"]
  
  # Update system
  provisioner "shell" {
    inline = [
      "sudo apt-get update",
      "sudo apt-get upgrade -y",
      "sudo apt-get install -y curl wget git build-essential"
    ]
  }
  
  # Install Go
  provisioner "shell" {
    inline = [
      "wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz",
      "sudo tar -C /usr/local -xzf go1.21.5.linux-amd64.tar.gz",
      "echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc",
      "echo 'export PATH=$PATH:/usr/local/go/bin' | sudo tee -a /etc/profile"
    ]
  }
  
  # Clone and build Aequitas blockchain
  provisioner "shell" {
    inline = [
      "git clone https://github.com/CreoDAMO/REPAR.git /tmp/aequitas",
      "cd /tmp/aequitas/aequitas",
      "/usr/local/go/bin/go build -o aequitasd ./cmd/aequitasd",
      "sudo mv aequitasd /usr/local/bin/",
      "sudo chmod +x /usr/local/bin/aequitasd",
      "rm -rf /tmp/aequitas"
    ]
  }
  
  # Setup blockchain configuration
  provisioner "shell" {
    inline = [
      "aequitasd init aequitas-node --chain-id aequitas-1",
      "mkdir -p /home/aequitas/.aequitas/config"
    ]
  }
  
  # Download genesis files
  provisioner "shell" {
    inline = [
      "wget -O /home/aequitas/.aequitas/config/genesis.json https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/mainnet/genesis.json || true"
    ]
  }
  
  # Create systemd service
  provisioner "shell" {
    inline = [
      "sudo tee /etc/systemd/system/aequitasd.service > /dev/null <<EOF",
      "[Unit]",
      "Description=Aequitas Protocol Zone Blockchain Node",
      "After=network.target",
      "",
      "[Service]",
      "Type=simple",
      "User=aequitas",
      "WorkingDirectory=/home/aequitas",
      "ExecStart=/usr/local/bin/aequitasd start",
      "Restart=always",
      "RestartSec=10",
      "StandardOutput=journal",
      "StandardError=journal",
      "",
      "[Install]",
      "WantedBy=multi-user.target",
      "EOF",
      "",
      "sudo systemctl daemon-reload",
      "sudo systemctl enable aequitasd"
    ]
  }
  
  # Install monitoring tools
  provisioner "shell" {
    inline = [
      "sudo apt-get install -y prometheus-node-exporter",
      "sudo systemctl enable prometheus-node-exporter"
    ]
  }
  
  # Cleanup
  provisioner "shell" {
    inline = [
      "sudo apt-get clean",
      "sudo rm -rf /var/lib/apt/lists/*",
      "history -c"
    ]
  }
  
  # Create image manifest
  post-processor "manifest" {
    output = "manifest.json"
  }
  
  # Compress image
  post-processor "compress" {
    output = "${var.vm_name}.qcow2.gz"
  }
}
