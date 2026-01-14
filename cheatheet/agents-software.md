---
title: "Woodman Agents Software - Développement Assisté par IA"
description: "Collection d'agents spécialisés pour développement logiciel: spec, todo, audits, sync, déploiement, tests"
version: "2.0.0"
created: "2026-01-13T08:18:59.585Z"
tags: ["agents", "software-development", "ai-assisted", "automation"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 🤖 Woodman Agents Software

> Agents de développement assisté par IA

---

## 📋 Agents Core (01-09)

### 01. spec-writer

**Description**: Analyse projet existant pour produire spec.md clair et actionnable

**Modèle**: `opus`

**Use cases**:
- Nouvelle spec
- Analyser l'architecture
- Documenter codebase existante

**Stacks supportés**: Nuxt, Next.js, Laravel, WordPress, SPIP, Swift, Python, Go, Rust

> 📄 [Voir le fichier agent](../agents/01-spec-writer.md)

---

### 02. todo-generator

**Description**: Convertit spec.md en tâches actionnables priorisées (P0-P3)

**Modèle**: `sonnet`

**Use cases**:
- Générer todo depuis spec
- Prioriser tâches
- Estimer complexité



> 📄 [Voir le fichier agent](../agents/02-todo-generator.md)

---

### 03. sync-local

**Description**: Synchronise documentation locale (spec, CLAUDE, README)

**Modèle**: `sonnet`

**Use cases**:
- Mise à jour doc
- Sync spec/CLAUDE/README



> 📄 [Voir le fichier agent](../agents/03-sync-local.md)

---

### 04. task-runner

**Description**: Exécute et track les tâches depuis todo.md

**Modèle**: `sonnet`

**Use cases**:
- Prochaine tâche
- Continuer tâche
- Rapport progression



> 📄 [Voir le fichier agent](../agents/04-task-runner.md)

---

### 05. code-auditor

**Description**: Audit complet: code quality, architecture, sécurité, dette technique

**Modèle**: `opus`

**Use cases**:
- Audit code
- Analyse architecture
- Dette technique



> 📄 [Voir le fichier agent](../agents/05-code-auditor.md)

---

### 06. a11y-auditor

**Description**: Audit accessibilité WCAG 2.1/2.2

**Modèle**: `sonnet`

**Use cases**:
- Audit accessibilité
- WCAG compliance
- Tests a11y



> 📄 [Voir le fichier agent](../agents/06-a11y-auditor.md)

---

### 07. perf-auditor

**Description**: Audit performance: Core Web Vitals, bundle, backend

**Modèle**: `sonnet`

**Use cases**:
- Audit performance
- Core Web Vitals
- Bundle size
- Quick wins



> 📄 [Voir le fichier agent](../agents/07-perf-auditor.md)

---

### 08. external-sync

**Description**: Sync bidirectionnelle avec Notion/Linear uniquement

**Modèle**: `opus`

**Use cases**:
- Sync Notion/Linear
- Résolution conflits
- Setup espaces



> 📄 [Voir le fichier agent](../agents/08-external-sync.md)

---

### 09. context-generator

**Description**: Génère llm.txt (snapshot 15K pour onboarding LLM instantané)

**Modèle**: `sonnet`

**Use cases**:
- Générer contexte
- Onboarding LLM
- Partage projet



> 📄 [Voir le fichier agent](../agents/09-context-generator.md)

---


## 🔍 Stack Analyzers (10-analyze/)

### 10-astro. analyze-astro

**Stack**: Astro 3-5

**Description**: Analyse approfondie Astro: Islands, Content Collections

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/10-analyze/astro.md)

---

### 10-next. analyze-next

**Stack**: Next.js 13-15

**Description**: Analyse approfondie Next.js: App Router, Server/Client Components

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/10-analyze/next.md)

---

### 10-nuxt. analyze-nuxt

**Stack**: Nuxt 3-4

**Description**: Analyse approfondie Nuxt: SSR/hydration, Nuxt UI v2/v3/v4

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/10-analyze/nuxt.md)

---

### 10-spip. analyze-spip

**Stack**: SPIP 3-5

**Description**: Analyse approfondie SPIP: Boucles, squelettes, CVT forms

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/10-analyze/spip.md)

---

