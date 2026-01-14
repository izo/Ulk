#!/usr/bin/env node

/**
 * Woodman Unified Documentation Generator
 *
 * Génère 4 documents de référence :
 * 1. woodman.md - Référence Claude Code & Speckit (officiel)
 * 2. boris-bible.md - Patterns pratiques de Boris Cherny
 * 3. agents-software.md - Agents de développement logiciel
 * 4. agents-vps.md - Agents de gestion d'infrastructure VPS
 */

const fs = require('fs');
const path = require('path');

// Load configuration data
const sources = require('./data/sources.json');
const patterns = require('./data/patterns.json');
const agents = require('./data/agents.json');

const VERSION = "2.0.0";
const GENERATION_DATE = new Date().toISOString();

// =============================================================================
// DOCUMENT 1: CLAUDE CODE REFERENCE (woodman.md)
// =============================================================================

const generateClaudeCodeReference = () => {
  const content = `---
title: "Woodman - Guide Complet Claude Code & Speckit"
description: "Guide de référence rapide pour Claude Code et Speckit avec raccourcis, commandes et workflows"
version: "${VERSION}"
created: "${GENERATION_DATE}"
logo: "woodman.png"
logo_mini: "woodman-mini.png"
tags: ["woodman", "claude-code", "speckit", "cheatsheet", "référence"]
sources:
${sources.officialSources.map(s => `  - name: "${s.name}"
    url: "${s.url}"
    description: "${s.description}"
    maintainer: "${s.maintainer}"`).join('\n')}
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="200"/>
</div>

# 🪵 Woodman - Guide Complet

> Référence rapide pour Claude Code et Speckit

---

## 🚀 PARTIE 1: CLAUDE CODE

### 📦 Installation

\`\`\`bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Homebrew
brew install --cask claude-code

# npm
npm install -g @anthropic-ai/claude-code

# Windows PowerShell
irm https://claude.ai/install.ps1 | iex
\`\`\`

### ⌨️ Raccourcis Clavier

| Raccourci | Fonction |
|-----------|----------|
| \`!\` | Mode bash |
| \`@\` | Mentionner fichiers/dossiers |
| \`\\\\\` | Saut de ligne (backslash + Enter) |
| \`Esc\` | Interrompre Claude |
| \`Esc+Esc\` | Menu Rewind (annuler) |
| \`Ctrl+R\` | Contexte complet |
| \`Ctrl+V\` | Coller image |
| \`Shift+Tab\` | Mode auto-accept ("yolo") |
| \`Shift+Tab+Tab\` | Mode planification |
| \`Cmd+Esc\` | Lancement rapide (IDE) |
| \`Cmd+Opt+K\` | Insérer références fichiers |

### ⚡ Commandes Slash Essentielles

| Commande | Description |
|----------|-------------|
| \`/clear\` | Effacer l'historique |
| \`/init\` | Initialiser projet |
| \`/model\` | Changer modèle AI |
| \`/config\` | Voir/modifier config |
| \`/cost\` | Statistiques tokens |
| \`/doctor\` | Vérification santé |
| \`/agents\` | Gérer sous-agents |
| \`/mcp\` | Serveurs MCP |
| \`/memory\` | Éditer CLAUDE.md |
| \`/permissions\` | Sécurité |
| \`/review\` | Revue de code |
| \`/vim\` | Mode Vim |
| \`/rewind\` | Revenir état antérieur |
| \`/sandbox\` | Bash isolé |

### ⚙️ Configuration

**Ordre de priorité des fichiers**:
1. \`/etc/claude-code/managed-settings.json\` (entreprise)
2. \`.claude/settings.local.json\` (projet, git-ignoré)
3. \`.claude/settings.json\` (équipe partagée)
4. \`~/.claude/settings.json\` (utilisateur global)

**Commandes config**:
\`\`\`bash
claude config list              # Voir tous les paramètres
claude config get <clé>         # Obtenir une valeur
claude config set <clé> <val>   # Définir une valeur
claude config add <clé> <val>   # Ajouter à tableau
claude config remove <clé>      # Supprimer
\`\`\`

### 📁 Emplacements Fichiers Clés

| Fichier/Dossier | Description |
|-----------------|-------------|
| \`~/.claude/settings.json\` | Paramètres globaux utilisateur |
| \`.claude/settings.json\` | Paramètres projet |
| \`.claude/settings.local.json\` | Paramètres locaux (ignoré git) |
| \`.claude/commands/\` | Commandes slash personnalisées |
| \`.claude/agents/\` | Sous-agents projet |
| \`.claude/skills/\` | Agent skills |

### 🤖 Modèles AI

| Modèle | ID | Caractéristique |
|--------|-----|-----------------|
| **Opus 4.5** | \`claude-opus-4-5-20251101\` | Plus capable avec thinking |
| **Sonnet 4** | \`claude-sonnet-4-20250514\` | Performance équilibrée |
| **Haiku 3.5** | \`claude-3-5-haiku-20241022\` | Plus rapide |

### 🔌 Serveurs MCP Populaires

\`\`\`bash
# Playwright - Automatisation navigateur
claude mcp add playwright npx @playwright/mcp@latest

# Context7 - Accès documentation
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# 100+ intégrations disponibles
# GitHub, Notion, Linear, Figma, Stripe, Slack, Asana, etc.
\`\`\`

### 🌿 Git Worktrees

\`\`\`bash
# Créer worktree avec branche
git worktree add ../app-feature -b feature main

# Lister worktrees
git worktree list

# Supprimer worktree
git worktree remove <path>
\`\`\`

### 🔄 Checkpointing & Rewind

- Suivi automatique des modifications fichiers
- \`Esc+Esc\` pour menu rewind
- ⚠️ Modifications bash non tracées - utiliser Git pour historique permanent

### 🎯 Mode Headless (Non-interactif)

\`\`\`bash
# Requête simple
claude -p "requête"

# Format JSON
claude -p --output-format json "req"

# Continuer session
claude --resume <id> -p "requête"

# Input piped
echo "requête" | claude -p
\`\`\`

### 🎭 Agent Skills

Capacités modulaires dans \`.claude/skills/\`:
- Détectées automatiquement
- Activées par Claude (pas utilisateur)
- Exemples: \`generating-commit-messages\`, \`code-reviewer\`, \`debugger\`

### ✏️ Slash Commands Personnalisés

Créer dans \`.claude/commands/\`:

\`\`\`yaml
---
argument-hint: [param1] [param2]
description: Description affichée
allowed-tools: Bash(git add:*), Read
model: claude-opus-4-5-20251101
---
Votre prompt personnalisé ici.
\`\`\`

### 🔐 Permissions & Sécurité

Niveaux typiques:
- **Basique**: Allow npm/git; Deny .env, rm -rf
- **Strict**: Ask tous Bash/Write/Edit; Deny clés API

Format dans \`.claude/settings.json\` avec \`allow\`, \`ask\`, \`deny\`

### 🪝 Hooks & Automation

Événements disponibles:
- \`PreToolUse\`, \`PostToolUse\`
- \`UserPromptSubmit\`
- \`SessionStart\`, \`SessionEnd\`
- \`Stop\`

⚠️ **Sécurité**: Revoir code avant ajout hooks

---

## 📐 PARTIE 2: SPECKIT / SPECIFY

### 🎯 Qu'est-ce que Speckit ?

**Spec Kit** est un toolkit open-source pour le **Spec-Driven Development** — une méthodologie où les spécifications deviennent des blueprints exécutables.

**Philosophie**: Les spécifications génèrent directement des implémentations fonctionnelles.

### 📦 Installation Speckit

\`\`\`bash
# Installation persistante (recommandé)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Usage unique
uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>
\`\`\`

### 🎮 Commandes Principales

\`\`\`bash
# Initialiser nouveau projet
specify init <name>

# Valider système et requirements
specify check
\`\`\`

**Options d'initialisation**:
\`\`\`bash
# Spécifier agent AI
specify init <name> --ai claude

# Initialiser dans répertoire actuel
specify init . --ai copilot
specify init --here --ai gemini

# Force merge
specify init . --force --ai claude

# Sans git
specify init <name> --ai claude --no-git

# Mode debug
specify init <name> --ai claude --debug
\`\`\`

### ⚡ Commandes Slash Speckit

**Workflow Principal**:

| Commande | Description |
|----------|-------------|
| \`/speckit.constitution\` | Établir principes gouvernance projet |
| \`/speckit.specify\` | Définir requirements et user stories |
| \`/speckit.plan\` | Créer stratégie d'implémentation technique |
| \`/speckit.tasks\` | Générer listes de tâches actionnables |
| \`/speckit.implement\` | Exécuter toutes tâches et construire features |

**Améliorations Optionnelles**:

| Commande | Description |
|----------|-------------|
| \`/speckit.clarify\` | Résoudre zones sous-spécifiées |
| \`/speckit.analyze\` | Vérifier cohérence cross-artifact |
| \`/speckit.checklist\` | Générer checklists validation qualité |

### 🔄 Workflow de Développement Speckit

#### Étape 1: Établir Principes
\`/speckit.constitution\` - Définir standards qualité code, attentes tests, cohérence UX, exigences performance.

#### Étape 2: Spécifier Requirements
\`/speckit.specify\` - Décrire **quoi** construire (pas **comment**). Focus sur scénarios utilisateur et résultats.

#### Étape 3: Planifier Implémentation
\`/speckit.plan\` - Choisir stack technique et approche architecture.

#### Étape 4: Créer Tâches
\`/speckit.tasks\` - Découper plan en tâches développement actionnables.

#### Étape 5: Exécuter
\`/speckit.implement\` - L'agent AI construit selon spécification complète.

### 🤖 Agents AI Supportés

**✅ Support Complet**:
Claude Code, GitHub Copilot, Gemini CLI, Cursor, Qwen Code, opencode, Windsurf, Kilo Code, Auggie CLI, CodeBuddy CLI, Roo Code, Codex CLI, Amp, SHAI

**⚠️ Support Limité**:
Amazon Q Developer CLI (ne supporte pas arguments slash commands personnalisés)

### 🎯 Caractéristiques Clés

- **Agnostique technologique**: Fonctionne avec n'importe quel stack
- **Enterprise-ready**: Supporte contraintes organisationnelles
- **Développement itératif**: Greenfield, exploration créative, modernisation brownfield
- **Qualité structurée**: Spécifications comme "tests unitaires en français"

### 📋 Prérequis Speckit

- Linux, macOS, ou Windows
- Python 3.11+
- Git
- UV package manager
- Agent AI coding supporté

---

## 💡 Bonnes Pratiques

### Claude Code
✅ Checkpoints pour récupération rapide + Git pour historique
✅ Worktrees pour features parallèles sans perte contexte
✅ Permissions restrictives pour projets sensibles
✅ MCP pour outils externes sûrs
✅ Subagents + Skills pour workflows complexes réutilisables
✅ Hooks pour automatiser formatage/logging

> 💡 **Voir aussi**: [Boris Bible](boris-bible.html) pour patterns pratiques de Boris Cherny (créateur de Claude Code)

### Speckit
✅ Intent-first development: Définir requirements avant détails
✅ Raffinement multi-étapes avec guides AI
✅ Spécifications riches avec principes organisationnels
✅ Utiliser comme tests unitaires pour English

> 💡 **Voir aussi**: [Agents Software](agents-software.html) pour automatiser le workflow Speckit

---

## 📚 Ressources & Crédits

${sources.officialSources.map(s => `### ${s.name}
- **URL**: [${s.url}](${s.url})
- **Description**: ${s.description}
- **Maintenu par**: ${s.maintainer}`).join('\n\n')}

---

## 📄 À Propos de ce Document

**Woodman** est un document de référence généré automatiquement combinant:
- Les informations officielles de Claude Code
- Le guide complet Speckit de GitHub
- Les cheatsheets visuels de la communauté

**Version**: ${VERSION}
**Dernière mise à jour**: ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman - Votre guide de survie pour Claude Code & Speckit*
`;

  fs.writeFileSync(path.join(__dirname, 'woodman.md'), content, 'utf8');
  console.log('✅ woodman.md généré');
};

