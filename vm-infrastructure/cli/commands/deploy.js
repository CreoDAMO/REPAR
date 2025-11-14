/**
 * Deploy Command - Aequitas Zone VM
 */

const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

module.exports = async function deployCommand(options) {
  console.log(chalk.cyan('\n🚀 Deploying Aequitas Protocol Zone VM\n'));
  
  const spinner = ora('Validating configuration...').start();
  
  try {
    // Validate configuration
    await validateConfig(options);
    spinner.succeed('Configuration validated');
    
    // Confirm deployment
    if (!await confirmDeployment(options)) {
      console.log(chalk.yellow('Deployment cancelled'));
      return;
    }
    
    // Deploy based on provider
    switch (options.provider) {
      case 'docker':
        await deployDocker(options);
        break;
      case 'local-kvm':
        await deployLocalKVM(options);
        break;
      case 'proxmox':
        await deployProxmox(options);
        break;
      case 'terraform':
        await deployTerraform(options);
        break;
      default:
        throw new Error(`Unknown provider: ${options.provider}`);
    }
    
    console.log(chalk.green('\n✓ Deployment completed successfully!\n'));
    displayNodeInfo(options);
    
  } catch (error) {
    spinner.fail(chalk.red(`Deployment failed: ${error.message}`));
    process.exit(1);
  }
};

async function validateConfig(options) {
  // Validate cores
  const cores = parseInt(options.cores);
  if (cores < 4) {
    throw new Error('Minimum 4 CPU cores required');
  }
  
  // Validate memory
  const memory = parseInt(options.memory);
  if (memory < 8) {
    throw new Error('Minimum 8GB RAM required');
  }
  
  // Validate storage
  const storage = parseInt(options.storage);
  if (storage < 100) {
    throw new Error('Minimum 100GB storage required');
  }
  
  return true;
}

