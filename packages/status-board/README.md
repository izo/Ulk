# Status Board

Unified dashboard for Ulk-managed projects. Track todos, specs, and project health across all your repositories.

## Features

- Aggregate `todo.md` and `spec.md` from multiple GitHub repositories
- Visual health indicators (healthy, warning, critical)
- Progress tracking per project
- Static site generation for GitHub Pages
- Sync with external tools (coming soon: Notion, Linear, Things)

## Quick Start

```bash
# Install dependencies
cd packages/status-board
npm install

# Create config file
cp status-board.config.example.json status-board.config.json

# Edit config with your repos
# Set GITHUB_TOKEN env var for private repos

# Fetch and generate
npm run start all

# Start dev server
npm run serve
```

## Configuration

Create a `status-board.config.json` file:

```json
{
  "projects": [
    { "repo": "owner/repo-name" },
    { "repo": "owner/another-repo", "name": "Display Name" }
  ],
  "outputDir": "./public/data"
}
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub personal access token (required for private repos) |
| `GH_TOKEN` | Alternative token variable |

## CLI Commands

| Command | Description |
|---------|-------------|
| `status-board fetch` | Fetch project data from GitHub |
| `status-board generate` | Generate static files from cached data |
| `status-board serve [port]` | Start local development server |
| `status-board all` | Fetch + generate in one command |

## File Structure

```
status-board/
├── src/
│   ├── cli.ts       # CLI entry point
│   ├── config.ts    # Configuration loader
│   ├── fetch.ts     # GitHub data fetching
│   ├── generate.ts  # Static file generation
│   └── index.ts     # Package exports
├── public/
│   ├── index.html   # Dashboard UI
│   └── data/        # Generated JSON files
└── status-board.config.json
```

## Generated Files

| File | Description |
|------|-------------|
| `dashboard.json` | Full project data with todos and specs |
| `summary.json` | Lightweight summary for quick loads |
| `projects/*.json` | Individual project files |

## Deployment

The dashboard is a static site that can be deployed to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting

### GitHub Pages

```yaml
# .github/workflows/status-board.yml
name: Update Status Board

on:
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: |
          cd packages/status-board
          npm install
          npm run start all
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./packages/status-board/public
```

## Roadmap

- [ ] Notion sync (bidirectional)
- [ ] Linear sync
- [ ] Things 3 export (URL scheme)
- [ ] Apple Reminders (via Shortcuts)
- [ ] macOS menubar app
- [ ] iOS/iPadOS app

## Related Packages

- `@ulk/core` - Shared parser and types
- `@ulk/vscode` - VS Code extension (coming soon)
- `@ulk/nova` - Nova extension (coming soon)
