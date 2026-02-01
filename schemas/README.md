# Ulk JSON Schemas

JSON Schema definitions for cross-platform data exchange between JavaScript and Swift packages.

## Purpose

These schemas serve as the **contract** between:
- `@ulk/core` (TypeScript)
- `@ulk/status-board` (Node.js)
- `@ulk/vscode` (TypeScript)
- `@ulk/nova` (JavaScript)
- `UlkKit` (Swift - iOS/macOS)

## Schemas

| Schema | Description |
|--------|-------------|
| `todo.schema.json` | Individual todo item |
| `todo-file.schema.json` | Parsed todo.md file with todos array |
| `spec.schema.json` | Parsed spec.md file with sections |
| `project.schema.json` | Project with repository, stats, health |
| `dashboard.schema.json` | Full dashboard with projects and summary |

## Usage

### TypeScript/JavaScript

The `@ulk/core` package exports TypeScript types that match these schemas:

```typescript
import type { Todo, Project, Dashboard } from '@ulk/core';
```

### Swift

Generate Swift types from schemas using tools like:
- [quicktype](https://quicktype.io/)
- [SwiftJSONSchema](https://github.com/mattpolzin/SwiftJSONSchema)

```bash
# Generate Swift types
quicktype -s schema -o Models.swift schemas/*.json
```

Example Swift model (manually maintained in UlkKit):

```swift
struct Todo: Codable {
    let id: String
    let title: String
    let priority: Priority
    let status: Status
    let tags: [String]?

    enum Priority: String, Codable {
        case critical, high, medium, low
    }

    enum Status: String, Codable {
        case pending, inProgress = "in_progress", done, blocked
    }
}
```

## Validation

Validate JSON against schemas:

```bash
# Using ajv-cli
npx ajv validate -s schemas/dashboard.schema.json -d data/dashboard.json
```

## Schema Versioning

Schemas follow semantic versioning via the `version` field in the root objects. Breaking changes require major version bump.

Current version: `1.0.0`
