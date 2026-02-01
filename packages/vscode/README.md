# @ulk/vscode

VS Code extension for Ulk Status Board.

## Status

**Planned** - Not yet implemented.

## Planned Features

- View project status directly in VS Code sidebar
- Quick access to todos from current workspace
- Status bar indicator showing project health
- Commands to refresh data and open dashboard

## Development

```bash
cd packages/vscode
npm install
npm run compile
```

Press F5 in VS Code to launch extension development host.

## Structure (planned)

```
vscode/
├── src/
│   ├── extension.ts      # Extension entry point
│   ├── sidebar.ts        # Sidebar webview provider
│   ├── statusBar.ts      # Status bar controller
│   └── commands.ts       # Command implementations
├── package.json          # Extension manifest
└── tsconfig.json
```