async function confirmDeployment(options) {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Deploy ${chalk.green(options.name)} with ${options.cores} cores, ${options.memory}GB RAM on ${chalk.blue(options.provider)}?`,
      default: true
    }
  ]);
  return confirm;
}

async function deployDocker(options) {
  const Docker = require('dockerode');
  const docker = new Docker();
  const path = require('path');
  
  const spinner = ora('Deploying Docker container...').start();
  
  try {
    // Get the docker directory path
    const dockerDir = path.join(__dirname, '../../docker');
    
    spinner.text = 'Building Aequitas Zone image...';
    
    // Build image using docker-compose
    const buildCmd = `cd ${dockerDir} && docker-compose build`;
    await execAsync(buildCmd);
    
    spinner.text = 'Starting container...';
    
    // Start container using docker-compose
    const upCmd = `cd ${dockerDir} && docker-compose up -d`;
    await execAsync(upCmd);
    
    // Wait for container to be ready
    spinner.text = 'Waiting for node to be ready...';
    await waitForNode('aequitas-protocol-zone', 30000);
    
    spinner.succeed('Docker container deployed and running');
    
    return {
      name: options.name || 'aequitas-protocol-zone',
      ip: 'localhost',
      endpoints: {
        rpc: 'http://localhost:26657',
        rest: 'http://localhost:1317',
        grpc: 'http://localhost:9090'
      }
    };
  } catch (error) {
    spinner.fail('Docker deployment failed');
    throw error;
  }
}

/**
 * Wait for Docker container to be ready
 */
async function waitForNode(containerName, timeout = 30000) {
  const Docker = require('dockerode');
  const axios = require('axios');
  const docker = new Docker();
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const container = docker.getContainer(containerName);
      const info = await container.inspect();
      
      // Check if container is running
      if (info.State.Running) {
        // Try to query RPC endpoint to verify node is ready
        try {
          await axios.get('http://localhost:26657/status', { timeout: 3000 });
          return true;
        } catch (rpcError) {
          // RPC not ready yet, continue waiting
        }
      }
    } catch (error) {
      // Container not found or not ready yet
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  throw new Error(`Container failed to become ready within ${timeout/1000}s. Check logs for errors.`);
}

async function deployLocalKVM(options) {
  const spinner = ora('Deploying local KVM VM...').start();
  const path = require('path');
  const { v4: uuidv4 } = require('uuid');
  
  try {
    const vmName = options.name || `aequitas-node-${uuidv4().substring(0, 8)}`;
    const vmDir = path.join(__dirname, '../../vms', vmName);
    
    // Create VM directory
    const fs = require('fs').promises;
    await fs.mkdir(vmDir, { recursive: true });
    
    spinner.text = 'Downloading Ubuntu Cloud Image...';
    
    // Download Ubuntu 22.04 cloud image as base
    const baseImageUrl = 'https://cloud-images.ubuntu.com/releases/jammy/release/ubuntu-22.04-server-cloudimg-amd64.img';
    const baseImagePath = path.join(__dirname, '../../images/ubuntu-22.04-base.img');
    
    // Create images directory
    await fs.mkdir(path.dirname(baseImagePath), { recursive: true });
    
    // Download base image if it doesn't exist
    const fs2 = require('fs');
    if (!fs2.existsSync(baseImagePath)) {
      await execAsync(`wget -O ${baseImagePath} ${baseImageUrl}`);
    }
    
    spinner.text = 'Creating virtual disk from base image...';
    
    // Create disk from base image and resize
    const diskPath = path.join(vmDir, 'disk.qcow2');
    await execAsync(`qemu-img create -f qcow2 -F qcow2 -b ${baseImagePath} ${diskPath} ${options.storage}G`);
    
    spinner.text = 'Generating cloud-init configuration...';
    
    // Generate cloud-init config
    const cloudInitPath = path.join(vmDir, 'cloud-init.yaml');
    const cloudInitConfig = generateCloudInit(vmName);
    await fs.writeFile(cloudInitPath, cloudInitConfig);
    
    // Create cloud-init ISO
    const seedPath = path.join(vmDir, 'seed.iso');
    await execAsync(`cloud-localds ${seedPath} ${cloudInitPath}`);
    
    spinner.text = 'Starting VM with QEMU/KVM...';
    
    // Launch VM with QEMU
    const qemuCmd = buildQEMUCommand({
      name: vmName,
      cores: options.cores,
      memory: options.memory * 1024, // Convert GB to MB
      diskPath,
      seedPath,
      vmDir
    });
    
    // Start VM in background
    await execAsync(`${qemuCmd} > ${vmDir}/vm.log 2>&1 &`);
    
    // Save VM info
    const vmInfo = {
      name: vmName,
      provider: 'local-kvm',
      cores: options.cores,
      memory: options.memory,
      storage: options.storage,
      diskPath,
      created: new Date().toISOString(),
      status: 'running'
    };
    
    await fs.writeFile(path.join(vmDir, 'vm.json'), JSON.stringify(vmInfo, null, 2));
    
    spinner.text = 'Waiting for VM to boot...';
    await new Promise(resolve => setTimeout(resolve, 15000)); // Wait 15s for boot
    
    spinner.text = 'Waiting for blockchain node to start...';
    await waitForNodeHealthy(30000);
    
    spinner.succeed(`Local KVM VM deployed: ${vmName}`);
    
    return {
      name: vmName,
      ip: '127.0.0.1',
      endpoints: {
        rpc: 'http://localhost:26657',
        rest: 'http://localhost:1317',
        grpc: 'http://localhost:9090'
      }
    };
  } catch (error) {
    spinner.fail('Local KVM deployment failed');
    throw error;
  }
}

function buildQEMUCommand(config) {
  return `qemu-system-x86_64 \\
    -name ${config.name} \\
    -machine type=q35,accel=kvm \\
    -cpu host \\
    -smp ${config.cores} \\
    -m ${config.memory} \\
    -drive file=${config.diskPath},format=qcow2,if=virtio \\
    -drive file=${config.seedPath},format=raw,if=virtio \\
    -netdev user,id=net0,hostfwd=tcp::26656-:26656,hostfwd=tcp::26657-:26657,hostfwd=tcp::1317-:1317,hostfwd=tcp::9090-:9090 \\
    -device virtio-net-pci,netdev=net0 \\
    -display none \\
    -daemonize \\
    -pidfile ${config.vmDir}/vm.pid`;
}

function generateCloudInit(vmName) {
  return `#cloud-config
hostname: ${vmName}
users:
  - name: aequitas
    sudo: ALL=(ALL) NOPASSWD:ALL
    shell: /bin/bash
    groups: [sudo]
    lock_passwd: false
    passwd: $6$rounds=4096$saltsalt$saltsalt

packages:
  - curl
  - wget
  - git
  - build-essential

runcmd:
  # Install Go as aequitas user
  - su - aequitas -c "wget https://go.dev/dl/go1.21.5.linux-amd64.tar.gz"
  - tar -C /usr/local -xzf /home/aequitas/go1.21.5.linux-amd64.tar.gz
  - rm /home/aequitas/go1.21.5.linux-amd64.tar.gz
  
  # Clone and build Aequitas blockchain as aequitas user
  - su - aequitas -c "git clone https://github.com/CreoDAMO/REPAR.git /home/aequitas/aequitas-repo"
  - su - aequitas -c "cd /home/aequitas/aequitas-repo/aequitas && /usr/local/go/bin/go build -o /tmp/aequitasd ./cmd/aequitasd"
  - mv /tmp/aequitasd /usr/local/bin/aequitasd
  - chmod +x /usr/local/bin/aequitasd
  
  # Initialize node as aequitas user
  - su - aequitas -c "aequitasd init ${vmName} --chain-id aequitas-1"
  
  # Download genesis to correct location
  - su - aequitas -c "wget -O /home/aequitas/.aequitas/config/genesis.json https://raw.githubusercontent.com/CreoDAMO/REPAR/main/chain-config/mainnet/genesis.json || true"
  
  # Enable and start systemd service
  - systemctl daemon-reload
  - systemctl enable aequitasd
  - systemctl start aequitasd

write_files:
  - path: /etc/systemd/system/aequitasd.service
    content: |
      [Unit]
      Description=Aequitas Protocol Zone Blockchain Node
      After=network.target
      
      [Service]
      Type=simple
      User=aequitas
      ExecStart=/usr/local/bin/aequitasd start
      Restart=always
      RestartSec=10
      StandardOutput=journal
      StandardError=journal
      
      [Install]
      WantedBy=multi-user.target

final_message: "Aequitas Protocol Zone node is ready!"
`;
}

async function waitForNodeHealthy(timeout = 30000) {
  const axios = require('axios');
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    try {
      const response = await axios.get('http://localhost:26657/status', { timeout: 3000 });
      if (response.data && response.data.result) {
        return true;
      }
    } catch (error) {
      // Node not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  throw new Error(`Node failed to become healthy within ${timeout/1000}s`);
}

async function deployProxmox(options) {
  const spinner = ora('Deploying Proxmox VM...').start();
  
  try {
    const cmd = `cd ../proxmox && ./deploy-vm.sh --name ${options.name}`;
    await execAsync(cmd);
    
    spinner.succeed('Proxmox VM deployed');
  } catch (error) {
    spinner.fail('Proxmox deployment failed');
    throw error;
  }
}

async function deployTerraform(options) {
  const spinner = ora('Deploying with Terraform...').start();
  
  try {
    // Initialize Terraform
    spinner.text = 'Initializing Terraform...';
    await execAsync('cd ../terraform && terraform init');
    
    // Plan deployment
    spinner.text = 'Planning deployment...';
    await execAsync('cd ../terraform && terraform plan');
    
    // Apply deployment
    spinner.text = 'Applying deployment...';
    await execAsync('cd ../terraform && terraform apply -auto-approve');
    
    spinner.succeed('Terraform deployment completed');
  } catch (error) {
    spinner.fail('Terraform deployment failed');
    throw error;
  }
}

function displayNodeInfo(options) {
  console.log(chalk.cyan('Node Information:'));
  console.log(chalk.gray('━'.repeat(50)));
  console.log(`Name:     ${chalk.green(options.name)}`);
  console.log(`Provider: ${chalk.blue(options.provider)}`);
  console.log(`CPU:      ${chalk.yellow(options.cores + ' cores')}`);
  console.log(`Memory:   ${chalk.yellow(options.memory + 'GB')}`);
  console.log(`Storage:  ${chalk.yellow(options.storage + 'GB')}`);
  console.log('\nEndpoints:');
  console.log(`  • RPC:       ${chalk.green('http://localhost:26657')}`);
  console.log(`  • REST:      ${chalk.green('http://localhost:1317')}`);
  console.log(`  • Dashboard: ${chalk.green('http://localhost:3000')}`);
  console.log('\nNext steps:');
  console.log(`  • Monitor:   ${chalk.gray('aequitas-vm monitor ' + options.name)}`);
  console.log(`  • Status:    ${chalk.gray('aequitas-vm status ' + options.name)}`);
  console.log(`  • Logs:      ${chalk.gray('aequitas-vm logs ' + options.name)}`);
  console.log();
}
