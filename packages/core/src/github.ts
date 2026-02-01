/**
 * GitHub API client for fetching repository data
 * Supports fetching todo.md and spec.md from configured repositories
 */

import type { GitHubRepo, GitHubContent } from './types.js';

// =============================================================================
// Configuration
// =============================================================================

export interface GitHubClientConfig {
  /** GitHub personal access token (optional for public repos) */
  token?: string;
  /** API base URL (default: https://api.github.com) */
  baseUrl?: string;
  /** Request timeout in ms (default: 10000) */
  timeout?: number;
}

const DEFAULT_CONFIG: Required<GitHubClientConfig> = {
  token: '',
  baseUrl: 'https://api.github.com',
  timeout: 10000,
};

// =============================================================================
// GitHub Client
// =============================================================================

export class GitHubClient {
  private config: Required<GitHubClientConfig>;

  constructor(config: GitHubClientConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Make an authenticated request to the GitHub API
   */
  private async request<T>(path: string): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'ulk-status-board',
    };

    if (this.config.token) {
      headers.Authorization = `Bearer ${this.config.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new GitHubError(
          `GitHub API error: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      return response.json() as Promise<T>;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Get repository information
   */
  async getRepo(owner: string, name: string): Promise<GitHubRepo> {
    const data = await this.request<{
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      default_branch: string;
      private: boolean;
      updated_at: string;
    }>(`/repos/${owner}/${name}`);

    return {
      owner,
      name: data.name,
      fullName: data.full_name,
      description: data.description || undefined,
      url: data.html_url,
      defaultBranch: data.default_branch,
      private: data.private,
      updatedAt: data.updated_at,
    };
  }

  /**
   * Get file content from a repository
   */
  async getFileContent(owner: string, repo: string, path: string, ref?: string): Promise<string> {
    const refParam = ref ? `?ref=${ref}` : '';
    const data = await this.request<{
      content: string;
      encoding: string;
      sha: string;
    }>(`/repos/${owner}/${repo}/contents/${path}${refParam}`);

    if (data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }

    return data.content;
  }

  /**
   * Check if a file exists in a repository
   */
  async fileExists(owner: string, repo: string, path: string): Promise<boolean> {
    try {
      await this.request(`/repos/${owner}/${repo}/contents/${path}`);
      return true;
    } catch (error) {
      if (error instanceof GitHubError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Get todo.md content from a repository
   * Checks common locations: docs/todo.md, TODO.md, todo.md
   */
  async getTodoFile(owner: string, repo: string): Promise<string | null> {
    const paths = ['docs/todo.md', 'TODO.md', 'todo.md'];

    for (const path of paths) {
      try {
        return await this.getFileContent(owner, repo, path);
      } catch (error) {
        if (error instanceof GitHubError && error.status === 404) {
          continue;
        }
        throw error;
      }
    }

    return null;
  }

  /**
   * Get spec.md content from a repository
   * Checks common locations: docs/spec.md, SPEC.md, spec.md
   */
  async getSpecFile(owner: string, repo: string): Promise<string | null> {
    const paths = ['docs/spec.md', 'SPEC.md', 'spec.md'];

    for (const path of paths) {
      try {
        return await this.getFileContent(owner, repo, path);
      } catch (error) {
        if (error instanceof GitHubError && error.status === 404) {
          continue;
        }
        throw error;
      }
    }

    return null;
  }

  /**
   * List repositories for an owner (user or organization)
   */
  async listRepos(owner: string, options?: { type?: 'owner' | 'member' | 'all' }): Promise<GitHubRepo[]> {
    const type = options?.type || 'owner';
    const data = await this.request<Array<{
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      default_branch: string;
      private: boolean;
      updated_at: string;
      owner: { login: string };
    }>>(`/users/${owner}/repos?type=${type}&per_page=100&sort=updated`);

    return data.map(repo => ({
      owner: repo.owner.login,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || undefined,
      url: repo.html_url,
      defaultBranch: repo.default_branch,
      private: repo.private,
      updatedAt: repo.updated_at,
    }));
  }
}

// =============================================================================
// Errors
// =============================================================================

export class GitHubError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = 'GitHubError';
  }
}

// =============================================================================
// Factory
// =============================================================================

/**
 * Create a GitHub client with environment token
 */
export function createGitHubClient(config?: GitHubClientConfig): GitHubClient {
  const token = config?.token || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  return new GitHubClient({ ...config, token });
}
