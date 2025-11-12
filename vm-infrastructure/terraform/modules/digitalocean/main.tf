# Aequitas Protocol Zone VM - DigitalOcean Droplet Module

variable "name" {
  description = "Name of the Droplet"
  type        = string
}

variable "size" {
  description = "Droplet size"
  type        = string
  default     = "s-8vcpu-16gb"
}

variable "image" {
  description = "Droplet image"
  type        = string
  default     = "ubuntu-22-04-x64"
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc3"
}

variable "enable_monitoring" {
  description = "Enable monitoring"
  type        = bool
  default     = true
}

variable "enable_backups" {
  description = "Enable automated backups"
  type        = bool
  default     = true
}

# SSH Key (users should create this beforehand)
data "digitalocean_ssh_key" "aequitas" {
  name = "aequitas-deployment-key"
}

# Firewall for Aequitas node
resource "digitalocean_firewall" "aequitas_node" {
  name = "${var.name}-firewall"

  droplet_ids = [digitalocean_droplet.aequitas_node.id]

  # SSH
  inbound_rule {
    protocol         = "tcp"
    port_range       = "22"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Tendermint P2P
  inbound_rule {
    protocol         = "tcp"
    port_range       = "26656"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Tendermint RPC
  inbound_rule {
    protocol         = "tcp"
    port_range       = "26657"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Cosmos REST API
  inbound_rule {
    protocol         = "tcp"
    port_range       = "1317"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # gRPC
  inbound_rule {
    protocol         = "tcp"
    port_range       = "9090"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Dashboard (optional)
  inbound_rule {
    protocol         = "tcp"
    port_range       = "3000"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # Allow all outbound
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}

# DigitalOcean Droplet
resource "digitalocean_droplet" "aequitas_node" {
  name   = var.name
  size   = var.size
  image  = var.image
  region = var.region

  ssh_keys = [data.digitalocean_ssh_key.aequitas.id]

  monitoring = var.enable_monitoring
  backups    = var.enable_backups

  # Increase root volume to 500GB
  resize_disk = true

  user_data = <<-EOF
    #!/bin/bash
    set -e
    
    # Update system
    apt-get update && apt-get upgrade -y
    
    # Install Docker
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    
    # Install Docker Compose
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    
    # Clone Aequitas Protocol repository
    git clone https://github.com/AequitasProtocol/aequitas-protocol.git /opt/aequitas
    cd /opt/aequitas
    
    # Run deployment script
    chmod +x scripts/deploy-blockchain-complete.sh
    ./scripts/deploy-blockchain-complete.sh
    
    echo "Aequitas Protocol Zone Node installation complete"
  EOF

  tags = [
    "aequitas-protocol",
    "blockchain",
    "zone-node",
    "validator",
    "production"
  ]
}

# Block Storage Volume for blockchain data (optional)
resource "digitalocean_volume" "aequitas_data" {
  region                  = var.region
  name                    = "${var.name}-data"
  size                    = 500
  description             = "Blockchain data volume for ${var.name}"
  initial_filesystem_type = "ext4"
}

# Attach volume to droplet
resource "digitalocean_volume_attachment" "aequitas_data" {
  droplet_id = digitalocean_droplet.aequitas_node.id
  volume_id  = digitalocean_volume.aequitas_data.id
}

# Outputs
output "droplet_id" {
  description = "Droplet ID"
  value       = digitalocean_droplet.aequitas_node.id
}

output "name" {
  description = "Droplet name"
  value       = digitalocean_droplet.aequitas_node.name
}

output "ipv4_address" {
  description = "Public IPv4 address"
  value       = digitalocean_droplet.aequitas_node.ipv4_address
}

output "ipv4_address_private" {
  description = "Private IPv4 address"
  value       = digitalocean_droplet.aequitas_node.ipv4_address_private
}

output "volume_id" {
  description = "Block storage volume ID"
  value       = digitalocean_volume.aequitas_data.id
}
