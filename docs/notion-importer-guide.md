---
title: Notion Importer Guide
description: Guide d'utilisation de l'agent notion-importer pour extraire du contenu depuis Notion
date: 2026-01-19
category: guides
agent: notion-importer
version: 1.8.0
---

# Guide : Notion Importer

Guide complet pour utiliser l'agent **notion-importer (21)** qui extrait du contenu depuis Notion vers des fichiers locaux structurés.

---

## 📋 Vue d'ensemble

**notion-importer** lit une page Notion maîtresse contenant des liens vers d'autres pages, explore récursivement tout le contenu, et génère deux fichiers dans `/docs` :
- `spec_notion.md` - Spécifications, architecture, contexte
- `todo_notion.md` - Tâches priorisées (P0-P3)

**Direction** : Unidirectionnel (Notion → Local uniquement)

---

## 🚀 Installation

### Prérequis

1. **MCP Notion** doit être configuré dans Claude Code
2. Accès en lecture aux pages Notion que tu veux importer

### Installation globale (recommandée)

```bash
# Depuis la racine du repo Woodman
./install.sh
```

L'agent sera disponible globalement dans tous tes projets :

```bash
/woodman:agents:notion-importer
```

---

## 💡 Utilisation de base

### Invocation

Tu peux lancer l'agent de plusieurs façons :

```bash
# Avec la commande
/woodman:agents:notion-importer

# Ou naturellement en français
"Importer depuis Notion"
"Import ma page Notion"
"Importer [URL Notion]"
```

### Workflow interactif

L'agent te posera des questions :

1. **URL ou ID de la page maîtresse** (la page principale avec tous les liens)
2. **Profondeur d'exploration** (1-3 niveaux ou illimité)
3. **Inclure les databases ?** (Oui/Non)
4. **Mode de génération** (Auto ou Guidé)

---

## 📖 Exemples d'utilisation

### Exemple 1 : Onboarding sur un projet existant

**Contexte** : Tu rejoins un projet documenté dans Notion et tu veux tout importer localement.

```
Toi: "Importer depuis Notion"

Agent: 🔗 URL ou ID de la page Notion maîtresse ?
Toi: https://notion.so/workspace/Projet-ABC-123abc

Agent: 📊 Options d'import
1. Profondeur : 3 niveaux (recommandé)
2. Databases : Oui
3. Mode : Auto
Toi: Confirme

Agent:
✅ 15 pages lues
✅ 2 databases extraites (42 lignes)
✅ docs/spec_notion.md généré (234 lignes)
✅ docs/todo_notion.md généré (28 tâches)
```

**Résultat** :
- `docs/spec_notion.md` contient toute l'architecture, les specs, les décisions
- `docs/todo_notion.md` contient toutes les tâches priorisées et actionnables
- Tu peux maintenant travailler localement sans ouvrir Notion

---

### Exemple 2 : Migration Notion → Linear

**Contexte** : Tu veux migrer ton projet de Notion vers Linear.

```bash
# Étape 1 : Import depuis Notion
"Importer mon projet Notion"
→ Génère docs/spec_notion.md + docs/todo_notion.md

# Étape 2 : Sync vers Linear
"Sync vers Linear avec les tâches importées"
→ external-sync (08) lit docs/todo_notion.md
→ Crée le projet Linear
→ Push toutes les tâches
```

**Workflow complet** :
```
notion-importer (21) → external-sync (08) → Linear
```

---

### Exemple 3 : Backup régulier

**Contexte** : Tu veux archiver ton espace Notion pour avoir un backup local.

```
Toi: "Archiver mon espace Notion projet XYZ"

Agent: Configure l'import
- Profondeur : Illimitée
- Databases : Oui
- Fichiers : spec_notion_2026-01-19.md

Résultat:
✅ 45 pages archivées
✅ Backup complet dans /docs
✅ Métadonnées sauvegardées
```

---

## 📊 Options d'exploration

### Profondeur

| Option | Description | Cas d'usage |
|--------|-------------|-------------|
| **1 niveau** | Page maîtresse uniquement | Aperçu rapide |
| **2 niveaux** | Page + pages liées directement | Import modéré |
| **3 niveaux** (recommandé) | Page + sous-pages + sous-sous-pages | Import complet standard |
| **Illimité** | Suit tous les liens récursivement | Backup exhaustif (attention à la durée) |

### Databases

**Inclure les databases Notion ?**

