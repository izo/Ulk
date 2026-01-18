# Audit de consommation de tokens - Agents Woodman

> Date : 2026-01-18
> Auteur : Claude Code Auditor
> Scope : agents/, commands/, subdirectories

## Resume executif

**Volume total : ~675 KB de prompts**
**Estimation tokens : ~169,000 tokens** (4 chars/token moyenne)

### Constats critiques

1. **Duplication massive** : `commands/` duplique largement `agents/` (+222 KB)
2. **Templates verbeux** : Les rapports-templates consomment 40-60% de certains agents
3. **Commandes bash repetees** : Memes patterns copie-colles entre agents
4. **Aucune factorisation** : Pas de systeme de partials/includes

---

## Inventaire detaille par agent

### Top 10 - Agents les plus couteux

| Rang | Agent | Taille | Tokens* | Modele | Observations |
|------|-------|--------|---------|--------|--------------|
| 1 | example.md | 22.4 KB | ~5,600 | - | Fichier exemple, supprimer? |
| 2 | perf-auditor | 22.0 KB | ~5,500 | sonnet | Templates rapport = 50% |
| 3 | a11y-auditor | 20.6 KB | ~5,150 | sonnet | Checklist WCAG = 45% |
| 4 | CLAUDE.md | 19.2 KB | ~4,800 | - | Doc interne, pas un agent |
| 5 | spec-writer | 18.6 KB | ~4,650 | opus | Patterns stack = 60% |
| 6 | ANALYSE-COHERENCE.md | 17.8 KB | ~4,450 | - | Doc interne |
| 7 | external-sync | 17.0 KB | ~4,250 | opus | Mappings = 40% |
| 8 | code-auditor | 16.3 KB | ~4,075 | opus | Checklists = 50% |
| 9 | documentalist | 16.2 KB | ~4,050 | opus | - |
| 10 | task-runner | 14.1 KB | ~3,525 | opus | - |

*Estimation: 1 token ≈ 4 caracteres

### Agents moyens (7-14 KB)

| Agent | Taille | Tokens* | Modele |
|-------|--------|---------|--------|
| pre-release | 11.7 KB | ~2,925 | opus |
| legacy-revival | 10.9 KB | ~2,725 | opus |
| figma-shadcn | 10.7 KB | ~2,675 | opus |
| context-generator | 10.0 KB | ~2,500 | sonnet |
| frontend-qa | 10.0 KB | ~2,500 | sonnet |
| robocop | 9.1 KB | ~2,275 | opus |
| code-simplifier | 8.7 KB | ~2,175 | sonnet |

### Agents legers (<7 KB)

| Agent | Taille | Tokens* | Modele |
|-------|--------|---------|--------|
| sync-local | 6.8 KB | ~1,700 | sonnet |
| tw2shad | 6.1 KB | ~1,525 | opus |
| audit-complet | 6.1 KB | ~1,525 | opus |
| todo-generator | 6.0 KB | ~1,500 | sonnet |

### Sous-repertoires

| Repertoire | Fichiers | Taille totale | Tokens* |
|------------|----------|---------------|---------|
| 10-analyze/ | 6 | 56 KB | ~14,000 |
| 11-deploy/ | 6 | 34 KB | ~8,500 |
| 12-test/ | 3 | 26 KB | ~6,500 |
| 16-frontend-qa/ | 5 | 37 KB | ~9,250 |

---

## Analyse des patterns de surconsommation

### 1. Templates de rapport embarques (Impact: ELEVE)

Les agents d'audit incluent des templates complets de rapport markdown :

```
perf-auditor:  Lignes 393-680 = template rapport (~12 KB)
a11y-auditor:  Lignes 409-603 = template rapport (~10 KB)
code-auditor:  Lignes 428-559 = template rapport (~7 KB)
```

**Probleme** : Ces templates sont envoyes a chaque invocation meme si l'agent ne genere pas de rapport.

### 2. Checklists exhaustives (Impact: ELEVE)

Exemples de verbosity excessive :

```
a11y-auditor:
- Tableau WCAG 2.1 Niveau A : 30 lignes
- Tableau WCAG 2.1 Niveau AA : 18 lignes
- Tableau WCAG 2.2 : 8 lignes
- Checklists par composant : 50+ lignes

perf-auditor:
- Tableau metriques : 40 lignes
- Tableau dependances lourdes : 15 lignes
- Commandes benchmark : 30 lignes
```

### 3. Duplication agents/ vs commands/ (Impact: TRES ELEVE)

| Statut | Nombre | Impact |
|--------|--------|--------|
| Fichiers identiques | 11 | 170 KB dupliques |
| Fichiers differents | 9 | Divergence maintenance |
| **Total duplication** | - | **~222 KB inutiles** |

**Fichiers identiques** (a consolider):
- task-runner, code-auditor, a11y-auditor, perf-auditor
- robocop, documentalist, code-simplifier
- audit-complet, legacy-revival, pre-release

### 4. Commandes bash repetees (Impact: MOYEN)

Pattern repete dans 6+ agents :

```bash
# Detection stack - present dans spec-writer, code-auditor, perf-auditor...
cat package.json 2>/dev/null | grep -E "react|vue|svelte|next|nuxt"
find . -name "*.ts" -o -name "*.tsx" | grep -v node_modules
```

```bash
# Git stats - present dans code-auditor, external-sync, sync-local...
git log --oneline -20
git status --short
```

### 5. Patterns stack dupliques (Impact: MOYEN)

`spec-writer` contient 15 patterns de detection de stack (Swift, Nuxt, Laravel, etc.) = ~10 KB

