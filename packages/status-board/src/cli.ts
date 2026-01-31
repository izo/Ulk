#!/usr/bin/env node
/**
 * Status Board CLI
 *
 * Commands:
 *   fetch    - Fetch data from GitHub
 *   generate - Generate static files
 *   serve    - Start local dev server
 *   sync     - Sync with external services (Notion, Linear)
 */

import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { loadConfig } from './config.js';
import { fetchProjects } from './fetch.js';
import { generateAll } from './generate.js';

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';

  switch (command) {
    case 'fetch':
      await runFetch();
      break;
    case 'generate':
      await runGenerate();
      break;
    case 'serve':
      await runServe(args[1]);
      break;
    case 'all':
      await runFetch();
      await runGenerate();
      break;
    case 'help':
    default:
      printHelp();
  }
}

async function runFetch() {
  console.log('Status Board - Fetching projects\n');
  const config = loadConfig();

  if (config.projects.length === 0) {
    console.error('No projects configured. Create a status-board.config.json file.');
    console.error('\nExample:\n');
    console.error(
      JSON.stringify(
        {
          projects: [{ repo: 'owner/repo-name' }],
          outputDir: './public/data',
        },
        null,
        2
      )
    );
    process.exit(1);
  }

  const dashboard = await fetchProjects(config);
  generateAll(dashboard, config.outputDir);
}

async function runGenerate() {
  console.log('Status Board - Generating static files\n');
  const config = loadConfig();

  // Try to read existing dashboard.json
  const dashboardPath = join(config.outputDir, 'dashboard.json');
  if (!existsSync(dashboardPath)) {
    console.error('No dashboard.json found. Run "fetch" first.');
    process.exit(1);
  }

  const dashboard = JSON.parse(readFileSync(dashboardPath, 'utf-8'));
  generateAll(dashboard, config.outputDir);
}

async function runServe(portArg?: string) {
  const port = parseInt(portArg || '3000', 10);
  const publicDir = join(process.cwd(), 'public');

  console.log(`Status Board - Starting server on http://localhost:${port}\n`);

  const server = createServer((req, res) => {
    let filePath = join(publicDir, req.url === '/' ? 'index.html' : req.url || '');

    // Security: prevent directory traversal
    if (!filePath.startsWith(publicDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });

  server.listen(port, () => {
    console.log(`Serving: ${publicDir}`);
    console.log(`Open: http://localhost:${port}`);
    console.log('\nPress Ctrl+C to stop');
  });
}

function printHelp() {
  console.log(`
Status Board - Unified dashboard for Ulk-managed projects

Usage:
  status-board <command> [options]

Commands:
  fetch      Fetch project data from GitHub
  generate   Generate static files from cached data
  serve      Start local development server
  all        Fetch + generate in one command
  help       Show this help message

Configuration:
  Create a status-board.config.json file:

  {
    "projects": [
      { "repo": "owner/repo-name" },
      { "repo": "owner/another-repo", "name": "Display Name" }
    ],
    "outputDir": "./public/data"
  }

Environment:
  GITHUB_TOKEN   GitHub personal access token (for private repos)
  GH_TOKEN       Alternative token variable

Examples:
  status-board fetch      # Fetch all projects
  status-board serve 8080 # Start server on port 8080
  status-board all        # Fetch and generate
`);
}

main().catch((error) => {
  console.error('Error:', error.message);
  process.exit(1);
});
