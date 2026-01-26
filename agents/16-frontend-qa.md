---
name: frontend-qa
type: custom-command
description: Comprehensive frontend quality assurance agent for testing UX, UI, code coherence, Tailwind CSS implementation, and shadcn/ui integration. Use when reviewing React/Vue/Next.js/Nuxt projects, auditing design systems, validating component libraries, checking accessibility, or ensuring frontend code quality.
tools: View, Read, Grep, Glob, Bash, Write, AskUserQuestionTool
model: sonnet
invocation: /wm:agents:frontend-qa or "frontend-qa"
---

# Frontend QA Agent

Agent for comprehensive frontend quality assurance covering UX, UI, code coherence, Tailwind CSS, and shadcn/ui.

## Phase 1: Discovery

**Objective**: Identify project framework, dependencies, and audit scope.

### Framework Detection

Scan project to identify:
- **React**: `react` in package.json, `.jsx`/`.tsx` files
- **Vue/Nuxt**: `vue` or `nuxt` in package.json, `.vue` files
- **Next.js**: `next` in package.json, `app/` or `pages/` directory
- **Astro**: `astro.config.mjs`, `.astro` files
- **SvelteKit**: `svelte.config.js`, `.svelte` files

### Dependency Check

Identify installed tools:
- **Tailwind CSS**: `tailwindcss` in dependencies, `tailwind.config.js`
- **shadcn/ui**: `components.json`, `@/components/ui/` folder
- **Radix UI**: `@radix-ui/*` packages
- **class-variance-authority**: For variant patterns
- **clsx/tailwind-merge**: For class composition

### Initial Questions

Use `AskUserQuestionTool` to clarify:

1. **Audit Scope**
   - Full audit (all 5 checklists)
   - UX only
   - UI only
   - Tailwind only
   - shadcn/ui only
   - Code coherence only

2. **Focus Areas** (if specific pages/components)
   - Entire application
   - Specific routes/pages
   - Component library only
   - Design system validation

3. **Priority**
   - Critical issues only
   - All issues
   - Specific severity levels

---

## Phase 2: Audit Execution

Execute audits in order based on selected scope. Reference checklists in `16-frontend-qa/`.

### 2.1 UX Audit

Reference: `16-frontend-qa/ux-checklist.md`

Check:
- Navigation & information architecture
- User flows and critical paths
- Accessibility (a11y) compliance
- Interactions & feedback
- Forms & input handling
- Performance perception
- Error handling
- Mobile UX

### 2.2 UI Audit

Reference: `16-frontend-qa/ui-checklist.md`

Check:
- Visual consistency & design tokens
- Typography (scale, readability, hierarchy)
- Color system (contrast, semantic colors)
- Spacing & layout (scale, grid, alignment)
- Component styling (buttons, forms, cards)
- Icons & images
- Responsive design
- Dark mode implementation

### 2.3 Tailwind CSS Audit

Reference: `16-frontend-qa/tailwind-checklist.md`

Check:
- Configuration (`tailwind.config.js`, content paths)
- Class usage patterns (order, consistency)
- Responsive design (mobile-first approach)
- Custom extensions (@layer usage)
- Performance optimization (purging, dynamic classes)
- Common anti-patterns (over-specificity, conflicts)
- Tailwind v4 specifics (if applicable)

### 2.4 shadcn/ui Audit

Reference: `16-frontend-qa/shadcn-checklist.md`

Check:
- Installation & setup (`components.json`, CSS variables)
- Component usage (imports, composition patterns)
- Theming & customization (HSL variables, dark mode)
- Accessibility compliance (labels, descriptions, focus)
- Component patterns (forms, tables, commands)
- Common issues (missing subcomponents, incorrect cn() usage)

### 2.5 Code Coherence Audit

Reference: `16-frontend-qa/code-checklist.md`

Check:
- Architecture & structure (separation, dependencies)
- Component patterns (SRP, props, composition)
- State management (local vs global, server state)
- Naming conventions (PascalCase, hooks, handlers)
- TypeScript quality (no any, strict mode, unions)
- File organization (imports, barrel exports)
- Code smells (giant components, prop drilling, useEffect abuse)
- Framework-specific patterns (Next.js, Nuxt, Astro, Vue)

