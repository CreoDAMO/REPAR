# Aequitas Protocol Zone VM - Terraform Configuration
# Supports multi-cloud deployment (Proxmox, AWS, GCP, DigitalOcean)

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    proxmox = {
      source  = "telmate/proxmox"
      version = "~> 2.9"
    }
    
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Variables
variable "provider_type" {
  description = "Cloud provider (proxmox, aws, gcp, digitalocean)"
  type        = string
  default     = "proxmox"
}

variable "node_count" {
  description = "Number of Aequitas Zone nodes to deploy"
  type        = number
  default     = 1
}

variable "node_name_prefix" {
  description = "Prefix for node names"
  type        = string
  default     = "aequitas-node"
}

variable "enable_monitoring" {
  description = "Enable Prometheus/Grafana monitoring"
  type        = bool
  default     = true
}

variable "enable_ai_security" {
  description = "Enable Cerberus AI Auditor"
  type        = bool
  default     = true
}

# Proxmox Provider Configuration
provider "proxmox" {
  count       = var.provider_type == "proxmox" ? 1 : 0
  pm_api_url  = var.proxmox_api_url
  pm_user     = var.proxmox_user
  pm_password = var.proxmox_password
}

# AWS Provider Configuration
provider "aws" {
  count  = var.provider_type == "aws" ? 1 : 0
  region = var.aws_region
}

# GCP Provider Configuration
provider "google" {
  count   = var.provider_type == "gcp" ? 1 : 0
  project = var.gcp_project
  region  = var.gcp_region
}

# DigitalOcean Provider Configuration
provider "digitalocean" {
  count = var.provider_type == "digitalocean" ? 1 : 0
  token = var.do_token
}

# Proxmox VM Module
module "aequitas_vm_proxmox" {
  count  = var.provider_type == "proxmox" ? var.node_count : 0
  source = "./modules/proxmox"
  
  vm_id           = 100 + count.index
  name            = "${var.node_name_prefix}-${count.index + 1}"
  template_id     = var.proxmox_template_id
  target_node     = var.proxmox_target_node
  cores           = 8
  memory          = 16384
  disk_size       = "500G"
  network_bridge  = "vmbr0"
}

# AWS EC2 Module
module "aequitas_vm_aws" {
  count  = var.provider_type == "aws" ? var.node_count : 0
  source = "./modules/aws"
  
  name          = "${var.node_name_prefix}-${count.index + 1}"
  instance_type = "m5.2xlarge"
  ami_id        = var.aws_ami_id
  subnet_id     = var.aws_subnet_id
  key_name      = var.aws_key_name
}

# GCP Compute Engine Module
module "aequitas_vm_gcp" {
  count  = var.provider_type == "gcp" ? var.node_count : 0
  source = "./modules/gcp"
  
  name         = "${var.node_name_prefix}-${count.index + 1}"
  machine_type = "n2-standard-8"
  zone         = var.gcp_zone
  image        = var.gcp_image
}

# DigitalOcean Droplet Module
module "aequitas_vm_digitalocean" {
  count  = var.provider_type == "digitalocean" ? var.node_count : 0
  source = "./modules/digitalocean"
  
  name   = "${var.node_name_prefix}-${count.index + 1}"
  size   = "s-8vcpu-16gb"
  image  = "ubuntu-22-04-x64"
  region = var.do_region
}

# Outputs
output "node_details" {
  description = "Details of deployed Aequitas Zone nodes"
  value = merge(
    var.provider_type == "proxmox" ? {
      for idx, vm in module.aequitas_vm_proxmox : 
      "node-${idx + 1}" => {
        vm_id = vm.vm_id
        name  = vm.name
        ip    = vm.ip_address
      }
    } : {},
    var.provider_type == "aws" ? {
      for idx, vm in module.aequitas_vm_aws :
      "node-${idx + 1}" => {
        instance_id = vm.instance_id
        name        = vm.name
        public_ip   = vm.public_ip
        private_ip  = vm.private_ip
      }
    } : {},
    var.provider_type == "gcp" ? {
      for idx, vm in module.aequitas_vm_gcp :
      "node-${idx + 1}" => {
        instance_id = vm.instance_id
        name        = vm.name
        external_ip = vm.external_ip
        internal_ip = vm.internal_ip
      }
    } : {},
    var.provider_type == "digitalocean" ? {
      for idx, vm in module.aequitas_vm_digitalocean :
      "node-${idx + 1}" => {
        droplet_id = vm.droplet_id
        name       = vm.name
        ipv4       = vm.ipv4_address
      }
    } : {}
  )
}

output "endpoints" {
  description = "Aequitas Zone service endpoints"
  value = {
    rpc_port       = 26657
    p2p_port       = 26656
    rest_port      = 1317
    grpc_port      = 9090
    dashboard_port = 3000
  }
}
