# Protocole de mise à jour des documents

> Ce fichier définit comment les agents mettent à jour les documents partagés
> (docs/spec.md, docs/todo.md, CLAUDE.md) de manière incrémentale et sans conflit.

---

## Problème

Plusieurs agents modifient les mêmes fichiers (docs/spec.md, docs/todo.md) :

```
code-auditor  → ajoute section "Audit de code" dans docs/spec.md
perf-auditor  → ajoute section "Performance" dans docs/spec.md
a11y-auditor  → ajoute section "Accessibilité" dans docs/spec.md
task-runner   → modifie statuts dans docs/todo.md
todo-generator → réécrit docs/todo.md entier
```

**Risques :**
- Sections dupliquées dans docs/spec.md
- Tâches perdues dans docs/todo.md
- Conflits d'écriture si agents parallèles

---

## Règle 1 : Mise à jour incrémentale de docs/spec.md

### Procédure

```
1. Lire docs/spec.md entier
2. Chercher la section cible (ex: "## 📊 Audit de code")
3. SI la section existe :
   → Remplacer son contenu (entre ## et le prochain ##)
   → Mettre à jour la date "updated:"
4. SI la section n'existe pas :
   → L'insérer AVANT la dernière section ou en fin de fichier
   → Respecter l'ordre logique des sections
5. NE JAMAIS réécrire docs/spec.md en entier
```

### Sections réservées par agent

| Agent | Section docs/spec.md | Emoji |
|-------|----------------|-------|
| spec-writer (01) | Tout le document initial | — |
| code-auditor (05) | `## 📊 Audit de code` | 📊 |
| a11y-auditor (06) | `## ♿ Accessibilité` | ♿ |
| perf-auditor (07) | `## ⚡ Performance` | ⚡ |
| steve (27) | `## 📱 API Mobile` | 📱 |
| picsou (26) | `## 💰 Estimation des coûts` | 💰 |

### Détection de section existante

```bash
grep -n "^## 📊 Audit de code" docs/spec.md
grep -n "^## ♿ Accessibilité" docs/spec.md
grep -n "^## ⚡ Performance" docs/spec.md
```

Si le grep retourne un numéro de ligne, la section existe déjà.

---

## Règle 2 : Mise à jour incrémentale de docs/todo.md

### Procédure

```
1. Lire docs/todo.md entier
2. Pour chaque nouvelle tâche à ajouter :
   a. Chercher si #PREFIX-NNN existe déjà
   b. SI existe : mettre à jour (estimation, sous-tâches, fichiers)
   c. SI n'existe pas : ajouter dans la bonne section de priorité
3. Pour les tâches résolues :
   → Cocher les sous-tâches [x] mais NE PAS supprimer
4. Garder les tâches d'autres sources intactes
```

### Détection de doublons

```bash
grep -n "#A001\|#A11Y-001\|#PERF-001" docs/todo.md
```

### Zones de priorité

```markdown
## 🔴 P0 - Bloquant
[Tâches ici — ne pas réordonner les tâches existantes]

## 🟠 P1 - Important
[Tâches ici]

## 🟡 P2 - Moyen
[Tâches ici]

## 🟢 P3 - Bas
[Tâches ici]
```

### Insertion dans la bonne zone

1. Identifier la zone de priorité de la nouvelle tâche
2. Trouver la fin de cette zone (prochain `## ` ou fin de fichier)
3. Insérer la tâche avant la fin de la zone

---

## Règle 3 : Coordination inter-agents (exécution parallèle)

Quand des agents sont lancés en parallèle par un orchestrateur :

```
INTERDIT : Deux agents écrivent dans le même fichier simultanément
AUTORISÉ : Chaque agent écrit dans son propre fichier de rapport
```

### Stratégie recommandée

```
Phase parallèle :
  code-auditor  → écrit docs/audits/audit-code-YYYYMMDD.md (son fichier)
  perf-auditor  → écrit docs/audits/audit-perf-YYYYMMDD.md (son fichier)
  a11y-auditor  → écrit docs/audits/audit-a11y-YYYYMMDD.md (son fichier)

Phase séquentielle (après les parallèles) :
  orchestrateur → lit les 3 rapports
  orchestrateur → met à jour docs/spec.md (une seule écriture)
  orchestrateur → met à jour docs/todo.md (une seule écriture)
```

Cela évite les conflits d'écriture sur docs/spec.md et docs/todo.md.

---

## Règle 4 : Comparaison avec le rapport précédent

Avant de générer un nouveau rapport, tout agent d'audit doit :

```bash
# Trouver le rapport précédent
PREVIOUS=$(ls docs/audits/audit-[TYPE]-*.md 2>/dev/null | sort -r | head -1)

# Si un rapport précédent existe
if [ -n "$PREVIOUS" ]; then
  # Lire les scores précédents pour afficher l'évolution
  grep "Score\|score" "$PREVIOUS"
fi
```

### Affichage de l'évolution

```markdown
| Catégorie | Précédent | Actuel | Évolution |
|-----------|-----------|--------|-----------|
| Architecture | 6/10 | 7/10 | ↑ +1 |
| Sécurité | 4/10 | 4/10 | → stable |
| Performance | 8/10 | 7/10 | ↓ -1 |
```

---

## Règle 5 : Hash de contenu pour éviter les réécritures inutiles

Avant de réécrire un fichier, vérifier si le contenu a changé :

```bash
# Hash du fichier actuel
CURRENT_HASH=$(md5sum docs/spec.md | cut -d' ' -f1)

# Générer le nouveau contenu dans un fichier temporaire
# ... (génération)

# Hash du nouveau contenu
NEW_HASH=$(md5sum /tmp/new-spec.md | cut -d' ' -f1)

# Ne réécrire que si différent
if [ "$CURRENT_HASH" != "$NEW_HASH" ]; then
  cp /tmp/new-spec.md docs/spec.md
fi
```

Cela évite les commits inutiles et réduit le bruit dans l'historique git.
