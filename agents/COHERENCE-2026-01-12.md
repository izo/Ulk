# Rapport de Cohérence des Agents
> Analyse réalisée le 2026-01-12
> Agents analysés : 14 agents (9 agents numérotés + 5 agents analyzer)

---

## 🎯 Résumé Exécutif

**Verdict global** : ⚠️ **Partiellement cohérent - Nécessite intégration des analyzers**

### État Actuel

**✅ Structure 01-09 : CONFORME**
- Le refactoring Option A (2026-01-09) est correctement implémenté
- Numérotation cohérente (01-09)
- Séparation claire des responsabilités (03-local vs 08-externe)
- Documentation synchronisée (Readme.md, CLAUDE.md, ANALYSE-COHERENCE.md)

**⚠️ Nouveaux Agents Analyzer : NON INTÉGRÉS**
- 5 nouveaux agents détectés (non trackés par git)
- Pattern cohérent mais non documentés
- Pas de numérotation standardisée
- Absents de la documentation officielle

---

## 📊 Inventaire Complet

### Agents Principaux (01-09) ✅

| # | Nom | Modèle | Status | Conformité |
|---|-----|--------|--------|------------|
| 01 | spec-writer | opus | ✅ OK | 100% |
| 02 | todo-generator | sonnet | ✅ OK | 100% |
| 03 | sync-local | sonnet | ✅ OK | 100% |
| 04 | task-runner | sonnet | ✅ OK | 100% |
| 05 | code-auditor | opus | ✅ OK | 100% |
| 06 | a11y-auditor | sonnet | ✅ OK | 100% |
| 07 | perf-auditor | sonnet | ✅ OK | 100% |
| 08 | external-sync | opus | ✅ OK | 100% |
| 09 | context-generator | sonnet | ✅ OK | 100% |

**Tous les agents principaux respectent :**
- Frontmatter complet (name, description, tools, model)
- Structure phasée claire
- Séparation des responsabilités
- Documentation à jour

---

### Nouveaux Agents Analyzer (Non numérotés) ⚠️

| Nom | Modèle | Status Git | Documentation | Conformité |
|-----|--------|------------|---------------|------------|
| astro-analyzer | sonnet | ⚠️ Untracked | ❌ Absent | 60% |
| next-analyzer | sonnet | ⚠️ Untracked | ❌ Absent | 60% |
| nuxt-analyzer | sonnet | ⚠️ Untracked | ❌ Absent | 60% |
| spip-analyzer | sonnet | ⚠️ Untracked | ❌ Absent | 60% |
| swiftui-analyzer | sonnet | ⚠️ Untracked | ❌ Absent | 60% |

**Problèmes identifiés :**
- ❌ Pas trackés par git (permissions `600` vs `644`)
- ❌ Absents de `Readme.md`
- ❌ Absents de `CLAUDE.md` (agents/)
- ❌ Absents de `ANALYSE-COHERENCE.md`
- ❌ Pas de numérotation standardisée (10-14 ?)
- ✅ Structure frontmatter conforme
- ✅ Pattern phasé cohérent
- ✅ Modèle sonnet approprié

---

## 🔍 Analyse Détaillée

### 1. Pattern des Agents Analyzer

**Mission commune :**
Analyser exhaustivement un projet d'une stack spécifique pour inventorier les composants, détecter les problèmes, et proposer des optimisations.

**Structure standardisée :**

```markdown
---
name: [stack]-analyzer
description: Analyse un projet [Stack] pour inventorier...
tools: View, Read, Grep, Glob, Bash, Write, MultiEdit, Task
model: sonnet
---

Phase 1 : Détection de la stack
  - Version et configuration
  - Frameworks et dépendances
  - Structure du projet

Phase 2 : Inventaire des composants
  - Composants natifs du framework
  - Composants custom
  - Comptage des usages

Phase 3 : Analyse des problèmes
  - Problèmes de performance
  - Anti-patterns
  - Problèmes SSR/hydration (si applicable)

Phase 4 : TODO de migration/optimisation
  - Remplacements proposés
  - Optimisations recommandées
  - Checklist d'actions
```

**Différences par stack :**

