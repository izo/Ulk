# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About the Name 🐺

**Bruce**, whose real name is **Ulk**, is a Swedish Vallhund — a thousand-year-old Viking dog breed, stocky and fearless, nicknamed "the Viking's dog".

Like his ancestor who accompanied drakkars across Nordic seas, Ulk accompanies developers through oceans of code. Small but mighty, he never backs down from any challenge: security audits, legacy code refactoring, or deployments at 3 AM.

> The name "ulk" means "wolf" in Old Norse. Because beneath his adorable appearance, Bruce is a fierce guardian of code quality.

## Project Overview

**ulk** is a comprehensive AI-assisted development toolkit organized into three independent modules:

1. **cheatheet/** - Documentation generator that combines Claude Code and Speckit references into a deployable GitHub Pages site
2. **agents/** - Collection of specialized AI agents for common development tasks (spec writing, auditing, task generation, etc.)
3. **sifrei - scribe/** - LLM context generator concept that creates `llm.txt` files for instant project onboarding

## Essential Commands

### Documentation Generator (cheatheet/)

```bash
# Generate ulk.md from all sources
node cheatheet/generate-unified-docs.js

# Test locally (runs generator + starts dev server)
cd cheatheet && ./serve.sh [port]  # Default: 8000

# Trigger GitHub Pages deployment manually
gh workflow run deploy.yml

# Check deployment status
gh run list --workflow=deploy.yml
```

### Agent Skills

The `agents/` directory contains specialized AI agents that can be invoked as needed:

**Workflow Agents (00-34):**
- `00-godspeed.md` - Entry point: analyzes project state and suggests relevant agents/actions
- `01-spec-writer.md` - Analyzes projects to generate comprehensive docs/spec.md files (supports all stacks)
- `02-todo-generator.md` - Creates actionable TODO lists from specifications
- `03-sync-local.md` - Synchronizes LOCAL documentation (spec, CLAUDE, README)
- `04-task-runner.md` - Executes and tracks development tasks
- `05-code-auditor.md` - Performs code quality and architecture audits
- `06-a11y-auditor.md` - Performs WCAG 2.1/2.2 accessibility audits
- `07-perf-auditor.md` - Performs performance audits (Core Web Vitals, bundle analysis, etc.)
- `09-context-generator.md` - Generates llm.txt snapshot (15K chars max)
- `11-robocop.md` - Detective and fixer for all error types (runtime, compilation, tests, linting) - works directly or via GitHub issues
- `13-documentalist.md` - Manages /docs folder (organize, clean, validate frontmatter)
- `14-figma-shadcn.md` - Analyzes Figma designs and generates shadcn/ui + Tailwind implementations
- `15-tw2shad.md` - Transforms Tailwind/HTML components into shadcn/ui Vue components (Nuxt)
- `16-frontend-qa.md` - **Unified frontend QA**: 3 modes (full audit, landing page, shadcn deep audit)
- `17-code-simplifier.md` - Codebase simplification audit, then applies via official code-simplifier plugin
- `18-audit-complet.md` - Orchestrator: full repo audit (spec, code, perf, a11y) with consolidated report
- `19-legacy-revival.md` - Orchestrator: legacy code revival (doc, simplify, fix, optimize)
- `20-pre-release.md` - Orchestrator: pre-release checklist (audit, tests, docs) with GO/NO-GO decision
- `21-notion-importer.md` - Imports Notion page with links → generates spec_notion.md + todo_notion.md in /docs
- `24-brigitte.md` - **Unified comms + sync**: friendly communications for non-tech teams AND bidirectional Notion/Linear sync
- `25-c3po.md` - Product Manager orchestrator: transforms ideas into projects (spec → todo → tasks → audits)
- `26-picsou.md` - Hosting cost estimator: analyzes infrastructure, compares providers, generates cost reports with recommendations
- `27-steve.md` - **Unified Apple orchestrator**: audits web projects, designs API, AND generates SwiftUI starter kit (absorbs jobs)
- `28-svg-analyzer.md` - Analyzes React/Next.js projects, inventories pages and shadcn/ui components, generates SVG via Shad2SVG API
- `30-blackemperor.md` - Fast delivery orchestrator: simplifies code, documents, organizes /docs (Phase 2.5 with documentalist), syncs external tools (Notion/Linear), updates README & CLAUDE.md, prepares release
- `31-ranma.md` - Migration planning agent: analyzes source project and generates detailed migration plan to target stack (WordPress→SPIP, Next→Nuxt, SPIP→Astro, Kirby→Astro, etc.)
- `32-seo-auditor.md` - SEO & GEO audit: technical SEO (meta, sitemap, schema.org), on-page (headings, content), performance (Core Web Vitals), and GEO (Generative Engine Optimization for AI citations)
- `33-pencil-generator.md` - Next.js to Pencil: analyzes pages, layouts, shadcn/ui components and generates .pen files with design tokens
- `34-gandalf.md` - Context guardian: monitors context usage, enforces session discipline, prevents context rot
- `35-visual-auditor.md` - Visual audit via Chrome DevTools MCP: screenshots comparison (mobile/tablet/desktop), DOM/CSS analysis, visual performance (LCP/CLS/FCP), console/network errors, baseline management

**Stack Analyzers (10-analyze/):**
- `10-analyze/astro.md` - In-depth Astro analysis (Islands, Content Collections)
- `10-analyze/next.md` - In-depth Next.js analysis (App Router, Server/Client)
- `10-analyze/nuxt.md` - In-depth Nuxt analysis (SSR, hydration, Nuxt UI)
- `10-analyze/spip.md` - In-depth SPIP analysis (squelettes, boucles, CVT)
- `10-analyze/swiftui.md` - In-depth SwiftUI analysis (MVVM, TCA, multi-platform)

### Global Installation (Custom Commands)

Install agents globally to use them in any project:

```bash
# Install (creates symlink to ~/.claude/commands/ulk)
./install.sh

# Install with VPS agents
./install.sh --with-vps

# Global install (copy instead of symlink)
./install.sh --global
```

#### Uninstallation

```bash
# Interactive uninstall (with confirmation)
./uninstall.sh

# Force uninstall (no confirmation)
./uninstall.sh --force

# Preview what would be removed
./uninstall.sh --dry-run
```

The uninstaller removes:
- `~/.claude/commands/ulk` - Current installation
- `~/.claude/commands/woodman` - Legacy installation (if present)
- `~/.claude/commands/wm` - Legacy installation (if present)

Once installed, invoke agents anywhere with:
```
/ulk:agents:spec-writer
/ulk:agents:todo-generator
/ulk:agents:godspeed
/ulk:agents:robocop
/ulk:agents:notion-importer
/ulk:agents:figma-shadcn
/ulk:agents:c3po
/ulk:agents:picsou
/ulk:agents:steve            # Unified Apple (API + SwiftUI)
/ulk:agents:brigitte         # Unified comms + Notion/Linear sync
/ulk:agents:frontend-qa      # Unified frontend (full, landing, shadcn)
/ulk:agents:svg-analyzer
/ulk:agents:blackemperor
/ulk:agents:ranma
/ulk:agents:seo-auditor
/ulk:agents:pencil-generator
/ulk:agents:gandalf
/ulk:analyze:nuxt
```

The `commands/` directory contains the installable version of agents formatted for Claude Code Custom Commands.

### Sifrei Scribe (Context Generator)

Located in `sifrei - scribe/`:
- Conceptual tool for generating `llm.txt` - a 15,000 character max context snapshot
- Synthesizes: README, CLAUDE.md, configs, git history, MCP servers, custom commands
- Currently documented in `scribe.md` and `manifeste.md` but not implemented

## Architecture

### Documentation Pipeline (cheatheet/)

```
generate-unified-docs.js
    ├── sources[] array
    │   ├── awesomeclaude.ai/code-cheatsheet
    │   ├── github.com/github/spec-kit
    │   └── claude.ai (Anthropic)
    │
    ├── YAML frontmatter generation
    │   ├── version, title, description
    │   ├── sources metadata
    │   └── logo references
    │
    ├── Content template
    │   ├── Part 1: Claude Code (installation, shortcuts, commands, MCP, etc.)
    │   ├── Part 2: Speckit (workflow, commands, best practices)
    │   └── Credits & resources
    │
    └── Outputs
        ├── ulk.md (generated markdown with frontmatter)
        └── index.html (GitHub Pages interface)
            ├── marked.js for rendering
            ├── Nord theme (dark/light)
            └── IBM Plex fonts
```

### GitHub Actions Deployment

**File**: `.github/workflows/deploy.yml`

**Triggers**:
- Push to `main` branch
- Manual dispatch via Actions tab
- Weekly schedule (Sunday at midnight UTC) for automatic documentation refresh

**Pipeline**:
1. Checkout repository
2. Setup Node.js 18
3. Run `node generate-unified-docs.js` to regenerate docs
4. Use existing `index.html` from repository (Nord theme, IBM Plex fonts)
5. Deploy to GitHub Pages

**Live URL**: https://izo.github.io/ulk/

### Agent System

The `agents/` directory contains markdown-based agent definitions with:
- **Frontmatter**: name, description, tools, model
- **Instructions**: Detailed agent behavior and workflows
- **Pattern detection**: Stack-specific logic (Swift, Nuxt, Laravel, WordPress, SPIP, Python, Go, Rust, etc.)

Agents use `AskUserQuestionTool` for interactive information gathering and adapt their approach based on detected project patterns.

**Common Workflows**:
```bash
# Setup new project
"Generate a spec" → "Generate todo" → "Sync with Linear"

# Development session
"What's the next task?" → "Continue" → "Report progress"

# Error fixing
"Fix this error: [error message]" → robocop diagnoses and fixes
"Fix GitHub issue #42" → robocop reads, fixes, verifies, closes issue

# Audit orchestrators (combined workflows)
"Audit complet" → audit-complet runs 5 agents: spec, code, perf, a11y, todo
"Legacy revival" → legacy-revival runs 6 agents: spec, audit, simplify, fix, optimize, doc
"Pre-release check" → pre-release runs 5-6 agents: audits, tests, docs → GO/NO-GO

# Pre-release checks (manual)
"Audit performance" → "Audit accessibility" → "Audit code"

# Import from Notion
"Import from Notion" → notion-importer extracts page + links → generates spec_notion.md + todo_notion.md
"Import + sync to Linear" → notion-importer then brigitte sync

# Hosting cost estimation
"Combien ça coûte ?" → picsou scans infrastructure, compares providers, generates report
"Estime les coûts" → picsou analyzes stack + DB + services → docs/reports/estimation-couts.md

# Apple API
"API Apple" → steve audits web project, designs API, documents endpoints for Apple platforms parity
"Connecter une app Apple" → steve scans features, proposes API architecture, generates docs/api/
"steve" → complete workflow: API design + SwiftUI starter kit generation (unified agent)

# SVG mockup generation
"Analyse ce projet" → svg-analyzer Phase 1 → generates ANALYSE_PAGES.md with pages/components inventory
"Génère les SVG" → svg-analyzer Phase 2 → calls Shad2SVG API → generates output/*.svg + preview index

# Fast delivery (blackemperor)
"blackemperor" → simplify code → update docs → organize /docs (Phase 2.5) → sync Notion/Linear → update README & CLAUDE.md → prepare release
"blackemperor express" → same workflow with minimal questions, auto decisions
"blackemperor --with-docs-cleanup" → forces Phase 2.5 (documentalist) for /docs organization
"Ship it!" → blackemperor orchestrates 7 agents: code-simplifier, spec-writer, todo-generator, documentalist (conditional), brigitte (sync), sync-local, robocop

# Migration planning (ranma)
"ranma" → analyze source project → ask target stack → generate migration plan in docs/migration/
"Migration WordPress vers SPIP" → ranma detects WP, proposes SPIP mapping, generates plan-migration.md
"Next to Nuxt" → ranma maps React→Vue concepts, API routes→Nitro, generates detailed plan
"Kirby → Astro" → ranma maps blueprints→content collections, templates→.astro pages

# SEO & GEO audit (seo-auditor)
"Audit SEO" → seo-auditor analyzes technical SEO, on-page, performance, GEO → generates audit-seo.md
"Optimize for AI" → seo-auditor focuses on GEO: answer-first content, FAQ schemas, E-E-A-T signals
"Check SEO before launch" → seo-auditor runs full audit with checklist → GO/NO-GO for SEO readiness

# Pencil generation (pencil-generator)
"pencil-generator" → scan Next.js project → identify pages/layouts → generate .pen files in design/
"Génère les pencil" → pencil-generator analyzes all pages, extracts tokens from globals.css → design/*.pen
"scan" → list all pages and layouts detected in the project
"generate-all" → generate .pen files for all pages with _tokens.pen and _layouts/

# Context hygiene (gandalf)
"gandalf" → health check: context %, focus, external state → recommendations
"gandalf status" → quick context evaluation
"gandalf save" → persist state before /clear
"gandalf rules" → best practices reminder

# Visual audit (visual-auditor)
"visual-auditor https://example.com" → full visual audit: screenshots (mobile/tablet/desktop), performance, errors
"visual-auditor --project ." → scan local project pages, audit all
"visual-auditor --compare staging prod" → compare two environments, detect visual regressions
"visual-auditor --update-baseline" → update reference screenshots for future comparisons

# Maintenance
"Sync with Notion and Linear" → "Where are we?"
```

## Key Files & Responsibilities

### Generated Files (Never Edit Manually)
- `cheatheet/ulk.md` - Always regenerate using the generator script

### Source Files (Edit These)

| File | Purpose |
|------|---------|
| `cheatheet/generate-unified-docs.js` | Core generator - modify `sources[]` array and `content` template |
| `cheatheet/index.html` | GitHub Pages interface (Nord theme, marked.js rendering) |
| `cheatheet/serve.sh` | Local dev server script (runs generator + HTTP server) |
| `.github/workflows/deploy.yml` | CI/CD configuration (Node 18, weekly cron schedule) |
| `agents/*.md` | Agent definitions with frontmatter and instructions |
| `sifrei - scribe/scribe.md` | Context generator prompt (concept — llm.txt deprecated, use CLAUDE.md) |
| `docs/spec.md` | Project specification document (generated by spec-writer) |
| `docs/todo.md` | Prioritized task list (generated by todo-generator) |

### Configuration Files

| File | Purpose |
|------|---------|
| `.claude/settings.local.json` | Pre-approved permissions for common operations |
| `.nojekyll` | Prevents Jekyll processing on GitHub Pages |
| `cheatheet/CLAUDE.md` | Module-specific instructions (cheatheet only) |
| `cheatheet/DEPLOY.md` | Deployment guide |

### Assets

Located at repository root:
- `ulk.png` (1.8MB) - Main logo for documentation header (⚠️ Should be optimized)
- `ulk-mini.png` (16x16px) - Mini logo for footer/favicon

## Development Workflow

### When Adding Documentation Sources

1. Edit `cheatheet/generate-unified-docs.js`
2. Add to `sources[]` array with: name, url, description, maintainer
3. Add corresponding content section in the `content` template string
4. Test: `node cheatheet/generate-unified-docs.js`
5. Verify: `cd cheatheet && ./serve.sh` and check http://localhost:8000
6. Commit and push to trigger automatic deployment

### When Modifying the Generator

Always test locally before committing:
```bash
# Test generation
node cheatheet/generate-unified-docs.js

# Verify output
cat cheatheet/ulk.md | head -50

# Test web interface
cd cheatheet && ./serve.sh 8000
```

### Version Management

Keep version synchronized across three locations:
1. `cheatheet/generate-unified-docs.js` - Line 40: `version: "X.Y.Z"`
2. `cheatheet/README.md` - Badge section
3. Generated `cheatheet/ulk.md` frontmatter (auto-updated by script)

### When Creating New Agents

1. Create `agents/NN-agent-name.md` with frontmatter:
   ```yaml
   ---
   name: agent-name
   description: Brief description of what this agent does
   tools: View, Read, Grep, Glob, Bash, Write, AskUserQuestionTool
   model: opus
   ---
   ```
2. Add detailed instructions following the pattern in existing agents
3. Include pattern detection logic if stack-specific (see 01-spec-writer.md for examples)
4. Test agent thoroughly before committing

## File Structure

The repository has an intentional naming choice using spaces in folder names for aesthetic reasons:

```
ulk/
├── cheatheet/                    # Documentation generator module
│   ├── generate-unified-docs.js
│   ├── index.html
│   ├── ulk.md (generated)
│   ├── serve.sh
│   └── README.md, DEPLOY.md, CLAUDE.md
│
├── agents/                       # AI agent definitions (source)
│   ├── 01-spec-writer.md
│   ├── 02-todo-generator.md
│   ├── 03-sync-local.md
│   ├── 04-task-runner.md
│   ├── 05-code-auditor.md
│   ├── 06-a11y-auditor.md
│   ├── 07-perf-auditor.md
│   ├── 09-context-generator.md
│   ├── 10-analyze/              # Stack-specific analyzers
│   │   ├── astro.md
│   │   ├── next.md
│   │   ├── nuxt.md
│   │   ├── spip.md
│   │   ├── swiftui.md
│   │   └── README.md
│   ├── 11-robocop.md
│   ├── 16-frontend-qa.md        # Unified: full + landing + shadcn audits
│   ├── 18-audit-complet.md
│   ├── 19-legacy-revival.md
│   ├── 20-pre-release.md
│   ├── 24-brigitte.md           # Unified: comms + Notion/Linear sync
│   ├── 26-picsou.md
│   ├── 27-steve.md              # Unified: API + SwiftUI starter kit
│   ├── 28-svg-analyzer.md
│   ├── 30-blackemperor.md
│   ├── 31-ranma.md
│   ├── 32-seo-auditor.md
│   ├── 33-pencil-generator.md
│   ├── 34-gandalf.md
│   ├── 35-visual-auditor.md
│   ├── CLAUDE.md
│   ├── Readme.md
│   └── ANALYSE-COHERENCE.md
│
├── commands/                     # Installable Custom Commands
│   ├── agents/                   # Workflow agents
│   │   ├── spec-writer.md
│   │   ├── todo-generator.md
│   │   ├── task-runner.md
│   │   ├── sync-local.md
│   │   ├── code-auditor.md
│   │   ├── a11y-auditor.md
│   │   ├── perf-auditor.md
│   │   ├── context-generator.md
│   │   ├── robocop.md
│   │   ├── frontend-qa.md       # Unified: full + landing + shadcn
│   │   ├── audit-complet.md
│   │   ├── legacy-revival.md
│   │   ├── pre-release.md
│   │   ├── brigitte.md          # Unified: comms + sync
│   │   ├── picsou.md
│   │   ├── steve.md             # Unified: API + SwiftUI
│   │   ├── svg-analyzer.md
│   │   ├── blackemperor.md
│   │   ├── ranma.md
│   │   ├── seo-auditor.md
│   │   ├── pencil-generator.md
│   │   ├── gandalf.md
│   │   └── visual-auditor.md
│   ├── analyze/                  # Stack analyzers
│   │   ├── nuxt.md
│   │   ├── next.md
│   │   ├── astro.md
│   │   ├── spip.md
│   │   └── swiftui.md
│   └── README.md
│
├── sifrei - scribe/              # Context generator (concept only)
│   ├── scribe.md
│   └── manifeste.md
│
├── .github/workflows/
│   └── deploy.yml
│
├── .claude/
│   └── settings.local.json
│
├── docs/                         # Generated documentation (spec, todo, audits, reports)
│   ├── spec.md                   # Project specification (generated by spec-writer)
│   └── todo.md                   # Prioritized tasks (generated by todo-generator)
│
├── install.sh                    # Global installation script (--with-vps for VPS agents)
├── uninstall.sh                  # Uninstallation script
├── ulk.png                       # Main logo (1.8MB)
├── ulk-mini.png                  # Favicon (16x16)
├── CLAUDE.md                     # This file
└── .nojekyll                     # Disable Jekyll processing
```

## Important Notes

### Documentation Pipeline
- The generator script combines static content with dynamic source information
- YAML frontmatter is stripped by index.html before markdown rendering
- Nord theme adapts to system dark/light mode preference
- The site is fully static - no server-side processing required
- No `package.json` - intentionally using vanilla Node.js without dependencies

### Permissions
- `.claude/settings.local.json` pre-approves common git, GitHub CLI, and documentation generation commands
- WebFetch is allowed for awesomeclaude.ai and github.com (documentation sources)
- All git operations (add, commit, push, tag, release) are pre-approved
- MCP servers enabled: `shadcn` and all project-level servers

### GitHub Pages Deployment
- Requires Pages to be enabled: Settings > Pages > Source: GitHub Actions
- `.nojekyll` file is critical - prevents Jekyll from ignoring files with underscores
- Deployment happens automatically on push to main
- Weekly auto-refresh (Sunday midnight UTC) ensures documentation stays current
- Files are deployed from repository root (not from cheatheet/)

### Agent Best Practices
- Agents should use `AskUserQuestionTool` for interactive workflows
- Pattern detection (Swift, Nuxt, Laravel, WordPress, SPIP, etc.) should drive agent behavior
- Agents should announce phases clearly ("Phase 1: Exploration", "Phase 2: Questions", etc.)
- Never generate content without sufficient information gathering
- Most agents use `model: opus` for complex analysis tasks

## LLM Session Best Practices

These practices help maximize effectiveness when working with Claude Code and avoid common pitfalls.

### Context Management (The 50% Rule)

LLMs are non-deterministic by nature. Everything in the context window is either signal or noise:
- What was signal 5 prompts ago is now noise
- Models struggle to distinguish signal/noise beyond 40-50% context usage
- "Context rot" causes sudden forgetfulness even with 50% remaining

**Rules:**
- **NEVER exceed 50% context** and expect good results
- Use `/clear` proactively when approaching 40%
- Persist state externally (issues, docs/todo.md) before clearing
- Use subagents for exploration to avoid polluting the main context

### One Session = One Task

Avoid the "pair programming buddy" trap where entropy piles onto non-determinism:
- Don't chain unrelated tasks in one session
- Don't run marathon 3-hour sessions
- Each task: start → implement → commit → /clear

**Good:**
```
"Implement feature A" → commit → /clear
"Implement feature B" → commit → /clear
```

**Bad:**
```
"Do feature A, then B, then fix that bug, also..."
```

### Predictable Workflows

Use consistent patterns for each task:

1. **START**: Read task from issue/todo, read relevant files
2. **RESEARCH** (subagent): Explore code, identify impacts
3. **PLAN** (subagent): Propose approach, list steps
4. **IMPLEMENT**: Execute plan, test incrementally, commit often
5. **REVIEW**: Verify result, update issue/todo, /clear

### External State Persistence

Never rely solely on context for critical state. Use:
- **Issue trackers** (GitHub/Linear): Best for collaboration
- **docs/todo.md**: Simple, versioned, local
- **Session notes**: For complex multi-step tasks

Before `/clear`:
- [ ] Changes committed
- [ ] Issue/todo updated
- [ ] Next steps documented

### Context Hygiene

- Keep CLAUDE.md concise and focused
- Use Rules/Skills files for reusable patterns
- Minimize MCP tools to reduce context overhead
- Clean up unused configuration

### Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| "Buddy mode" | Excessive validation wastes context | Keep exchanges transactional |
| Infinite exploration | Reading 20 files pollutes context | Use subagents for exploration |
| Multi-tasking | Fragmented focus, confused context | One task per session |
| Ignoring context % | Context rot causes failures | Monitor and /clear proactively |

### Using Gandalf

The `gandalf` agent helps enforce these practices:
- `gandalf` - Full health check
- `gandalf status` - Quick context evaluation
- `gandalf save` - Guide to persist state
- `gandalf rules` - Best practices reminder

Invoke when:
- Session feels long or unfocused
- Claude starts forgetting things
- Before starting a new major task

### Known Constraints
- **Folder names with spaces**: Aesthetic choice that may cause issues in some CLI contexts
- **Large logo file**: `ulk.png` is 1.8MB and should be optimized (convert to WebP or compress)
- **No package.json**: Intentional design decision to keep the project dependency-free
- **Scribe not implemented**: `sifrei - scribe/` contains only conceptual documentation, no working implementation

## Troubleshooting

### Documentation not updating on GitHub Pages
- Check Actions tab for deployment logs
- Verify workflow permissions (contents: read, pages: write)
- Ensure ulk.md is being generated (check workflow logs)
- Note: The workflow runs from root but generates files in cheatheet/

### Generator script fails
- Check Node.js version (requires >= 14.0.0)
- Verify logo files exist at repository root (not in cheatheet/)
- Check sources[] array for valid URLs
- Ensure you're running from repository root or cheatheet/ directory

### Local server not working
- Ensure serve.sh has execute permissions: `chmod +x cheatheet/serve.sh`
- Try manual server: `cd cheatheet && python3 -m http.server 8000`
- Server expects to be run from cheatheet/ directory

### Spaces in folder names causing issues
- If CLI tools fail, consider escaping paths: `"sifrei - scribe/"`
- Or navigate into directory first: `cd "sifrei - scribe"`
- This is a known tradeoff for aesthetic naming