// =============================================================================
// DOCUMENT 2: BORIS BIBLE (boris-bible.md)
// =============================================================================

const generateBorisBible = () => {
  const content = `---
title: "Boris Bible - Patterns Pratiques Claude Code"
description: "Comment Boris Cherny (créateur de Claude Code) utilise Claude Code en production"
version: "${VERSION}"
created: "${GENERATION_DATE}"
author: "Boris Cherny"
handle: "@boris_cherny"
tags: ["boris-bible", "claude-code", "best-practices", "patterns", "workflow"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 📖 Boris Bible

> Comment Boris Cherny (créateur de Claude Code) utilise Claude Code

**Par**: [@boris_cherny](https://twitter.com/boris_cherny)

---

## 📌 Introduction

Je suis Boris et j'ai créé Claude Code. Beaucoup de gens m'ont demandé comment j'utilise Claude Code, donc je voulais partager un peu mon setup.

Mon setup est peut-être étonnamment *vanilla* ! Claude Code fonctionne très bien out of the box, donc personnellement je ne le personnalise pas beaucoup. Il n'y a pas **une seule bonne façon** d'utiliser Claude Code : nous le construisons intentionnellement de manière à ce que vous puissiez l'utiliser, le personnaliser et le bidouiller comme vous le souhaitez.

---

## 🎯 Les 13 Patterns

${patterns.patterns.map((p, i) => `### ${i + 1}. ${p.title}

**Catégorie**: ${p.category}

${p.description}

**Implémentation**: ${p.implementation}

${p.example ? `**Exemple**: ${p.example}` : ''}

${p.relatedAgents ? `> 💡 **Agents associés**: ${p.relatedAgents.map(a => `[${a}](agents-software.html#${a.split('/')[1]})`).join(', ')}` : ''}

---
`).join('\n')}

## 🎬 Workflow Complet Recommandé

### Setup Matin
1. **Terminal**: 5 sessions Claude (tabs 1-5)
2. **Web**: 5-10 sessions sur claude.ai/code
3. **Mobile**: 2-3 sessions iOS App

### Développement
1. **Plan Mode** (shift+tab x2) - Définir le plan
2. **Iteration** - Raffiner jusqu'à satisfaction
3. **Auto-accept** (shift+tab) - Laisser Claude implémenter
4. **Hooks** - PostToolUse formate automatiquement
5. **Subagents** - code-simplifier, verify-app pour polish

### Code Review
1. Tag @.claude sur PRs pour enrichir CLAUDE.md
2. GitHub Action ajoute automatiquement à CLAUDE.md
3. Compounding Engineering: Le projet s'améliore constamment

### Vérification (🔑 Pattern le plus important)
- Donner à Claude un moyen de **vérifier son travail**
- Feedback loop = **2-3x amélioration qualité**
- Exemple: Tests Chrome extension automatiques

---

## 📊 Impact des Patterns

| Pattern | Impact Productivité | Impact Qualité | Effort Setup |
|---------|-------------------|---------------|--------------|
| Parallel Sessions | ⭐⭐⭐ | ⭐⭐ | Facile |
| Opus 4.5 | ⭐⭐⭐ | ⭐⭐⭐ | Trivial |
| Shared CLAUDE.md | ⭐⭐ | ⭐⭐⭐ | Moyen |
| Plan Mode | ⭐⭐⭐ | ⭐⭐⭐ | Trivial |
| Slash Commands | ⭐⭐⭐ | ⭐⭐ | Moyen |
| Subagents | ⭐⭐ | ⭐⭐⭐ | Difficile |
| PostToolUse Hook | ⭐⭐ | ⭐⭐⭐ | Moyen |
| Permissions | ⭐⭐ | ⭐⭐ | Facile |
| Tool Integration | ⭐⭐⭐ | ⭐⭐ | Difficile |
| **Verification Loop** | ⭐⭐⭐ | ⭐⭐⭐ | **Critique** |

---

## 🔗 Ressources

- **Documentation officielle**: [code.claude.com/docs](https://code.claude.com/docs)
- **Référence Claude Code**: [woodman.html](woodman.html)
- **Agents Woodman**: [agents-software.html](agents-software.html)

---

## 💬 Citation Clé

> *"Probably the most important thing to get great results out of Claude Code -- give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."*
>
> — Boris Cherny, créateur de Claude Code

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v${VERSION}*
`;

  fs.writeFileSync(path.join(__dirname, 'boris-bible.md'), content, 'utf8');
  console.log('✅ boris-bible.md généré');
};

// =============================================================================
// DOCUMENT 3: SOFTWARE AGENTS (agents-software.md)
// =============================================================================

const generateSoftwareAgents = () => {
  const content = `---
title: "Woodman Agents Software - Développement Assisté par IA"
description: "Collection d'agents spécialisés pour développement logiciel: spec, todo, audits, sync, déploiement, tests"
version: "${VERSION}"
created: "${GENERATION_DATE}"
tags: ["agents", "software-development", "ai-assisted", "automation"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 🤖 Woodman Agents Software

> Agents de développement assisté par IA

---

## 📋 Agents Core (01-09)

${agents.software.core.map(agent => `### ${agent.id}. ${agent.name}

**Description**: ${agent.description}

**Modèle**: \`${agent.model}\`

**Use cases**:
${agent.useCases.map(uc => `- ${uc}`).join('\n')}

${agent.stacks ? `**Stacks supportés**: ${agent.stacks.join(', ')}` : ''}

> 📄 [Voir le fichier agent](${agent.file})

---
`).join('\n')}

## 🔍 Stack Analyzers (10-analyze/)

${agents.software.analyzers.map(agent => `### ${agent.id}. ${agent.name}

**Stack**: ${agent.stack}

**Description**: ${agent.description}

**Modèle**: \`${agent.model}\`

> 📄 [Voir le fichier agent](${agent.file})

---
`).join('\n')}

## 🚀 Deploy Agents (11-deploy/)

${agents.software.deploy.map(agent => `### ${agent.id}. ${agent.name}

**Plateforme**: ${agent.platform}

**Description**: ${agent.description}

**Modèle**: \`${agent.model}\`

> 📄 [Voir le fichier agent](${agent.file})

---
`).join('\n')}

## 🧪 Test Agents (12-test/)

${agents.software.testing.map(agent => `### ${agent.id}. ${agent.name}

**Frameworks**: ${agent.frameworks.join(', ')}

**Description**: ${agent.description}

**Modèle**: \`${agent.model}\`

> 📄 [Voir le fichier agent](${agent.file})

---
`).join('\n')}

## 🔄 Workflows Types

### Setup Nouveau Projet
\`\`\`
01-spec-writer → 02-todo-generator → 03-sync-local → 09-context-generator → 08-external-sync
\`\`\`

1. **spec-writer**: Analyse le projet, détecte la stack, génère spec.md
2. **todo-generator**: Parse la spec, crée todo.md avec tâches priorisées
3. **sync-local**: Met à jour CLAUDE.md et README.md
4. **context-generator**: Génère llm.txt (snapshot 15K pour onboarding LLM)
5. **external-sync**: Push vers Linear/Notion (optionnel)

### Session Développement
\`\`\`
04-task-runner (status) → 04 (resume) → 04 (report)
\`\`\`

### Audits Pré-Release
\`\`\`
05-code-auditor + 06-a11y-auditor + 07-perf-auditor → Corrections → 03-sync-local
\`\`\`

---

## 🎯 Commandes Rapides

### Spec & Todo
- \`"Génère une spec"\`
- \`"Génère une todo depuis la spec"\`
- \`"Analyse ce projet et crée spec + todo"\`

### Documentation
- \`"Synchronise la doc locale"\`
- \`"Mets à jour le README"\`
- \`"Génère le contexte du projet"\`

### Développement
- \`"Quelle est la prochaine tâche ?"\`
- \`"Continue la tâche en cours"\`
- \`"Rapport de progression"\`

### Audits
- \`"Audit code complet"\`
- \`"Audit performance"\`
- \`"Audit accessibilité"\`

### Déploiement
- \`"Déploie sur Vercel"\`
- \`"Configure Docker"\`
- \`"Setup AWS S3 + CloudFront"\`

### Tests
- \`"Configure Jest pour ce projet"\`
- \`"Génère des tests E2E avec Playwright"\`

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

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v${VERSION}*
`;

  fs.writeFileSync(path.join(__dirname, 'agents-software.md'), content, 'utf8');
  console.log('✅ agents-software.md généré');
};

