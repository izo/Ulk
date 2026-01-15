# Frontend QA Checklists

Reference checklists for the Frontend QA Agent (`16-frontend-qa.md`).

## Checklists Overview

| Checklist | File | Focus |
|-----------|------|-------|
| **UX** | `ux-checklist.md` | Navigation, user flows, accessibility, interactions, forms, mobile |
| **UI** | `ui-checklist.md` | Visual consistency, typography, colors, spacing, components, dark mode |
| **Tailwind** | `tailwind-checklist.md` | Configuration, class patterns, responsive, performance, v4 specifics |
| **shadcn/ui** | `shadcn-checklist.md` | Setup, component usage, theming, accessibility, patterns |
| **Code** | `code-checklist.md` | Architecture, components, state, naming, TypeScript, file organization |

## Severity Levels

All checklists use consistent severity markers:

| Emoji | Level | Impact |
|-------|-------|--------|
| `Critical` | Must fix | Breaks functionality or accessibility |
| `Major` | Should fix | Significant UX/UI issues |
| `Minor` | Nice to have | Improvements recommended |
| `Info` | Consider | Best practice suggestions |

## Usage

These checklists are **reference documents** for the Frontend QA Agent. They provide structured criteria for evaluating frontend code quality.

The agent uses these checklists during Phase 2 (Audit Execution) to systematically evaluate:
1. User experience quality
2. Visual design consistency
3. Tailwind CSS implementation
4. shadcn/ui integration
5. Code architecture and patterns

## Framework Coverage

Checklists include framework-specific sections for:
- **React** (CRA, Vite, Next.js)
- **Vue** (Vite, Nuxt)
- **Astro**
- **SvelteKit**

## Quick Reference

### Critical Items (Always Check)

**UX**:
- Navigation visible and accessible
- Skip links for screen readers
- Primary user journey works without errors
- All images have alt text

**UI**:
- Design tokens used consistently
- Contrast ratio ≥ 4.5:1 (text)
- Font files load correctly
- Layout works at common breakpoints

**Tailwind**:
- Content paths configured correctly
- No conflicting classes
- Mobile-first responsive approach
- Production build purges unused CSS

**shadcn/ui**:
- `components.json` configured
- CSS variables defined for light/dark
- Form components have labels
- Dialog/Modal have descriptions

**Code**:
- Clear separation of concerns
- No circular dependencies
- Components have single responsibility
- No `any` types in TypeScript
