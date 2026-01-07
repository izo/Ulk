# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Woodman** is a comprehensive AI-assisted development toolkit organized into three independent modules:

1. **cheatheet/** - Documentation generator that combines Claude Code and Speckit references into a deployable GitHub Pages site
2. **agents/** - Collection of specialized AI agents for common development tasks (spec writing, auditing, task generation, etc.)
3. **sifrei - scribe/** - LLM context generator that creates `llm.txt` files for instant project onboarding

## Essential Commands

### Documentation Generator (cheatheet/)

```bash
# Generate woodman.md from all sources
node cheatheet/generate-claude-cheatsheet.js

# Test locally (runs generator + starts dev server)
cd cheatheet && ./serve.sh [port]  # Default: 8000

# Trigger GitHub Pages deployment manually
gh workflow run deploy.yml

# Check deployment status
gh run list --workflow=deploy.yml
```

### Agent Skills

The `agents/` directory contains specialized AI agents that can be invoked as needed:
- `01-spec-writer.md` - Analyzes projects to generate comprehensive spec.md files (supports all stacks)
- `02-todo-generator.md` - Creates actionable TODO lists from specifications
- `03-sync-docs.md` - Synchronizes documentation across project files
- `04-task-runner.md` - Executes and tracks development tasks
- `05-code-auditor.md` - Performs code quality and architecture audits
- `0-external-sync.md` - Syncs external documentation sources

### Sifrei Scribe (Context Generator)

Located in `sifrei - scribe/`:
- Generates `llm.txt` - a 15,000 character max context snapshot
- Synthesizes: README, CLAUDE.md, configs, git history, MCP servers, custom commands
- Invoke with `/scribe` command (if configured)

## Architecture

### Documentation Pipeline (cheatheet/)

```
generate-claude-cheatsheet.js
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
        ├── woodman.md (generated markdown with frontmatter)
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
3. Run `node generate-claude-cheatsheet.js` to regenerate docs
4. Use existing `index.html` from repository (Nord theme, IBM Plex fonts)
5. Deploy to GitHub Pages

**Live URL**: https://izo.github.io/Woodman/

### Agent System

The `agents/` directory contains markdown-based agent definitions with:
- **Frontmatter**: name, description, tools, model
- **Instructions**: Detailed agent behavior and workflows
- **Pattern detection**: Stack-specific logic (Swift, Nuxt, Laravel, WordPress, SPIP, etc.)

Agents use `AskUserQuestionTool` for interactive information gathering and adapt their approach based on detected project patterns.

## Key Files & Responsibilities

### Generated Files (Never Edit Manually)
- `cheatheet/woodman.md` - Always regenerate using the generator script

### Source Files (Edit These)

| File | Purpose |
|------|---------|
| `cheatheet/generate-claude-cheatsheet.js` | Core generator - modify `sources[]` array and `content` template |
| `cheatheet/index.html` | GitHub Pages interface (Nord theme, marked.js rendering) |
| `cheatheet/serve.sh` | Local dev server script (runs generator + HTTP server) |
| `.github/workflows/deploy.yml` | CI/CD configuration (Node 18, weekly cron schedule) |
| `agents/*.md` | Agent definitions with frontmatter and instructions |
| `sifrei - scribe/scribe.md` | Context generator prompt |

### Configuration Files

| File | Purpose |
|------|---------|
| `.claude/settings.local.json` | Pre-approved permissions for common operations |
| `.nojekyll` | Prevents Jekyll processing on GitHub Pages |
| `cheatheet/CLAUDE.md` | Module-specific instructions |
| `cheatheet/DEPLOY.md` | Deployment guide |

### Assets

Located at repository root (not in cheatheet/):
- `woodman.png` (200x200px) - Main logo for documentation header
- `woodman-mini.png` (16x16px) - Mini logo for footer/favicon

## Development Workflow

### When Adding Documentation Sources

1. Edit `cheatheet/generate-claude-cheatsheet.js`
2. Add to `sources[]` array with: name, url, description, maintainer
3. Add corresponding content section in the `content` template string
4. Test: `node cheatheet/generate-claude-cheatsheet.js`
5. Verify: `cd cheatheet && ./serve.sh` and check http://localhost:8000
6. Commit and push to trigger automatic deployment

### When Modifying the Generator

Always test locally before committing:
```bash
# Test generation
node cheatheet/generate-claude-cheatsheet.js

# Verify output
cat cheatheet/woodman.md | head -50

# Test web interface
cd cheatheet && ./serve.sh 8000
```

### Version Management

Keep version synchronized across three locations:
1. `cheatheet/generate-claude-cheatsheet.js` - Line 40: `version: "X.Y.Z"`
2. `cheatheet/README.md` - Badge section
3. Generated `cheatheet/woodman.md` frontmatter (auto-updated by script)

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
3. Include pattern detection logic if stack-specific
4. Test agent thoroughly before committing

## Important Notes

### Documentation Pipeline
- The generator script combines static content with dynamic source information
- YAML frontmatter is stripped by index.html before markdown rendering
- Nord theme adapts to system dark/light mode preference
- The site is fully static - no server-side processing required

### Permissions
- `.claude/settings.local.json` pre-approves common git, GitHub CLI, and documentation generation commands
- WebFetch is allowed for awesomeclaude.ai and github.com (documentation sources)
- All git operations (add, commit, push, tag, release) are pre-approved

### GitHub Pages Deployment
- Requires Pages to be enabled: Settings > Pages > Source: GitHub Actions
- `.nojekyll` file is critical - prevents Jekyll from ignoring files with underscores
- Deployment happens automatically on push to main
- Weekly auto-refresh ensures documentation stays current

### Agent Best Practices
- Agents should use `AskUserQuestionTool` for interactive workflows
- Pattern detection (Swift, Nuxt, Laravel, etc.) should drive agent behavior
- Agents should announce phases clearly ("Phase Exploration", "Phase Questions", etc.)
- Never generate content without sufficient information gathering

## Troubleshooting

### Documentation not updating on GitHub Pages
- Check Actions tab for deployment logs
- Verify workflow permissions (contents: read, pages: write)
- Ensure woodman.md is being generated (check workflow logs)

### Generator script fails
- Check Node.js version (requires >= 14.0.0)
- Verify logo files exist at repository root
- Check sources[] array for valid URLs

### Local server not working
- Ensure serve.sh has execute permissions: `chmod +x cheatheet/serve.sh`
- Try manual server: `cd cheatheet && python3 -m http.server 8000`
