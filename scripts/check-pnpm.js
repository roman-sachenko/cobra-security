#!/usr/bin/env node

/**
 * Check if pnpm is installed and available
 * This script runs as a preinstall hook to ensure pnpm is used
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

function checkPnpmInstalled() {
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function suggestInstall() {
  console.error('\n❌ pnpm is required but not installed.\n');
  console.error('Install pnpm using one of these methods:\n');
  console.error('  Option 1: Using npm (if you have npm installed):');
  console.error('    npm install -g pnpm\n');
  console.error('  Option 2: Using Corepack (Node.js 16.13+):');
  console.error('    corepack enable');
  console.error('    corepack prepare pnpm@latest --activate\n');
  console.error('  Option 3: Using standalone script:');
  console.error('    curl -fsSL https://get.pnpm.io/install.sh | sh -\n');
  console.error('  Option 4: Using Homebrew (macOS):');
  console.error('    brew install pnpm\n');
  process.exit(1);
}

// In CI, we expect pnpm to be set up by the CI environment
if (isCI) {
  if (!checkPnpmInstalled()) {
    console.error('ERROR: pnpm is not available in CI environment');
    process.exit(1);
  }
  process.exit(0);
}

// In local development, check and provide helpful error message
if (!checkPnpmInstalled()) {
  suggestInstall();
}

// pnpm is installed, check version
try {
  const version = execSync('pnpm --version', { encoding: 'utf-8' }).trim();
  const majorVersion = parseInt(version.split('.')[0], 10);
  
  if (majorVersion < 9) {
    console.warn(`⚠️  Warning: pnpm version ${version} detected. Version 9.0.0+ is recommended.`);
    console.warn('   Update with: corepack prepare pnpm@latest --activate\n');
  }
} catch {
  // Version check failed, but pnpm exists, so continue
}

process.exit(0);
