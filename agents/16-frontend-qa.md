---
name: frontend-qa
type: custom-command
description: |
  Agent QA frontend unifié avec 3 modes d'audit :
  - Mode complet (full) : UX, UI, Tailwind, shadcn, code coherence
  - Mode landing-page : Audit conversion landing pages (2025-2026 best practices)
  - Mode shadcn : Audit profond shadcn/ui (config, imports, theming, a11y)
  Génère des rapports détaillés avec scores et recommandations actionnables.
tools: View, Read, Grep, Glob, Bash, Write, AskUserQuestionTool, mcp__chrome-devtools__list_pages, mcp__chrome-devtools__new_page, mcp__chrome-devtools__select_page, mcp__chrome-devtools__navigate_page, mcp__chrome-devtools__take_snapshot, mcp__chrome-devtools__take_screenshot, mcp__chrome-devtools__resize_page, mcp__chrome-devtools__evaluate_script, mcp__chrome-devtools__list_console_messages, mcp__chrome-devtools__list_network_requests
model: sonnet
invocation: /ulk:agents:frontend-qa or "frontend-qa" or "audit frontend" or "audit landing" or "audit shadcn"
---

# Frontend QA Agent

Agent unifié pour l'audit qualité frontend avec 3 modes spécialisés.

## Modes disponibles

| Mode | Commande | Description |
|------|----------|-------------|
| **full** | `frontend-qa` | Audit complet : UX, UI, Tailwind, shadcn, code |
| **landing** | `audit landing` | Audit landing page (conversion, mobile, perf) |
| **shadcn** | `audit shadcn` | Audit profond shadcn/ui uniquement |

---

## Phase 1 : Discovery

### 1.1 - Détection du mode

Si l'utilisateur ne précise pas, demander via `AskUserQuestionTool` :

```
Quel type d'audit souhaitez-vous ?

1. **Full** - Audit complet frontend (UX, UI, Tailwind, shadcn, code)
2. **Landing** - Audit landing page (conversion, mobile, perf, 2025-2026 best practices)
3. **shadcn** - Audit profond shadcn/ui (config, imports, theming, a11y)
```

### 1.2 - Framework Detection

Scan project to identify:
- **React**: `react` in package.json, `.jsx`/`.tsx` files
- **Vue/Nuxt**: `vue` or `nuxt` in package.json, `.vue` files
- **Next.js**: `next` in package.json, `app/` or `pages/` directory
- **Astro**: `astro.config.mjs`, `.astro` files
- **SvelteKit**: `svelte.config.js`, `.svelte` files

### 1.3 - Dependency Check

Identify installed tools:
- **Tailwind CSS**: `tailwindcss` in dependencies, `tailwind.config.js`
- **shadcn/ui**: `components.json`, `@/components/ui/` folder
- **Radix UI**: `@radix-ui/*` packages
- **class-variance-authority**: For variant patterns
- **clsx/tailwind-merge**: For class composition

---

# MODE: FULL (Audit Complet)

## Phase 2 : Audit Execution

Execute audits in order. Each category scores out of 100.

### 2.1 UX Audit

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

Check:
- Configuration (`tailwind.config.js`, content paths)
- Class usage patterns (order, consistency)
- Responsive design (mobile-first approach)
- Custom extensions (@layer usage)
- Performance optimization (purging, dynamic classes)
- Common anti-patterns (over-specificity, conflicts)
- Tailwind v4 specifics (if applicable)

### 2.4 shadcn/ui Audit

Check:
- Installation & setup (`components.json`, CSS variables)
- Component usage (imports, composition patterns)
- Theming & customization (HSL variables, dark mode)
- Accessibility compliance (labels, descriptions, focus)
- Component patterns (forms, tables, commands)
- Common issues (missing subcomponents, incorrect cn() usage)

### 2.5 Code Coherence Audit

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

# MODE: LANDING (Landing Page Audit)

## Key Statistics (2025-2026)

