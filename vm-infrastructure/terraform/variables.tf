# Aequitas Protocol Zone VM - Terraform Variables

# Proxmox Variables
variable "proxmox_api_url" {
  description = "Proxmox API URL"
  type        = string
  default     = ""
}

variable "proxmox_user" {
  description = "Proxmox user"
  type        = string
  default     = "root@pam"
}

variable "proxmox_password" {
  description = "Proxmox password"
  type        = string
  sensitive   = true
  default     = ""
}

variable "proxmox_template_id" {
  description = "Proxmox template VM ID"
  type        = number
  default     = 9000
}

variable "proxmox_target_node" {
  description = "Proxmox target node"
  type        = string
  default     = "pve"
}

# AWS Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "aws_ami_id" {
  description = "AWS AMI ID for Ubuntu 22.04"
  type        = string
  default     = ""
}

variable "aws_subnet_id" {
  description = "AWS Subnet ID"
  type        = string
  default     = ""
}

variable "aws_key_name" {
  description = "AWS SSH key name"
  type        = string
  default     = ""
}

# GCP Variables
variable "gcp_project" {
  description = "GCP project ID"
  type        = string
  default     = ""
}

variable "gcp_region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "gcp_zone" {
  description = "GCP zone"
  type        = string
  default     = "us-central1-a"
}

variable "gcp_image" {
  description = "GCP image for Ubuntu 22.04"
  type        = string
  default     = "ubuntu-2204-lts"
}

# DigitalOcean Variables
variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
  default     = ""
}

variable "do_region" {
  description = "DigitalOcean region"
  type        = string
  default     = "nyc3"
}
