# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Woodman cheatheet** is a unified documentation hub that combines multiple AI development resources into a single tabbed interface. The project generates 4 comprehensive reference documents and deploys them as an interactive GitHub Pages site.

### Four Documentation Modules

1. **woodman.md** - Référence Claude Code & Speckit (official documentation)
2. **boris-bible.md** - Patterns pratiques Boris Cherny (creator's best practices)
3. **agents-software.md** - Agents développement logiciel (AI agents catalog)
4. **agents-vps.md** - Agents gestion infrastructure (VPS automation)

### Live Deployment

**GitHub Pages**: https://izo.github.io/Woodman/

## Core Architecture

### Unified Documentation Generation Pipeline

```
generate-unified-docs.js (v2.0.0)
    ↓
Loads configuration from data/:
  ├─ sources.json (official + internal sources)
  ├─ patterns.json (13 Boris patterns)
  └─ agents.json (software + vps agents metadata)
    ↓
Generates 4 markdown files:
  ├─ woodman.md (Claude Code + Speckit reference)
  ├─ boris-bible.md (13 practical patterns)
  ├─ agents-software.md (core, analyzers, deploy, test agents)
  └─ agents-vps.md (00-16 infrastructure agents)
    ↓
index.html renders with tabs:
  ├─ Tab navigation (📚 Référence, 💡 Pratiques, 🤖 Software, 🖥️ VPS)
  ├─ marked.js for markdown → HTML
  ├─ DOMPurify for XSS protection
  └─ Nord theme (dark/light auto-detection)
```

### Data Configuration System

**data/sources.json**:
- `officialSources`: awesomeclaude.ai, GitHub Spec Kit, Claude Code
- `internalSources`: Boris Bible, Agents Software, Agents VPS

**data/patterns.json**:
- 13 patterns from Boris Cherny (parallel sessions, Plan mode, slash commands, etc.)
- Each pattern includes: id, title, description, category, implementation
- Optional: relatedAgents (cross-references to agents/)

**data/agents.json**:
- `software.core`: 01-09 core development agents
- `software.analyzers`: 10-* stack-specific analysis (Astro, Next, Nuxt, SPIP, SwiftUI)
- `software.deploy`: 11-* deployment automation (Vercel, Netlify, Cloudflare, Docker, AWS)
- `software.testing`: 12-* test automation (unit, E2E)
- `vps.core`: 00-16 infrastructure management agents

### GitHub Actions Workflow

**Triggers:**
- Push to `main` branch
- Manual dispatch via Actions tab
- Weekly schedule (Sunday midnight) for automatic updates

**Pipeline:**
1. Checkout repository
2. Setup Node.js 18
3. Run `generate-unified-docs.js` to generate 4 markdown files
4. Existing `index.html` renders tabs dynamically
5. Deploy to GitHub Pages

**Note**: GitHub Actions workflow may need updating to reference new generator script.

## Essential Commands

### Generate All Documentation
```bash
node generate-unified-docs.js
```
This creates/updates all 4 markdown files from configuration data.

### Test Locally
```bash
./serve.sh [port]
# Default port: 8000
# Opens local server at http://localhost:{port}
```
The script automatically:
1. Runs `generate-unified-docs.js`
2. Starts HTTP server
3. Opens tabbed interface at http://localhost:{port}

### Navigate Documentation
```
http://localhost:8000/#reference       → woodman.md
http://localhost:8000/#boris           → boris-bible.md
http://localhost:8000/#agents-software → agents-software.md
http://localhost:8000/#agents-vps      → agents-vps.md
```

### Deploy to GitHub Pages
```bash
# Automatic on push to main
git add .
git commit -m "Update documentation"
git push origin main

# Manual trigger
gh workflow run deploy.yml
```

## File Structure & Responsibilities

### Generated Files (Never Edit Manually)
- `woodman.md` - Always regenerate using generator
- `boris-bible.md` - Always regenerate using generator
- `agents-software.md` - Always regenerate using generator
- `agents-vps.md` - Always regenerate using generator

### Source Files (Edit These)

**Core Generator**:
- `generate-unified-docs.js` - Unified documentation generator (v2.0.0)
  - Reads from `data/*.json` configuration
  - Generates 4 markdown files with YAML frontmatter
  - Cross-references between documents (e.g., Boris patterns → related agents)

**Configuration Data**:
- `data/sources.json` - Official + internal documentation sources
- `data/patterns.json` - 13 Boris Cherny patterns with metadata
- `data/agents.json` - Complete agents catalog (software + vps)

**Web Interface**:
- `index.html` - Tabbed navigation interface
  - 4 tabs: Référence, Pratiques, Agents Software, Agents VPS
  - Dynamic content loading via fetch()
  - DOMPurify sanitization for XSS protection
  - URL hash routing (#reference, #boris, #agents-software, #agents-vps)
  - Nord theme (auto dark/light mode)
  - IBM Plex fonts
  - Mobile responsive

**Utilities**:
- `serve.sh` - Local development server script
- `.github/workflows/deploy.yml` - CI/CD configuration

## Version Management

Version is managed centrally:
1. `generate-unified-docs.js` - Line 27: `const VERSION = "2.0.0"`
2. All 4 generated markdown files inherit this version automatically
3. `README.md` - Update badge manually when version changes

**Current Version**: 2.0.0

## Adding Content

### Adding New Boris Patterns

Edit `data/patterns.json`:
```json
{
  "id": 14,
  "title": "New Pattern Name",
  "description": "Brief description",
  "category": "productivity|workflow|automation|security|integration|quality",
  "implementation": "How to implement this pattern",
  "example": "Optional code example",
  "relatedAgents": ["agents/01-spec-writer", "agents/04-task-runner"]
}
```

Then regenerate: `node generate-unified-docs.js`

### Adding New Agents

Edit `data/agents.json`:

**For software agents**:
```json
{
  "id": "XX",
  "name": "agent-name",
  "description": "What this agent does",
  "model": "opus|sonnet",
  "file": "../agents/XX-agent-name.md",
  "useCases": ["Use case 1", "Use case 2"]
}
```

**For VPS agents**:
```json
{
  "id": "17",
  "name": "new-vps-agent",
  "description": "What this VPS agent does",
  "model": "opus|sonnet",
  "file": "../agents-vps/17-new-agent.md",
  "useCases": ["Use case 1", "Use case 2"]
}
```

Then regenerate: `node generate-unified-docs.js`

### Adding New Documentation Sources

Edit `data/sources.json`:
```json
{
  "name": "Source Name",
  "url": "https://example.com",
  "description": "Brief description",
  "maintainer": "Maintainer Name"
}
```

If this requires template changes, edit `generate-unified-docs.js` directly.

## Web Interface Features

### Tab Navigation System
- **4 tabs**: Reference, Pratiques, Agents Software, Agents VPS
- **Dynamic loading**: Content fetched on-demand via fetch()
- **URL routing**: Hash-based navigation (#reference, #boris, etc.)
- **Browser history**: Back/forward buttons work correctly
- **Lazy loading**: Only active tab content is rendered

### Security
- **DOMPurify**: All markdown → HTML conversion is sanitized
- **XSS Protection**: No untrusted content can execute scripts
- **CORS**: Local fetch() works in development and production

### Theme System
- **Nord theme**: Professional dark/light color scheme
- **Auto-detection**: Follows system preference (prefers-color-scheme)
- **CSS variables**: Easy customization via :root
- **Mobile-first**: Responsive breakpoints at 767px

### Accessibility
- **Semantic HTML**: Proper use of header, nav, article, section
- **Keyboard navigation**: Tab through tabs, Enter to activate
- **ARIA attributes**: (could be improved - future enhancement)
- **Back to top button**: Appears after scrolling 300px

## Development Workflow

### Standard Update Cycle

1. **Edit configuration**: Modify `data/*.json` as needed
2. **Generate docs**: Run `node generate-unified-docs.js`
3. **Test locally**: Run `./serve.sh 8000`
4. **Verify all tabs**: Click through all 4 tabs
5. **Check console**: No errors in browser console
6. **Commit changes**: Standard git workflow
7. **Push to main**: Triggers auto-deployment

### When Modifying Generator

1. **Edit generate-unified-docs.js**: Modify templates or logic
2. **Test generation**: `node generate-unified-docs.js`
3. **Verify all 4 files**: Check woodman.md, boris-bible.md, etc.
4. **Ensure valid YAML**: Frontmatter must be valid
5. **Check cross-references**: Links between docs work correctly
6. **Test locally**: `./serve.sh 8000`
7. **Commit and push**

### When Modifying Web Interface

1. **Edit index.html**: Modify tabs, styles, or scripts
2. **Test locally**: `./serve.sh 8000`
3. **Test all tabs**: Ensure all 4 tabs load correctly
4. **Test dark/light mode**: Toggle system preference
5. **Test mobile**: Resize browser or use device
6. **Check console**: No JavaScript errors
7. **Commit and push**

## Important Notes

### Boris Bible Integration
- Boris Bible folder renamed from `Boris Bible/` to `boris-bible/` (removed spaces for CLI compatibility)
- Patterns extracted to `data/patterns.json` for programmatic access
- Original markdown file preserved at `../boris-bible/Boris Bible.md`
- Screenshots referenced from `../boris-bible/Boris Bible[1-12].jpeg`

### Agents Integration
- Agents metadata extracted to `data/agents.json`
- Full agent definitions remain in `../agents/*.md` and `../agents-vps/*.md`
- Cross-references between Boris patterns and agents (e.g., pattern 6 → spec-writer, todo-generator)
- Links relative to GitHub Pages base URL

### GitHub Pages Deployment
- Requires Pages enabled: Settings > Pages > Source: GitHub Actions
- `.nojekyll` file is critical - prevents Jekyll from ignoring files with underscores
- Deployment happens automatically on push to main
- Weekly auto-refresh (Sunday midnight UTC) ensures documentation stays current
- Files deployed from repository root (not from cheatheet/)

### Known Constraints
- **No package.json**: Intentional design decision to keep dependency-free
- **Data-driven**: All content comes from JSON configs - easy to maintain
- **4 documents only**: Adding a 5th document requires code changes
- **No search**: Future enhancement - could add lunr.js or similar

## Troubleshooting

### Documentation not updating on GitHub Pages
- Check Actions tab for deployment logs
- Verify workflow permissions (contents: read, pages: write)
- Ensure all 4 markdown files are being generated
- Check workflow references `generate-unified-docs.js` (not old script)

### Generator script fails
- Check Node.js version (requires >= 14.0.0)
- Verify JSON files in data/ are valid (use `jq` or JSON validator)
- Check that agent files referenced in agents.json actually exist
- Ensure Boris Bible folder is named `boris-bible` (no spaces)

### Local server not working
- Ensure serve.sh has execute permissions: `chmod +x serve.sh`
- Try manual server: `python3 -m http.server 8000`
- Ensure you're running from cheatheet/ directory
- Check that all 4 markdown files exist

### Tab navigation broken
- Open browser console and check for JavaScript errors
- Verify all 4 markdown files exist in cheatheet/
- Check DOMPurify is loading from CDN
- Test with simple HTTP server (not file:// protocol)

### Cross-references not working
- Check relative paths in generated markdown files
- Verify links use correct format: `[text](filename.html#anchor)`
- Test locally before deploying
- GitHub Pages may cache old versions - wait or force refresh

## Future Enhancements

Potential improvements for future versions:

- **Search functionality**: Add lunr.js for client-side search across all 4 docs
- **Table of Contents**: Auto-generate TOC for each document
- **Print stylesheet**: Optimize for PDF generation
- **ARIA improvements**: Better accessibility for screen readers
- **Offline support**: Service worker for PWA functionality
- **Analytics**: Track which tabs are most viewed
- **Versioning**: Support multiple documentation versions (2.0, 2.1, etc.)
- **Dark mode toggle**: Manual override for system preference

