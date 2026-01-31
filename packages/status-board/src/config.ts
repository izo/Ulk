/**
 * Status Board Configuration
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export interface ProjectConfig {
  /** Repository in format owner/repo */
  repo: string;
  /** Display name (defaults to repo name) */
  name?: string;
  /** Custom paths for todo/spec files */
  paths?: {
    todo?: string;
    spec?: string;
  };
}

export interface StatusBoardConfig {
  /** GitHub personal access token */
  githubToken?: string;
  /** List of projects to track */
  projects: ProjectConfig[];
  /** Output directory for generated files */
  outputDir: string;
  /** Sync configuration */
  sync?: {
    notion?: {
      enabled: boolean;
      token?: string;
      databaseId?: string;
    };
    linear?: {
      enabled: boolean;
      apiKey?: string;
      teamId?: string;
    };
  };
}

const DEFAULT_CONFIG: StatusBoardConfig = {
  projects: [],
  outputDir: './public/data',
};

/**
 * Load configuration from file or environment
 */
export function loadConfig(configPath?: string): StatusBoardConfig {
  const paths = configPath
    ? [configPath]
    : [
        'status-board.config.json',
        '.status-board.json',
        join(process.cwd(), 'status-board.config.json'),
      ];

  for (const path of paths) {
    if (existsSync(path)) {
      try {
        const content = readFileSync(path, 'utf-8');
        const fileConfig = JSON.parse(content) as Partial<StatusBoardConfig>;
        return mergeConfig(fileConfig);
      } catch {
        console.warn(`Failed to parse config file: ${path}`);
      }
    }
  }

  // Fallback to environment variables
  return mergeConfig({});
}

function mergeConfig(fileConfig: Partial<StatusBoardConfig>): StatusBoardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...fileConfig,
    githubToken:
      fileConfig.githubToken ||
      process.env.GITHUB_TOKEN ||
      process.env.GH_TOKEN,
  };
}

/**
 * Parse repo string into owner/name
 */
export function parseRepoString(repo: string): { owner: string; name: string } {
  const parts = repo.split('/');
  if (parts.length !== 2) {
    throw new Error(`Invalid repo format: ${repo}. Expected owner/repo`);
  }
  return { owner: parts[0], name: parts[1] };
}
