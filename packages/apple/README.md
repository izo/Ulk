# UlkKit

Swift framework and apps for Ulk Status Board on Apple platforms.

## Status

**Planned** - Not yet implemented.

## Planned Components

### UlkKit (Shared Framework)

Core Swift library used by all Apple apps:

- `UlkClient` - API client for fetching dashboard data
- `UlkModels` - Swift types matching JSON schemas
- `UlkUI` - Shared SwiftUI components

### StatusBoard-iOS

iPhone/iPad app:

- Dashboard view with project cards
- Widget for home screen
- Push notifications for status changes

### StatusBoard-macOS

Mac app:

- Menu bar app with quick status view
- Native macOS dashboard window
- Keyboard shortcuts

## Structure (planned)

```
apple/
├── Package.swift              # Swift Package definition
├── UlkKit/
│   ├── Sources/
│   │   ├── Client/           # API client
│   │   ├── Models/           # Data models
│   │   └── UI/               # Shared SwiftUI views
│   └── Tests/
├── StatusBoard-iOS/
│   ├── StatusBoard.xcodeproj
│   └── StatusBoard/
│       ├── App.swift
│       ├── Views/
│       └── Widgets/
└── StatusBoard-macOS/
    ├── StatusBoard.xcodeproj
    └── StatusBoard/
        ├── App.swift
        ├── MenuBar/
        └── Views/
```

## Development

Requires Xcode 15+ and macOS 14+.

```bash
open Package.swift  # Open in Xcode
```

## Cross-Platform Data Contract

Uses JSON schemas from `/schemas/` to ensure compatibility with JS packages.
