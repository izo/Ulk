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
| **gybe** | `00-gybe.md` | sonnet | Entry point - analyzes project state and suggests relevant agents/actions |
| **spec-writer** | `01-spec-writer.md` | opus | Analyze projects and generate spec.md (all stacks) |
| **todo-generator** | `02-todo-generator.md` | sonnet | Convert spec.md into actionable todo.md |
| **sync-local** | `03-sync-local.md` | sonnet | Sync LOCAL documentation (spec, CLAUDE, README) |
| **task-runner** | `04-task-runner.md` | sonnet | Execute tasks from todo.md with progress tracking |
| **code-auditor** | `05-code-auditor.md` | opus | Comprehensive code audit (quality, security, architecture) |
| **a11y-auditor** | `06-a11y-auditor.md` | sonnet | WCAG 2.1/2.2 accessibility audit |
| **perf-auditor** | `07-perf-auditor.md` | sonnet | Performance audit (Core Web Vitals, bundle, backend) |
| **external-sync** | `08-external-sync.md` | opus | Bidirectional sync with Notion/Linear ONLY (external tools) |
| **context-generator** | `09-context-generator.md` | sonnet | Generate llm.txt snapshot (15K chars max) for instant LLM onboarding |
| **robocop** | `11-robocop.md` | opus | Detective and fixer for all error types (runtime, compilation, tests, linting) - works directly or via GitHub issues |
| **documentalist** | `13-documentalist.md` | sonnet | Manage /docs folder - organize, clean, validate frontmatter, maintain documentation structure |
| **audit-complet** | `18-audit-complet.md` | opus | Orchestrator: full repo audit (spec + code + perf + a11y + todo) with consolidated report |
| **legacy-revival** | `19-legacy-revival.md` | opus | Orchestrator: legacy code revival (spec + audit + simplify + fix + optimize + doc) |
| **pre-release** | `20-pre-release.md` | opus | Orchestrator: pre-release checklist (audits + tests + docs) with GO/NO-GO decision |
| **figma-shadcn** | `14-figma-shadcn.md` | opus | Analyze Figma designs and generate faithful shadcn/ui + Tailwind implementations |
| **tw2shad** | `15-tw2shad.md` | sonnet | Transform Tailwind/HTML components into shadcn/ui-compatible Vue components for Nuxt projects |
| **frontend-qa** | `16-frontend-qa.md` | sonnet | Comprehensive frontend QA (UX, UI, Tailwind, shadcn, code coherence) |
| **code-simplifier** | `17-code-simplifier.md` | opus | Audit de simplification du codebase complet, puis applique via le plugin officiel code-simplifier |
| **notion-importer** | `21-notion-importer.md` | opus | Import Notion page + links → generates spec_notion.md + todo_notion.md in /docs (unidirectional) |
| **landing-page-auditor** | `22-landing-page-auditor.md` | opus | Comprehensive landing page audit using Chrome DevTools - conversion elements, design, mobile optimization |
| **shadcn-auditor** | `23-shadcn-auditor.md` | sonnet | Dedicated shadcn/ui audit - configuration, imports, theming, accessibility, anti-patterns with detailed report |
| **brigitte** | `24-brigitte.md` | sonnet | Transforms commits/changelog into friendly, jargon-free communications for non-technical teams |
| **c3po** | `25-c3po.md` | opus | Product Manager orchestrator - transforms ideas into structured projects by orchestrating all agents (spec, todo, tasks, audits) |
| **picsou** | `26-picsou.md` | opus | Hosting cost estimator - analyzes infrastructure, compares providers (Vercel, Netlify, Railway, Hetzner, OVH, etc.), generates cost reports with recommendations |
| **steve** | `27-steve.md` | opus | Mobile API orchestrator - audits web projects (Next.js, JS, PHP, Swift), designs complete API for iOS/Android connectivity with full web/mobile functional parity |
| **svg-analyzer** | `28-svg-analyzer.md` | opus | Analyzes React/Next.js projects, inventories all pages and shadcn/ui components, generates SVG mockups via Shad2SVG API |

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

## Shared Architecture (_shared/)

The `_shared/` directory contains common templates and protocols used across agents to reduce token consumption and ensure consistency.

### Shared Files

| File | Purpose | Used By |
|------|---------|---------|
| `_shared/base-rules.md` | Common rules, formats, conventions, scoring | All agents |
| `_shared/auditor-base.md` | Report template, scoring system, spec/todo update protocol | Auditor agents (05, 06, 07, 16, 22, 23) |
| `_shared/stack-detection.md` | Stack detection commands and output format | Agents doing project analysis (01, 05, 06, 07) |
| `_shared/context-protocol.md` | Inter-agent context passing protocol | Orchestrators (18, 19, 20, 25, 27) |
| `_shared/update-protocol.md` | Incremental document update rules | All agents modifying spec.md/todo.md |

