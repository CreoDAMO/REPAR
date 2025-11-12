/**
 * List Command - Display all Aequitas Zone VMs
 */

const chalk = require('chalk');
const Table = require('cli-table3');

module.exports = async function listCommand(options) {
  console.log(chalk.cyan('\n📋 Aequitas Protocol Zone Nodes\n'));
  
  // Create table
  const table = new Table({
    head: [
      chalk.white('Name'),
      chalk.white('Provider'),
      chalk.white('Status'),
      chalk.white('IP Address'),
      chalk.white('Uptime'),
      chalk.white('Resources')
    ],
    style: {
      head: [],
      border: ['gray']
    }
  });
  
  // Mock data - would query actual node registry
  const nodes = [
    {
      name: 'aequitas-node-01',
      provider: 'Docker',
      status: 'running',
      ip: '172.25.0.2',
      uptime: '2h 34m',
      resources: '8 cores, 16GB RAM'
    },
    {
      name: 'aequitas-node-02',
      provider: 'Proxmox',
      status: 'running',
      ip: '192.168.1.100',
      uptime: '5h 12m',
      resources: '8 cores, 16GB RAM'
    },
    {
      name: 'aequitas-node-03',
      provider: 'AWS',
      status: 'stopped',
      ip: '54.123.45.67',
      uptime: '-',
      resources: '8 cores, 16GB RAM'
    }
  ];
  
  // Filter by provider if specified
  let filteredNodes = nodes;
  if (options.provider) {
    filteredNodes = nodes.filter(n => 
      n.provider.toLowerCase() === options.provider.toLowerCase()
    );
  }
  
  // Filter by status
  if (options.status !== 'all') {
    filteredNodes = filteredNodes.filter(n => 
      n.status === options.status
    );
  }
  
  // Add rows to table
  filteredNodes.forEach(node => {
    const statusColor = node.status === 'running' ? chalk.green : chalk.red;
    
    table.push([
      chalk.yellow(node.name),
      chalk.blue(node.provider),
      statusColor(node.status.toUpperCase()),
      node.ip,
      node.uptime,
      node.resources
    ]);
  });
  
  console.log(table.toString());
  console.log(`\nTotal: ${chalk.green(filteredNodes.length)} nodes`);
  console.log();
};
