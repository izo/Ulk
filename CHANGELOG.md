# Changelog

All notable changes to Woodman will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.8.0]: https://github.com/izo/Woodman/compare/v1.7.3...v1.8.0
[1.7.3]: https://github.com/izo/Woodman/compare/v1.7.2...v1.7.3
[1.7.2]: https://github.com/izo/Woodman/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/izo/Woodman/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/izo/Woodman/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/izo/Woodman/releases/tag/v1.6.0
