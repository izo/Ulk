/**
 * Fetch project data from GitHub
 */

import {
  createGitHubClient,
  parseTodoFile,
  parseSpecFile,
  calculateTodoStats,
  calculateHealth,
  type Project,
  type Dashboard,
  type DashboardSummary,
} from '@ulk/core';
import { type StatusBoardConfig, parseRepoString } from './config.js';

/**
 * Fetch all projects and generate dashboard data
 */
export async function fetchProjects(config: StatusBoardConfig): Promise<Dashboard> {
  const client = createGitHubClient({ token: config.githubToken });
  const projects: Project[] = [];

  console.log(`Fetching ${config.projects.length} projects...`);

  for (const projectConfig of config.projects) {
    try {
      const { owner, name } = parseRepoString(projectConfig.repo);
      console.log(`  - ${projectConfig.repo}...`);

      // Fetch repo info
      const repoInfo = await client.getRepo(owner, name);

      // Fetch todo.md
      const todoContent = await client.getTodoFile(owner, name);
      const todoFile = todoContent
        ? parseTodoFile(todoContent, 'docs/todo.md', name)
        : undefined;

      // Fetch spec.md
      const specContent = await client.getSpecFile(owner, name);
      const specFile = specContent
        ? parseSpecFile(specContent, 'docs/spec.md', name)
        : undefined;

      // Calculate stats
      const stats = todoFile
        ? calculateTodoStats(todoFile.todos)
        : {
            totalTodos: 0,
            completedTodos: 0,
            blockedTodos: 0,
            criticalTodos: 0,
            progress: 0,
          };

      const project: Project = {
        id: projectConfig.repo.replace('/', '-'),
        name: projectConfig.name || name,
        description: repoInfo.description,
        repository: {
          owner,
          name,
          url: repoInfo.url,
          defaultBranch: repoInfo.defaultBranch,
        },
        todos: todoFile,
        spec: specFile,
        health: todoFile ? calculateHealth(todoFile.todos) : 'unknown',
        lastSync: new Date().toISOString(),
        stats,
      };

      projects.push(project);
      console.log(`    OK (${stats.totalTodos} todos, ${stats.progress}% complete)`);
    } catch (error) {
      console.error(`    FAILED: ${error instanceof Error ? error.message : error}`);
    }
  }

  const summary = calculateSummary(projects);

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    projects,
    summary,
  };
}

/**
 * Calculate dashboard summary from projects
 */
function calculateSummary(projects: Project[]): DashboardSummary {
  const totalTodos = projects.reduce((sum, p) => sum + p.stats.totalTodos, 0);
  const completedTodos = projects.reduce((sum, p) => sum + p.stats.completedTodos, 0);

  return {
    totalProjects: projects.length,
    healthyProjects: projects.filter(p => p.health === 'healthy').length,
    warningProjects: projects.filter(p => p.health === 'warning').length,
    criticalProjects: projects.filter(p => p.health === 'critical').length,
    totalTodos,
    completedTodos,
    overallProgress: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0,
  };
}
