---
title: Conventions Documentation
type: meta
category: meta
date: 2026-01-14
updated: 2026-01-14
status: active
author: documentalist
tags: [conventions, standards, frontmatter]
---

# Conventions de Documentation

> Conventions et standards pour toute la documentation générée par les agents Woodman

## Principe général

**Tous les agents doivent documenter leurs actions dans `/docs`**.

Après génération de documentation, lancer l'agent **documentalist** pour :
- Valider le frontmatter
- Ranger dans la bonne catégorie
- Mettre à jour l'index
- Vérifier la cohérence

---

## Structure des dossiers

```
docs/
├── 00-meta/              # Documentation sur la documentation
│   ├── index.md          # Index général (auto-généré)
│   └── conventions.md    # Ce fichier
│
├── 01-specs/             # Spécifications et architecture
│   ├── spec-YYYY-MM-DD.md
│   └── architecture/
│
├── 02-tasks/             # Historique des tâches
│   ├── todo-YYYY-MM-DD.md
│   └── completed/
│
├── 03-audits/            # Rapports d'audit
│   ├── code/
│   ├── performance/
│   └── accessibility/
│
├── 04-analysis/          # Analyses techniques
│   ├── stack/            # Analyses de stack (Nuxt, Next, Astro, etc.)
│   └── dependencies/
│
├── 05-deployment/        # Documentation de déploiement
│   ├── procedures/
│   └── incidents/
│
├── 06-testing/           # Documentation de tests
│   ├── unit/
│   └── e2e/
│
├── 07-api/               # Documentation API
│   ├── endpoints/
│   └── schemas/
│
├── 08-guides/            # Guides et tutoriels
│   ├── setup/
│   └── workflows/
│
├── 09-decisions/         # Architecture Decision Records (ADR)
│   └── adr-NNN-titre-kebab.md
│
└── 99-archive/           # Documentation obsolète
    └── YYYY/
```

---

## Nommage des fichiers

### Règles strictes

- ✅ **Minuscules uniquement**
- ✅ **Tirets `-` comme séparateurs** (kebab-case)
- ✅ **Dates ISO-8601** : `YYYY-MM-DD`
- ❌ **Pas d'espaces**
- ❌ **Pas de caractères spéciaux** (`_`, `#`, `@`, etc.)
- ❌ **Pas d'accents**

### Formats par type

| Type | Format | Exemple |
|------|--------|---------|
| **Spec** | `spec-YYYY-MM-DD.md` | `spec-2024-01-15.md` |
| **Todo** | `todo-YYYY-MM-DD.md` | `todo-2024-01-15.md` |
| **Audit** | `audit-TYPE-YYYY-MM-DD.md` | `audit-perf-2024-01-15.md` |
| **ADR** | `adr-NNN-titre-kebab.md` | `adr-001-migration-nuxt4.md` |
| **Guide** | `guide-titre-kebab.md` | `guide-setup-local.md` |
| **Rapport** | `report-TYPE-YYYY-MM-DD.md` | `report-test-2024-01-15.md` |
| **Analyse** | `analysis-STACK-YYYY-MM-DD.md` | `analysis-nuxt-2024-01-15.md` |

---

## Frontmatter obligatoire

### Structure de base

Tous les fichiers `.md` dans `/docs` **DOIVENT** avoir ce frontmatter :

```yaml
---
title: Titre du document
type: spec | audit | guide | report | adr | task | analysis
category: specs | audits | analysis | deployment | testing | api | guides | decisions | tasks | meta
date: 2024-01-15
updated: 2024-01-15
status: draft | active | deprecated | archived
author: agent-name | human
tags: [tag1, tag2, tag3]
---
```

### Champs obligatoires

| Champ | Type | Valeurs |
|-------|------|---------|
| `title` | string | Titre complet du document |
| `type` | enum | spec, audit, guide, report, adr, task, analysis |
| `category` | enum | specs, audits, analysis, deployment, testing, api, guides, decisions, tasks, meta |
| `date` | ISO-8601 | Date de création (YYYY-MM-DD) |
| `updated` | ISO-8601 | Date de dernière mise à jour |
| `status` | enum | draft, active, deprecated, archived |
| `author` | string | Nom de l'agent ou "human" |
| `tags` | array | Liste de tags (min 1, max 10) |

