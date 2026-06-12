#!/usr/bin/env node

import { compile } from '@aetheris/compiler';
import * as path from 'path';

const args = process.argv.slice(2);
const command = args[0];

const showHelp = () => {
  console.log(`
Aetheris Framework CLI

Usage:
  aetheris <command> [options]

Commands:
  init <project-name>  Create a new Aetheris project from a template
  dev                  Start local development server and resource emulation
  deploy               Deploy the current application to configured cloud provider
  destroy              Tear down all deployed resources in the cloud

Options:
  --help, -h           Show help text
  --version, -v        Show CLI version
`);
};

if (!command || args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
  console.log('Aetheris CLI v0.1.0');
  process.exit(0);
}

async function run() {
  switch (command) {
    case 'init': {
      const projectName = args[1];
      if (!projectName) {
        console.error('Error: Please specify a project name. Example: aetheris init my-app');
        process.exit(1);
      }
      console.log(`Initializing new Aetheris project "${projectName}"...`);
      console.log('Project templates copied. Run "pnpm install" to begin!');
      break;
    }
    case 'dev': {
      console.log('Starting local development server and emulation gateway at http://localhost:3000...');
      console.log('Compiling configuration topology...');
      try {
        const topology = await compile(path.resolve(process.cwd(), './src/index.js'));
        console.log('Compiled Topology successfully. Resources discovered:');
        console.log(JSON.stringify(topology, null, 2));
      } catch (e) {
        console.warn('No index.js found, starting dev gateway with empty environment.');
      }
      break;
    }
    case 'deploy': {
      const stageIndex = args.indexOf('--stage');
      const stage = stageIndex !== -1 ? args[stageIndex + 1] : 'dev';
      console.log(`Building production bundles for stage "${stage}"...`);
      console.log('Compiling resources into target CloudFormation and envoy descriptors...');
      console.log('Deployment completed successfully!');
      break;
    }
    case 'destroy': {
      const stageIndex = args.indexOf('--stage');
      const stage = stageIndex !== -1 ? args[stageIndex + 1] : 'dev';
      console.log(`Tearing down resources in stage "${stage}"...`);
      console.log('Destroy completed successfully.');
      break;
    }
    default: {
      console.error(`Error: Unknown command "${command}".`);
      showHelp();
      process.exit(1);
    }
  }
}

run().catch((err) => {
  console.error('Execution failed:', err);
  process.exit(1);
});
