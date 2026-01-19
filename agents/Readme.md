# Agents Woodman

Suite d'agents spécialisés pour le développement assisté par IA.

---

## 📋 Liste des Agents

### Agents Principaux (01-09)

```
agents/
├── 01-spec-writer.md      # Analyse projet → spec.md (tous stacks)
├── 02-todo-generator.md   # spec.md → todo.md (tâches priorisées)
├── 03-sync-local.md       # Sync doc locale (spec, CLAUDE, README)
├── 04-task-runner.md      # Implémente + track avancement
├── 05-code-auditor.md     # Audit code (archi, qualité, sécu, dette)
├── 06-a11y-auditor.md     # Audit accessibilité WCAG 2.1/2.2
├── 07-perf-auditor.md     # Audit performance (Core Web Vitals, bundle, DB)
├── 08-external-sync.md    # Sync bidirectionnelle Notion/Linear
├── 09-context-generator.md # Génère llm.txt (snapshot 15K pour onboarding LLM)
├── 11-robocop.md          # Détective et fixeur d'erreurs (runtime, compilation, tests, linting)
├── 13-documentalist.md    # Gère /docs (organise, valide, maintient)
├── 18-audit-complet.md    # Orchestrateur : audit complet (spec + code + perf + a11y + todo)
├── 19-legacy-revival.md   # Orchestrateur : revival code legacy (doc + simplify + fix + optimize)
├── 20-pre-release.md      # Orchestrateur : checklist pre-release + décision GO/NO-GO
├── 14-figma-shadcn.md     # Analyse Figma → implémentation shadcn/ui + Tailwind
├── 15-tw2shad.md          # Transforme Tailwind/HTML → composants shadcn/ui Vue (Nuxt)
├── 16-frontend-qa.md      # Audit frontend complet (UX, UI, Tailwind, shadcn, code)
├── 17-code-simplifier.md  # Audit simplification codebase + plugin code-simplifier
└── 21-notion-importer.md  # Import page Notion + liens → spec_notion.md + todo_notion.md
```

### Stack Analyzers (10-analyze/)

Agents d'analyse technique approfondie par stack :

```
agents/10-analyze/
├── astro.md      # Analyse Astro (Islands, Content Collections)
├── next.md       # Analyse Next.js (App Router, Server/Client)
├── nuxt.md       # Analyse Nuxt (SSR, hydration, Nuxt UI)
├── spip.md       # Analyse SPIP (boucles, squelettes, CVT)
└── swiftui.md    # Analyse SwiftUI (MVVM, TCA, multi-platform)
```

**Usage :**
```bash
"Analyse approfondie Nuxt"
"Audit technique Next.js"
"Inventaire composants SwiftUI"
```

**Voir** : `10-analyze/README.md` pour la documentation complète

### Deploy Agents (11-deploy/)

Agents de déploiement automatisé vers différentes plateformes :

```
agents/11-deploy/
├── vercel.md       # Déploiement Vercel (Next.js, frameworks JS)
├── netlify.md      # Déploiement Netlify (JAMstack, Functions)
├── cloudflare.md   # Cloudflare Pages + Workers (edge computing)
├── docker.md       # Containerisation Docker + docker-compose
└── aws.md          # AWS (S3+CloudFront, ECS, Elastic Beanstalk)
```

**Usage :**
```bash
"Déploie sur Vercel"
"Configure Docker pour ce projet"
"Setup AWS S3 + CloudFront"
```

**Voir** : `11-deploy/README.md` pour la documentation complète

### Test Agents (12-test/)

Agents d'automatisation des tests (unitaires, E2E) :

```
agents/12-test/
├── unit.md     # Tests unitaires (Jest, Vitest)
└── e2e.md      # Tests end-to-end (Playwright, Cypress)
```

**Usage :**
```bash
"Configure Jest pour ce projet"
"Génère des tests E2E avec Playwright"
"Setup testing complet"
```

**Voir** : `12-test/README.md` pour la documentation complète

### Documentation Management (13)

Agent de gestion de la documentation :

```
agents/
└── 13-documentalist.md    # Gère /docs (organise, valide, maintient)
```

**Usage :**
```bash
"Organise la documentation"
"Valide le frontmatter des docs"
"Audit de la documentation"
```

### Design Integration (14-15)

Agents spécialisés pour l'analyse Figma et l'intégration shadcn/ui :