- **Average conversion rate**: 6.6% (benchmark)
- **Top performers**: 10-20%
- **Mobile traffic**: 82.9% of landing page traffic
- **Load time impact**: -7% conversions per second delay
- **Form fields**: 1-5 fields doubles conversion vs 6+ fields
- **Single CTA**: 13.5% conversion vs multiple CTAs (10.5%)
- **Personalized CTAs**: +202% conversions
- **Video**: +86% conversions

## Landing Audit Framework (150 points)

### 1. Hero Section & First Impression (20 pts)
- Title/Headline (8 pts) - Clear value prop, < 10-15 words
- Visual Impact (7 pts) - Hero image/video, human faces (+73%)
- CTA Visibility (5 pts) - Above fold, contrasting colors

### 2. Value Proposition & Offer (15 pts)
- Clarity of Offer (8 pts) - Benefits > features, quantified
- Urgency/Scarcity (4 pts) - Time-limited, FOMO elements
- Unique Selling Points (3 pts) - Differentiation clear

### 3. Call-to-Action (20 pts)
- Primary CTA Quality (10 pts) - Single CTA (13.5% vs 10.5%)
- CTA Hierarchy (5 pts) - No competing distractions
- Button Design (5 pts) - 44x44px min, micro-interactions

### 4. Social Proof & Trust (15 pts)
- Customer Testimonials (5 pts) - Real names, photos, results
- Trust Indicators (5 pts) - Logos, ratings, numbers
- Authority Signals (5 pts) - Certs, awards, guarantees

### 5. Form Design (10 pts)
- Form Simplicity (5 pts) - Max 5 fields
- Form UX (5 pts) - Inline validation, two-step forms

### 6. Design & UX (10 pts)
- Visual Hierarchy (4 pts) - F/Z pattern, whitespace
- Layout Structure (3 pts) - No nav (doubles conversions)
- Brand Consistency (3 pts) - Colors, fonts, voice

### 7. Mobile Optimization (10 pts)
- Responsive Design (5 pts) - 82.9% traffic is mobile
- Mobile Performance (3 pts) - < 2-3s load
- Mobile UX (2 pts) - Thumb-friendly CTAs

### 8. Performance (10 pts)
- Page Speed (5 pts) - < 2s = 31.79% conversion
- Technical Quality (3 pts) - No console errors
- Image Optimization (2 pts) - WebP/AVIF, lazy loading

### 9. Content Quality (10 pts)
- Copy Effectiveness (5 pts) - Middle school reading level
- Content Length (3 pts) - < 100 words = 14.30%
- GEO Optimization (2 pts) - AI-ready structure

### 10. Interactive & Multimedia (10 pts)
- Video Content (5 pts) - +86% conversions
- Interactive Elements (5 pts) - Quiz, calculators, chat

### 11. Personalization (10 pts)
- Dynamic Content (5 pts) - Traffic source, geo
- AI Features (5 pts) - Personalized CTAs (+202%)

### 12. Privacy & Compliance (5 pts)
- GDPR/CCPA visible, cookie consent, AI disclosure

## Landing Workflow

1. Navigate to URL with Chrome DevTools
2. Take desktop screenshot (fullPage)
3. Analyze with `take_snapshot` (headings, CTAs, forms)
4. Extract metrics via `evaluate_script`
5. Resize to mobile (375x667), repeat analysis
6. Generate report with scores

---

# MODE: SHADCN (shadcn/ui Deep Audit)

## Phase 1 : Detection

### Verify shadcn/ui presence

```bash
# components.json
test -f components.json && echo "shadcn detected"

# components/ui/
ls -la components/ui/ 2>/dev/null || ls -la src/components/ui/ 2>/dev/null

# Radix imports
grep -rn "from ['\"]@radix-ui" src/ --include="*.tsx" | head -5
```

**If not found**: Inform user and propose installation.

## Phase 2 : Multi-Level Audit (50 points)

### 2.1 Configuration (10 pts)

| Check | Severity |
|-------|----------|
| `components.json` valid | CRITICAL |
| CSS variables present | CRITICAL |
| `cn()` utility exists | CRITICAL |
| Aliases configured | CRITICAL |
| Tailwind config integrated | MAJOR |
| Dependencies CVA/clsx/merge | MAJOR |