Ces patterns pourraient etre partages avec les agents `10-analyze/*`.

---

## Plan d'optimisation

### Phase 1 : Quick wins (Gain: ~250 KB / 62K tokens)

#### 1.1 Supprimer la duplication commands/

**Action** : Utiliser des symlinks ou un script de generation

```bash
# Option A: Symlinks
cd commands/agents && ln -sf ../../agents/07-perf-auditor.md perf-auditor.md

# Option B: Script install.sh ameliore
# Copie uniquement les agents necessaires lors de l'installation
```

**Gain estimé** : 222 KB / ~55,000 tokens

#### 1.2 Supprimer les fichiers non-agents

| Fichier | Action | Gain |
|---------|--------|------|
| example.md | Deplacer vers docs/ | 22 KB |
| ANALYSE-COHERENCE.md | Deplacer vers docs/ | 18 KB |
| CLAUDE.md (agents/) | Fusionner avec racine | 19 KB |

**Gain estimé** : 59 KB / ~15,000 tokens

### Phase 2 : Refactoring templates (Gain: ~80 KB / 20K tokens)

#### 2.1 Externaliser les templates de rapport

Creer `templates/` :

```
templates/
├── audit-report-base.md      # Structure commune
├── wcag-checklist.md         # Checklist WCAG complete
├── perf-metrics.md           # Metriques Core Web Vitals
└── code-quality-checks.md    # Checks qualite code
```

Agents referent par : `Utilise le template templates/audit-report-base.md`

#### 2.2 Condenser les checklists

**Avant** (a11y-auditor, 30 lignes) :
```markdown
| Critere | ID | Verification | Status |
| Texte alternatif | 1.1.1 | Images ont alt pertinent | |
| Medias temporels | 1.2.1-3 | Captions, audiodescription | |
...
```

**Apres** (reference externe) :
```markdown
Verifier conformite WCAG 2.1 AA selon checklist standard.
Criteres prioritaires : 1.1.1, 1.3.1, 2.1.1, 2.4.7, 4.1.2
Reference : templates/wcag-checklist.md
```

### Phase 3 : Factorisation code (Gain: ~40 KB / 10K tokens)

#### 3.1 Creer des partials reutilisables

```
partials/
├── stack-detection.md     # Commandes detection stack
├── git-analysis.md        # Commandes analyse git
├── project-recon.md       # Phase reconnaissance commune
└── report-generation.md   # Instructions generation rapport
```

#### 3.2 Utiliser des references

```markdown
## Phase 1 : Reconnaissance

{{include:partials/stack-detection.md}}

## Phase 2 : Analyse specifique
...
```

**Note** : Necessite support includes dans le systeme d'agents.

### Phase 4 : Optimisation modeles (Gain: $$$)

#### 4.1 Revue assignation modeles

| Agent | Modele actuel | Modele suggere | Justification |
|-------|---------------|----------------|---------------|
| perf-auditor | sonnet | sonnet | OK - analyse technique |
| a11y-auditor | sonnet | sonnet | OK - checklists |
| spec-writer | opus | **sonnet** | Peut fonctionner avec sonnet |
| code-auditor | opus | **sonnet** | Analyse pattern-based |
| external-sync | opus | **sonnet** | Mapping simple |
| task-runner | opus | opus | OK - orchestration |
| robocop | opus | opus | OK - debugging complexe |

**Gain potentiel** : 40% reduction cout sur 5 agents

---

## Resume des gains

| Phase | Action | Gain tokens | Gain KB |
|-------|--------|-------------|---------|
| 1.1 | Supprimer duplication commands/ | ~55,000 | 222 |
| 1.2 | Nettoyer fichiers non-agents | ~15,000 | 59 |
| 2.1 | Externaliser templates | ~15,000 | 60 |
| 2.2 | Condenser checklists | ~5,000 | 20 |
| 3.1 | Factoriser partials | ~10,000 | 40 |
| **TOTAL** | | **~100,000** | **~400 KB** |

**Reduction estimee : 60% de la consommation actuelle**

---

## Recommandations prioritaires

### Immediat (cette semaine)

1. [ ] **Convertir commands/ en symlinks** vers agents/
2. [ ] **Deplacer example.md, ANALYSE-COHERENCE.md** vers docs/
3. [ ] **Auditer l'usage reel** : quels agents sont invoques frequemment?

### Court terme (ce mois)

4. [ ] **Creer templates/** pour les rapports d'audit
5. [ ] **Tester sonnet** sur spec-writer, code-auditor, external-sync
6. [ ] **Documenter** le systeme de templates dans CLAUDE.md

### Moyen terme

7. [ ] **Implementer un systeme d'includes** si possible
8. [ ] **Mesurer la consommation reelle** avec logging
9. [ ] **A/B tester** agents optimises vs originaux

---

## Annexes

### A. Commande de mesure

```bash
# Calculer tokens approximatifs
find agents/ -name "*.md" -exec wc -c {} + | \
  awk '{sum+=$1} END {print "Total bytes:", sum, "Tokens:", sum/4}'
```

### B. Distribution par modele

| Modele | Agents | Tokens totaux |
|--------|--------|---------------|
| opus | 12 | ~45,000 |
| sonnet | 8 | ~25,000 |
| non-specifie | 6 | ~20,000 |

### C. Agents par frequence d'usage estimee

| Frequence | Agents |
|-----------|--------|
| Tres haute | spec-writer, todo-generator, robocop |
| Haute | code-auditor, task-runner |
| Moyenne | perf-auditor, a11y-auditor, sync-local |
| Basse | figma-shadcn, external-sync, legacy-revival |
| Rare | analyze/*, deploy/*, test/* |
