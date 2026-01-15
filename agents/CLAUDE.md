# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This directory contains specialized AI agent definitions for the Woodman toolkit. Each agent is a markdown file with YAML frontmatter that defines a focused, autonomous sub-agent for specific development tasks.

## Agent Architecture

### Agent Definition Structure

Each agent file follows this pattern:

```markdown
---
name: agent-name
description: What the agent does and when to use it
tools: Tool1, Tool2, Tool3
model: opus | sonnet
---

# Agent [Name]

[Detailed instructions, phases, and workflows]
```

### Available Agents

| Agent | File | Model | Purpose |
|-------|------|-------|---------|
| **spec-writer** | `01-spec-writer.md` | opus | Analyze projects and generate spec.md (all stacks) |
| **todo-generator** | `02-todo-generator.md` | sonnet | Convert spec.md into actionable todo.md |
| **sync-local** | `03-sync-local.md` | sonnet | Sync LOCAL documentation (spec, CLAUDE, README) |
| **task-runner** | `04-task-runner.md` | sonnet | Execute tasks from todo.md with progress tracking |
| **code-auditor** | `05-code-auditor.md` | opus | Comprehensive code audit (quality, security, architecture) |
| **a11y-auditor** | `06-a11y-auditor.md` | sonnet | WCAG 2.1/2.2 accessibility audit |
| **perf-auditor** | `07-perf-auditor.md` | sonnet | Performance audit (Core Web Vitals, bundle, backend) |
| **external-sync** | `08-external-sync.md` | opus | Bidirectional sync with Notion/Linear ONLY (external tools) |
| **context-generator** | `09-context-generator.md` | sonnet | Generate llm.txt snapshot (15K chars max) for instant LLM onboarding |
| **documentalist** | `13-documentalist.md` | sonnet | Manage /docs folder - organize, clean, validate frontmatter, maintain documentation structure |
| **figma-shadcn** | `14-figma-shadcn.md` | opus | Analyze Figma designs and generate faithful shadcn/ui + Tailwind implementations |
| **tw2shad** | `15-tw2shad.md` | sonnet | Transform Tailwind/HTML components into shadcn/ui-compatible Vue components for Nuxt projects |
| **frontend-qa** | `16-frontend-qa.md` | sonnet | Comprehensive frontend QA (UX, UI, Tailwind, shadcn, code coherence) |
| **code-simplifier** | `17-code-simplifier.md` | opus | Audit de simplification du codebase complet, puis applique via le plugin officiel code-simplifier |

### Stack Analyzers (10-analyze/)

In-depth technical analysis agents for specific stacks:

| Analyzer | File | Stack | Purpose |
|----------|------|-------|---------|
| **analyze-astro** | `10-analyze/astro.md` | Astro 3-5 | Islands Architecture, Content Collections, multi-framework optimization |
| **analyze-next** | `10-analyze/next.md` | Next.js 13-15 | App Router, Server/Client Components, shadcn/ui integration |
| **analyze-nuxt** | `10-analyze/nuxt.md` | Nuxt 3-4 | SSR/hydration, Nuxt UI v2/v3/v4, migration opportunities |
| **analyze-spip** | `10-analyze/spip.md` | SPIP 3-5 | Squelettes, boucles, CVT forms, plugin analysis |
| **analyze-swiftui** | `10-analyze/swiftui.md` | SwiftUI | MVVM/TCA, @Observable, SwiftData, multi-platform |

**All analyzers use sonnet model** for optimal performance on structured analysis tasks.

**See**: `10-analyze/README.md` for complete documentation.

### Deploy Agents (11-deploy/)

Automated deployment agents for various platforms:

| Agent | File | Platform | Purpose |
|-------|------|----------|---------|
| **deploy-vercel** | `11-deploy/vercel.md` | Vercel | Next.js, framework detection, preview/production deployments |
| **deploy-netlify** | `11-deploy/netlify.md` | Netlify | JAMstack, serverless functions, forms, redirects |
| **deploy-cloudflare** | `11-deploy/cloudflare.md` | Cloudflare | Pages (sites), Workers (edge functions), KV/D1/R2 storage |
| **deploy-docker** | `11-deploy/docker.md` | Docker | Multi-stage builds, docker-compose, registry push |
| **deploy-aws** | `11-deploy/aws.md` | AWS | S3+CloudFront, ECS Fargate, Elastic Beanstalk, Lambda |

**All deploy agents use sonnet model** for structured deployment automation.

**See**: `11-deploy/README.md` for complete documentation.

### Test Agents (12-test/)

Test automation agents for unit and E2E testing:

| Agent | File | Framework | Purpose |
|-------|------|-----------|---------|
| **test-unit** | `12-test/unit.md` | Jest, Vitest | Unit tests for functions, components, hooks; coverage reports |
| **test-e2e** | `12-test/e2e.md` | Playwright, Cypress | End-to-end testing, multi-browser, CI/CD integration |

**All test agents use sonnet model** for structured test generation and automation.

**See**: `12-test/README.md` for complete documentation.

### Frontend QA Checklists (16-frontend-qa/)

Reference checklists for comprehensive frontend quality assurance:

| Checklist | File | Focus |
|-----------|------|-------|
| **ux-checklist** | `16-frontend-qa/ux-checklist.md` | Navigation, user flows, accessibility, interactions, mobile |
| **ui-checklist** | `16-frontend-qa/ui-checklist.md` | Visual consistency, typography, colors, spacing, dark mode |
| **tailwind-checklist** | `16-frontend-qa/tailwind-checklist.md` | Configuration, class patterns, responsive, performance, v4 |
| **shadcn-checklist** | `16-frontend-qa/shadcn-checklist.md` | Setup, component usage, theming, accessibility compliance |
| **code-checklist** | `16-frontend-qa/code-checklist.md` | Architecture, components, state, naming, TypeScript, patterns |

**See**: `16-frontend-qa/README.md` for complete documentation.

## Agent Workflow Patterns

### Setup New Project
```
"Generate a spec" → spec-writer (01)
"Generate todo from spec" → todo-generator (02)
"Sync local documentation" → sync-local (03)
"Generate context snapshot" → context-generator (09)
"Setup in Linear/Notion" → external-sync (08) [optional]
```

### Development Session
```
"What's the next task?" → task-runner (04) - status check
"Continue" → task-runner (04) - resume in-progress task
"Report progress" → task-runner (04) - summary
```

### Pre-Release Quality Checks
```
"Audit code" → code-auditor (05)
"Audit accessibility" → a11y-auditor (06)
"Audit performance" → perf-auditor (07)
```

### Documentation Maintenance
```
"Update local documentation" → sync-local (03)
"Generate context snapshot" → context-generator (09)
"Sync with Notion and Linear" → external-sync (08)
"Where are we?" → task-runner (04) - status
```

## Stack Detection & Adaptation

The **spec-writer** agent includes comprehensive pattern detection for:

- **Swift/iOS/macOS**: `.xcodeproj`, `Package.swift`, SwiftUI/UIKit detection
- **JavaScript/TypeScript**: `package.json`, Node/Bun/pnpm detection, framework identification
- **Nuxt**: `nuxt.config.ts`, `.nuxt/`, `app.vue`, `server/api/`
- **Python**: `pyproject.toml`, `requirements.txt`, Django/Flask/FastAPI
- **PHP/Laravel**: `composer.json`, `artisan`, `routes/web.php`
- **WordPress**: `wp-config.php`, `wp-content/`, theme/plugin detection
- **SPIP**: `spip.php`, `ecrire/`, `squelettes/`
- **Go**: `go.mod`, `go.sum`
- **Rust**: `Cargo.toml`
- **Java/Kotlin**: `pom.xml`, `build.gradle`
- **.NET**: `*.csproj`, `*.sln`
- **Flutter**: `pubspec.yaml`, `lib/main.dart`
- **Infrastructure**: Docker, Kubernetes, Terraform, serverless configs