// =============================================================================
// DOCUMENT 4: VPS AGENTS (agents-vps.md)
// =============================================================================

const generateVPSAgents = () => {
  const content = `---
title: "Woodman Agents VPS - Gestion Infrastructure"
description: "Agents pour gestion automatisée d'infrastructure VPS: sécurité, Docker, déploiement, monitoring, backups"
version: "${VERSION}"
created: "${GENERATION_DATE}"
tags: ["agents", "vps", "infrastructure", "devops", "automation"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 🖥️ Woodman Agents VPS

> Agents de gestion d'infrastructure automatisée

---

## 📋 Agents Core (00-16)

${agents.vps.core.map(agent => `### ${agent.id}. ${agent.name}

**Description**: ${agent.description}

**Modèle**: \`${agent.model}\`

**Use cases**:
${agent.useCases.map(uc => `- ${uc}`).join('\n')}

${agent.services ? `**Services supportés**: ${agent.services.slice(0, 5).join(', ')}${agent.services.length > 5 ? `, et ${agent.services.length - 5} autres...` : ''}` : ''}

> 📄 [Voir le fichier agent](${agent.file})

---
`).join('\n')}

## 🔄 Patterns d'Orchestration

### Séquentiel
\`\`\`
01-audit → 02-securite → 04-docker → 05-deploiement → 07-monitoring
\`\`\`

### Parallèle
\`\`\`
08-backups + 12-documentation + 14-cleanup → Consolidation
\`\`\`

### Conditionnel
\`\`\`
01-audit → [si problème] → 10-incidents → Résolution
\`\`\`

### Rollback
\`\`\`
05-deploiement → [si échec] → Rollback automatique
\`\`\`

---

## ⚡ 16-installateur: Magic Installer

L'agent **16-installateur** est un installateur "magique" qui peut configurer **30+ services** en une commande :

### AI/ML
- Ollama, Stable Diffusion, ComfyUI

### Databases
- PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch

### Storage
- Minio, Nextcloud, Seafile

### Monitoring
- Grafana, Prometheus, Portainer, Uptime Kuma

### Messaging
- RabbitMQ, Kafka, NATS

### CMS
- WordPress, Ghost, Discourse, GitLab

**Capacité**: Une seule commande automatise :
- docker-compose configuration
- Variables d'environnement
- Traefik setup (reverse-proxy + TLS)
- Lancement du service
- Vérification fonctionnelle
- Génération documentation

---

## 🎯 Niveaux de Validation

| Niveau | Type | Actions | Validation |
|--------|------|---------|------------|
| 🟢 **Info** | Lecture seule | Audit, status, logs | Aucune |
| 🟡 **Standard** | Réversible | Config, restart | Aucune |
| 🟠 **Important** | Config critique | Modif réseau, TLS | Confirmation simple |
| 🔴 **Critique** | Destructif | Suppression, migration | Confirmation explicite |

---

## 🔄 Workflows Types

### Setup Serveur Neuf
\`\`\`
01-audit → 02-securite → 03-reseau → 04-docker → 06-cicd → 07-monitoring → 08-backups
\`\`\`

### Déploiement Application
\`\`\`
01-audit → 04-docker (verify) → 05-deploiement → 07-monitoring (setup alerts)
\`\`\`

### Troubleshooting Incident
\`\`\`
10-incidents (diagnostic) → [fix] → 07-monitoring (verify) → 12-documentation (runbook)
\`\`\`

### Migration Serveur
\`\`\`
01-audit (source) → 08-backups (full) → 11-migration → 03-reseau (DNS) → Validation
\`\`\`

### Maintenance Régulière
\`\`\`
14-cleanup → 09-couts-ressources → 08-backups (rotation) → 12-documentation (update)
\`\`\`

---

## 🎯 Commandes Rapides

### Audit & Diagnostic
- \`"Audit santé serveur"\`
- \`"État Docker complet"\`
- \`"Diagnostic réseau"\`

### Sécurité
- \`"Hardening serveur"\`
- \`"Setup fail2ban"\`
- \`"Audit certificats TLS"\`

### Déploiement
- \`"Déploie avec docker-compose"\`
- \`"Rollback dernière version"\`
- \`"Setup pipeline CI/CD"\`

### Monitoring
- \`"Setup Uptime Kuma"\`
- \`"Configure alertes"\`
- \`"Dashboard Grafana"\`

### Backups
- \`"Backup complet maintenant"\`
- \`"Test restore dernier backup"\`
- \`"Setup rotation 7-30-12"\`

### Magic Installer
- \`"Installe PostgreSQL"\`
- \`"Installe Grafana + Prometheus"\`
- \`"Setup Ollama pour LLM"\`

---

## 📊 Modèles par Complexité

| Catégorie | Agents | Modèle |
|-----------|--------|--------|
| **Orchestration** | 00 | opus |
| **Sécurité** | 02 | opus |
| **Migration** | 11 | opus |
| **Tous les autres** | 01, 03-10, 12-16 | sonnet |

---

## 🔗 Ressources

- **Référence Claude Code**: [woodman.html](woodman.html)
- **Patterns Boris**: [boris-bible.html](boris-bible.html)
- **Agents Software**: [agents-software.html](agents-software.html)

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v${VERSION}*
`;

  fs.writeFileSync(path.join(__dirname, 'agents-vps.md'), content, 'utf8');
  console.log('✅ agents-vps.md généré');
};

// =============================================================================
// MAIN EXECUTION
// =============================================================================

console.log('🪵 Woodman Unified Documentation Generator v' + VERSION);
console.log('');
console.log('📄 Génération des documents...');
console.log('');

generateClaudeCodeReference();
generateBorisBible();
generateSoftwareAgents();
generateVPSAgents();

console.log('');
console.log('✅ Tous les documents ont été générés avec succès!');
console.log('');
console.log('📋 Fichiers créés:');
console.log('  1. woodman.md - Référence Claude Code & Speckit');
console.log('  2. boris-bible.md - Patterns pratiques Boris Cherny');
console.log('  3. agents-software.md - Agents développement logiciel');
console.log('  4. agents-vps.md - Agents gestion infrastructure');
console.log('');
console.log('🪵 Woodman v' + VERSION + ' - Ready to deploy!');
