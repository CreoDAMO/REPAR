# Aequitas Protocol Zone VM - AWS EC2 Module

variable "name" {
  description = "Name of the EC2 instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "m5.2xlarge"
}

variable "ami_id" {
  description = "AMI ID for Ubuntu 22.04"
  type        = string
}

variable "subnet_id" {
  description = "Subnet ID for the instance"
  type        = string
}

variable "key_name" {
  description = "SSH key pair name"
  type        = string
}

variable "enable_monitoring" {
  description = "Enable detailed monitoring"
  type        = bool
  default     = true
}

# Security Group for Aequitas Zone Node
resource "aws_security_group" "aequitas_node" {
  name        = "${var.name}-sg"
  description = "Security group for Aequitas Protocol Zone node"

  # Tendermint P2P
  ingress {
    from_port   = 26656
    to_port     = 26656
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Tendermint P2P"
  }

  # Tendermint RPC
  ingress {
    from_port   = 26657
    to_port     = 26657
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Tendermint RPC"
  }

  # Cosmos REST API
  ingress {
    from_port   = 1317
    to_port     = 1317
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Cosmos REST API"
  }

  # gRPC
  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "gRPC"
  }

  # Dashboard (optional)
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Dashboard UI"
  }

  # SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }

  # Allow all outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name    = "${var.name}-sg"
    Project = "Aequitas Protocol"
    Purpose = "Blockchain Zone Node"
  }
}

# EC2 Instance
resource "aws_instance" "aequitas_node" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.subnet_id
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.aequitas_node.id]
  monitoring             = var.enable_monitoring

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 500
    delete_on_termination = false
    encrypted             = true
    
    tags = {
      Name = "${var.name}-root"
    }
  }

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

  tags = {
    Name        = var.name
    Project     = "Aequitas Protocol"
    Purpose     = "Blockchain Zone Node"
    ManagedBy   = "Terraform"
    Environment = "Production"
  }
}

# Elastic IP (optional but recommended for validators)
resource "aws_eip" "aequitas_node" {
  instance = aws_instance.aequitas_node.id
  domain   = "vpc"

  tags = {
    Name    = "${var.name}-eip"
    Project = "Aequitas Protocol"
  }
}

# Outputs
output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.aequitas_node.id
}

output "name" {
  description = "Instance name"
  value       = var.name
}

output "public_ip" {
  description = "Public IP address"
  value       = aws_eip.aequitas_node.public_ip
}

output "private_ip" {
  description = "Private IP address"
  value       = aws_instance.aequitas_node.private_ip
}

output "security_group_id" {
  description = "Security group ID"
  value       = aws_security_group.aequitas_node.id
}
