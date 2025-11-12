#!/usr/bin/env node

/**
 * Aequitas Protocol Zone VM - CLI Management Tool
 * 
 * Comprehensive CLI for deploying, managing, and monitoring
 * Aequitas Protocol Zone VMs across multiple platforms
 */

const { program } = require('commander');
const chalk = require('chalk');
const package = require('../package.json');

// Import commands
const deployCommand = require('../commands/deploy');
const listCommand = require('../commands/list');
const monitorCommand = require('../commands/monitor');
const destroyCommand = require('../commands/destroy');
const statusCommand = require('../commands/status');
const logsCommand = require('../commands/logs');
const configCommand = require('../commands/config');
const backupCommand = require('../commands/backup');

// ASCII Art Banner
console.log(chalk.blue(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║         AEQUITAS PROTOCOL ZONE VM CLI             ║
║                                                   ║
║   Sovereign Blockchain Infrastructure Manager    ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
`));

program
  .name('aequitas-vm')
  .description('CLI tool for managing Aequitas Protocol Zone VMs')
  .version(package.version);

// Deploy Command
program
  .command('deploy')
  .description('Deploy a new Aequitas Zone VM')
  .option('-p, --provider <type>', 'Deployment provider (docker, proxmox, terraform)', 'docker')
  .option('-n, --name <name>', 'VM/container name', 'aequitas-node-01')
  .option('--cores <number>', 'Number of CPU cores', '8')
  .option('--memory <size>', 'Memory size in GB', '16')
  .option('--storage <size>', 'Storage size in GB', '500')
  .option('--network <config>', 'Network configuration', 'dhcp')
  .option('--ai-security', 'Enable AI security (Cerberus)', true)
  .option('--monitoring', 'Enable monitoring (Prometheus/Grafana)', true)
  .option('--auto-start', 'Auto-start after deployment', true)
  .action(deployCommand);

// List Command
program
  .command('list')
  .description('List all Aequitas Zone VMs')
  .option('-p, --provider <type>', 'Filter by provider')
  .option('--status <status>', 'Filter by status (running, stopped, all)', 'all')
  .action(listCommand);

// Monitor Command
program
  .command('monitor <node>')
  .description('Monitor a specific Aequitas Zone VM')
  .option('--metrics', 'Show detailed metrics', false)
  .option('--refresh <seconds>', 'Auto-refresh interval', '5')
  .action(monitorCommand);

// Status Command
program
  .command('status <node>')
  .description('Get status of an Aequitas Zone VM')
  .option('--json', 'Output as JSON', false)
  .action(statusCommand);

// Logs Command
program
  .command('logs <node>')
  .description('View logs from an Aequitas Zone VM')
  .option('-f, --follow', 'Follow log output', false)
  .option('-n, --lines <number>', 'Number of lines to show', '100')
  .option('--service <name>', 'Filter by service (blockchain, cerberus, chaos)', 'all')
  .action(logsCommand);

// Destroy Command
program
  .command('destroy <node>')
  .description('Destroy an Aequitas Zone VM')
  .option('--force', 'Force destruction without confirmation', false)
  .option('--keep-data', 'Keep blockchain data', false)
  .action(destroyCommand);

// Config Command
program
  .command('config')
  .description('Manage CLI configuration')
  .option('--set <key=value>', 'Set configuration value')
  .option('--get <key>', 'Get configuration value')
  .option('--list', 'List all configuration', false)
  .action(configCommand);

// Backup Command
program
  .command('backup <node>')
  .description('Backup Aequitas Zone VM data')
  .option('--destination <path>', 'Backup destination path')
  .option('--blockchain-only', 'Backup only blockchain data', false)
  .option('--compress', 'Compress backup', true)
  .action(backupCommand);

// Connect Command
program
  .command('connect <node>')
  .description('Connect to Aequitas Zone VM via SSH')
  .option('--user <username>', 'SSH username', 'aequitas')
  .action(async (node, options) => {
    const { spawn } = require('child_process');
    const ora = require('ora');
    const spinner = ora('Connecting to node...').start();
    
    try {
      // Get node info
      const nodeInfo = await getNodeInfo(node);
      spinner.succeed(`Connecting to ${chalk.green(node)} (${nodeInfo.ip})`);
      
      // SSH connection
      const ssh = spawn('ssh', [`${options.user}@${nodeInfo.ip}`], {
        stdio: 'inherit'
      });
      
      ssh.on('exit', (code) => {
        if (code !== 0) {
          console.log(chalk.red(`SSH connection closed with code ${code}`));
        }
      });
    } catch (error) {
      spinner.fail(chalk.red(`Failed to connect: ${error.message}`));
    }
  });

// Info Command
program
  .command('info')
  .description('Display Aequitas Protocol Zone information')
  .action(() => {
    console.log(chalk.cyan('\nAequitas Protocol Zone VM'));
    console.log(chalk.gray('━'.repeat(50)));
    console.log(`Version: ${chalk.green(package.version)}`);
    console.log(`Description: ${chalk.yellow('Sovereign blockchain infrastructure')}`);
    console.log('\nSupported Providers:');
    console.log(`  • ${chalk.blue('Docker')} - Containerized deployment`);
    console.log(`  • ${chalk.blue('Proxmox VE')} - Virtual machine template`);
    console.log(`  • ${chalk.blue('Terraform')} - Multi-cloud IaC`);
    console.log('\nEndpoints:');
    console.log(`  • RPC: ${chalk.green('26657')}`);
    console.log(`  • REST: ${chalk.green('1317')}`);
    console.log(`  • gRPC: ${chalk.green('9090')}`);
    console.log(`  • Dashboard: ${chalk.green('3000')}`);
    console.log();
  });

// Parse arguments
program.parse(process.argv);

// Helper function
async function getNodeInfo(node) {
  // Placeholder - would query actual node registry
  return {
    name: node,
    ip: '192.168.1.100',
    status: 'running',
    provider: 'docker'
  };
}