| Analyzer | Focus Spécifique |
|----------|------------------|
| **astro-analyzer** | Islands Architecture, Content Collections, multi-framework |
| **next-analyzer** | App Router vs Pages Router, Server/Client Components, shadcn/ui |
| **nuxt-analyzer** | SSR/hydration, Nuxt UI v2/v3/v4, composables |
| **spip-analyzer** | Boucles SPIP, squelettes, formulaires CVT, plugins |
| **swiftui-analyzer** | MVVM/TCA, @Observable, SwiftData, multi-platform |

---

### 2. Relation avec 01-spec-writer

**Overlap potentiel :**

L'agent `01-spec-writer` inclut déjà une détection de stack comprehensive pour :
- Swift/iOS/macOS
- JavaScript/TypeScript frameworks (Nuxt, Next, Astro)
- PHP/Laravel/WordPress/SPIP
- Python, Go, Rust, Java, Flutter, etc.

**Différenciation :**

| Agent | Scope | Profondeur | Cas d'usage |
|-------|-------|------------|-------------|
| **01-spec-writer** | Multi-stack, vue d'ensemble | Analyse architecturale globale | Setup nouveau projet |
| **XX-stack-analyzer** | Stack unique, focus technique | Analyse approfondie composants | Audit technique spécifique |

**Complémentarité :**
- `01-spec-writer` : "Quel est ce projet ? Que fait-il ?"
- `XX-stack-analyzer` : "Comment est-il construit ? Quels problèmes techniques ?"

---

## 🚨 Problèmes Identifiés

### 🔴 Priorité 1 : Intégration Git

**Problème :**
Les 5 fichiers analyzer ont des permissions `600` (lecture/écriture propriétaire uniquement) et ne sont pas trackés par git.

```bash
-rw-------   1 izo  staff   8947 Jan 12 10:03 astro-analyzer.md
-rw-------   1 izo  staff   9509 Jan 12 10:03 next-analyzer.md
-rw-------   1 izo  staff   7391 Jan 12 10:03 nuxt-analyzer.md
-rw-------   1 izo  staff  10620 Jan 12 10:03 spip-analyzer.md
-rw-------   1 izo  staff  11940 Jan 12 10:03 swiftui-analyzer.md
```

**Impact :**
- ⚠️ Fichiers invisibles pour git
- ⚠️ Pas de versioning
- ⚠️ Risque de perte de données
- ⚠️ Pas de collaboration possible

**Solution :**
```bash
chmod 644 agents/*-analyzer.md
git add agents/*-analyzer.md
```

---

### 🟠 Priorité 2 : Numérotation et Naming

**Problème :**
Les analyzers n'ont pas de préfixe numérique, ce qui crée une ambiguïté dans l'ordre d'exécution.

**Options :**

#### Option A : Numérotation séquentielle (10-14)
```
10-astro-analyzer.md
11-next-analyzer.md
12-nuxt-analyzer.md
13-spip-analyzer.md
14-swiftui-analyzer.md
```

**Avantages :**
- ✅ Cohérence avec 01-09
- ✅ Ordre clair
- ✅ Facilite l'ajout futur

**Inconvénients :**
- ⚠️ Suggère un ordre d'exécution qui n'existe pas vraiment
- ⚠️ Les analyzers sont indépendants, pas séquentiels

#### Option B : Préfixe catégorie (analyze-*)
```
analyze-astro.md
analyze-next.md
analyze-nuxt.md
analyze-spip.md
analyze-swiftui.md
```

**Avantages :**
- ✅ Clairement identifiable comme catégorie
- ✅ Pas d'ordre implicite
- ✅ Extensible (analyze-*)

**Inconvénients :**
- ⚠️ Casse la convention numérique

#### Option C : Catégorie numérotée (10-analyze/)
```
10-analyze/
├── astro.md
├── next.md
├── nuxt.md
├── spip.md
└── swiftui.md
```