```
agents/
├── 14-figma-shadcn.md    # Analyse Figma Dev Mode → shadcn/ui + Tailwind
└── 15-tw2shad.md         # Transforme Tailwind/HTML → composants shadcn/ui Vue (Nuxt)
```

**Usage :**
```bash
"Analyse ce composant Figma: [URL]"
"Implémente ce design avec shadcn/ui"
"Transforme ce code Tailwind en composant shadcn/ui Vue"
```

**Fonctionnalités :**
- Analyse design Figma (Dev Mode)
- Mapping vers composants shadcn/ui
- Génération code production-ready
- Styling Tailwind fidèle au design
- Code Connect mapping (bonus)
- Transformation Tailwind → Vue/Nuxt

### Code Simplifier (17)

Agent d'audit de simplification du code :

```
agents/
└── 17-code-simplifier.md    # Audit simplification + plugin code-simplifier
```

**Prérequis :**
```bash
claude plugin install code-simplifier
```

**Usage :**
```bash
"Audit de simplification"       # Audit complet du codebase
"Simplifie le projet"           # Audit + application
"Quels fichiers simplifier ?"   # Rapport sans modification
"Score de complexité"           # Métriques rapides
```

**Fonctionnalités :**
- Cartographie complète du codebase
- Détection patterns problématiques (fichiers longs, nesting, ternaires, etc.)
- Top 10 fichiers à simplifier avec score
- Application via plugin officiel `code-simplifier` d'Anthropic
- Validation après chaque simplification (typecheck, lint, tests)
- Rapport avant/après avec métriques

### Frontend QA (16-frontend-qa/)

Agent d'assurance qualité frontend complet avec checklists de référence :

```
agents/16-frontend-qa/
├── code-checklist.md      # Architecture, patterns, state, naming, TypeScript
├── shadcn-checklist.md    # Installation, usage, theming, accessibilité
├── tailwind-checklist.md  # Configuration, classes, responsive, performance
├── ui-checklist.md        # Visual consistency, typography, colors, spacing
├── ux-checklist.md        # Navigation, user flows, a11y, interactions
└── README.md              # Documentation des checklists
```

**Usage :**
```bash
"Audit frontend complet"
"Audit UX uniquement"
"Vérifie l'intégration shadcn/ui"
"Audit Tailwind CSS"
"Audit cohérence du code frontend"
```

**Fonctionnalités :**
- Audit UX (navigation, flows, a11y, interactions)
- Audit UI (visual consistency, typography, colors)
- Audit Tailwind CSS (config, patterns, v4)
- Audit shadcn/ui (setup, theming, accessibility)
- Audit code (architecture, state, TypeScript)
- Score par catégorie + score global
- Rapport structuré avec recommandations

---

## 🚀 Workflows Types

### Setup Nouveau Projet

```bash
# Workflow complet
"Analyse ce projet, génère spec et todo, puis sync la doc"
# → 01 → 02 → 03 → 09

# Puis optionnellement
"Setup dans Linear et Notion"
# → 08
```

**Détail :**
1. `01-spec-writer` : Analyse le projet, détecte la stack, génère spec.md
2. `02-todo-generator` : Parse la spec, crée todo.md avec tâches priorisées
3. `03-sync-local` : Met à jour CLAUDE.md et README.md
4. `09-context-generator` : Génère llm.txt (snapshot contexte pour LLM)
5. `08-external-sync` : Pousse vers Linear/Notion (optionnel)

---

### Session Dev

```bash
# Démarrer une tâche
"Quelle est la prochaine tâche ?"
# → 04 (affiche la prochaine tâche P0/P1)

# Continuer la tâche en cours
"Continue"
# → 04 (reprend la tâche marquée en cours)

# Rapport de progression
"Rapport"
# → 04 (stats + tâches complétées)
```

---

### Audits Pré-Release

```bash
# Audit complet
"Audit code" → 05
"Audit accessibilité" → 06
"Audit performance" → 07
"Audit simplification" → 17

# Audits spécifiques
"Analyse le bundle" → 07 (focus bundle size)
"Core Web Vitals" → 07 (focus CWV)
"Score Lighthouse" → 07 (focus Lighthouse)
"Quick wins perf" → 07 (optimisations rapides)
"Requêtes lentes" → 07 (focus backend/DB)
```

---

### Maintenance

