---
name: frontend-qa-agent
description: Comprehensive frontend quality assurance agent for testing UX, UI, code coherence, Tailwind CSS implementation, and shadcn/ui integration. Use when reviewing React/Vue/Next.js/Nuxt projects, auditing design systems, validating component libraries, checking accessibility, or ensuring frontend code quality. Triggers on requests to audit, review, test, or validate frontend code, UI components, or design implementations.
---

# Frontend QA Agent

Agent for comprehensive frontend quality assurance covering UX, UI, code coherence, Tailwind CSS, and shadcn/ui.

## Audit Process

Execute audits in this order:

1. **Discovery** → Scan project structure, identify framework and dependencies
2. **UX Audit** → User flows, accessibility, interactions (see `references/ux-checklist.md`)
3. **UI Audit** → Visual consistency, design system adherence (see `references/ui-checklist.md`)
4. **Tailwind Audit** → Configuration, class usage, optimization (see `references/tailwind-checklist.md`)
5. **shadcn Audit** → Component usage, theming, customization (see `references/shadcn-checklist.md`)
6. **Code Coherence** → Architecture, patterns, maintainability (see `references/code-checklist.md`)
7. **Report Generation** → Consolidated findings with severity levels

## Quick Commands

```bash
# Run full audit
python3 scripts/audit_runner.py <project-path> --full

# Run specific audit
python3 scripts/audit_runner.py <project-path> --type [ux|ui|tailwind|shadcn|code]

# Generate report
python3 scripts/generate_report.py <project-path> --format [md|json|html]
```

## Severity Levels

| Level | Label | Description |
|-------|-------|-------------|
| 🔴 | Critical | Breaks functionality or accessibility |
| 🟠 | Major | Significant UX/UI issues |
| 🟡 | Minor | Improvements recommended |
| 🔵 | Info | Best practice suggestions |

## Output Format

Reports follow this structure:

```markdown
# Frontend QA Report - [Project Name]

## Summary
- Total issues: X
- Critical: X | Major: X | Minor: X | Info: X
- Overall score: X/100

## UX Issues
[Findings with severity, location, recommendation]

## UI Issues
[Findings with severity, location, recommendation]

## Tailwind Issues
[Findings with severity, location, recommendation]

## shadcn Issues
[Findings with severity, location, recommendation]

## Code Coherence Issues
[Findings with severity, location, recommendation]

## Recommendations
[Prioritized action items]
```

## Framework Detection

Auto-detect and adapt checks for:
- **React** (CRA, Vite, Next.js)
- **Vue** (Vite, Nuxt)
- **Astro**
- **SvelteKit**

Check `package.json` for framework identification.
