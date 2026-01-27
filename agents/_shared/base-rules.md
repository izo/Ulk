# Règles communes à tous les agents Woodman

> Ce fichier est la source de vérité pour les règles partagées.
> Les agents doivent lire ce fichier au démarrage via `Read agents/_shared/base-rules.md`.

---

## Langue

Tout en français (rapports, messages, commentaires dans les documents générés).

---

## Règles absolues

1. **Exhaustif** : Couvrir l'intégralité du périmètre demandé
2. **Factuel** : Chaque finding avec fichier:ligne quand applicable
3. **Actionnable** : Chaque issue = une recommandation concrète
4. **Priorisé** : Sécurité > Performance > Qualité > Style
5. **Non destructif** : Ne pas supprimer sans archiver ou documenter
6. **Reproductible** : Documenter les commandes et conditions utilisées
7. **Idempotent** : Relancer l'agent produit le même résultat (pas de doublons)
8. **Incrémental** : Mettre à jour les sections existantes plutôt que réécrire

---

## Conventions de nommage des fichiers

| Type | Pattern | Emplacement |
|------|---------|-------------|
| Audit | `audit-[TYPE]-YYYYMMDD.md` | `docs/audits/` |
| Rapport | `[type]-YYYYMMDD.md` | `docs/reports/` |
| API | `*.md` | `docs/api/` |
| Communication | `update-YYYYMMDD.md` | `docs/communications/` |
| Métadonnées | `*.json` | `.claude/` |

---

## Format des findings

```markdown
#### [PREFIX-NNN] Titre du finding
- **Fichier** : `path/to/file.ts:42`
- **Problème** : Description factuelle
- **Impact** : Conséquence mesurable
- **Recommandation** : Action concrète
- **Effort** : Estimation réaliste
```

**Préfixes par source :**

| Source | Préfixe | Exemple |
|--------|---------|---------|
| Code audit | `A` | `#A001` |
| A11y audit | `A11Y-` | `#A11Y-001` |
| Perf audit | `PERF-` | `#PERF-001` |
| API design | `API-` | `#API-001` |
| Feature roadmap | (aucun) | `#001` |

---

## Format des tâches (todo.md)

```markdown
## [emoji] P[0-3] - [Niveau]

### #PREFIX-NNN · [emoji] Titre
> [Contexte] — [Sévérité]

- **Critère de done** : [Définition précise]
- **Estimation** : [Xh]
- **Dépendances** : [aucune | #XXX]
- **Fichiers concernés** : [liste]

**Sous-tâches :**
- [ ] Sous-tâche 1
- [ ] Sous-tâche 2
```

**Niveaux de priorité :**

| Priorité | Emoji | Critères |
|----------|-------|----------|
| P0 | 🔴 | Bloquant : sécurité, bugs critiques, data loss |
| P1 | 🟠 | Haute : perf majeure, archi cassée, DX dégradée |
| P2 | 🟡 | Moyenne : qualité, dette tech, tests manquants |
| P3 | 🟢 | Basse : style, doc, nice-to-have |

---

## Scoring standard

| Score | Niveau | Emoji |
|-------|--------|-------|
| 8-10 | Bon | 🟢 |
| 5-7 | Moyen | 🟡 |
| 0-4 | Critique | 🔴 |

---

## Conventions git

| Catégorie | Préfixe git |
|-----------|-------------|
| Setup | `chore` |
| Architecture | `refactor` |
| Data/API/UI/Logic | `feat` |
| Tests | `test` |
| Documentation | `docs` |
| Bug fix | `fix` |
| Sécurité | `security` |
| Performance | `perf` |
| Déploiement | `chore` |

Format : `[prefix]: [description] (#ID)`

---

## Frontmatter standard pour documents générés

```yaml
---
title: [Titre du document]
type: spec | audit | guide | report | adr | task
category: [Catégorie]
date: YYYY-MM-DD
updated: YYYY-MM-DD
status: draft | active | deprecated | archived
author: [nom-agent]
tags: [tag1, tag2]
---
```

---

## Commandes utilisateur communes

| Commande | Action |
|----------|--------|
| `status` | Afficher la progression |
| `résumé` | Résumé des findings |
| `détail [ID]` | Détail d'un finding spécifique |
| `compare` | Évolution vs dernier rapport |