Agents adapt their analysis, questions, and output format based on detected stack.

## Key Agent Capabilities

### spec-writer
- Reads all config files, documentation, and entry points
- Asks stack-specific questions via `AskUserQuestionTool`
- Generates comprehensive spec.md with architecture, scope, data models, roadmap
- Supports ALL major stacks (see section above)

### todo-generator
- Parses spec.md to extract scope, architecture, roadmap
- Creates prioritized task list (P0-P3)
- Estimates complexity (XS/S/M/L/XL)
- Identifies dependencies and blocker chains

### task-runner
- Implements tasks from todo.md one by one
- Updates status in real-time (`[ ]` → `[~]` → `[x]`)
- Tracks progress and completion dates
- Generates status reports

### code-auditor
- Architecture audit (coupling, abstractions, patterns)
- Code quality (duplication, complexity, naming)
- Security scan (OWASP, auth, sensitive data)
- Performance checks (N+1, memory, bundle size)
- Test coverage analysis
- Technical debt inventory

### a11y-auditor
- WCAG 2.1/2.2 compliance check
- Automated tools (axe-core, Pa11y, Lighthouse)
- Manual criteria verification
- Component-level analysis
- Generates detailed report with severity ratings

### perf-auditor
- Frontend: Bundle analysis, Core Web Vitals, lazy loading
- Backend: N+1 queries, caching, database indexes
- API response times
- Memory leak detection
- Lighthouse/PageSpeed integration

### sync-local
- Keeps LOCAL documentation synchronized: spec.md, CLAUDE.md, README.md
- Updates spec.md with task progress
- Extracts info from spec/todo to populate CLAUDE.md and README.md
- Does NOT handle Linear/Notion (use external-sync for that)
- Run after spec-writer or todo-generator

### external-sync
- Bidirectional sync EXCLUSIVELY with Notion/Linear (external tools only)
- Requires MCP servers: `mcp__linear`, `mcp__notion`
- Asks for target pages/projects via `AskUserQuestionTool`
- Resolves conflicts, tracks state in `.claude/sync-state.json`
- Does NOT handle local documentation (use sync-local for that)
- Run after sync-local for complete workflow

### context-generator
- Generates llm.txt: compact 15K character snapshot of entire project
- Sources: README, CLAUDE.md, configs, git history, MCP, audits
- Purpose: Instant LLM onboarding without reading 50+ files
- Use cases: New session, collaboration, context sharing, project history
- Regenerate after significant changes or before sharing project
- Output: Single llm.txt file at project root (Markdown format)

### documentalist (13)
- Manages /docs folder: organizes, cleans, validates all documentation
- Enforces frontmatter standards (YAML with required fields)
- Categorizes documentation: specs, audits, guides, ADRs, reports
- Maintains index, conventions, and health metrics
- Detects and fixes: missing frontmatter, duplicates, obsolete files, naming issues
- Generates audit reports and tracks documentation health score
- Run after any agent that generates documentation (specs, audits, guides)

## Tool Usage

### Common Tools Across Agents
- **View, Read, Grep, Glob**: File system navigation and reading
- **Write, MultiEdit**: File creation and editing
- **Bash**: Running commands (tests, linters, builds, git)
- **Task**: Launching sub-agents for complex operations
- **AskUserQuestionTool**: Interactive question gathering

### MCP-Specific Tools
- **mcp__linear__***: Linear API integration (external-sync, sync-docs)
- **mcp__notion__***: Notion API integration (external-sync, sync-docs)

## Creating New Agents

When adding a new agent to this collection:

1. **Filename**: Use `NN-agent-name.md` pattern (NN = sequence number)

2. **Frontmatter**: Include all required fields
   ```yaml
   ---
   name: agent-name
   description: Clear description and when to use this agent
   tools: Tool1, Tool2, Tool3
   model: opus | sonnet
   ---
   ```

3. **Structure**: Follow the phase-based pattern
   - Phase 1: Reconnaissance/Discovery
   - Phase 2: Analysis/Questions
   - Phase 3: Execution/Generation
   - Phase 4: Output/Reporting

