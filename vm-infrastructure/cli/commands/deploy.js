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
