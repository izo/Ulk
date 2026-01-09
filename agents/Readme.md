# Agents Woodman

Suite d'agents spécialisés pour le développement assisté par IA.

---

## 📋 Liste des Agents

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
└── 09-context-generator.md # Génère llm.txt (snapshot 15K pour onboarding LLM)
```

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
"Quick wins perf"
```

### Sync Externe
```
"Synchronise avec Notion et Linear"
"Push vers Linear"
"Import depuis Notion"
"Setup l'espace Notion"
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
