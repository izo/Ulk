# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Woodman** is a documentation generator that creates a comprehensive reference guide combining Claude Code and Speckit documentation. The project has two main outputs:

1. **`woodman.md`**: Generated markdown documentation with YAML frontmatter
2. **GitHub Pages site**: Automatically deployed web interface at https://izo.github.io/Woodman/

## Core Architecture

### Documentation Generation Pipeline

```
generate-claude-cheatsheet.js
    ↓
Fetches content from sources (awesomeclaude.ai, github.com/spec-kit)
    ↓
Combines with template content
    ↓
Generates woodman.md with:
  - YAML frontmatter (version, sources, logos)
  - Claude Code documentation (Part 1)
  - Speckit documentation (Part 2)
  - Best practices & credits
```

### Source Management System

The `sources` array in `generate-claude-cheatsheet.js` defines all documentation sources:
- Each source has: `name`, `url`, `description`, `maintainer`
- Sources are embedded in the YAML frontmatter
- Credits section automatically generated from sources

### GitHub Actions Workflow

**Triggers:**
- Push to `main` branch
- Manual dispatch via Actions tab
- Weekly schedule (Sunday midnight) for automatic updates

**Pipeline:**
1. Checkout repository
2. Setup Node.js 18
3. Run `generate-claude-cheatsheet.js` to generate `woodman.md`
4. Convert markdown to HTML using `marked.js`
5. Deploy to GitHub Pages

## Essential Commands

### Generate Documentation
```bash
node generate-claude-cheatsheet.js
```
This creates/updates `woodman.md` with current documentation from all sources.

### Test Locally
```bash
./serve.sh [port]
# Default port: 8000
# Opens local server at http://localhost:8000
```
The script automatically runs the generator before starting the server.

### Deploy to GitHub Pages
```bash
# Automatic on push to main
git add .
git commit -m "Update documentation"
git push origin main

# Manual trigger
gh workflow run deploy.yml
```

## Speckit Integration

This project uses Speckit for spec-driven development. Key slash commands:

- `/speckit.specify` - Define requirements
- `/speckit.plan` - Create implementation plan
- `/speckit.tasks` - Generate task list
- `/speckit.implement` - Execute implementation
- `/speckit.analyze` - Check consistency across artifacts

Templates are in `.specify/templates/`, bash scripts in `.specify/scripts/bash/`.

## File Structure & Responsibilities

### Generated Files (Don't Edit Manually)
- `woodman.md` - Always regenerate using the script

### Source Files (Edit These)
- `generate-claude-cheatsheet.js` - Core generator logic
  - `sources` array: Add/modify documentation sources
  - `content` template: Modify output structure
  - Frontmatter section: Update metadata format

- `index.html` - GitHub Pages interface
  - Uses `marked.js` for markdown rendering
  - Extracts frontmatter before rendering
  - Theme: Dark/light based on system preference

### Configuration Files
- `.github/workflows/deploy.yml` - CI/CD configuration
  - Modify cron schedule for auto-updates
  - Change Node.js version if needed

- `.nojekyll` - Required for GitHub Pages (prevents Jekyll processing)

## Logo System

Two logo files required:
- `woodman.png` - Main logo (200x200px recommended)
- `woodman-mini.png` - Mini logo (16x16px)

Both referenced in YAML frontmatter and used in:
- Document header (main logo)
- Footer (mini logo)
- Web interface favicon

## Version Management

Version is managed in three places (keep in sync):
1. `generate-claude-cheatsheet.js` - Line 40: `version: "1.0.0"`
2. `README.md` - Badge section
3. Generated `woodman.md` frontmatter (auto-updated)

## Important Notes

### When Adding New Documentation Sources
1. Add to `sources` array in `generate-claude-cheatsheet.js`
2. Add corresponding content section in the `content` template
3. Update credits section format if needed
4. Regenerate documentation

### When Modifying the Generator Script
- Always test locally before committing: `node generate-claude-cheatsheet.js`
- Check that `woodman.md` is generated correctly
- Verify logo references are intact
- Ensure frontmatter YAML is valid

### GitHub Pages Troubleshooting
- If deployment fails, check Actions tab for logs
- Ensure GitHub Pages is enabled: Settings > Pages > Source: GitHub Actions
- HTML must be in root or `/docs` directory (we use root)
- `.nojekyll` file prevents Jekyll processing issues

## Development Workflow

1. **Local changes**: Edit source files
2. **Generate**: Run `node generate-claude-cheatsheet.js`
3. **Test**: Run `./serve.sh` and check http://localhost:8000
4. **Commit**: Standard git workflow
5. **Deploy**: Push to main triggers auto-deployment

## Web Interface Features

The `index.html` provides:
- Markdown to HTML conversion using `marked.js`
- YAML frontmatter extraction (stripped before rendering)
- Responsive design (mobile-friendly)
- Dark/light theme auto-detection
- "Back to top" button for navigation
- Syntax highlighting for code blocks
- GitHub Markdown CSS styling
