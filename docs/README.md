---
title: Documentation Woodman
type: meta
category: meta
date: 2026-01-14
updated: 2026-01-19
status: active
author: human
tags: [readme, documentation, guides]
---

# Documentation Woodman

> Documentation centralisée générée et maintenue par les agents Woodman

## Qu'est-ce que ce dossier ?

Ce dossier `/docs` contient **toute la documentation générée par les agents** du projet Woodman :

- ✅ Spécifications techniques
- ✅ Rapports d'audit (code, performance, accessibilité)
- ✅ Analyses de stack (Nuxt, Next, Astro, etc.)
- ✅ Guides et tutoriels
- ✅ Historique des tâches
- ✅ Architecture Decision Records (ADR)
- ✅ Documentation de déploiement et tests

## Organisation

```
docs/
├── 00-meta/              # Documentation sur la documentation
├── 01-specs/             # Spécifications et architecture
├── 02-tasks/             # Historique des tâches
├── 03-audits/            # Rapports d'audit
├── 04-analysis/          # Analyses techniques
├── 05-deployment/        # Documentation de déploiement
├── 06-testing/           # Documentation de tests
├── 07-api/               # Documentation API
├── 08-guides/            # Guides et tutoriels
├── 09-decisions/         # Architecture Decision Records
└── 99-archive/           # Documentation obsolète
```

## Comment naviguer ?

1. **Index général** : Voir `00-meta/index.md` (généré automatiquement)
2. **Conventions** : Lire `00-meta/conventions.md` pour comprendre le système
3. **Parcourir par catégorie** : Naviguer dans les dossiers ci-dessus
4. **Recherche par tag** : Consulter l'index pour les tags

## Agent documentaliste

L'agent **documentalist** (`13-documentalist.md`) gère automatiquement :

- ✅ Organisation des fichiers par catégorie
- ✅ Validation du frontmatter YAML
- ✅ Détection et correction des problèmes
- ✅ Génération de l'index et des rapports
- ✅ Suivi de la santé de la documentation

### Commandes utiles

```bash
# Audit complet de la documentation
documentalist audit

# Nettoyer (doublons, obsolètes)
documentalist clean

# Réorganiser par catégories
documentalist reorganize

# Mettre à jour l'index
documentalist index

# Vérifier la santé globale
documentalist health
```

## Standards de documentation

Tous les fichiers dans `/docs` doivent respecter :

### Frontmatter obligatoire

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

### Nommage des fichiers

- ✅ Kebab-case : `audit-perf-2024-01-15.md`
- ✅ Dates ISO-8601 : `YYYY-MM-DD`
- ✅ Minuscules uniquement
- ❌ Pas d'espaces, accents, ou caractères spéciaux

### Catégories

Chaque document doit être dans la bonne catégorie selon son type :

| Type | Catégorie | Exemple |
|------|-----------|---------|
| spec | `01-specs/` | `spec-2024-01-15.md` |
| audit | `03-audits/code/` | `audit-code-2024-01-15.md` |
| guide | `08-guides/setup/` | `guide-setup-local.md` |
| adr | `09-decisions/` | `adr-001-migration-nuxt4.md` |

## Guides disponibles

| Guide | Agent | Description | Lien |
|-------|-------|-------------|------|
| **Notion Importer** | 21-notion-importer | Import unidirectionnel depuis Notion (master page + liens → spec + todo) | [notion-importer-guide.md](./notion-importer-guide.md) |

Plus de guides à venir pour tous les agents.

## Workflow agents → documentation

Les agents Woodman documentent automatiquement leurs actions :

```
spec-writer → docs/01-specs/spec-YYYY-MM-DD.md
code-auditor → docs/03-audits/code/audit-code-YYYY-MM-DD.md
perf-auditor → docs/03-audits/performance/audit-perf-YYYY-MM-DD.md
analyze-nuxt → docs/04-analysis/stack/analysis-nuxt-YYYY-MM-DD.md
notion-importer → docs/spec_notion.md + docs/todo_notion.md
```

Après génération, lancer `documentalist` pour validation et organisation.

## Métriques

Le documentalist track les métriques dans `.claude/docs-metrics.json` :

- 📄 Nombre total de documents
- ✅ % de frontmatter valide
- 📁 Répartition par catégorie
- 🏷️ Tags les plus utilisés
- 📊 Score de santé global (0-100)

## Support et questions

- **Conventions** : Voir `00-meta/conventions.md`
- **Index** : Voir `00-meta/index.md`
- **Agent** : Utiliser `documentalist` pour toute opération

---

**Géré par** : Agent documentalist (`agents/13-documentalist.md`)
**Dernière mise à jour** : 2024-01-14
