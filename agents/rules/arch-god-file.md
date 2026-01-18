---
title: God File Detected
category: architecture
impact: CRITICAL
impactDescription: Unmaintainable, untestable code
tags: architecture, solid, maintainability, coupling
---

## God File Detected

**Impact: CRITICAL (Unmaintainable, untestable code)**

A "God file" is an oversized file (>500 lines) that handles too many responsibilities. It violates the Single Responsibility Principle, making code hard to test, maintain, and understand.

**Incorrect (everything in one file):**

```typescript
// utils/helpers.ts - 1200 lines
export function formatDate() { /* ... */ }
export function validateEmail() { /* ... */ }
export function calculateTax() { /* ... */ }
export function parseResponse() { /* ... */ }
export function debounce() { /* ... */ }
export function logger() { /* ... */ }
// ... 50 more unrelated functions
```

**Correct (split by responsibility):**

```typescript
// utils/date.ts
export function formatDate() { /* ... */ }
export function parseDate() { /* ... */ }

// utils/validation.ts
export function validateEmail() { /* ... */ }
export function validatePhone() { /* ... */ }

// utils/finance.ts
export function calculateTax() { /* ... */ }
export function formatCurrency() { /* ... */ }

// utils/api.ts
export function parseResponse() { /* ... */ }
export function handleError() { /* ... */ }

// utils/index.ts - re-exports
export * from './date'
export * from './validation'
export * from './finance'
export * from './api'
```

**Detection:**

```bash
# Find files over 500 lines
find src/ -name "*.ts" -exec wc -l {} + | sort -rn | head -10

# Find files with many exports
grep -l "export" src/**/*.ts | xargs -I {} sh -c 'echo "$(grep -c "export" {}) {}"' | sort -rn | head -10

# Find files with many imports
grep -l "import" src/**/*.ts | xargs -I {} sh -c 'echo "$(grep -c "import" {}) {}"' | sort -rn | head -10
```

**Thresholds:**
| Metric | Warning | Critical |
|--------|---------|----------|
| Lines | >300 | >500 |
| Functions | >15 | >25 |
| Exports | >10 | >20 |
| Imports | >15 | >25 |

**Remediation:**
1. Identify distinct responsibilities in the file
2. Create separate modules for each responsibility
3. Use a barrel file (index.ts) to maintain backward compatibility
4. Update imports across the codebase
5. Add tests for each new module

**References:**
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Clean Code - Functions](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