- ✅ **Oui** : Extrait le contenu complet des tables Notion (propriétés + lignes)
  - Utile pour importer des roadmaps, task lists, inventaires
  - Mapping automatique des propriétés Notion → Markdown

- ❌ **Non** : Ignore les databases, plus rapide
  - Utile si tu ne veux que les pages textuelles

### Mode de génération

- **Auto** : L'agent décide automatiquement ce qui va dans spec vs todo
  - Recommandé pour la plupart des cas
  - Utilise l'analyse intelligente du contenu

- **Guidé** : L'agent te demande pour chaque section ambiguë
  - Plus de contrôle
  - Utile si tu as une structure Notion non-standard

---

## 📂 Fichiers générés

### docs/spec_notion.md

Structure automatique :

```markdown
---
source: notion
notion_page_id: abc123...
notion_page_url: https://notion.so/...
imported_at: 2026-01-19T10:30:00Z
pages_explored: 15
depth: 3
---

# Spécification — Import Notion

## 📋 Vue d'ensemble
[Résumé global]

## 📐 Architecture & Stack Technique
[Technologies, composants, diagrammes]

## 🎯 Fonctionnalités
[Features, user stories, workflows]

## 📊 Data Models
[Structure des données]

## 🔒 Contraintes & Requirements
[Contraintes techniques et métier]

## 📝 Notes & Décisions
[Décisions, questions, références]

## 📎 Pages Notion sources
[Tableau des pages explorées avec URLs]
```

### docs/todo_notion.md

Structure automatique :

```markdown
---
source: notion
tasks_count: 28
---

# TODO — Import Notion

## 📊 Vue d'ensemble
- 🔴 P0 : 3 tâches
- 🟠 P1 : 8 tâches
- 🟡 P2 : 12 tâches
- 🟢 P3 : 5 tâches

## Phase 1 : Setup

### 🔴 P0 — Urgent
- [ ] **#001** — Configurer l'environnement
  - **Description**: ...
  - **Critères**: ...
  - **Notion**: [lien]

### 🟠 P1 — High
[...]

## 🔗 Mapping Notion
[Tableau de correspondance IDs locaux ↔ IDs Notion]
```

### docs/.notion-import-meta.json

Métadonnées de tracking :

```json
{
  "lastImport": "2026-01-19T10:30:00Z",
  "masterPage": {
    "id": "abc123...",
    "url": "https://notion.so/...",
    "title": "Projet XYZ"
  },
  "exploration": {
    "depth": 3,
    "pagesRead": 15,
    "databasesRead": 2
  },
  "generated": {
    "specPath": "docs/spec_notion.md",
    "todoPath": "docs/todo_notion.md",
    "todoTasks": 28
  }
}
```

---

## 🔀 Différences avec external-sync (08)

| Critère | notion-importer (21) | external-sync (08) |
|---------|---------------------|-------------------|
| **Direction** | Unidirectionnel (Notion → Local) | Bidirectionnel (↔) |
| **Scope** | Une page + ses liens | Workspace complet |
| **Fichiers** | `docs/spec_notion.md`, `docs/todo_notion.md` | `spec.md`, `todo.md` (racine) |
| **Databases** | Lecture seule | Lecture + Écriture |
| **Conflits** | N/A (import only) | Résolution interactive |
| **Use case** | Import initial/ponctuel | Synchronisation continue |

**Utilisation conjointe** :
```
notion-importer → Import initial depuis Notion
external-sync → Sync continue avec Notion/Linear
```

---

## ⚙️ Mapping des propriétés Notion

Si tes tâches viennent d'une database Notion, l'agent mappe automatiquement :

| Propriété Notion | Champ todo.md |
|------------------|---------------|
| Name/Title | Titre de la tâche |
| Status | `[ ]` (Todo) / `[x]` (Done) |
| Priority | 🔴 P0 / 🟠 P1 / 🟡 P2 / 🟢 P3 |
| Due Date | Deadline |
| Assignee | Assigné à |
| Description | Description |
| Tags/Category | Catégorie emoji |

---

## 🔧 Gestion des fichiers existants

Si `docs/spec_notion.md` ou `docs/todo_notion.md` existent déjà, l'agent demande :

```
⚠️ spec_notion.md existe déjà

Options :
1. Écraser (le contenu actuel sera perdu)
2. Créer spec_notion_[timestamp].md (backup)
3. Fusionner (ajouter le nouveau contenu)
4. Annuler
```

