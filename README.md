# ulk 🐺

AI Development Toolkit pour Claude Code.

[![Live Demo](https://img.shields.io/badge/demo-live-blue)](https://izo.github.io/ulk/)
[![GitHub](https://img.shields.io/github/stars/izo/ulk?style=social)](https://github.com/izo/ulk)
[![Version](https://img.shields.io/badge/version-2.1.1-purple)](https://github.com/izo/ulk/releases)

## Pourquoi "ulk" ?

**Bruce**, de son vrai nom **Ulk**, est un Vallhund suédois — une race de chien viking millénaire, trapue et intrépide, surnommée "le chien des Vikings".

Comme son ancêtre qui accompagnait les drakkars à travers les mers nordiques, Ulk accompagne les développeurs à travers les océans de code. Petit mais costaud, il ne recule devant aucun défi : audits de sécurité, refactoring de legacy code, ou déploiement à 3h du matin.

> Le nom "ulk" signifie "loup" en vieux norrois. Car sous ses airs adorables, Bruce est un gardien féroce de la qualité du code.

## Installation

```bash
curl -fsSL https://raw.githubusercontent.com/izo/ulk/main/install-remote.sh | bash
```

Après installation, utilisez `/ulk:update` pour mettre à jour.

## Désinstallation

```bash
# Depuis le dossier ulk cloné
./uninstall.sh

# Ou directement
rm -rf ~/.claude/commands/ulk
```

Options disponibles :
- `--force` ou `-f` : Supprime sans confirmation
- `--dry-run` : Affiche ce qui serait supprimé sans rien faire

## Commandes disponibles

### Agents de développement (`/ulk:agents:*`)

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
| `jobs` | Implémentation Apple : architecture SwiftUI multi-plateforme |
| `svg-analyzer` | Analyse React/Next.js → génère SVG via Shad2SVG |
| `ranma` | Planificateur de migration (WP→SPIP, Next→Nuxt, etc.) |
| `seo-auditor` | Audit SEO & GEO (technique, on-page, AI citations) |
| `pencil-generator` | Génère fichiers .pen depuis Next.js |
| `gandalf` | Context guardian (hygiène de session, discipline) |
| `blackemperor` | Livraison rapide : simplify → docs → sync → release |
| `brigitte` | Communications bienveillantes + sync Notion/Linear |
| `c3po` | Product Manager : idée → projet complet |

### Orchestrateurs (`/ulk:agents:*`)

Workflows automatisés combinant plusieurs agents :

| Commande | Description |
|----------|-------------|
| `audit-complet` | Audit complet : spec + code + perf + a11y + todo (5 agents, 15-30min) |
| `legacy-revival` | Revival code legacy : doc + simplify + fix + optimize (6 agents, 30-60min) |
| `pre-release` | Checklist pre-release + GO/NO-GO (5-6 agents, 20-45min) |

### Analyseurs de stack (`/ulk:analyze:*`)

| Commande | Description |
|----------|-------------|
| `nuxt` | Analyse Nuxt 3/4, SSR, Nuxt UI |
| `next` | Analyse Next.js 13-15, App Router, RSC |
| `astro` | Analyse Astro 3-5, Islands Architecture |
| `swiftui` | Analyse SwiftUI, MVVM/TCA |
| `spip` | Analyse SPIP 3-5, squelettes, CVT |

### Déploiement (`/ulk:deploy:*`)

| Commande | Description |
|----------|-------------|
| `vercel` | Déploie sur Vercel |
| `netlify` | Déploie sur Netlify |
| `cloudflare` | Déploie sur Cloudflare Pages/Workers |
| `docker` | Build et déploie containers Docker |
| `aws` | Déploie sur AWS S3/CloudFront/ECS |

### Tests (`/ulk:test:*`)

| Commande | Description |
|----------|-------------|
| `unit` | Configure tests unitaires Jest/Vitest |
| `e2e` | Configure tests E2E Playwright/Cypress |

### Agents VPS (`/ulk:vps:*`)

17 agents pour gérer vos serveurs multi-projets :

`orchestrateur` · `audit` · `securite` · `reseau` · `docker` · `deploiement` · `cicd` · `monitoring` · `backups` · `incidents` · `migration` · `cleanup` · `documentation` · `compliance` · `couts-ressources` · `environnements` · `installateur`

## Site web

Le site de documentation est disponible sur [izo.github.io/ulk](https://izo.github.io/ulk/).

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
/ulk:agents:spec-writer → /ulk:agents:todo-generator → /ulk:agents:task-runner
```

### Audit complet (automatisé)
```
/ulk:agents:audit-complet
# Lance automatiquement : spec-writer → code-auditor → perf-auditor → a11y-auditor → todo-generator
```

### Code legacy
```
/ulk:agents:legacy-revival
# Lance automatiquement : spec-writer → code-auditor → code-simplifier → robocop → perf-auditor → sync-local
```

### Pre-release check
```
/ulk:agents:pre-release
# Lance automatiquement : audits + tests + docs → Verdict GO/NO-GO
```

### App Apple native (Steve → Jobs)
```
/ulk:agents:steve → /ulk:agents:jobs
# steve : Audit web → design API → docs/api/
# jobs : Architecture SwiftUI → docs/apple-starter-kit/ (compilable)
```

### Génération SVG de maquettes
```
/svg-analyzer
# Phase 1 : Analyse projet → ANALYSE_PAGES.md
# Phase 2 : Génération SVG → output/*.svg + index.html
```

### Audit manuel (pas à pas)
```
/ulk:agents:code-auditor → /ulk:agents:perf-auditor → /ulk:agents:a11y-auditor
```

### Nouveau serveur VPS
```
/ulk:vps:audit → /ulk:vps:securite → /ulk:vps:docker → /ulk:vps:reseau
```

## Contribution

Les commandes sont définies dans [`site/data/commands.json`](site/data/commands.json).

Pour proposer un nouvel agent : [Ouvrir une issue](https://github.com/izo/ulk/issues/new)

## Auteur

Réalisé par **Mathieu Drouet** pour [regrets.app](https://regrets.app)

## Licence

MIT