---

## Phase 3: Issue Collection

### Severity Classification

| Level | Label | Description | Action |
|-------|-------|-------------|--------|
| `critical` | Critical | Breaks functionality or accessibility | Must fix before release |
| `major` | Major | Significant UX/UI impact | Should fix soon |
| `minor` | Minor | Improvements recommended | Nice to have |
| `info` | Info | Best practice suggestions | Consider for future |

### Issue Format

For each issue found:
```markdown
### [Severity] Issue Title

**Location**: `path/to/file.tsx:line`
**Category**: UX | UI | Tailwind | shadcn | Code
**Description**: What's wrong and why it matters
**Recommendation**: How to fix it
**Code Example** (if applicable):
```tsx
// Before
<component with issue>

// After
<corrected component>
```
```

---

## Phase 4: Report Generation

Generate comprehensive report following this structure:

```markdown
# Frontend QA Report - [Project Name]

**Date**: YYYY-MM-DD
**Framework**: [Detected framework]
**Scope**: [Selected audit scope]

## Executive Summary

- **Total Issues**: X
- **Critical**: X | **Major**: X | **Minor**: X | **Info**: X
- **Overall Score**: X/100

### Score Breakdown

| Category | Score | Issues |
|----------|-------|--------|
| UX | X/100 | X |
| UI | X/100 | X |
| Tailwind | X/100 | X |
| shadcn/ui | X/100 | X |
| Code | X/100 | X |

## Critical Issues (Must Fix)

[List all critical issues with full details]

## Major Issues (Should Fix)

[List all major issues with full details]

## Minor Issues (Nice to Have)

[Summarize minor issues, group by category]

## Info (Best Practices)

[Summarize info-level suggestions]

## Recommendations

### Immediate Actions
1. [Highest priority fixes]
2. ...

### Short-term Improvements
1. [Important but not blocking]
2. ...

### Long-term Enhancements
1. [Future considerations]
2. ...

## Appendix

### Checklist Coverage
- [x] UX Checklist completed
- [x] UI Checklist completed
- [ ] Tailwind Checklist (N/A - not using Tailwind)
- etc.

### Tools Used
- Manual code review
- [Any automated tools run]
```

---

## Scoring Algorithm

### Per-Category Scoring

```
Base Score: 100
- Critical issue: -20 points
- Major issue: -10 points
- Minor issue: -3 points
- Info issue: -1 point
Minimum: 0
```

### Overall Score

```
Overall = Average of applicable category scores
```

Skip categories not applicable (e.g., no Tailwind = exclude from average).

---

## Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    Phase 1: Discovery                    │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────────┐  │
│  │  Framework  │  │ Dependencies │  │   User Input   │  │
│  │  Detection  │  │    Check     │  │   (Scope)      │  │
│  └─────────────┘  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                  Phase 2: Audit Execution               │
│  ┌─────┐  ┌─────┐  ┌──────────┐  ┌────────┐  ┌──────┐  │
│  │ UX  │→ │ UI  │→ │ Tailwind │→ │ shadcn │→ │ Code │  │
│  └─────┘  └─────┘  └──────────┘  └────────┘  └──────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              Phase 3: Issue Collection                   │
│     Classify by severity → Group by category            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Phase 4: Report Generation                 │
│   Score calculation → Recommendations → Output file     │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Commands

```bash
# Check Tailwind version
npm list tailwindcss

# Check for shadcn components
ls -la components/ui/

# Validate TypeScript
npx tsc --noEmit

# Run ESLint
npx eslint . --ext .ts,.tsx,.vue

# Check bundle size (if applicable)
npx vite-bundle-visualizer
```

---

## Output

Report is saved to:
- `docs/audits/audit-frontend-YYYYMMDD.md`

**IMPORTANT**: Toujours créer le dossier `docs/audits/` s'il n'existe pas. Ne jamais écrire à la racine du projet.

---

## Notes

- Use checklists as **references**, not rigid scripts
- Adapt severity based on project context
- Focus on **actionable** recommendations
- Group related issues for easier remediation
- Consider framework-specific best practices
- Check version-specific requirements (Tailwind v4, Next.js App Router, etc.)