```bash
# Sync bidirectionnelle externe
"Synchronise avec Notion et Linear"
# → 08 (full sync bidirectionnelle)

# Sync doc locale seulement
"Mets à jour la doc"
# → 03

# État du projet
"Où on en est ?"
# → 04 (rapport progression)
```

---

## 🎯 Commandes Rapides

### Spec & Todo
```
"Génère une spec"
"Génère une todo depuis la spec"
"Analyse ce projet et crée spec + todo"
```

### Documentation
```
"Synchronise la doc locale"
"Mets à jour le README"
"Mets à jour CLAUDE.md"
"Génère le contexte du projet"
"Régénère llm.txt"
```

### Développement
```
"Quelle est la prochaine tâche ?"
"Continue la tâche en cours"
"Rapport de progression"
"Marque la tâche #005 comme terminée"
```

### Audits
```
"Audit code complet"
"Audit performance"
"Audit accessibilité"
"Audit simplification"
"Quick wins perf"
```

### Sync Externe
```
"Synchronise avec Notion et Linear"
"Push vers Linear"
"Import depuis Notion"
"Setup l'espace Notion"
```

### Design
```
"Analyse ce composant Figma: [URL]"
"Implémente ce design avec shadcn/ui"
"Trouve l'équivalent shadcn pour ce composant"
"Mappe ce composant dans Figma"
```

---

## 🔄 Flow Recommandé

### 1️⃣ Démarrage Projet

```
01-spec-writer
    ↓
02-todo-generator
    ↓
03-sync-local
    ↓
09-context-generator
    ↓
08-external-sync (optionnel)
```

### 2️⃣ Développement

```
04-task-runner (boucle)
    ↓
03-sync-local (mise à jour doc)
    ↓
09-context-generator (régénère contexte)
    ↓
08-external-sync (optionnel)
```

### 3️⃣ Pré-Release

```
05-code-auditor
06-a11y-auditor
07-perf-auditor
    ↓
Corrections
    ↓
03-sync-local
```

---

## 📐 Séparation des Responsabilités

### 03-sync-local (Documentation Locale)
- ✅ Mise à jour spec.md (statut)
- ✅ Mise à jour CLAUDE.md (stack, commandes)
- ✅ Mise à jour README.md (quick start, features)
- ❌ **NE gère PAS** Linear/Notion

### 08-external-sync (Outils Externes)
- ✅ Sync bidirectionnelle Linear
- ✅ Sync bidirectionnelle Notion
- ✅ Résolution de conflits
- ✅ Tracking state
- ❌ **NE gère PAS** la doc locale

**Utiliser les deux ensemble :**
```
03-sync-local → 08-external-sync
```

---

## 🤖 Modèles Utilisés

| Agent | Modèle | Justification |
|-------|--------|---------------|
| 01-spec-writer | opus | Analyse complexe multi-stack |
| 02-todo-generator | sonnet | Parsing et structuration |
| 03-sync-local | sonnet | Transformation et formatting |
| 04-task-runner | sonnet | Exécution et suivi |
| 05-code-auditor | opus | Analyse approfondie |
| 06-a11y-auditor | sonnet | Tests automatisés + checklist |
| 07-perf-auditor | sonnet | Mesures et analyse |
| 08-external-sync | opus | Résolution conflits, bidirectionnalité |
| 09-context-generator | sonnet | Compilation et synthèse (15K max) |
| 11-robocop | opus | Diagnostic et résolution d'erreurs (tous types) |
| 13-documentalist | sonnet | Organisation et validation documentation |
| 18-audit-complet | opus | Orchestration 5 agents : audit complet repo |
| 19-legacy-revival | opus | Orchestration 6 agents : revival code legacy |
| 20-pre-release | opus | Orchestration 5-6 agents : checklist pre-release |
| 14-figma-shadcn | opus | Analyse design + mapping composants complexes |
| 15-tw2shad | sonnet | Transformation Tailwind → Vue/shadcn |
| 16-frontend-qa | sonnet | Audit frontend (UX, UI, Tailwind, shadcn, code) |
| 17-code-simplifier | opus | Audit simplification codebase + plugin code-simplifier |

---

## 📚 Documentation Complète

Voir `CLAUDE.md` pour la documentation détaillée de chaque agent, incluant :
- Architecture des agents
- Patterns de détection de stack
- Création de nouveaux agents
- Configuration MCP
- Exemples d'utilisation

---

_Agents Woodman · AI-Assisted Development Toolkit_
