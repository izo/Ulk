# Code Coherence Checklist

## Table of Contents
1. [Architecture & Structure](#architecture--structure)
2. [Component Patterns](#component-patterns)
3. [State Management](#state-management)
4. [Naming Conventions](#naming-conventions)
5. [TypeScript Quality](#typescript-quality)
6. [File Organization](#file-organization)
7. [Code Smells](#code-smells)
8. [Framework-Specific Checks](#framework-specific-checks)

---

## Architecture & Structure

### Critical 🔴
- [ ] Clear separation of concerns (UI, logic, data)
- [ ] No circular dependencies
- [ ] Entry points clearly defined
- [ ] Build/bundle succeeds without errors

### Major 🟠
- [ ] Feature/domain-based folder structure (not type-based)
- [ ] Shared code properly abstracted
- [ ] API layer separated from UI components
- [ ] Environment configuration handled correctly

**Folder Structure Patterns:**

```
# Good: Feature-based
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types.ts
│   └── dashboard/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── app/ (or pages/)

# Avoid: Type-based at scale
src/
├── components/ (100+ files mixed)
├── hooks/
├── utils/
└── types/
```

### Minor 🟡
- [ ] Index files for clean exports
- [ ] Barrel exports don't cause bundle bloat
- [ ] Test files co-located or in separate `__tests__`
- [ ] Assets organized logically

---

## Component Patterns

### Critical 🔴
- [ ] Components have single responsibility
- [ ] Props interface clearly defined
- [ ] No prop drilling beyond 2-3 levels
- [ ] Keys provided for list rendering

### Major 🟠
- [ ] Consistent component structure (imports → types → component → exports)
- [ ] Controlled components for forms
- [ ] Error boundaries around risky components
- [ ] Memoization used appropriately (not everywhere)

**Component Template:**
```tsx
// 1. Imports
import { useState } from 'react'
import { cn } from '@/lib/utils'

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
}

// 3. Component
export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  // hooks
  // derived state
  // handlers
  // render
  return (...)
}

// 4. Sub-components (if any)
Button.Icon = function ButtonIcon() {...}
```

### Minor 🟡
- [ ] Default props handled in destructuring
- [ ] Children prop typed correctly
- [ ] forwardRef used when wrapping native elements
- [ ] displayName set for debugging

---

## State Management

### Critical 🔴
- [ ] No unnecessary global state
- [ ] Server state separated from UI state
- [ ] No state duplication
- [ ] State updates are immutable

### Major 🟠
- [ ] Appropriate tool for the job (useState, useReducer, context, external)
- [ ] Data fetching uses proper patterns (React Query, SWR, etc.)
- [ ] Loading/error states handled
- [ ] Optimistic updates where appropriate

**State Location Guide:**
```
Local state (useState)    → Component-specific UI state
Context                   → Theme, auth, low-frequency cross-cutting
React Query/SWR          → Server state (API data)
Zustand/Jotai            → Complex client state
URL state                → Shareable/bookmarkable state
```

### Minor 🟡
- [ ] Selectors prevent unnecessary re-renders
- [ ] State normalized for collections
- [ ] Derived state computed (not stored)

---

## Naming Conventions

### Critical 🔴
- [ ] Components use PascalCase
- [ ] Hooks prefixed with `use`
- [ ] Files match export names
- [ ] No single-letter variable names (except i, j in loops)

### Major 🟠
- [ ] Consistent naming across codebase
- [ ] Boolean props prefixed with `is`, `has`, `should`
- [ ] Event handlers prefixed with `handle` or `on`
- [ ] Types/interfaces use PascalCase

**Naming Patterns:**
```tsx
// Components
UserProfile.tsx → export function UserProfile
user-profile.tsx → export function UserProfile // also acceptable

// Hooks
useAuth.ts → export function useAuth()

// Utils
formatDate.ts → export function formatDate()

// Types
types.ts → export interface User, export type UserRole

// Constants
constants.ts → export const MAX_ITEMS = 10

// Event handlers
const handleClick = () => {}
const handleSubmit = () => {}
```

### Minor 🟡
- [ ] Abbreviations consistent and clear
- [ ] No Hungarian notation
- [ ] Plurals for collections

---

## TypeScript Quality

### Critical 🔴
- [ ] No `any` types (use `unknown` if needed)
- [ ] Strict mode enabled
- [ ] No `@ts-ignore` without explanation
- [ ] Props properly typed

### Major 🟠
- [ ] Discriminated unions for variants
- [ ] Generic types where reusable
- [ ] API responses typed
- [ ] Enum alternatives (const objects) where appropriate

**Type Patterns:**
```tsx
// Good: Discriminated union
type Result<T> = 
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error }

// Good: Const object over enum
const Status = {
  Active: 'active',
  Inactive: 'inactive',
} as const
type Status = typeof Status[keyof typeof Status]

// Good: Utility types
type PartialUser = Partial<User>
type UserKeys = keyof User
type ReadonlyUser = Readonly<User>
```

### Minor 🟡
- [ ] JSDoc comments for complex types
- [ ] Type inference used (don't over-annotate)
- [ ] Import type for type-only imports

---

## File Organization

### Critical 🔴
- [ ] No file exceeds 300-400 lines (split if larger)
- [ ] One component per file (main export)
- [ ] Imports organized (external → internal → relative)
- [ ] No dead code (unused imports, functions)

### Major 🟠
- [ ] Consistent file naming (kebab-case or PascalCase)
- [ ] Related files grouped together
- [ ] Config files at project root
- [ ] Types co-located or in dedicated files

**Import Order:**
```tsx
// 1. React/Framework
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// 2. External libraries
import { format } from 'date-fns'
import { z } from 'zod'

// 3. Internal absolute imports
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

// 4. Relative imports
import { UserAvatar } from './UserAvatar'
import type { UserProps } from './types'
```

### Minor 🟡
- [ ] Barrel exports used judiciously
- [ ] Test files follow naming convention
- [ ] Style files (if any) co-located

---

## Code Smells

### Flag These Issues 🔴

**Giant Components:**
```tsx
// Bad: 500+ line component
function Dashboard() {
  // 50+ useState calls
  // 20+ useEffect calls
  // Inline everything
}
```

**Prop Drilling:**
```tsx
// Bad: Passing through 4+ layers
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <UserMenu user={user}>
        <Avatar user={user} />
```

**useEffect Abuse:**
```tsx
// Bad: Effect to sync derived state
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [fullName, setFullName] = useState('')

useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// Good: Derive directly
const fullName = `${firstName} ${lastName}`
```

**Implicit Dependencies:**
```tsx
// Bad: Magic strings
const apiUrl = '/api/users'
fetch(`${apiUrl}/${userId}`)

// Good: Constants/config
import { API_ROUTES } from '@/config/routes'
fetch(API_ROUTES.users.byId(userId))
```

---

## Framework-Specific Checks

### Next.js
- [ ] App Router patterns followed (if using)
- [ ] Server Components default, Client Components marked
- [ ] `use client` directive used sparingly
- [ ] Metadata/SEO properly configured
- [ ] Route handlers in correct locations

### Nuxt
- [ ] Auto-imports working correctly
- [ ] `useFetch`/`useAsyncData` used appropriately
- [ ] Composables in `/composables`
- [ ] Server routes in `/server`
- [ ] Proper `<ClientOnly>` usage

### React (Vite/CRA)
- [ ] Vite config optimized
- [ ] Environment variables prefixed correctly
- [ ] React Router setup correct (if using)

### Astro
- [ ] Islands architecture followed
- [ ] `client:*` directives used correctly
- [ ] Content collections typed
- [ ] SSR/SSG appropriate per page

### Vue/Nuxt
- [ ] Composition API used consistently
- [ ] `<script setup>` preferred
- [ ] Pinia for state management
- [ ] Props with proper validation
