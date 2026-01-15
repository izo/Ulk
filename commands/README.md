# Woodman Commands

Custom Commands pour Claude Code - agents spécialisés pour le développement.

## Installation

Depuis la racine du repo :

```bash
./install.sh
```

Cela crée un symlink `~/.claude/commands/woodman` → `./commands/`

## Désinstallation

```bash
./uninstall.sh
```

## Usage

Dans Claude Code, invoquez les agents avec :

```
/woodman:agents:spec-writer
/woodman:agents:todo-generator
/woodman:agents:code-auditor
/woodman:analyze:nuxt
...
```

## Agents disponibles

### Workflow (`/woodman:agents:*`)

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
| `documentalist` | Gère /docs - organisation, nettoyage, frontmatter |
| `figma-shadcn` | Analyse Figma → implémentation shadcn/ui + Tailwind |
| `tw2shad` | Transforme Tailwind/HTML → composants shadcn/ui Vue (Nuxt) |

### Analyzers (`/woodman:analyze:*`)

| Analyzer | Stack |
|----------|-------|
| `nuxt` | Nuxt 3/4 |
| `next` | Next.js 13-15 |
| `astro` | Astro 3-5 |
| `spip` | SPIP 3-5 |
| `swiftui` | SwiftUI iOS/macOS |

### Deploy (`/woodman:deploy:*`)

| Agent | Platform |
|-------|----------|
| `vercel` | Vercel (Next.js, Nuxt, Astro, SvelteKit, static) |
| `netlify` | Netlify (JAMstack, serverless functions) |
| `cloudflare` | Cloudflare Pages + Workers |
| `docker` | Docker containerization + docker-compose |
| `aws` | AWS (S3+CloudFront, ECS, Elastic Beanstalk) |

### Test (`/woodman:test:*`)

| Agent | Framework |
|-------|-----------|
| `unit` | Jest, Vitest - tests unitaires |
| `e2e` | Playwright, Cypress - tests end-to-end |

## Structure

```
commands/
├── agents/           # Agents workflow
│   ├── spec-writer.md
│   ├── todo-generator.md
│   ├── figma-shadcn.md
│   ├── tw2shad.md
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
