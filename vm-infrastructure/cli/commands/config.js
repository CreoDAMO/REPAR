/**
 * Config Command - Manage CLI configuration
 */

const chalk = require('chalk');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CONFIG_DIR = path.join(os.homedir(), '.aequitas-vm');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

module.exports = async function configCommand(options) {
  // Ensure config directory exists
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
  }
  
  // Load existing config
  let config = {};
  if (fs.existsSync(CONFIG_FILE)) {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  
  if (options.set) {
    // Set configuration value
    const [key, value] = options.set.split('=');
    if (!key || !value) {
      console.log(chalk.red('Invalid format. Use: --set key=value'));
      return;
    }
    
    config[key] = value;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
    console.log(chalk.green(`✓ Set ${key} = ${value}`));
    
  } else if (options.get) {
    // Get configuration value
    const value = config[options.get];
    if (value !== undefined) {
      console.log(value);
    } else {
      console.log(chalk.yellow(`Configuration key "${options.get}" not found`));
    }
    
  } else if (options.list) {
    // List all configuration
    console.log(chalk.cyan('\n⚙️  Aequitas VM CLI Configuration\n'));
    
    if (Object.keys(config).length === 0) {
      console.log(chalk.yellow('No configuration set'));
    } else {
      Object.entries(config).forEach(([key, value]) => {
        console.log(`${chalk.white(key)}: ${chalk.green(value)}`);
      });
    }
    console.log();
  } else {
    // Show help
    console.log(chalk.cyan('\n⚙️  Configuration Management\n'));
    console.log('Usage:');
    console.log(`  ${chalk.gray('aequitas-vm config --set key=value')}`);
    console.log(`  ${chalk.gray('aequitas-vm config --get key')}`);
    console.log(`  ${chalk.gray('aequitas-vm config --list')}`);
    console.log();
    console.log('Common settings:');
    console.log(`  ${chalk.white('default_provider')}: Default deployment provider`);
    console.log(`  ${chalk.white('default_cores')}: Default CPU cores`);
    console.log(`  ${chalk.white('default_memory')}: Default memory (GB)`);
    console.log();
  }
};