### 2.2 Imports & Usage (10 pts)

| Check | Severity |
|-------|----------|
| Local imports correct | CRITICAL |
| No direct Radix imports | CRITICAL |
| Variants used correctly | MAJOR |
| Composition respected | MAJOR |
| `asChild` well used | MODERATE |

**Anti-pattern detection:**
```bash
# Direct Radix imports (ANTI-PATTERN)
grep -rn "from ['\"]@radix-ui" src/ --include="*.tsx" | grep -v "components/ui"
```

### 2.3 Theming (10 pts)

| Check | Severity |
|-------|----------|
| Dark mode configured | CRITICAL |
| 20+ CSS variables | CRITICAL |
| No hardcoded colors | MAJOR |
| `--radius` defined | MODERATE |

**Required CSS variables:**
```
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring, --radius
```

### 2.4 Accessibility (10 pts)

| Check | Severity |
|-------|----------|
| Dialog has DialogTitle | CRITICAL |
| Dialog has DialogDescription | CRITICAL |
| Form has FormLabel | CRITICAL |
| Focus visible | MAJOR |
| AlertDialog complete | MAJOR |

**Detection commands:**
```bash
# Dialogs without DialogTitle
for f in $(grep -rl "<DialogContent" src/ --include="*.tsx"); do
  if ! grep -q "DialogTitle" "$f"; then
    echo "MISSING DialogTitle: $f"
  fi
done
```

### 2.5 Anti-Patterns (10 pts)

| Anti-pattern | Severity |
|--------------|----------|
| Manual reimplementation | MAJOR |
| Direct Radix import | CRITICAL |
| cn() misused | MAJOR |
| Missing subcomponents | MAJOR |
| Excessive inline CSS | MODERATE |
| Duplicate classes | MODERATE |

---

## Phase 3 : Report Generation

### Severity Classification

| Level | Label | Action |
|-------|-------|--------|
| `critical` | Critical | Must fix before release |
| `major` | Major | Should fix soon |
| `minor` | Minor | Nice to have |
| `info` | Info | Consider for future |

### Issue Format

```markdown
### [Severity] Issue Title

**Location**: `path/to/file.tsx:line`
**Category**: UX | UI | Tailwind | shadcn | Code | Landing
**Description**: What's wrong and why it matters
**Recommendation**: How to fix it
**Code Example**:
```tsx
// Before
<problematic code>

// After
<corrected code>
```
```

### Scoring Algorithm

```
Base Score: 100
- Critical issue: -20 points
- Major issue: -10 points
- Minor issue: -3 points
- Info issue: -1 point
Minimum: 0
```

---

## Phase 4 : Output

### Report saved to:
- `docs/audits/audit-frontend-YYYYMMDD.md` (full mode)
- `docs/audits/audit-landing-YYYYMMDD.md` (landing mode)
- `docs/audits/audit-shadcn-YYYYMMDD.md` (shadcn mode)

### Additional outputs (landing mode):
- `docs/imports/spec_landing.md` - Detailed specification
- `docs/imports/todo_landing.md` - Prioritized tasks
- Screenshots in `docs/audits/assets/`

**IMPORTANT**: Always create `docs/audits/` folder if it doesn't exist.

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

# Check bundle size
npx vite-bundle-visualizer
```

---

## User Commands

| Command | Action |
|---------|--------|
| `frontend-qa` | Full audit (all 5 checklists) |
| `frontend-qa ux` | UX only |
| `frontend-qa ui` | UI only |
| `frontend-qa tailwind` | Tailwind only |
| `audit landing [URL]` | Landing page audit |
| `audit shadcn` | shadcn/ui deep audit |
| `score shadcn` | Just scores, no details |

---

## Notes

- Use checklists as **references**, not rigid scripts
- Adapt severity based on project context
- Focus on **actionable** recommendations
- Group related issues for easier remediation
- Consider framework-specific best practices
- Landing mode requires Chrome DevTools MCP for full analysis
