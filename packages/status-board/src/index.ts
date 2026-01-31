/**
 * @ulk/status-board
 * Unified dashboard for Ulk-managed projects
 */

export { loadConfig, parseRepoString, type StatusBoardConfig, type ProjectConfig } from './config.js';
export { fetchProjects } from './fetch.js';
export { generateAll, writeDashboardData, writeProjectFiles, writeSummaryFile } from './generate.js';

// Re-export core types for convenience
export type { Dashboard, Project, Todo, TodoFile, SpecFile } from '@ulk/core';