### Frontmatter optionnel par type

#### Type: `spec`

```yaml
version: 1.0.0
stack: nuxt | next | astro | laravel | wordpress | spip | swiftui | python | go | rust
scope: frontend | backend | fullstack | infra | mobile
```

#### Type: `audit`

```yaml
audit_type: code | performance | accessibility | security
severity: low | medium | high | critical
findings_count: 12
```

#### Type: `adr`

```yaml
decision_id: 001
status: proposed | accepted | rejected | superseded
supersedes: adr-000-previous.md
```

#### Type: `guide`

```yaml
difficulty: beginner | intermediate | advanced
duration: 15min | 30min | 1h | 2h+
prerequisites: [guide-1, guide-2]
```

#### Type: `analysis`

```yaml
stack: nuxt | next | astro | spip | swiftui
complexity: low | medium | high
recommendations_count: 8
```

---

## Workflow de documentation

### Quand documenter ?

Les agents suivants **doivent** générer de la documentation dans `/docs` :

| Agent | Documentation générée | Catégorie |
|-------|----------------------|-----------|
| `01-spec-writer` | `spec-YYYY-MM-DD.md` | `01-specs/` |
| `02-todo-generator` | `todo-YYYY-MM-DD.md` | `02-tasks/` |
| `05-code-auditor` | `audit-code-YYYY-MM-DD.md` | `03-audits/code/` |
| `06-a11y-auditor` | `audit-a11y-YYYY-MM-DD.md` | `03-audits/accessibility/` |
| `07-perf-auditor` | `audit-perf-YYYY-MM-DD.md` | `03-audits/performance/` |
| `10-analyze/*` | `analysis-STACK-YYYY-MM-DD.md` | `04-analysis/stack/` |
| `11-deploy/*` | `deployment-PLATFORM-YYYY-MM-DD.md` | `05-deployment/procedures/` |
| `12-test/*` | `report-test-TYPE-YYYY-MM-DD.md` | `06-testing/unit/` ou `e2e/` |

### Comment documenter ?

#### Étape 1 : Créer le fichier

```bash
# Exemple : spec-writer génère spec.md
docs/01-specs/spec-2024-01-15.md
```

#### Étape 2 : Ajouter le frontmatter complet

```yaml
---
title: Spécification Projet Woodman
type: spec
category: specs
date: 2024-01-15
updated: 2024-01-15
status: active
author: spec-writer
tags: [woodman, spec, agents]
version: 1.0.0
stack: node
scope: fullstack
---
```

#### Étape 3 : Écrire le contenu en Markdown

Utiliser Markdown standard avec sections claires :

```markdown
# Titre principal

## Section 1
...

## Section 2
...
```

#### Étape 4 : Lancer documentalist

```bash
# Validation et organisation automatique
documentalist audit
documentalist reorganize
```

---

## Validation

### Checklist avant commit

- [ ] Frontmatter présent et complet
- [ ] Dates au format ISO-8601 (YYYY-MM-DD)
- [ ] Nommage en kebab-case
- [ ] Fichier dans la bonne catégorie
- [ ] Tags pertinents (min 1, max 10)
- [ ] Status approprié (draft/active/deprecated/archived)
- [ ] Type et category cohérents

### Validation automatique

Le **documentalist** vérifie :

1. ✅ Présence du frontmatter (`---` en début de fichier)
2. ✅ Parsing YAML valide
3. ✅ Champs obligatoires présents
4. ✅ Format des dates ISO-8601
5. ✅ Valeurs enum valides (type, status, category)
6. ✅ Tags non vides
7. ✅ Cohérence type/category

### Correction des erreurs

**Frontmatter manquant** :
```bash
documentalist audit  # Détecte les fichiers sans frontmatter
documentalist clean  # Propose ajout automatique
```

**Nommage incorrect** :
```bash
# Mauvais : "Spec Project.md", "audit_perf.md"
# Bon : "spec-2024-01-15.md", "audit-perf-2024-01-15.md"
```

**Catégorie incorrecte** :
```bash
# Mauvais : docs/audit-perf.md
# Bon : docs/03-audits/performance/audit-perf-2024-01-15.md
```

---

## Métadonnées et suivi