### Context Protocol (Token Optimization)

Orchestrators transmit a `CONTEXTE PROJET:` block to sub-agents, allowing them to skip reconnaissance:

```
CONTEXTE PROJET:
- Stack: Nuxt 3 + Nitro
- Langages: TypeScript, Vue 3 SFC
- DB: PostgreSQL via Prisma
- Fichiers source: 142
- Structure: src/{components,pages,server,composables}
```

**When present in prompt:** Sub-agents skip Phase 1 (reconnaissance) → **saves 3-10K tokens per agent**.

### Orchestrator Parallelism

Orchestrators now use hybrid execution:

```
SÉQUENTIEL: spec-writer (01) → produces context
PARALLÈLE:  code-auditor (05) + perf-auditor (07) + a11y-auditor (06)
SÉQUENTIEL: todo-generator (02) → consolidates findings
```

**Gains:** -40% wall-clock time, -30% tokens via context reuse.

### Incremental Updates

Agents follow `update-protocol.md` to avoid file conflicts:
- Each agent owns specific sections in spec.md (identified by emoji headers)
- Todo.md updates check for duplicates before adding tasks
- Orchestrators consolidate writes to shared files (single write point)
- Hash-based change detection avoids unnecessary rewrites

## Agent Workflow Patterns

### Entry Point (Start Here)
```
"Where should I start?" → gybe (00)
"What should I do?" → gybe (00)
  → Scans project, detects state, suggests best next action
  → Proposes relevant agents based on context
```

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

### Error Fixing & Debugging
```
"Fix this error: [error message]" → robocop (11) - diagnose and fix
"Fix GitHub issue #42" → robocop (11) - read, fix, verify, close
"Tests are failing" → robocop (11) - investigate and resolve
```

### Audit Orchestrators (Combined Workflows)
```
"Audit complet de ce repo" → audit-complet (18)
  → Runs: spec-writer → code-auditor → perf-auditor → a11y-auditor → todo-generator
  → Generates: consolidated report + action plan

"Revitaliser ce code legacy" → legacy-revival (19)
  → Runs: spec-writer → code-auditor → code-simplifier → robocop → perf-auditor → sync-local
  → Generates: before/after metrics + modernization roadmap

"Check avant release" → pre-release (20)
  → Runs: code-auditor → perf-auditor → a11y-auditor → robocop → tests
  → Generates: GO/NO-GO decision + quality gates report

"J'ai une idée de projet" → c3po (25)
  → Discovery: comprend l'idée, pose des questions
  → Runs: spec-writer → todo-generator → task-runner → audits
  → Accompanies: from idea to implementation with checkpoints

"Combien coûtera l'hébergement ?" → picsou (26)
  → Scans: stack, DB, storage, external services
  → Questions: traffic, budget, constraints, geography
  → Compares: Vercel, Railway, Hetzner, OVH, Supabase, etc.
  → Generates: docs/reports/estimation-couts-YYYYMMDD.md

"API mobile pour ce projet" → steve (27)
  → Audits: web project structure, features, existing API
  → Designs: complete API architecture for mobile connectivity
  → Documents: endpoints, schemas, auth flows, parity matrix
  → Generates: docs/api/ (full documentation + implementation plan)
```

### Pre-Release Quality Checks (Manual)
```
"Audit code" → code-auditor (05)
"Audit accessibility" → a11y-auditor (06)
"Audit performance" → perf-auditor (07)
```

