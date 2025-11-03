#!/usr/bin/env node

import { Command } from 'commander';
import { resolve } from 'path';

const program = new Command();

program
  .name('cobra')
  .description('AI-augmented security and developer productivity platform')
  .version('0.1.0');

program
  .command('scan')
  .description('Scan infrastructure and application code for security risks')
  .option('-t, --target <path>', 'Target path to scan', '.')
  .action((options) => {
    const target = resolve(process.cwd(), options.target);
    console.log(`Scanning target: ${target}`);
    console.log('🔍 Placeholder scan: Analysis in progress...');
    console.log('   (Full scan implementation coming soon)');
  });

program.parse(process.argv);

// Exit with non-zero code on unexpected errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});
