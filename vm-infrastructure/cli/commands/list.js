/**
 * List Command - Display all Aequitas Zone VMs
 * Now with REAL Docker API integration
 */

const chalk = require('chalk');
const Table = require('cli-table3');
const Docker = require('dockerode');

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
  
  let nodes = [];
  
  // Query real Docker containers
  try {
    const dockerNodes = await getDockerNodes();
    nodes = nodes.concat(dockerNodes);
  } catch (error) {
    console.log(chalk.yellow('⚠ Could not connect to Docker:', error.message));
  }
  
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

/**
 * Get real Docker containers running Aequitas nodes
 */
async function getDockerNodes() {
  const docker = new Docker();
  const containers = await docker.listContainers({ all: true });
  
  // Filter for Aequitas containers
  const aequitasContainers = containers.filter(container => 
    container.Image.includes('aequitas') || 
    container.Names.some(name => name.includes('aequitas'))
  );
  
  return aequitasContainers.map(container => {
    const network = container.NetworkSettings?.Networks || {};
    const networkName = Object.keys(network)[0];
    const ip = networkName ? network[networkName].IPAddress : 'N/A';
    
    // Calculate uptime
    const created = new Date(container.Created * 1000);
    const uptime = formatUptime(Date.now() - created);
    
    return {
      name: container.Names[0].replace('/', ''),
      provider: 'Docker',
      status: container.State.toLowerCase(),
      ip: ip || 'N/A',
      uptime: container.State === 'running' ? uptime : '-',
      resources: 'See docker stats'
    };
  });
}

/**
 * Format uptime duration
 */
function formatUptime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}