### Notion Import
```
"Import from Notion" → notion-importer (21)
  → Reads master page + all linked pages recursively
  → Generates: docs/spec_notion.md + docs/todo_notion.md

"Import + sync to Linear" → notion-importer (21) → external-sync (08)
  → Import from Notion first, then push to Linear
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

### notion-importer
- Unidirectional import (Notion → Local only)
- Reads master Notion page + recursively follows all linked pages
- Extracts content from Notion databases (optional)
- Categorizes content (spec, tasks, notes, architecture)
- Generates `/docs/spec_notion.md` with all specifications
- Generates `/docs/todo_notion.md` with all tasks prioritized
- Tracks import metadata in `.notion-import-meta.json`
- Use cases: onboarding, backup, migration prep
- Different from external-sync: no bidirectional sync, focused on one-time import

### context-generator
- Generates llm.txt: compact 15K character snapshot of entire project
- Sources: README, CLAUDE.md, configs, git history, MCP, audits
- Purpose: Instant LLM onboarding without reading 50+ files
- Use cases: New session, collaboration, context sharing, project history
- Regenerate after significant changes or before sharing project
- Output: Single llm.txt file at project root (Markdown format)

### robocop (11)
- Detective and fixer for all error types: runtime, compilation, tests, linting, type errors
- Works in two modes: direct fix or via GitHub issues
- Minimal context gathering: starts at error location, expands only if needed
- Verification workflow: diagnose → fix → test → verify no regressions
- GitHub integration: reads issue, reproduces error, fixes, comments, closes
- Uses Task/Explore for complex multi-file errors
- Supports all stacks: JS/TS, Python, Rust, Swift, Go, etc.

### audit-complet (18)
- Orchestrator using **hybrid execution** (sequential + parallel)
- Workflow: spec-writer → **[code-auditor + perf-auditor + a11y-auditor] (parallel)** → todo-generator
- Uses **context protocol**: extracts CONTEXTE PROJET after spec-writer, passes to all sub-agents
- Sub-agents skip reconnaissance phase → saves ~30% tokens
- Orchestrator consolidates spec.md/todo.md writes (single write point, no conflicts)
- Interactive: asks scope, depth, focus before starting
- Output: 6 files including audit-summary-YYYYMMDD.md

### legacy-revival (19)
- Orchestrator using **hybrid execution** for legacy modernization
- Workflow: spec-writer → code-auditor → **[code-simplifier + perf-auditor] (parallel)** → robocop → sync-local → todo-generator
- Uses **context protocol** throughout all phases
- Handles risks: tests missing, breaking changes, deprecated dependencies
- Generates before/after metrics showing transformation impact
- Interactive: asks about risk tolerance, breaking changes acceptance
- Output: legacy-revival-YYYYMMDD.md with modernization roadmap

### pre-release (20)
- Orchestrator using **hybrid execution** for pre-release checks
- Workflow: context detection → **[code-auditor + perf-auditor + a11y-auditor] (parallel)** → robocop (if blockers) → tests → docs check
- Skips spec-writer if spec.md exists (fast context detection)
- Uses **FOCUS PRE-RELEASE** flag: sub-agents report only P0/P1 issues
- Makes GO/NO-GO decision based on strict criteria
- Checks documentation: CHANGELOG, version bump, migration guide
- Interactive: asks manual confirmations (features tested, DB migration ready, etc.)
- Output: pre-release-YYYYMMDD.md with verdict and blockers list

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
  - **docs/spec_notion.md**: Notion import - specifications (from 21-notion-importer)
  - **docs/todo_notion.md**: Notion import - tasks (from 21-notion-importer)
  - **docs/.notion-import-meta.json**: Notion import metadata (from 21-notion-importer)
  - **docs/00-meta/index.md**: Documentation index (auto-generated)
  - **docs/00-meta/conventions.md**: Documentation conventions (auto-generated)
  - **docs/00-meta/audit-YYYY-MM-DD.md**: Documentation audit reports
  - **docs/reports/estimation-couts-YYYYMMDD.md**: Hosting cost estimation report (from 26-picsou)
  - **docs/api/**: Complete API documentation for mobile connectivity (from 27-steve)
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

### 21-notion-importer (Notion Import Only)
- ✅ Reads Notion pages recursively (master + links)
- ✅ Generates docs/spec_notion.md + docs/todo_notion.md
- ✅ One-time import/extraction
- ❌ Does NOT sync back to Notion
- ❌ Does NOT touch spec.md, todo.md at root (uses _notion suffix in /docs)

**Use together:** `03-sync-local` → `08-external-sync` for complete workflow
**Or:** `21-notion-importer` → `08-external-sync` for Notion→Linear migration

## Model Distribution

- **opus** (14 agents): Complex analysis requiring deep reasoning
  - 01-spec-writer: Multi-stack project analysis
  - 05-code-auditor: Comprehensive code audit
  - 08-external-sync: Bidirectional conflict resolution
  - 11-robocop: Error diagnosis and fixing (all error types)
  - 14-figma-shadcn: Design interpretation and component mapping
  - 17-code-simplifier: Codebase simplification audit
  - 18-audit-complet: Orchestration of 5 agents with complex decision making
  - 19-legacy-revival: Orchestration with risk assessment and modernization strategy
  - 20-pre-release: Orchestration with GO/NO-GO decision logic
  - 21-notion-importer: Notion content extraction and consolidation
  - 25-c3po: Product Manager orchestration from idea to implementation
  - 26-picsou: Multi-provider hosting cost estimation and comparison
  - 27-steve: Mobile API orchestrator with architecture design and parity analysis
  - 28-svg-analyzer: React/Next.js project analysis and SVG mockup generation via Shad2SVG

- **sonnet** (25 agents): Structured tasks, automation, performance optimization
  - All other agents (00, 02-04, 06-07, 09, 10-*, 11-deploy/*, 12-*, 13, 15, 16, 22, 23, 24)

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
