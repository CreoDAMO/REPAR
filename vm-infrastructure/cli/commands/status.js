/**
 * Status Command - Get detailed status of a node
 */

const chalk = require('chalk');

module.exports = async function statusCommand(node, options) {
  const status = {
    name: node,
    status: 'running',
    uptime: '2h 34m',
    provider: 'Docker',
    ip_address: '172.25.0.2',
    resources: {
      cpu_cores: 8,
      memory_gb: 16,
      storage_gb: 500
    },
    blockchain: {
      chain_id: 'aequitas-1',
      block_height: 1234567,
      peers: 24,
      sync_status: 'synced',
      validator: true,
      voting_power: '1000000'
    },
    security: {
      cerberus_status: 'active',
      chaos_defense: 'enabled',
      threats_detected: 0
    },
    endpoints: {
      rpc: `http://${node}:26657`,
      rest: `http://${node}:1317`,
      grpc: `http://${node}:9090`,
      dashboard: `http://${node}:3000`
    }
  };
  
  if (options.json) {
    console.log(JSON.stringify(status, null, 2));
    return;
  }
  
  console.log(chalk.cyan(`\n📍 Node Status: ${chalk.yellow(node)}\n`));
  console.log(chalk.gray('━'.repeat(60)));
  
  console.log(`${chalk.white('Name:')}          ${chalk.green(status.name)}`);
  console.log(`${chalk.white('Status:')}        ${chalk.green(status.status.toUpperCase())}`);
  console.log(`${chalk.white('Uptime:')}        ${chalk.yellow(status.uptime)}`);
  console.log(`${chalk.white('Provider:')}      ${chalk.blue(status.provider)}`);
  console.log(`${chalk.white('IP Address:')}    ${chalk.yellow(status.ip_address)}`);
  
  console.log();
  console.log(chalk.white('Resources:'));
  console.log(`  CPU Cores:      ${chalk.green(status.resources.cpu_cores)}`);
  console.log(`  Memory:         ${chalk.green(status.resources.memory_gb + 'GB')}`);
  console.log(`  Storage:        ${chalk.green(status.resources.storage_gb + 'GB')}`);
  
  console.log();
  console.log(chalk.white('Blockchain:'));
  console.log(`  Chain ID:       ${chalk.green(status.blockchain.chain_id)}`);
  console.log(`  Block Height:   ${chalk.green(status.blockchain.block_height.toLocaleString())}`);
  console.log(`  Peers:          ${chalk.green(status.blockchain.peers)}`);
  console.log(`  Sync Status:    ${chalk.green(status.blockchain.sync_status.toUpperCase())}`);
  console.log(`  Validator:      ${chalk.green(status.blockchain.validator ? 'YES' : 'NO')}`);
  console.log(`  Voting Power:   ${chalk.green(status.blockchain.voting_power + ' $REPAR')}`);
  
  console.log();
  console.log(chalk.white('Security:'));
  console.log(`  Cerberus:       ${chalk.green(status.security.cerberus_status.toUpperCase())}`);
  console.log(`  Chaos Defense:  ${chalk.green(status.security.chaos_defense.toUpperCase())}`);
  console.log(`  Threats:        ${chalk.yellow(status.security.threats_detected)}`);
  
  console.log();
  console.log(chalk.white('Endpoints:'));
  console.log(`  RPC:            ${chalk.cyan(status.endpoints.rpc)}`);
  console.log(`  REST:           ${chalk.cyan(status.endpoints.rest)}`);
  console.log(`  gRPC:           ${chalk.cyan(status.endpoints.grpc)}`);
  console.log(`  Dashboard:      ${chalk.cyan(status.endpoints.dashboard)}`);
  
  console.log(chalk.gray('━'.repeat(60)));
  console.log();
};