### Fichier de métriques

Le documentalist track les métriques dans `.claude/docs-metrics.json` :

```json
{
  "last_audit": "2024-01-15T10:30:00Z",
  "total_files": 45,
  "valid_frontmatter": 42,
  "categories": {
    "specs": 5,
    "audits": 12,
    "guides": 8,
    "decisions": 6
  },
  "tags": {
    "performance": 8,
    "accessibility": 5,
    "security": 3
  },
  "health_score": 93,
  "issues": {
    "critical": 0,
    "warning": 3,
    "info": 5
  }
}
```

### Score de santé

Le health score (0-100) est calculé selon :

- **Frontmatter valide** : 40 points (% de fichiers avec frontmatter complet)
- **Nommage correct** : 20 points (% de fichiers bien nommés)
- **Catégories correctes** : 20 points (% de fichiers dans bonne catégorie)
- **Fraîcheur** : 10 points (% de docs < 6 mois)
- **Pas de doublons** : 10 points

**Score ≥ 90** : Excellent ✅
**Score 70-89** : Bon ⚠️
**Score < 70** : À améliorer ❌

---

## Index et navigation

### Index automatique

Le documentalist génère/met à jour automatiquement `docs/00-meta/index.md` avec :

- Liste par catégorie
- Liste par date (30 derniers jours)
- Liste par tag
- Statistiques globales

### Liens internes

Utiliser des liens relatifs :

```markdown
<!-- Bon -->
[Spec Projet](../01-specs/spec-2024-01-15.md)

<!-- Mauvais -->
[Spec Projet](/Users/izo/Sites/docs/Woodman/docs/01-specs/spec-2024-01-15.md)
```

---

## Archivage

### Quand archiver ?

Archiver un document quand :

- **Status = deprecated** ET date > 3 mois
- **Date > 1 an** sans mise à jour
- Remplacé par une version plus récente

### Comment archiver ?

```bash
# Le documentalist déplace automatiquement
docs/01-specs/spec-2023-01-15.md
→ docs/99-archive/2023/spec-2023-01-15.md
```

### Ne jamais supprimer

- ❌ Ne jamais supprimer de documentation
- ✅ Toujours archiver (traçabilité historique)
- ✅ Mettre `status: archived` dans le frontmatter

---

## Exemples complets

### Exemple 1 : Spec

```yaml
---
title: Spécification Woodman v2
type: spec
category: specs
date: 2024-01-15
updated: 2024-01-15
status: active
author: spec-writer
tags: [woodman, spec, v2, agents]
version: 2.0.0
stack: node
scope: fullstack
---
```

### Exemple 2 : Audit Performance

```yaml
---
title: Audit Performance Woodman
type: audit
category: audits
date: 2024-01-15
updated: 2024-01-15
status: active
author: perf-auditor
tags: [performance, audit, core-web-vitals]
audit_type: performance
severity: medium
findings_count: 8
---
```

### Exemple 3 : Guide

```yaml
---
title: Guide Installation Woodman
type: guide
category: guides
date: 2024-01-15
updated: 2024-01-15
status: active
author: human
tags: [guide, installation, setup]
difficulty: beginner
duration: 15min
prerequisites: []
---
```

### Exemple 4 : ADR

```yaml
---
title: Migration vers Nuxt 4
type: adr
category: decisions
date: 2024-01-15
updated: 2024-01-15
status: accepted
author: human
tags: [adr, nuxt, migration]
decision_id: 001
supersedes: null
---
```

---

## Commandes documentalist

```bash
# Audit complet
documentalist audit

# Nettoyage (doublons, obsolètes, vides)
documentalist clean

# Réorganisation selon catégories
documentalist reorganize

# Mise à jour de l'index
documentalist index

# Health check
documentalist health

# Statistiques
documentalist stats
```

---

## Support

Pour toute question sur les conventions :

1. Lire ce fichier (`docs/00-meta/conventions.md`)
2. Consulter l'index (`docs/00-meta/index.md`)
3. Lancer `documentalist audit` pour détecter les problèmes
4. Consulter `.claude/docs-metrics.json` pour voir les métriques

---

**Version** : 1.0.0
**Dernière mise à jour** : 2024-01-15
**Maintenu par** : documentalist agent
