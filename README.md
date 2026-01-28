# Woodman

AI Development Toolkit pour Claude Code.

[![Live Demo](https://img.shields.io/badge/demo-live-blue)](https://izo.github.io/Woodman/)
[![GitHub](https://img.shields.io/github/stars/izo/Woodman?style=social)](https://github.com/izo/Woodman)

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/izo/Woodman/main/install-remote.sh | bash
```

Après installation, utilisez `/wm:update` pour mettre à jour.

## Commandes disponibles

### Agents de développement (`/wm:agents:*`)

| Commande | Description |
|----------|-------------|
| `spec-writer` | Génère un fichier spec.md complet |
| `todo-generator` | Crée todo.md avec tâches actionnables |
| `task-runner` | Exécute les tâches du todo.md |
| `sync-local` | Synchronise spec.md, CLAUDE.md, README.md |
| `code-auditor` | Audit qualité et architecture du code |
| `code-simplifier` | Simplifie et réduit la complexité |
| `a11y-auditor` | Audit accessibilité WCAG 2.1/2.2 |
| `perf-auditor` | Audit performance et Core Web Vitals |
| `external-sync` | Synchronisation Notion/Linear |
| `context-generator` | Génère llm.txt pour onboarding LLM |
| `robocop` | Détective et fixeur d'erreurs (all types) |
| `documentalist` | Gère et organise le dossier /docs |
| `figma-shadcn` | Convertit designs Figma en shadcn/ui |
| `tw2shad` | Transforme Tailwind/HTML en shadcn/ui Vue |
| `frontend-qa` | Audit frontend UX/UI et Tailwind |
| `picsou` | Estimation coûts d'hébergement multi-providers |
| `steve` | API mobile : audit web → design API iOS/Android |
| `svg-analyzer` | Analyse React/Next.js → génère SVG via Shad2SVG |

### Orchestrateurs (`/wm:agents:*`)

Workflows automatisés combinant plusieurs agents :

| Commande | Description |
|----------|-------------|
| `audit-complet` | Audit complet : spec + code + perf + a11y + todo (5 agents, 15-30min) |
| `legacy-revival` | Revival code legacy : doc + simplify + fix + optimize (6 agents, 30-60min) |
| `pre-release` | Checklist pre-release + GO/NO-GO (5-6 agents, 20-45min) |

### Analyseurs de stack (`/wm:analyze:*`)

| Commande | Description |
|----------|-------------|
| `nuxt` | Analyse Nuxt 3/4, SSR, Nuxt UI |
| `next` | Analyse Next.js 13-15, App Router, RSC |
| `astro` | Analyse Astro 3-5, Islands Architecture |
| `swiftui` | Analyse SwiftUI, MVVM/TCA |
| `spip` | Analyse SPIP 3-5, squelettes, CVT |

### Déploiement (`/wm:deploy:*`)

| Commande | Description |
|----------|-------------|
| `vercel` | Déploie sur Vercel |
| `netlify` | Déploie sur Netlify |
| `cloudflare` | Déploie sur Cloudflare Pages/Workers |
| `docker` | Build et déploie containers Docker |
| `aws` | Déploie sur AWS S3/CloudFront/ECS |

### Tests (`/wm:test:*`)

| Commande | Description |
|----------|-------------|
| `unit` | Configure tests unitaires Jest/Vitest |
| `e2e` | Configure tests E2E Playwright/Cypress |

### Agents VPS (`/wm:vps:*`)

17 agents pour gérer vos serveurs multi-projets :

`orchestrateur` · `audit` · `securite` · `reseau` · `docker` · `deploiement` · `cicd` · `monitoring` · `backups` · `incidents` · `migration` · `cleanup` · `documentation` · `compliance` · `couts-ressources` · `environnements` · `installateur`

## Site web

Le site de documentation est disponible sur [izo.github.io/Woodman](https://izo.github.io/Woodman/).

### Raccourcis clavier

| Touche | Action |
|--------|--------|
| `T` | Toggle light/dark mode |
| `D` | Scroll vers Installation |
| `C` | Ouvrir GitHub (clone) |
| `S` | Ouvrir GitHub (source) |

### Design

- Style inspiré de [Zed.dev](https://zed.dev)
- Police IBM Plex Mono / IBM Plex Sans
- Dark mode avec persistance localStorage
- Respect de `prefers-color-scheme`

## Workflows recommandés

### Nouveau projet
```
/wm:agents:spec-writer → /wm:agents:todo-generator → /wm:agents:task-runner
```

### Audit complet (automatisé)
```
/wm:agents:audit-complet
# Lance automatiquement : spec-writer → code-auditor → perf-auditor → a11y-auditor → todo-generator
```

### Code legacy
```
/wm:agents:legacy-revival
# Lance automatiquement : spec-writer → code-auditor → code-simplifier → robocop → perf-auditor → sync-local
```

### Pre-release check
```
/wm:agents:pre-release
# Lance automatiquement : audits + tests + docs → Verdict GO/NO-GO
```

### Génération SVG de maquettes
```
/svg-analyzer
# Phase 1 : Analyse projet → ANALYSE_PAGES.md
# Phase 2 : Génération SVG → output/*.svg + index.html
```

### Audit manuel (pas à pas)
```
/wm:agents:code-auditor → /wm:agents:perf-auditor → /wm:agents:a11y-auditor
```

### Nouveau serveur VPS
```
/wm:vps:audit → /wm:vps:securite → /wm:vps:docker → /wm:vps:reseau
```

## Contribution

Les commandes sont définies dans [`site/data/commands.json`](site/data/commands.json).

Pour proposer un nouvel agent : [Ouvrir une issue](https://github.com/izo/Woodman/issues/new)

## Auteur

Réalisé par **Mathieu Drouet** pour [regrets.app](https://regrets.app)

## Licence

MIT
