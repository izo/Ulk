#!/usr/bin/env node

/**
 * Woodman - Claude Code & Speckit Reference Generator
 *
 * Generates a comprehensive frontmatter document with information from:
 * - awesomeclaude.ai/code-cheatsheet
 * - github.com/github/spec-kit
 * - Local cheatsheet resources
 */

const fs = require('fs');
const path = require('path');

// Source management system
const sources = [
  {
    name: "Claude Code Official",
    url: "https://awesomeclaude.ai/code-cheatsheet",
    description: "Cheatsheet interactif officiel pour Claude Code",
    maintainer: "awesomeclaude.ai"
  },
  {
    name: "Spec Kit by GitHub",
    url: "https://github.com/github/spec-kit",
    description: "Toolkit open-source pour Spec-Driven Development",
    maintainer: "GitHub"
  },
  {
    name: "Claude Code",
    url: "https://claude.ai",
    description: "Assistant de code officiel développé par Anthropic",
    maintainer: "Anthropic"
  }
];

const content = `---
title: "Woodman - Guide Complet Claude Code & Speckit"
description: "Guide de référence rapide pour Claude Code et Speckit avec raccourcis, commandes et workflows"
version: "1.0.0"
created: "${new Date().toISOString()}"
logo: "woodman.png"
logo_mini: "woodman-mini.png"
tags: ["woodman", "claude-code", "speckit", "cheatsheet", "référence"]
sources:
${sources.map(s => `  - name: "${s.name}"
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
| **Opus 4.1** | \`claude-opus-4-1-20250805\` | Plus capable |
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
model: claude-opus-4-1-20250805
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

### Speckit
✅ Intent-first development: Définir requirements avant détails
✅ Raffinement multi-étapes avec guides AI
✅ Spécifications riches avec principes organisationnels
✅ Utiliser comme tests unitaires pour English

---

## 📚 Ressources & Crédits

${sources.map(s => `### ${s.name}
- **URL**: [${s.url}](${s.url})
- **Description**: ${s.description}
- **Maintenu par**: ${s.maintainer}`).join('\n\n')}

---

## 📄 À Propos de ce Document

**Woodman** est un document de référence généré automatiquement combinant:
- Les informations officielles de Claude Code
- Le guide complet Speckit de GitHub
- Les cheatsheets visuels de la communauté

**Version**: 1.0.0
**Dernière mise à jour**: ${new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman - Votre guide de survie pour Claude Code & Speckit*
`;

// Write the document
const outputPath = path.join(__dirname, 'woodman.md');
fs.writeFileSync(outputPath, content, 'utf8');

// Check for logo files
const logoPath = path.join(__dirname, 'woodman.png');
const miniLogoPath = path.join(__dirname, 'woodman-mini.png');

console.log('✅ Document Woodman généré avec succès!');

// Check logo files existence
if (!fs.existsSync(logoPath)) {
  console.log('⚠️  Logo principal manquant: woodman.png');
}
if (!fs.existsSync(miniLogoPath)) {
  console.log('⚠️  Logo mini manquant: woodman-mini.png');
  console.log('   💡 Créez une version 32x32px de woodman.png');
}
console.log('📄 Fichier créé: ' + outputPath);
console.log('');
console.log('📋 Contenu inclus:');
console.log('  🤖 CLAUDE CODE:');
console.log('    - Installation & Configuration');
console.log('    - Raccourcis clavier');
console.log('    - Commandes slash');
console.log('    - Serveurs MCP');
console.log('    - Git Worktrees');
console.log('    - Skills & Subagents');
console.log('    - Hooks & Automation');
console.log('');
console.log('  📐 SPECKIT/SPECIFY:');
console.log('    - Installation');
console.log('    - Commandes principales');
console.log('    - Workflow de développement');
console.log('    - Agents AI supportés');
console.log('    - Bonnes pratiques');
console.log('');
console.log('  📚 SOURCES:');
sources.forEach(s => {
  console.log('    - ' + s.name + ' (' + s.maintainer + ')');
});
console.log('');
console.log('🪵 Woodman v1.0 - Ready to use!');
