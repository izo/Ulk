# Base Auditor — Template partagé

> Ce fichier contient les patterns communs à tous les agents d'audit (05, 06, 07, 16, 22, 23).
> Les agents d'audit doivent lire ce fichier au démarrage via `Read agents/_shared/auditor-base.md`.

---

## Structure de rapport standard

Tous les rapports d'audit suivent cette structure :

```markdown
# [Type d'audit] — [Nom du projet]

> Généré le [date et heure]
> Auditeur : [nom-agent]
> Commit audité : [hash court]

## Résumé exécutif

**Score global : [X]/10** [emoji 🟢/🟡/🔴]

[2-3 phrases résumant l'état du projet]

### Points forts
- ✅ [Point 1]
- ✅ [Point 2]

### Points critiques
- 🔴 [Issue 1]
- 🔴 [Issue 2]

---

## Scores détaillés

| Catégorie | Score | Niveau |
|-----------|-------|--------|
| [Cat 1]   | X/10  | 🟢/🟡/🔴 |
| [Cat 2]   | X/10  | 🟢/🟡/🔴 |
| **GLOBAL** | **X/10** | 🟢/🟡/🔴 |

Légende : 🟢 8-10 | 🟡 5-7 | 🔴 0-4

---

## Findings détaillés

### 🔴 Critiques (à traiter immédiatement)

#### [PREFIX-NNN] Titre
- **Fichier** : `path:ligne`
- **Problème** : [Description]
- **Impact** : [Conséquence]
- **Recommandation** : [Action]
- **Effort** : [Estimation]

### 🟠 Haute priorité
[Même structure]

### 🟡 Moyenne priorité
[Même structure]

### 🟢 Basse priorité
[Même structure]

---

## Métriques
[Tableaux de métriques quantifiées spécifiques au type d'audit]

---

## Tâches générées
[Résumé des tâches ajoutées à todo.md avec leur préfixe]
```

---

## Mise à jour de spec.md (section audit)

**Protocole de mise à jour incrémentale :**

1. Chercher la section correspondante dans spec.md (ex: `## 📊 Audit de code`)
2. Si la section EXISTE : mettre à jour les valeurs, la date, et les issues
3. Si la section N'EXISTE PAS : l'ajouter avant la dernière section (`## Annexes` ou fin de fichier)
4. Ne JAMAIS dupliquer une section existante

```markdown
## [Emoji] [Type d'audit]

> Dernier audit : [date]
> Score global : [X]/10

### État actuel
| Catégorie | Score | Évolution |
|-----------|-------|-----------|
| [Cat 1]   | X/10  | [↑↓→]    |

### Issues critiques ouvertes
- [ ] [PREFIX-NNN] Description
```

**Important :** Comparer avec l'audit précédent si disponible pour afficher l'évolution (↑ amélioration, ↓ régression, → stable).

---

## Mise à jour de todo.md (tâches d'audit)

**Protocole de mise à jour incrémentale :**

1. Lire todo.md existant
2. Pour chaque finding générant une tâche :
   a. Vérifier si une tâche avec le même PREFIX-NNN existe déjà
   b. Si OUI : mettre à jour le contenu (estimation, fichiers, sous-tâches)
   c. Si NON : ajouter la tâche dans la bonne section de priorité
3. Si un finding précédent est résolu : NE PAS supprimer la tâche, la marquer `[x]`

---

## Optimisation tokens : contexte orchestrateur

Quand un agent d'audit est appelé par un orchestrateur (18, 19, 20, 25),
le prompt peut contenir un bloc `CONTEXTE PROJET:` :

```
CONTEXTE PROJET: Stack=Nuxt 3, Framework=Vue 3, DB=PostgreSQL, Langages=TypeScript.
Fichiers source: 142. Lignes: 18500. Structure: src/{components,pages,server,composables}.
```

**Si ce bloc est présent :**
- SAUTER la Phase 1 (Reconnaissance / Cartographie)
- Utiliser directement les informations fournies
- Passer directement à la Phase 2 (Audit)
- **Économie estimée : 3-8K tokens par agent**

**Si ce bloc est absent :**
- Exécuter normalement toutes les phases

---

## Détection de rapport précédent

Avant de générer un nouveau rapport, vérifier :

```bash
ls docs/audits/audit-[TYPE]-*.md 2>/dev/null | sort -r | head -1
```

Si un rapport précédent existe :
1. Lire son contenu pour comparer les scores
2. Afficher l'évolution dans le nouveau rapport
3. Ajouter une section "Évolution depuis le dernier audit"

---

## Commandes utilisateur (communes aux auditors)

| Commande | Action |
|----------|--------|
| "Audit [type]" | Audit complet |
| "Score [type]" | Juste les scores, pas le détail |
| "Issues critiques [type]" | Seulement les P0/P1 |
| "Compare avec le dernier" | Évolution depuis dernier audit |
| "Quick wins [type]" | Top 5 actions faciles |
