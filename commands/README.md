# ulk Commands

Custom Commands pour Claude Code - agents spécialisés pour le développement.

## Installation

Depuis la racine du repo :

```bash
./install.sh
```

Cela crée un symlink `~/.claude/commands/ulk` → `./commands/`

## Désinstallation

```bash
./uninstall.sh
```

## Usage

Dans Claude Code, invoquez les agents avec :

```
/ulk:agents:spec-writer
/ulk:agents:todo-generator
/ulk:agents:code-auditor
/ulk:analyze:nuxt
...
```

## Agents disponibles

### Workflow (`/ulk:agents:*`)

| Agent | Description |
|-------|-------------|
| `spec-writer` | Analyse projet → génère spec.md (toutes stacks) |
| `todo-generator` | spec.md → todo.md priorisé |
| `task-runner` | Exécute et track les tâches |
| `sync-local` | Sync documentation locale |
| `code-auditor` | Audit code complet |
| `a11y-auditor` | Audit accessibilité WCAG |
| `perf-auditor` | Audit performance |
| `external-sync` | Sync Notion/Linear |
| `context-generator` | Génère llm.txt (15K chars) |
| `robocop` | Détective et fixeur d'erreurs (runtime, compilation, tests, linting) |
| `documentalist` | Gère /docs - organisation, nettoyage, frontmatter |
| `audit-complet` | Orchestrateur : audit complet repo (5 agents) |
| `legacy-revival` | Orchestrateur : revival code legacy (6 agents) |
| `pre-release` | Orchestrateur : checklist pre-release + GO/NO-GO |
| `figma-shadcn` | Analyse Figma → implémentation shadcn/ui + Tailwind |
| `tw2shad` | Transforme Tailwind/HTML → composants shadcn/ui Vue (Nuxt) |
| `landing-page-auditor` | Audit complet landing page (conversion, design, mobile) |
| `notion-importer` | Import page Notion + liens → spec_notion.md + todo_notion.md |
| `picsou` | Estimation coûts d'hébergement multi-providers |
| `steve` | API mobile : audit web → design API → documentation iOS/Android |
| `jobs` | Implémentation Apple : adjoint de Steve → architecture SwiftUI multi-plateforme → starter kit compilable |
| `svg-analyzer` | Analyse React/Next.js → inventaire pages/composants → génère SVG via Shad2SVG |

### Analyzers (`/ulk:analyze:*`)

| Analyzer | Stack |
|----------|-------|
| `nuxt` | Nuxt 3/4 |
| `next` | Next.js 13-15 |
| `astro` | Astro 3-5 |
| `spip` | SPIP 3-5 |
| `swiftui` | SwiftUI iOS/macOS |

### Deploy (`/ulk:deploy:*`)

| Agent | Platform |
|-------|----------|
| `vercel` | Vercel (Next.js, Nuxt, Astro, SvelteKit, static) |
| `netlify` | Netlify (JAMstack, serverless functions) |
| `cloudflare` | Cloudflare Pages + Workers |
| `docker` | Docker containerization + docker-compose |
| `aws` | AWS (S3+CloudFront, ECS, Elastic Beanstalk) |

### Test (`/ulk:test:*`)

| Agent | Framework |
|-------|-----------|
| `unit` | Jest, Vitest - tests unitaires |
| `e2e` | Playwright, Cypress - tests end-to-end |

## Orchestrateurs

Les orchestrateurs combinent plusieurs agents en un workflow automatisé :

### 🎯 audit-complet
**Usage :** `/ulk:agents:audit-complet`

Audit exhaustif d'un repo en 5 phases :
1. spec-writer → documentation
2. code-auditor → audit code
3. perf-auditor → audit performance
4. a11y-auditor → audit accessibilité
5. todo-generator → plan d'action

**Durée :** 15-30 min | **Output :** 6 fichiers incluant rapport consolidé

### 🔄 legacy-revival
**Usage :** `/ulk:agents:legacy-revival`

Remise à niveau code legacy en 7 phases :
1. spec-writer → documentation existant
2. code-auditor → diagnostic complet
3. code-simplifier → simplification
4. robocop → correction erreurs
5. perf-auditor → optimisation
6. sync-local → mise à jour docs
7. todo-generator → roadmap modernisation

**Durée :** 30-60 min | **Output :** Métriques avant/après + roadmap

### 🚀 pre-release
**Usage :** `/ulk:agents:pre-release`

Checklist pre-release avec décision GO/NO-GO :
1. code-auditor → qualité code
2. perf-auditor → performance
3. a11y-auditor → accessibilité
4. robocop → fix erreurs critiques
5. test:unit + test:e2e → validation
6. Docs check → CHANGELOG, version bump
7. Checklist manuelle → confirmations

**Durée :** 20-45 min | **Output :** Verdict ✅ GO / ⚠️ WARNINGS / ❌ NO-GO

## Structure

```
commands/
├── agents/           # Agents workflow
│   ├── spec-writer.md
│   ├── todo-generator.md
│   ├── figma-shadcn.md
│   ├── tw2shad.md
│   ├── picsou.md
│   ├── steve.md
│   ├── jobs.md
│   ├── svg-analyzer.md
│   └── ...
├── analyze/          # Stack analyzers
│   ├── nuxt.md
│   ├── next.md
│   ├── astro.md
│   ├── spip.md
│   └── swiftui.md
├── deploy/           # Deployment agents
│   ├── vercel.md
│   ├── netlify.md
│   ├── cloudflare.md
│   ├── docker.md
│   └── aws.md
├── test/             # Test agents
│   ├── unit.md
│   └── e2e.md
└── README.md
```

## Format des commandes

Chaque fichier `.md` utilise le format :

```yaml
---
description: 'Description affichée dans Claude Code'
---

# Instructions de l'agent
...
```

## Développement

Pour ajouter un agent :

1. Créer `agents/nom-agent.md` ou `analyze/stack.md`
2. Ajouter le frontmatter `description`
3. Écrire les instructions
4. L'agent est immédiatement disponible (symlink)
