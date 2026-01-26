# Changelog

All notable changes to Woodman will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.11.0] - 2026-01-26

### Added

- **New Agent: Gybe (00)** - Entry point and dispatcher
  - Analyzes project state instantly (spec, todo, code, git, docs)
  - Detects project phase: New, Specified, Planned, In Progress, Advanced, Legacy, Ready to Ship
  - Suggests relevant agents based on context
  - Quick commands: `go`, `next`, `audit`, `fix`, `ship`, `sync`
  - Help system with all agents listed
  - Model: sonnet (fast diagnostic)

### Use Cases

- Start working on any project without knowing which agent to use
- Get instant project diagnostic
- Quick navigation to the right agent

## [1.10.0] - 2026-01-26

### Added

- **New Agent: C3PO (25)** - Product Manager orchestrator
  - Transforms ideas into structured projects through conversational workflow
  - Orchestrates all agents: spec-writer → todo-generator → task-runner → audits → external-sync
  - Synchronizes with Notion (documentation) and Linear (tasks) at the end
  - Conversational personality inspired by the protocol droid
  - Phase-based workflow: Discovery → Specification → Planning → Implementation → Quality → External Sync → Finalization
  - Multiple modes: Assisted, Autonomous (Ralph Loop), Manual
  - Checkpoints and confirmations at each major step
  - Model: opus (complex orchestration and strategic decisions)

### Use Cases

- Start a new project from a vague idea
- Get guided through the entire development process
- Have a PM that orchestrates everything for you

## [1.9.2] - 2026-01-26

### Changed

- **BREAKING: Standardized /docs output structure** - All agent reports now go to organized subdirectories
  - `docs/audits/` - All audit reports (code, perf, a11y, shadcn, frontend, landing)
  - `docs/reports/` - Orchestrator outputs (pre-release, legacy-revival, simplifier, audit-summary)
  - `docs/imports/` - External imports (spec_notion, todo_notion, spec_landing)
  - `docs/communications/` - Brigitte outputs (update-YYYYMMDD)

### Fixed

- All commands in `commands/` are now symlinks to `agents/` (was 12 divergent copies)
- 12 agents updated to use new /docs structure

### Added

- `docs/00-structure.md` - Convention documentation for /docs organization

## [1.9.1] - 2026-01-26

### Added

- **New Agent: brigitte (24)** - Friendly communications for non-technical teams
  - Transforms commits, changelog, and code evolution into human-readable updates
  - Multiple output formats: email, Slack/Teams, weekly report, release notes
  - Zero jargon: explains "why" before "what" with everyday metaphors
  - Warm, celebratory tone that values the team's work
  - Automatically filters out internal technical details
  - Model: sonnet

### Use Cases

- Weekly team updates without technical jargon
- Client-facing release notes
- Internal newsletters
- Slack/Teams announcements
- Executive summaries

## [1.9.0] - 2026-01-26

### Added

- **New Agent: shadcn-auditor (23)** - Dedicated shadcn/ui audit for React/Next.js projects
  - Configuration audit: components.json, CSS variables, cn() utility, aliases
  - Imports/Usage audit: local imports vs direct Radix, variants, composition patterns
  - Theming audit: dark mode, CSS variables (20+), hardcoded colors detection
  - Accessibility audit: DialogTitle/Description, FormLabel, focus visible
  - Anti-patterns detection: reimplementations, incorrect cn() usage, inline CSS
  - Scoring system: 5 categories with 0-10 scale and severity levels
  - Generates detailed report: `docs/audit-shadcn-YYYYMMDD.md`
  - Updates spec.md and todo.md with #SHAD-XXX prefixed tasks
  - Model: sonnet (structured analysis)

### Documentation

- Updated `CLAUDE.md` with shadcn-auditor agent reference
- Updated `agents/CLAUDE.md` with agent in table and model distribution
- Added `commands/agents/shadcn-auditor.md` for global installation

### Technical Details

- Scope: React/Next.js only (shadcn/ui original)
- Non-destructive: audit only, no code modifications
- Output: scoring report with actionable corrections

## [1.8.0] - 2026-01-19

### Added

- **New Agent: notion-importer (21)** - Unidirectional Notion content extraction
  - Reads Notion master page with recursive link exploration
  - Extracts content from Notion databases (optional)
  - Generates `docs/spec_notion.md` (specifications, architecture, context)
  - Generates `docs/todo_notion.md` (prioritized tasks P0-P3)
  - Smart content categorization (spec vs tasks vs notes)
  - Tracks import metadata in `.notion-import-meta.json`
  - Configurable exploration depth (1-3 levels or unlimited)
  - Model: opus (complex content analysis)

### Use Cases

- **Project onboarding** from existing Notion workspace
- **Notion → Linear migration** (import then external-sync)
- **Backup/archive** of Notion content for offline access

### Documentation

- Updated `CLAUDE.md` with notion-importer workflow examples
- Updated `agents/CLAUDE.md` with agent capabilities and model distribution
- Updated `agents/README.md` and `commands/README.md` with new agent reference
- Added separation of responsibilities section distinguishing from external-sync (08)

### Technical Details

- Direction: Unidirectional (Notion → Local only)
- Output location: `/docs` with `_notion` suffix to avoid conflicts
- Different from external-sync: no bidirectional sync, focused on one-time extraction
- Requires MCP: `mcp__notion`

## [1.7.3] - 2026-01-19

### Fixed

- Remove shell operators from code-auditor causing security warnings

## [1.7.2] - 2026-01-18

### Fixed

- Fix agent invocation issues

## [1.7.1] - 2026-01-17

### Added

- Ralph Loop Integration

## [1.7.0] - 2026-01-17

### Changed

- Standardize agent report outputs across all agents

## [1.6.0] - 2026-01-17

### Added

- Orchestrator agents (audit-complet, legacy-revival, pre-release)

---

[1.11.0]: https://github.com/izo/Woodman/compare/v1.10.0...v1.11.0
[1.10.0]: https://github.com/izo/Woodman/compare/v1.9.2...v1.10.0
[1.9.2]: https://github.com/izo/Woodman/compare/v1.9.1...v1.9.2
[1.9.1]: https://github.com/izo/Woodman/compare/v1.9.0...v1.9.1
[1.9.0]: https://github.com/izo/Woodman/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/izo/Woodman/compare/v1.7.3...v1.8.0
[1.7.3]: https://github.com/izo/Woodman/compare/v1.7.2...v1.7.3
[1.7.2]: https://github.com/izo/Woodman/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/izo/Woodman/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/izo/Woodman/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/izo/Woodman/releases/tag/v1.6.0
