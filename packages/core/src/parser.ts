/**
 * Parser for todo.md and spec.md files
 * Extracts structured data from Ulk-generated markdown files
 */

import type {
  Todo,
  TodoFile,
  TodoPriority,
  TodoStatus,
  SpecFile,
  SpecSection,
} from './types.js';

// =============================================================================
// Todo Parser
// =============================================================================

/**
 * Parse priority from markdown indicators
 * Supports: [P0], [P1], [P2], [P3] or :critical:, :high:, :medium:, :low:
 */
function parsePriority(line: string): TodoPriority {
  if (/\[P0\]|:critical:/i.test(line)) return 'critical';
  if (/\[P1\]|:high:/i.test(line)) return 'high';
  if (/\[P2\]|:medium:/i.test(line)) return 'medium';
  if (/\[P3\]|:low:/i.test(line)) return 'low';
  return 'medium'; // default
}

/**
 * Parse status from checkbox state
 * - [ ] = pending
 * - [x] = done
 * - [~] = in_progress
 * - [!] = blocked
 */
function parseStatus(line: string): TodoStatus {
  if (/- \[x\]/i.test(line)) return 'done';
  if (/- \[~\]/.test(line)) return 'in_progress';
  if (/- \[!\]/.test(line)) return 'blocked';
  return 'pending';
}

/**
 * Extract tags from line (e.g., #frontend, #api, @john)
 */
function parseTags(line: string): string[] {
  const tagMatches = line.match(/#[\w-]+/g) || [];
  return tagMatches.map(tag => tag.slice(1));
}

/**
 * Extract assignee from line (e.g., @john)
 */
function parseAssignee(line: string): string | undefined {
  const match = line.match(/@([\w-]+)/);
  return match ? match[1] : undefined;
}

/**
 * Clean todo title from markers and metadata
 */
function cleanTitle(line: string): string {
  return line
    .replace(/^- \[.\]\s*/, '') // Remove checkbox
    .replace(/\[P[0-3]\]\s*/g, '') // Remove priority
    .replace(/:(?:critical|high|medium|low):\s*/g, '') // Remove emoji priority
    .replace(/#[\w-]+\s*/g, '') // Remove tags
    .replace(/@[\w-]+\s*/g, '') // Remove assignees
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Generate a unique ID for a todo based on its content
 */
function generateTodoId(title: string, lineNumber: number): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40);
  return `${slug}-${lineNumber}`;
}

/**
 * Parse a todo.md file content into structured data
 */
export function parseTodoFile(content: string, filePath: string, projectName: string): TodoFile {
  const lines = content.split('\n');
  const todos: Todo[] = [];

  let currentSection = '';
  let metadata: TodoFile['metadata'] = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Extract title from first H1
    if (line.startsWith('# ') && !metadata.title) {
      metadata.title = line.slice(2).trim();
      continue;
    }

    // Track current section (H2, H3)
    if (line.startsWith('## ') || line.startsWith('### ')) {
      currentSection = line.replace(/^#+\s*/, '').trim();
      continue;
    }

    // Parse todo items (lines starting with - [ ])
    if (/^- \[.\]/.test(line)) {
      const title = cleanTitle(line);
      if (!title) continue;

      const todo: Todo = {
        id: generateTodoId(title, lineNumber),
        title,
        priority: parsePriority(line),
        status: parseStatus(line),
        tags: parseTags(line),
        assignee: parseAssignee(line),
        source: {
          file: filePath,
          line: lineNumber,
        },
      };

      // Add section as a tag if present
      if (currentSection && !todo.tags?.includes(currentSection.toLowerCase())) {
        todo.tags = [...(todo.tags || []), currentSection.toLowerCase()];
      }

      todos.push(todo);
    }
  }

  return {
    path: filePath,
    project: projectName,
    todos,
    metadata,
  };
}

// =============================================================================
// Spec Parser
// =============================================================================

/**
 * Parse a spec.md file content into structured data
 */
export function parseSpecFile(content: string, filePath: string, projectName: string): SpecFile {
  const lines = content.split('\n');
  const sections: SpecSection[] = [];

  let title = '';
  let description = '';
  let currentSection: SpecSection | null = null;
  let contentBuffer: string[] = [];
  let sectionCounter = 0;

  const flushSection = () => {
    if (currentSection) {
      currentSection.content = contentBuffer.join('\n').trim();
      sections.push(currentSection);
      contentBuffer = [];
    }
  };

  for (const line of lines) {
    // Extract title from first H1
    if (line.startsWith('# ') && !title) {
      title = line.slice(2).trim();
      continue;
    }

    // Parse section headers (H2, H3, H4)
    const headerMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headerMatch) {
      flushSection();

      const level = headerMatch[1].length;
      const sectionTitle = headerMatch[2].trim();
      sectionCounter++;

      currentSection = {
        id: `section-${sectionCounter}`,
        title: sectionTitle,
        level,
        content: '',
      };
      continue;
    }

    // Accumulate content for current section
    if (currentSection) {
      contentBuffer.push(line);
    } else if (!title) {
      // Before first header, accumulate as description
      if (line.trim()) {
        description += (description ? '\n' : '') + line;
      }
    }
  }

  // Flush last section
  flushSection();

  return {
    path: filePath,
    project: projectName,
    title: title || 'Untitled Spec',
    description: description || undefined,
    sections,
    metadata: {
      lastUpdated: new Date().toISOString(),
    },
  };
}

// =============================================================================
// Utilities
// =============================================================================

/**
 * Calculate statistics from a list of todos
 */
export function calculateTodoStats(todos: Todo[]) {
  const total = todos.length;
  const completed = todos.filter(t => t.status === 'done').length;
  const blocked = todos.filter(t => t.status === 'blocked').length;
  const critical = todos.filter(t => t.priority === 'critical').length;

  return {
    totalTodos: total,
    completedTodos: completed,
    blockedTodos: blocked,
    criticalTodos: critical,
    progress: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

/**
 * Determine project health based on todos
 */
export function calculateHealth(todos: Todo[]): 'healthy' | 'warning' | 'critical' | 'unknown' {
  if (todos.length === 0) return 'unknown';

  const critical = todos.filter(t => t.priority === 'critical' && t.status !== 'done');
  const blocked = todos.filter(t => t.status === 'blocked');

  if (critical.length > 2 || blocked.length > 3) return 'critical';
  if (critical.length > 0 || blocked.length > 0) return 'warning';
  return 'healthy';
}
