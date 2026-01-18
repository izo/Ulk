# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Cursor, Copilot, etc.) when working with the Woodman agent collection.

## Overview

Woodman is a collection of specialized AI agents (skills) for common development tasks. Each agent is a markdown file with YAML frontmatter that defines autonomous sub-agents for specific workflows.

**Inspired by:** [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) patterns for context efficiency and rule organization.

## Directory Structure

```
Woodman/
├── agents/                     # Source agent definitions
│   ├── NN-agent-name.md        # Agent with sequence number
│   ├── 10-analyze/             # Stack-specific analyzers
│   ├── 11-deploy/              # Deployment agents
│   ├── 12-test/                # Test automation agents
│   ├── 16-frontend-qa/         # QA checklists
│   └── rules/                  # Detailed rules for auditors
│       ├── _template.md        # Rule template
│       ├── _sections.md        # Section definitions
│       └── {category}-{rule}.md
│
├── commands/                   # Installable Custom Commands
│   ├── agents/                 # Workflow agents (kebab-case)
│   └── analyze/                # Stack analyzers
│
├── install.sh                  # Global installation script
└── uninstall.sh                # Uninstallation script
```

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Agent directory | kebab-case | `agents/10-analyze/` |
| Agent file (source) | `NN-agent-name.md` | `01-spec-writer.md` |
| Agent file (command) | `agent-name.md` | `spec-writer.md` |
| Rule file | `{category}-{rule}.md` | `sec-secrets-exposed.md` |
| Section prefix | Short lowercase | `arch-`, `sec-`, `perf-`, `qual-` |

## Agent Definition Format

```markdown
---
name: agent-name
type: custom-command
description: |
  One sentence describing what the agent does.
  Include trigger phrases like "audit code", "generate spec", etc.
tools: View, Read, Grep, Glob, Bash, Write, AskUserQuestionTool
model: opus | sonnet
metadata:
  author: woodman
  version: "1.0.0"
invocation: /wm:agents:agent-name or "natural language trigger"
---

# Agent [Name]

Brief description of what the agent does.

## When to Use

Reference this agent when:
- [Trigger condition 1]
- [Trigger condition 2]
- [Trigger condition 3]

## Quick Reference

| Category | Impact | Rules |
|----------|--------|-------|
| Category 1 | CRITICAL | rule-a, rule-b |
| Category 2 | HIGH | rule-c, rule-d |

## Phase 1: [Name]

[Instructions]

## Phase 2: [Name]

[Instructions]

## Output

[Expected output format]
```

## Rule Definition Format

For agents with detailed rules (auditors), use separate rule files:

```markdown
---
title: Rule Title Here
category: security | architecture | quality | performance | a11y
impact: CRITICAL | HIGH | MEDIUM | LOW
impactDescription: "e.g., 2-10x improvement, data breach risk"
tags: tag1, tag2, tag3
---

## Rule Title Here

**Impact: [LEVEL] ([description])**

Brief explanation of why this rule matters and its implications.

**Incorrect (description):**

```typescript
// Bad code example
const bad = example()
```

**Correct (description):**

```typescript
// Good code example
const good = example()
```

**References:**
- [Link to documentation](https://example.com)
```

## Rule Categories by Impact

| Priority | Impact | Prefix | Description |
|----------|--------|--------|-------------|
| 1 | CRITICAL | `sec-` | Security vulnerabilities, data breaches |
| 2 | CRITICAL | `arch-` | Architecture issues, scalability blockers |
| 3 | HIGH | `perf-` | Performance bottlenecks, N+1 queries |
| 4 | HIGH | `qual-` | Code quality, maintainability issues |
| 5 | MEDIUM | `test-` | Test coverage, missing tests |
| 6 | MEDIUM | `a11y-` | Accessibility violations |
| 7 | LOW | `doc-` | Documentation gaps |
| 8 | LOW | `style-` | Style inconsistencies |

## Best Practices for Context Efficiency

Skills/agents are loaded on-demand. To minimize context usage:

1. **Keep agent files under 500 lines** — put detailed rules in `rules/` directory
2. **Write specific descriptions** — include trigger phrases for auto-activation
3. **Use progressive disclosure** — reference supporting files read only when needed
4. **Prefer Quick Reference Tables** — summarize rules at-a-glance
5. **Use checklists** — efficient for auditors instead of prose
6. **External fetch when applicable** — for evolving guidelines (see web-design-guidelines pattern)

### Progressive Disclosure Pattern

```
Agent file (main)
├── Quick Reference Table (always loaded)
├── Phase descriptions (always loaded)
└── "See rules/{category}-{rule}.md for details" (loaded on-demand)
```

## Model Selection Guidelines

| Model | Use When | Agents |
|-------|----------|--------|
| **opus** | Complex analysis, multi-step reasoning, orchestration | spec-writer, code-auditor, external-sync, robocop, orchestrators |
| **sonnet** | Structured tasks, automation, pattern matching | todo-generator, sync-local, task-runner, auditors, analyzers |

## Installation Methods

### Global Installation (Claude Code)

```bash
# Install all agents to ~/.claude/commands/woodman
./install.sh

# Invoke anywhere
/woodman:agents:spec-writer
/woodman:analyze:nuxt
```

### Project-Level

Copy specific agents to your project's `.claude/commands/` directory:

```bash
cp agents/01-spec-writer.md .claude/commands/spec-writer.md
```

### Claude.ai Web

Paste agent contents into conversation or add to project knowledge.

## Creating New Agents

1. **Choose sequence number** based on workflow position
2. **Use frontmatter template** with all required fields
3. **Include trigger phrases** in description
4. **Follow phase pattern** (Reconnaissance → Analysis → Execution → Output)
5. **Add Quick Reference** if >10 rules/checks
6. **Create rule files** if detailed examples needed
7. **Test thoroughly** before committing

### Checklist for New Agents

- [ ] Frontmatter complete (name, type, description, tools, model, metadata, invocation)
- [ ] Description includes trigger phrases
- [ ] "When to Use" section present
- [ ] Phases clearly defined
- [ ] Output format documented
- [ ] Under 500 lines (or rules extracted)
- [ ] Tested in multiple scenarios

## Agent Activation Triggers

Agents activate based on natural language patterns:

| Agent | Trigger Phrases |
|-------|-----------------|
| spec-writer | "generate spec", "create specifications", "analyze architecture" |
| todo-generator | "create todo", "generate tasks", "convert spec to tasks" |
| code-auditor | "audit code", "review quality", "check security" |
| perf-auditor | "audit performance", "check speed", "analyze bundle" |
| a11y-auditor | "audit accessibility", "check WCAG", "a11y review" |
| robocop | "fix error", "debug", "fix issue #N" |
| context-generator | "generate llm.txt", "create context snapshot" |

## Credits & References

### Inspiration

The Woodman agent system is heavily inspired by **[vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills)**. Key patterns adopted:

- **SKILL.md format** with YAML frontmatter (name, description, metadata)
- **Context efficiency** guidelines (<500 lines, progressive disclosure)
- **Rule categories** with impact levels (CRITICAL → LOW)
- **Rule templates** with Before/After code examples
- **Quick Reference Tables** for at-a-glance discovery

### Links

- [Vercel Agent Skills](https://github.com/vercel-labs/agent-skills) — Original inspiration
- [Agent Skills Format](https://agentskills.io) — Skill specification standard
- [Claude Code Custom Commands](https://docs.anthropic.com/claude-code) — Installation guide
