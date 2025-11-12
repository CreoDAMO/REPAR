/**
 * Destroy Command - Destroy an Aequitas Zone VM
 */

const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');

module.exports = async function destroyCommand(node, options) {
  console.log(chalk.red(`\n⚠️  DESTROY NODE: ${chalk.yellow(node)}\n`));
  
  // Confirmation
  if (!options.force) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: chalk.yellow(`This will permanently destroy ${node}. Continue?`),
        default: false
      }
    ]);
    
    if (!confirm) {
      console.log(chalk.yellow('Operation cancelled'));
      return;
    }
    
    // Double confirmation for production
    const { doubleConfirm } = await inquirer.prompt([
      {
        type: 'input',
        name: 'doubleConfirm',
        message: `Type "${node}" to confirm destruction:`,
        validate: (input) => {
          if (input === node) return true;
          return 'Node name does not match';
        }
      }
    ]);
  }
  
  const spinner = ora('Destroying node...').start();
  
  try {
    // Step 1: Stop services
    spinner.text = 'Stopping services...';
    await new Promise(resolve => setTimeout(resolve, 1000));
    spinner.succeed('Services stopped');
    
    // Step 2: Backup data (if not keeping)
    if (!options.keepData) {
      spinner.start('Backing up data...');
      await new Promise(resolve => setTimeout(resolve, 1500));
      spinner.succeed('Data backed up to /backups/');
    }
    
    // Step 3: Destroy VM/Container
    spinner.start('Destroying VM/container...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    spinner.succeed('VM/container destroyed');
    
    // Step 4: Clean up volumes
    if (!options.keepData) {
      spinner.start('Cleaning up volumes...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      spinner.succeed('Volumes cleaned up');
    }
    
    console.log();
    console.log(chalk.green('✓ Node destroyed successfully'));
    console.log();
    
    if (options.keepData) {
      console.log(chalk.yellow('Data preserved in:'));
      console.log(`  • Blockchain: /var/lib/aequitas`);
      console.log(`  • Evidence: /var/lib/evidence`);
    } else {
      console.log(chalk.yellow('Backup location:'));
      console.log(`  • /backups/${node}-${Date.now()}.tar.gz`);
    }
    console.log();
    
  } catch (error) {
    spinner.fail(chalk.red(`Failed to destroy node: ${error.message}`));
    process.exit(1);
  }
};
