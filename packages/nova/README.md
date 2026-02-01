# @ulk/nova

Nova extension for Ulk Status Board.

## Status

**Planned** - Not yet implemented.

## Planned Features

- Sidebar panel showing project status
- Quick access to todos from current workspace
- Status indicator in toolbar
- Commands to refresh and open dashboard

## Development

Nova extensions use JavaScript/TypeScript.

```bash
cd packages/nova
npm install
npm run build
```

Link extension to Nova for development.

## Structure (planned)

```
nova/
├── extension.json        # Extension manifest
├── Scripts/
│   ├── main.js          # Extension entry point
│   ├── Sidebar.js       # Sidebar provider
│   └── Commands.js      # Command implementations
├── Images/              # Extension icons
└── README.md
```

## Resources

- [Nova Extension API](https://docs.nova.app/extensions/)
- [Nova Extension Examples](https://github.com/nova-extensions)