### 10-swiftui. analyze-swiftui

**Stack**: SwiftUI

**Description**: Analyse approfondie SwiftUI: MVVM/TCA, @Observable, multi-platform

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/10-analyze/swiftui.md)

---


## 🚀 Deploy Agents (11-deploy/)

### 11-vercel. deploy-vercel

**Plateforme**: Vercel

**Description**: Déploiement Vercel: Next.js, frameworks JS, preview/production

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/11-deploy/vercel.md)

---

### 11-netlify. deploy-netlify

**Plateforme**: Netlify

**Description**: Déploiement Netlify: JAMstack, serverless functions

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/11-deploy/netlify.md)

---

### 11-cloudflare. deploy-cloudflare

**Plateforme**: Cloudflare

**Description**: Cloudflare Pages + Workers: edge computing, KV/D1/R2

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/11-deploy/cloudflare.md)

---

### 11-docker. deploy-docker

**Plateforme**: Docker

**Description**: Containerisation Docker: multi-stage builds, docker-compose

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/11-deploy/docker.md)

---

### 11-aws. deploy-aws

**Plateforme**: AWS

**Description**: AWS: S3+CloudFront, ECS Fargate, Elastic Beanstalk

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/11-deploy/aws.md)

---


## 🧪 Test Agents (12-test/)

### 12-unit. test-unit

**Frameworks**: Jest, Vitest

**Description**: Tests unitaires: Jest, Vitest, components, hooks, coverage

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/12-test/unit.md)

---

### 12-e2e. test-e2e

**Frameworks**: Playwright, Cypress

**Description**: Tests E2E: Playwright, Cypress, multi-browser

**Modèle**: `sonnet`

> 📄 [Voir le fichier agent](../agents/12-test/e2e.md)

---


## 🔄 Workflows Types

### Setup Nouveau Projet
```
01-spec-writer → 02-todo-generator → 03-sync-local → 09-context-generator → 08-external-sync
```

1. **spec-writer**: Analyse le projet, détecte la stack, génère spec.md
2. **todo-generator**: Parse la spec, crée todo.md avec tâches priorisées
3. **sync-local**: Met à jour CLAUDE.md et README.md
4. **context-generator**: Génère llm.txt (snapshot 15K pour onboarding LLM)
5. **external-sync**: Push vers Linear/Notion (optionnel)

### Session Développement
```
04-task-runner (status) → 04 (resume) → 04 (report)
```

### Audits Pré-Release
```
05-code-auditor + 06-a11y-auditor + 07-perf-auditor → Corrections → 03-sync-local
```

---

## 🎯 Commandes Rapides

### Spec & Todo
- `"Génère une spec"`
- `"Génère une todo depuis la spec"`
- `"Analyse ce projet et crée spec + todo"`

### Documentation
- `"Synchronise la doc locale"`
- `"Mets à jour le README"`
- `"Génère le contexte du projet"`

### Développement
- `"Quelle est la prochaine tâche ?"`
- `"Continue la tâche en cours"`
- `"Rapport de progression"`

### Audits
- `"Audit code complet"`
- `"Audit performance"`
- `"Audit accessibilité"`

### Déploiement
- `"Déploie sur Vercel"`
- `"Configure Docker"`
- `"Setup AWS S3 + CloudFront"`

### Tests
- `"Configure Jest pour ce projet"`
- `"Génère des tests E2E avec Playwright"`

---

## 📊 Modèles par Catégorie

| Catégorie | Agents | Modèle Recommandé |
|-----------|--------|-------------------|
| **Analyse** | 01, 05 | opus (analyse complexe) |
| **Orchestration** | 08 | opus (résolution conflits) |
| **Structuration** | 02, 03, 04, 09 | sonnet (tâches structurées) |
| **Audits** | 06, 07 | sonnet (mesures + checklists) |
| **Stack Analysis** | 10-* | sonnet (analyse technique) |
| **Deploy & Test** | 11-*, 12-* | sonnet (automation) |

---

## 🔗 Ressources

- **Référence Claude Code**: [woodman.html](woodman.html)
- **Patterns Boris**: [boris-bible.html](boris-bible.html)
- **Agents VPS**: [agents-vps.html](agents-vps.html)

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v2.0.0*