4. **Interactive Elements**: Use `AskUserQuestionTool` for:
   - Clarifying requirements
   - Choosing between approaches
   - Confirming destructive operations

5. **Pattern Detection**: Include stack-specific logic if applicable
   - See `01-spec-writer.md` for comprehensive examples
   - Adapt questions and output based on detected stack

6. **Output Formats**: Define clear, consistent output structures
   - Use markdown tables for data
   - Use emoji indicators for status/type
   - Include code blocks for examples

7. **Test Thoroughly**: Run agent in multiple scenarios before committing

## Configuration

### MCP Servers
The `.claude/settings.local.json` at parent directory level configures:
```json
{
  "enabledMcpjsonServers": ["shadcn"],
  "enableAllProjectMcpServers": true
}
```

For Linear/Notion sync, ensure those MCP servers are configured in your global Claude settings.

## File Outputs

Agents generate these standard files in the project root:

- **spec.md**: Project specification (from 01-spec-writer)
- **todo.md**: Prioritized task list (from 02-todo-generator)
- **CLAUDE.md**: Updated by 03-sync-local
- **README.md**: Updated by 03-sync-local
- **llm.txt**: Context snapshot for LLM onboarding (from 09-context-generator) - 15K chars max
- **audit-YYYYMMDD.md**: Audit reports (from 05/06/07-auditor agents)
- **.claude/sync-state.json**: External sync tracking (from 08-external-sync)
- **docs/**: Organized documentation folder (managed by 13-documentalist)
  - **docs/00-meta/index.md**: Documentation index (auto-generated)
  - **docs/00-meta/conventions.md**: Documentation conventions (auto-generated)
  - **docs/00-meta/audit-YYYY-MM-DD.md**: Documentation audit reports
  - **.claude/docs-metrics.json**: Documentation health metrics

## Separation of Responsibilities

**Critical distinction:**

### 03-sync-local (Local Documentation)
- ✅ Updates spec.md, CLAUDE.md, README.md
- ✅ Extracts info from spec/todo
- ❌ Does NOT touch Linear/Notion

### 08-external-sync (External Tools)
- ✅ Syncs with Linear/Notion bidirectionally
- ✅ Resolves conflicts
- ✅ Tracks state
- ❌ Does NOT touch local documentation files

**Use together:** `03-sync-local` → `08-external-sync` for complete workflow

## Model Distribution

- **opus** (4 agents): Complex analysis requiring deep reasoning
  - 01-spec-writer: Multi-stack project analysis
  - 05-code-auditor: Comprehensive code audit
  - 08-external-sync: Bidirectional conflict resolution
  - 14-figma-shadcn: Design interpretation and component mapping

- **sonnet** (23 agents): Structured tasks, automation, performance optimization
  - All other agents (02-04, 06-07, 09, 10-*, 11-*, 12-*, 13, 15, 16)

## Agent Invocation

Agents are designed to be invoked via natural language:

```
"Generate a spec for this project"
"Create a todo from the spec"
"What's the next task?"
"Audit performance"
"Sync with Notion"
```

The main Claude instance will use the Task tool to launch the appropriate agent based on the request.

## Notes

- **Model Choice**:
  - `opus`: Complex analysis (01, 05, 08) - spec-writer, code-auditor, external-sync
  - `sonnet`: Structured tasks (02, 03, 04, 06, 07, 09) - todo-generator, sync-local, task-runner, auditors, context-generator
- **Phases**: All agents follow clear phase announcements for transparency
- **Autonomy**: Agents should gather information before generating output
- **Adaptability**: Stack detection drives agent behavior and output format
- **Separation**: Local sync (03) and external sync (08) are SEPARATE with clear boundaries
- **Context Snapshot**: context-generator (09) creates llm.txt - instant project understanding for any LLM
- **Bidirectionality**: external-sync (08) reads AND writes to external tools with conflict resolution
- **Status Tracking**: task-runner (04) updates files in place, maintaining history