**Recommandation** : Option 2 pour garder un historique des imports.

---

## 💡 Bonnes pratiques

### 1. Prépare ta page Notion maîtresse

Avant l'import, organise ta page Notion :
- ✅ Mets tous les liens importants dans la page principale
- ✅ Structure claire avec des sections (Architecture, Tasks, Notes)
- ✅ Assure-toi d'avoir les permissions en lecture sur toutes les pages liées

### 2. Commence avec profondeur modérée

Pour un premier import :
- Utilise profondeur 2-3 pour tester
- Vérifie le résultat
- Relance en profondeur illimitée si besoin

### 3. Databases optionnelles

Si tu as beaucoup de databases :
- Première passe : Sans databases (rapide)
- Deuxième passe : Avec databases si nécessaire

### 4. Utilise les timestamps

Pour les backups réguliers :
- L'agent peut créer `spec_notion_2026-01-19.md`
- Garde un historique des évolutions

---

## 🚨 Limitations et notes

### Performance

- **50+ pages** : Peut prendre 2-5 minutes
- **Databases volumineuses** : Ajoute 30s-1min par database
- **Timeout** : 30s max par page (configurable)

### Permissions

- Tu dois avoir accès en **lecture** à toutes les pages
- Si une page est privée, elle sera ignorée (avec warning)

### Format Notion

L'agent convertit automatiquement :
- Headings → `# ## ###`
- Listes → `- ` ou `1. `
- To-do → `- [ ]` ou `- [x]`
- Code blocks → \`\`\`
- Callouts → `> **Note:**`
- Images → `![alt](url)`

### Contenu non supporté

- Embeds complexes (Figma, Miro) → convertis en liens
- Vidéos → lien vers la vidéo
- Databases inline complexes → structure simplifiée

---

## 🆘 Troubleshooting

### Erreur : MCP Notion non disponible

```
❌ Le MCP Notion n'est pas disponible
```

**Solution** : Configure le MCP Notion dans tes settings Claude Code.

### Erreur : Accès refusé à une page

```
⚠️ Accès refusé : [Titre page]
```

**Solution** : Vérifie les permissions Notion, assure-toi d'avoir accès en lecture.

### Timeout sur une page lourde

```
⏱️ Timeout sur : [Titre page]
```

**Solutions** :
1. Réduis la profondeur d'exploration
2. Exclure cette page (l'agent te propose)
3. Augmente le timeout (option avancée)

### Database trop volumineuse

```
⚠️ Database "[Nom]" contient 500+ lignes
```

**Solutions** :
1. Skip les databases pour cette import
2. Filtre la database dans Notion avant import
3. Import en plusieurs passes

---

## 📚 Ressources

- **Agent source** : `agents/21-notion-importer.md`
- **Custom Command** : `commands/agents/notion-importer.md`
- **CHANGELOG** : `CHANGELOG.md` (version 1.8.0)
- **Release notes** : https://github.com/izo/Woodman/releases/tag/v1.8.0

---

## 🔄 Workflows recommandés

### Workflow 1 : Onboarding nouveau projet

```bash
1. "Importer depuis Notion" → notion-importer
2. Vérifie docs/spec_notion.md et docs/todo_notion.md
3. "Génère un spec.md depuis spec_notion.md" → spec-writer
4. "Génère todo.md depuis spec.md" → todo-generator
5. "Démarre le travail" → task-runner
```

### Workflow 2 : Migration vers Linear

```bash
1. "Importer depuis Notion" → notion-importer
2. "Sync vers Linear" → external-sync (lit docs/todo_notion.md)
3. Vérifie le projet Linear
4. Continue avec Linear comme source de vérité
```

### Workflow 3 : Backup mensuel

```bash
1. "Archiver Notion projet [Nom]" → notion-importer
2. Git commit des fichiers générés
3. Tag git : backup-notion-YYYY-MM
4. Archive locale complète
```

---

## ✨ Prochaines étapes

Après l'import :

1. **Édite manuellement** si besoin (sections ambiguës)
2. **Utilise todo_notion.md** pour démarrer le travail
3. **Sync vers Linear** si migration prévue
4. **Convertis en spec.md** si tu veux une spec standard Woodman

Pour sync bidirectionnelle : utilise **external-sync (08)** à la place.

---

**Version** : 1.8.0
**Agent** : notion-importer (21)
**Model** : opus
**Date** : 2026-01-19
