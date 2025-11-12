/**
 * Logs Command - Stream logs from a node
 * With REAL Docker API integration
 */

const chalk = require('chalk');
const Docker = require('dockerode');

module.exports = async function logsCommand(node, options) {
  console.log(chalk.cyan(`\n📜 Logs for ${chalk.yellow(node)}\n`));
  
  try {
    const docker = new Docker();
    
    // Try to find the container
    const containers = await docker.listContainers({ all: true });
    const container = containers.find(c => 
      c.Names.some(name => name.includes(node))
    );
    
    if (!container) {
      console.log(chalk.red(`✗ Container not found: ${node}`));
      console.log(chalk.yellow('\nAvailable containers:'));
      containers.forEach(c => {
        console.log(chalk.gray(`  • ${c.Names[0].replace('/', '')}`));
      });
      return;
    }
    
    const containerObj = docker.getContainer(container.Id);
    const lines = parseInt(options.lines) || 100;
    
    // Get logs
    const logOptions = {
      follow: options.follow || false,
      stdout: true,
      stderr: true,
      tail: lines,
      timestamps: options.timestamps || false
    };
    
    const stream = await containerObj.logs(logOptions);
    
    // If following, stream logs in real-time
    if (options.follow) {
      console.log(chalk.gray(`Following logs (Ctrl+C to stop)...\n`));
      stream.on('data', (chunk) => {
        process.stdout.write(chunk.toString());
      });
      
      stream.on('end', () => {
        console.log(chalk.gray('\n\nLog stream ended'));
      });
    } else {
      // Just print the logs
      const logs = stream.toString();
      console.log(logs);
      console.log(chalk.gray(`\nShowing last ${lines} lines`));
    }
    
  } catch (error) {
    console.log(chalk.red(`✗ Error fetching logs: ${error.message}`));
    
    // Fallback to mock data
    console.log(chalk.yellow('\n⚠ Using mock log data...\n'));
    const service = options.service || 'all';
    const lines = parseInt(options.lines) || 100;
    const logs = generateMockLogs(service, lines);
    
    logs.forEach(log => {
      const timestamp = chalk.gray(log.timestamp);
      let level = log.level;
      
      switch(log.level) {
        case 'INFO':
          level = chalk.green(log.level);
          break;
        case 'WARN':
          level = chalk.yellow(log.level);
          break;
        case 'ERROR':
          level = chalk.red(log.level);
          break;
        default:
          level = chalk.white(log.level);
      }
      
      console.log(`${timestamp} [${level}] ${log.message}`);
    });
  }
};

function generateMockLogs(service, count) {
  const messages = {
    blockchain: [
      'Committed block at height 1234567',
      'Validated 45 transactions',
      'Connected to peer 192.168.1.50:26656',
      'Syncing blocks...',
      'Proposal received from validator',
    ],
    cerberus: [
      'Cerberus AI Auditor initialized',
      'Threat Detection Agent active',
      'Scanning for anomalies...',
      'No threats detected',
      'Security audit completed',
    ],
    chaos: [
      'Chaos Defense System initialized',
      'ThreatOracle monitoring active',
      'Controlled vulnerability injection: 10%',
      'Attack surface rotation completed',
      'Adaptive security engaged',
    ]
  };
  
  let pool = [];
  if (service === 'all') {
    pool = [...messages.blockchain, ...messages.cerberus, ...messages.chaos];
  } else {
    pool = messages[service] || messages.blockchain;
  }
  
  const logs = [];
  const levels = ['INFO', 'INFO', 'INFO', 'WARN', 'ERROR'];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(Date.now() - (count - i) * 1000);
    logs.push({
      timestamp: date.toISOString(),
      level: levels[Math.floor(Math.random() * levels.length)],
      message: pool[Math.floor(Math.random() * pool.length)]
    });
  }
  
  return logs;
}
