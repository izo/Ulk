/**
 * Generate static dashboard files
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import type { Dashboard } from '@ulk/core';

/**
 * Write dashboard data to JSON file
 */
export function writeDashboardData(dashboard: Dashboard, outputDir: string): string {
  const dataPath = join(outputDir, 'dashboard.json');

  // Ensure directory exists
  if (!existsSync(dirname(dataPath))) {
    mkdirSync(dirname(dataPath), { recursive: true });
  }

  writeFileSync(dataPath, JSON.stringify(dashboard, null, 2), 'utf-8');
  console.log(`Dashboard data written to: ${dataPath}`);

  return dataPath;
}

/**
 * Generate individual project JSON files
 */
export function writeProjectFiles(dashboard: Dashboard, outputDir: string): void {
  const projectsDir = join(outputDir, 'projects');

  if (!existsSync(projectsDir)) {
    mkdirSync(projectsDir, { recursive: true });
  }

  for (const project of dashboard.projects) {
    const projectPath = join(projectsDir, `${project.id}.json`);
    writeFileSync(projectPath, JSON.stringify(project, null, 2), 'utf-8');
  }

  console.log(`Project files written to: ${projectsDir}/`);
}

/**
 * Generate summary file (lighter weight for quick loads)
 */
export function writeSummaryFile(dashboard: Dashboard, outputDir: string): void {
  const summary = {
    version: dashboard.version,
    generatedAt: dashboard.generatedAt,
    summary: dashboard.summary,
    projects: dashboard.projects.map(p => ({
      id: p.id,
      name: p.name,
      health: p.health,
      progress: p.stats.progress,
      totalTodos: p.stats.totalTodos,
      criticalTodos: p.stats.criticalTodos,
      url: p.repository.url,
    })),
  };

  const summaryPath = join(outputDir, 'summary.json');
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`Summary written to: ${summaryPath}`);
}

/**
 * Generate all static files
 */
export function generateAll(dashboard: Dashboard, outputDir: string): void {
  console.log(`\nGenerating static files in: ${outputDir}`);

  writeDashboardData(dashboard, outputDir);
  writeProjectFiles(dashboard, outputDir);
  writeSummaryFile(dashboard, outputDir);

  console.log('\nGeneration complete!');
}
