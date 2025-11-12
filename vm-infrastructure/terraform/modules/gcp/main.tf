# Aequitas Protocol Zone VM - GCP Compute Engine Module

variable "name" {
  description = "Name of the Compute Engine instance"
  type        = string
}

variable "machine_type" {
  description = "Machine type"
  type        = string
  default     = "n2-standard-8"
}

variable "zone" {
  description = "GCP zone"
  type        = string
}

variable "image" {
  description = "Boot image"
  type        = string
  default     = "ubuntu-2204-lts"
}

variable "enable_monitoring" {
  description = "Enable monitoring"
  type        = bool
  default     = true
}

# Firewall rule for Aequitas node
resource "google_compute_firewall" "aequitas_node" {
  name    = "${var.name}-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22", "26656", "26657", "1317", "9090", "3000"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["aequitas-node"]

  description = "Firewall rules for Aequitas Protocol Zone node"
}

# Compute Engine Instance
resource "google_compute_instance" "aequitas_node" {
  name         = var.name
  machine_type = var.machine_type
  zone         = var.zone

  tags = ["aequitas-node", "blockchain", "validator"]

  boot_disk {
    initialize_params {
      image = var.image
      size  = 500
      type  = "pd-ssd"
    }
  }

  network_interface {
    network = "default"

    access_config {
      # Ephemeral public IP
    }
  }

  metadata = {
    enable-oslogin = "TRUE"
  }

  metadata_startup_script = <<-EOF
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

  service_account {
    scopes = ["cloud-platform"]
  }

  labels = {
    project     = "aequitas-protocol"
    purpose     = "blockchain-zone-node"
    managed_by  = "terraform"
    environment = "production"
  }

  lifecycle {
    ignore_changes = [metadata_startup_script]
  }
}

# Static IP address (recommended for validators)
resource "google_compute_address" "aequitas_node" {
  name   = "${var.name}-static-ip"
  region = substr(var.zone, 0, length(var.zone) - 2)
}

# Attach static IP to instance
resource "google_compute_instance" "aequitas_node_with_static_ip" {
  count        = 0  # Set to 1 to enable static IP
  name         = "${var.name}-static"
  machine_type = var.machine_type
  zone         = var.zone

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.aequitas_node.address
    }
  }
}

# Outputs
output "instance_id" {
  description = "Compute Engine instance ID"
  value       = google_compute_instance.aequitas_node.instance_id
}

output "name" {
  description = "Instance name"
  value       = google_compute_instance.aequitas_node.name
}

output "external_ip" {
  description = "External IP address"
  value       = google_compute_instance.aequitas_node.network_interface[0].access_config[0].nat_ip
}

output "internal_ip" {
  description = "Internal IP address"
  value       = google_compute_instance.aequitas_node.network_interface[0].network_ip
}

output "self_link" {
  description = "Instance self link"
  value       = google_compute_instance.aequitas_node.self_link
}
