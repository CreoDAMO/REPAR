/**
 * Monitor Command - Real-time monitoring of Aequitas Zone VM
 */

const chalk = require('chalk');
const ora = require('ora');

module.exports = async function monitorCommand(node, options) {
  console.log(chalk.cyan(`\n📊 Monitoring ${chalk.yellow(node)}\n`));
  
  const spinner = ora('Connecting to node...').start();
  
  try {
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    spinner.succeed('Connected to node');
    
    console.log(chalk.gray('━'.repeat(60)));
    console.log(`${chalk.white('Node:')} ${chalk.green(node)}`);
    console.log(`${chalk.white('Status:')} ${chalk.green('RUNNING')}`);
    console.log(`${chalk.white('Uptime:')} ${chalk.yellow('2h 34m')}`);
    console.log(chalk.gray('━'.repeat(60)));
    console.log();
    
    // Display metrics
    displayMetrics();
    
    if (options.metrics) {
      console.log();
      displayDetailedMetrics();
    }
    
    console.log();
    console.log(chalk.yellow(`Auto-refreshing every ${options.refresh} seconds...`));
    console.log(chalk.gray('Press Ctrl+C to exit'));
    console.log();
    
    // Auto-refresh (simplified for demo)
    if (parseInt(options.refresh) > 0) {
      setInterval(() => {
        console.clear();
        console.log(chalk.cyan(`\n📊 Monitoring ${chalk.yellow(node)}\n`));
        console.log(chalk.gray('━'.repeat(60)));
        displayMetrics();
      }, parseInt(options.refresh) * 1000);
    }
    
  } catch (error) {
    spinner.fail(chalk.red(`Failed to connect: ${error.message}`));
    process.exit(1);
  }
};

function displayMetrics() {
  console.log(chalk.white('System Resources:'));
  console.log(`  CPU Usage:    ${getColoredBar(45)} ${chalk.yellow('45%')}`);
  console.log(`  Memory:       ${getColoredBar(62)} ${chalk.yellow('10.2GB / 16GB')}`);
  console.log(`  Disk:         ${getColoredBar(35)} ${chalk.yellow('175GB / 500GB')}`);
  console.log();
  
  console.log(chalk.white('Blockchain Metrics:'));
  console.log(`  Block Height: ${chalk.green('1,234,567')}`);
  console.log(`  Peers:        ${chalk.green('24')}`);
  console.log(`  Tx/s:         ${chalk.green('45')}`);
  console.log(`  Sync Status:  ${chalk.green('SYNCED')}`);
}

function displayDetailedMetrics() {
  console.log(chalk.white('Detailed Metrics:'));
  console.log(chalk.gray('━'.repeat(60)));
  console.log(`  Validator:        ${chalk.green('ACTIVE')}`);
  console.log(`  Voting Power:     ${chalk.yellow('1,000,000 $REPAR')}`);
  console.log(`  Uptime:           ${chalk.green('99.8%')}`);
  console.log(`  Last Block Time:  ${chalk.yellow('6.2s')}`);
  console.log(`  Network:          ${chalk.green('aequitas-1')}`);
  console.log();
  
  console.log(chalk.white('AI Security:'));
  console.log(`  Cerberus:         ${chalk.green('ACTIVE')}`);
  console.log(`  Threats Detected: ${chalk.yellow('0')}`);
  console.log(`  Chaos Defense:    ${chalk.green('ENABLED')}`);
  console.log(`  Vulnerability:    ${chalk.yellow('10% controlled')}`);
}

function getColoredBar(percentage) {
  const barLength = 20;
  const filled = Math.round((percentage / 100) * barLength);
  const empty = barLength - filled;
  
  let color = chalk.green;
  if (percentage > 70) color = chalk.yellow;
  if (percentage > 90) color = chalk.red;
  
  return color('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
}