**Avantages :**
- ✅ Groupe logique
- ✅ Cohérence numérique
- ✅ Scalable (facile d'ajouter des stacks)

**Inconvénients :**
- ⚠️ Change la structure de dossier

---

### 🟡 Priorité 3 : Documentation

**Fichiers à mettre à jour :**

1. **`Readme.md`** - Ajouter section "Analyzers Spécialisés"
2. **`CLAUDE.md`** - Ajouter table des analyzers
3. **`ANALYSE-COHERENCE.md`** - Documenter les nouveaux agents
4. **`/CLAUDE.md` (racine)** - Mettre à jour la liste si mentionné

---

### 🟢 Priorité 4 : Workflows

**Question :**
Comment et quand utiliser les analyzers dans les workflows existants ?

**Proposition :**

```bash
# Audit technique approfondi d'une stack spécifique
"Analyse approfondie Nuxt" → nuxt-analyzer
"Audit technique Next.js" → next-analyzer
"Inventaire composants SwiftUI" → swiftui-analyzer

# Workflow nouveau projet (avec analyzer)
01-spec-writer
    ↓
XX-[stack]-analyzer (optionnel, si audit technique détaillé)
    ↓
02-todo-generator
    ↓
...
```

**Use cases :**
- **Onboarding nouveau projet** : Comprendre composants custom, patterns utilisés
- **Migration** : Identifier composants remplaçables (ex: custom → Nuxt UI)
- **Audit technique** : Problèmes de performance, anti-patterns
- **Refactoring** : Opportunités d'optimisation

---

## 💡 Recommandations

### ✅ Option Recommandée : Option C (Catégorie numérotée)

**Principe :**
- Les agents 01-09 restent inchangés (workflow principal)
- Les analyzers deviennent une catégorie dédiée (10-analyze/)
- Scalable pour ajouter d'autres catégories futures (11-deploy/, 12-test/, etc.)

**Structure finale :**

```
agents/
├── 01-spec-writer.md
├── 02-todo-generator.md
├── 03-sync-local.md
├── 04-task-runner.md
├── 05-code-auditor.md
├── 06-a11y-auditor.md
├── 07-perf-auditor.md
├── 08-external-sync.md
├── 09-context-generator.md
│
├── 10-analyze/
│   ├── astro.md
│   ├── next.md
│   ├── nuxt.md
│   ├── spip.md
│   └── swiftui.md
│
├── CLAUDE.md
├── Readme.md
└── ANALYSE-COHERENCE.md
```

**Invocation :**
```bash
"Analyse approfondie Nuxt" → analyze-nuxt
"Audit Next.js" → analyze-next
"Inventaire SwiftUI" → analyze-swiftui
```

**Bénéfices :**
- ✅ Séparation claire : workflow principal (01-09) vs outils spécialisés (10-analyze/)
- ✅ Cohérence numérique maintenue
- ✅ Scalable : facile d'ajouter 11-deploy/, 12-test/, etc.
- ✅ Pas d'ordre implicite entre analyzers (dans le dossier)
- ✅ Facilite la découverte (`ls 10-analyze/`)

---

## 📋 Actions Recommandées

### 🔴 Immédiat

1. **Fixer les permissions**
   ```bash
   chmod 644 agents/*-analyzer.md
   ```

2. **Créer la structure 10-analyze/**
   ```bash
   mkdir -p agents/10-analyze
   mv agents/*-analyzer.md agents/10-analyze/
   # Renommer en enlevant le suffixe -analyzer
   cd agents/10-analyze
   mv astro-analyzer.md astro.md
   mv next-analyzer.md next.md
   mv nuxt-analyzer.md nuxt.md
   mv spip-analyzer.md spip.md
   mv swiftui-analyzer.md swiftui.md
   ```

3. **Mettre à jour les frontmatter**
   ```yaml
   # Dans chaque fichier 10-analyze/*.md
   name: analyze-[stack]  # Ex: analyze-nuxt, analyze-next
   ```

4. **Tracker dans git**
   ```bash
   git add agents/10-analyze/
   git commit -m "Add specialized stack analyzers (10-analyze/)"
   ```

---

### 🟠 Court Terme

5. **Mettre à jour `Readme.md`**

   Ajouter section :
   ```markdown
   ## 🔬 Analyzers Spécialisés (10-analyze/)

   Agents d'analyse technique approfondie par stack :

   - `analyze-astro` : Analyse Astro (Islands, Content Collections)
   - `analyze-next` : Analyse Next.js (App Router, Server/Client)
   - `analyze-nuxt` : Analyse Nuxt (SSR, hydration, Nuxt UI)
   - `analyze-spip` : Analyse SPIP (boucles, squelettes, CVT)
   - `analyze-swiftui` : Analyse SwiftUI (MVVM, TCA, multi-platform)

   **Usage :**
   ```bash
   "Analyse approfondie Nuxt"
   "Audit technique Next.js"
   "Inventaire composants SwiftUI"
   ```
   ```

6. **Mettre à jour `CLAUDE.md` (agents/)**

   Ajouter table des analyzers :
   ```markdown
   ### Analyzers Spécialisés (10-analyze/)

   | Analyzer | Stack | Purpose |
   |----------|-------|---------|
   | **analyze-astro** | Astro 3-5 | Islands, Content, multi-framework |
   | **analyze-next** | Next.js 13-15 | App Router, Server/Client |
   | **analyze-nuxt** | Nuxt 3-4 | SSR, hydration, Nuxt UI |
   | **analyze-spip** | SPIP 3-5 | Squelettes, boucles, CVT |
   | **analyze-swiftui** | SwiftUI | MVVM, TCA, multi-platform |
   ```

7. **Mettre à jour CLAUDE.md racine**

   Ajouter dans la liste des agents :
   ```markdown
   - `10-analyze/` - Stack-specific analyzers (Astro, Next, Nuxt, SPIP, SwiftUI)
   ```

---

### 🟡 Moyen Terme

8. **Créer un README dans 10-analyze/**
   ```bash
   agents/10-analyze/README.md
   ```

   Contenu :
   ```markdown
   # Stack Analyzers

   Agents d'analyse technique approfondie par stack.

   ## Usage

   Ces analyzers complètent `01-spec-writer` pour une analyse technique détaillée.

   - **01-spec-writer** : Vue d'ensemble, architecture, roadmap
   - **analyze-[stack]** : Analyse approfondie composants, problèmes techniques

   ## Disponibles

   - `astro.md` : Astro 3.x/4.x/5.x
   - `next.md` : Next.js 13/14/15
   - `nuxt.md` : Nuxt 3.x/4.x
   - `spip.md` : SPIP 3.x/4.x
   - `swiftui.md` : SwiftUI (iOS/macOS/watchOS/tvOS/visionOS)

   ## Ajouter un Analyzer

   [Guidelines pour créer un nouvel analyzer]
   ```

9. **Documenter la relation spec-writer / analyzers**

   Clarifier dans `CLAUDE.md` :
   ```markdown
   ## Spec Writer vs Analyzers

   ### 01-spec-writer (Multi-stack, vue d'ensemble)
   - Détecte la stack automatiquement
   - Génère spec.md avec architecture globale
   - Couvre TOUS les stacks courants
   - **Usage** : Setup nouveau projet

   ### 10-analyze/[stack] (Stack unique, détails techniques)
   - Inventaire exhaustif des composants
   - Détection problèmes techniques spécifiques
   - Propositions d'optimisation/migration
   - **Usage** : Audit technique approfondi

   ### Complémentarité
   ```
   01-spec-writer → spec.md (vue globale)
   10-analyze/nuxt → audit technique détaillé (si besoin)
   02-todo-generator → todo.md
   ```
   ```

---

## 📊 Comparaison Avant/Après

### Avant (État Actuel)

```
agents/
├── 01-spec-writer.md          ✅ OK
├── 02-todo-generator.md       ✅ OK
├── 03-sync-local.md           ✅ OK
├── 04-task-runner.md          ✅ OK
├── 05-code-auditor.md         ✅ OK
├── 06-a11y-auditor.md         ✅ OK
├── 07-perf-auditor.md         ✅ OK
├── 08-external-sync.md        ✅ OK
├── 09-context-generator.md    ✅ OK
├── astro-analyzer.md          ⚠️ Untracked, non documenté
├── next-analyzer.md           ⚠️ Untracked, non documenté
├── nuxt-analyzer.md           ⚠️ Untracked, non documenté
├── spip-analyzer.md           ⚠️ Untracked, non documenté
└── swiftui-analyzer.md        ⚠️ Untracked, non documenté
```

**Problèmes :**
- Permissions incorrectes (600)
- Pas de versioning git
- Pas de documentation
- Naming incohérent
- Pas de catégorisation

---

### Après (Structure Recommandée)

```
agents/
├── 01-spec-writer.md          ✅ Workflow principal
├── 02-todo-generator.md       ✅ Workflow principal
├── 03-sync-local.md           ✅ Workflow principal
├── 04-task-runner.md          ✅ Workflow principal
├── 05-code-auditor.md         ✅ Audits
├── 06-a11y-auditor.md         ✅ Audits
├── 07-perf-auditor.md         ✅ Audits
├── 08-external-sync.md        ✅ Sync externe
├── 09-context-generator.md    ✅ Context
│
├── 10-analyze/                ✅ Catégorie analyzers
│   ├── README.md              ✅ Documentation
│   ├── astro.md               ✅ Tracked, documenté
│   ├── next.md                ✅ Tracked, documenté
│   ├── nuxt.md                ✅ Tracked, documenté
│   ├── spip.md                ✅ Tracked, documenté
│   └── swiftui.md             ✅ Tracked, documenté
│
├── CLAUDE.md                  ✅ Mis à jour
├── Readme.md                  ✅ Mis à jour
└── ANALYSE-COHERENCE.md       ✅ Historique
```

**Bénéfices :**
- ✅ Structure claire et scalable
- ✅ Tous les fichiers trackés
- ✅ Documentation complète
- ✅ Naming cohérent
- ✅ Catégorisation logique

---

## 🎯 Évolution Future

### Catégories Possibles

```
agents/
├── 01-09 : Workflow principal
├── 10-analyze/ : Analyzers par stack
├── 11-deploy/ : Déploiement automatisé (future)
├── 12-test/ : Tests automatisés (future)
├── 13-migrate/ : Migrations assistées (future)
└── 14-monitor/ : Monitoring et alertes (future)
```

**Extensibilité :**
- Chaque catégorie = un dossier numéroté
- Agents dans la catégorie = fichiers sans numéro
- Invocation : `category-agent` (ex: `deploy-vercel`, `test-e2e`)

---

## 📈 Métriques de Cohérence

| Aspect | Avant | Après | Amélioration |
|--------|-------|-------|--------------|
| **Agents trackés** | 9/14 (64%) | 14/14 (100%) | +36% |
| **Documentation** | 9/14 (64%) | 14/14 (100%) | +36% |
| **Naming cohérent** | 9/14 (64%) | 14/14 (100%) | +36% |
| **Catégorisation** | ❌ Non | ✅ Oui | ✅ |
| **Scalabilité** | ⚠️ Limitée | ✅ Excellente | ✅ |
| **Clarté structure** | 7/10 | 10/10 | +30% |

---

## ✅ Checklist d'Implémentation

### Phase 1 : Technique (1h)

- [ ] Fixer permissions (`chmod 644`)
- [ ] Créer dossier `10-analyze/`
- [ ] Déplacer fichiers
- [ ] Renommer fichiers (enlever `-analyzer`)
- [ ] Mettre à jour frontmatter (`name: analyze-[stack]`)
- [ ] Git add + commit

### Phase 2 : Documentation (2h)

- [ ] Créer `10-analyze/README.md`
- [ ] Mettre à jour `agents/Readme.md`
- [ ] Mettre à jour `agents/CLAUDE.md`
- [ ] Mettre à jour `/CLAUDE.md` (racine)
- [ ] Mettre à jour `ANALYSE-COHERENCE.md`

### Phase 3 : Validation (30min)

- [ ] Tester invocation d'un analyzer
- [ ] Vérifier git status propre
- [ ] Vérifier cohérence documentation
- [ ] Créer PR ou merge direct

---

## 🎉 Conclusion

**État Actuel :**
- ✅ **Workflow principal (01-09)** : Cohérent, bien documenté
- ⚠️ **Analyzers spécialisés** : Fonctionnels mais non intégrés

**Avec implémentation Option C :**
- ✅ **Structure scalable** : Facile d'ajouter catégories futures
- ✅ **Documentation complète** : Tous agents documentés
- ✅ **Cohérence maximale** : Naming, numérotation, catégorisation
- ✅ **Versioning** : Tous fichiers trackés

**Impact utilisateur :**
- 🟢 Clarté : Workflow principal vs outils spécialisés
- 🟢 Découvrabilité : Structure logique (`ls 10-analyze/`)
- 🟢 Flexibilité : Ajout facile de nouveaux analyzers
- 🟢 Maintenabilité : Documentation centralisée

**Recommandation finale :**
✅ **Implémenter Option C** pour maximiser cohérence et extensibilité.

---

_Rapport réalisé le 2026-01-12_
_Fichier : agents/COHERENCE-2026-01-12.md_
