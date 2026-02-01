/**
 * Core types for Ulk ecosystem
 * Shared between all packages (status-board, vscode, nova)
 * Swift apps use equivalent types via JSON schema
 */

// =============================================================================
// Todo Types
// =============================================================================

export type TodoPriority = 'critical' | 'high' | 'medium' | 'low';
export type TodoStatus = 'pending' | 'in_progress' | 'done' | 'blocked';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority: TodoPriority;
  status: TodoStatus;
  tags?: string[];
  assignee?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  /** Reference to parent todo for subtasks */
  parentId?: string;
  /** Source file and line number */
  source?: {
    file: string;
    line: number;
  };
}

export interface TodoFile {
  path: string;
  project: string;
  todos: Todo[];
  metadata?: {
    title?: string;
    description?: string;
    lastUpdated?: string;
  };
}

// =============================================================================
// Spec Types
// =============================================================================

export interface SpecSection {
  id: string;
  title: string;
  level: number;
  content: string;
  children?: SpecSection[];
}

export interface SpecFile {
  path: string;
  project: string;
  title: string;
  description?: string;
  sections: SpecSection[];
  metadata?: {
    version?: string;
    status?: 'draft' | 'review' | 'approved';
    lastUpdated?: string;
  };
}

// =============================================================================
// Project Types
// =============================================================================

export type ProjectHealth = 'healthy' | 'warning' | 'critical' | 'unknown';

export interface Project {
  id: string;
  name: string;
  description?: string;
  repository: {
    owner: string;
    name: string;
    url: string;
    defaultBranch: string;
  };
  /** Parsed todo.md content */
  todos?: TodoFile;
  /** Parsed spec.md content */
  spec?: SpecFile;
  /** Overall project health based on todos and activity */
  health: ProjectHealth;
  /** Last sync timestamp */
  lastSync: string;
  /** Project statistics */
  stats: ProjectStats;
}

export interface ProjectStats {
  totalTodos: number;
  completedTodos: number;
  blockedTodos: number;
  criticalTodos: number;
  /** Completion percentage */
  progress: number;
}

// =============================================================================
// Dashboard Types
// =============================================================================

export interface Dashboard {
  version: string;
  generatedAt: string;
  projects: Project[];
  summary: DashboardSummary;
}

export interface DashboardSummary {
  totalProjects: number;
  healthyProjects: number;
  warningProjects: number;
  criticalProjects: number;
  totalTodos: number;
  completedTodos: number;
  overallProgress: number;
}

// =============================================================================
// Sync Types (for external integrations)
// =============================================================================

export type SyncProvider = 'notion' | 'linear' | 'things' | 'reminders' | 'github';

export interface SyncConfig {
  provider: SyncProvider;
  enabled: boolean;
  apiKey?: string;
  workspaceId?: string;
  projectMapping?: Record<string, string>;
}

export interface SyncResult {
  provider: SyncProvider;
  success: boolean;
  syncedAt: string;
  itemsSynced: number;
  errors?: string[];
}

// =============================================================================
// GitHub Types
// =============================================================================

export interface GitHubRepo {
  owner: string;
  name: string;
  fullName: string;
  description?: string;
  url: string;
  defaultBranch: string;
  private: boolean;
  updatedAt: string;
}

export interface GitHubContent {
  path: string;
  content: string;
  sha: string;
  encoding: 'base64' | 'utf-8';
}
