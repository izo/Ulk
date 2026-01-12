# Stack Analyzers

Agents d'analyse technique approfondie par stack.

---

## 🎯 Mission

Ces analyzers complètent **01-spec-writer** en offrant une analyse technique détaillée et spécialisée pour chaque stack.

### Différence avec 01-spec-writer

| Agent | Scope | Profondeur | Cas d'usage |
|-------|-------|------------|-------------|
| **01-spec-writer** | Multi-stack, vue d'ensemble | Analyse architecturale globale | Setup nouveau projet |
| **10-analyze/[stack]** | Stack unique, focus technique | Analyse approfondie composants | Audit technique spécifique |

**En résumé :**
- **01-spec-writer** : "Quel est ce projet ? Que fait-il ?"
- **10-analyze/[stack]** : "Comment est-il construit ? Quels problèmes techniques ?"

---

## 🔬 Analyzers Disponibles

### analyze-astro (`astro.md`)
**Stack** : Astro 3.x/4.x/5.x

**Focus** :
- Islands Architecture (React, Vue, Svelte, Preact, Solid)
- Content Collections
- Output mode (static, server, hybrid)
- Performance (partial hydration, loading strategies)
- Multi-framework optimization

**Usage** :
```
"Analyse approfondie Astro"
"Audit Islands Architecture"
"Inventaire Content Collections"
```

---

### analyze-next (`next.md`)
**Stack** : Next.js 13/14/15

**Focus** :
- App Router vs Pages Router
- Server Components vs Client Components
- Suspense boundaries et loading states
- shadcn/ui, Radix UI integration
- Performance (bundle size, hydration)
- API Routes optimization

**Usage** :
```
"Analyse approfondie Next.js"
"Audit App Router"
"Inventaire Server/Client Components"
```

---

### analyze-nuxt (`nuxt.md`)
**Stack** : Nuxt 3.x/4.x

**Focus** :
- SSR/hydration patterns
- Nuxt UI v2/v3/v4 (composants UButton, UCard, etc.)
- Composables usage
- Server API routes
- Performance (bundle, Core Web Vitals)
- Migration custom → Nuxt UI

**Usage** :
```
"Analyse approfondie Nuxt"
"Audit SSR et hydration"
"Inventaire composants Nuxt UI"
"Identification composants custom remplaçables"
```

---

### analyze-spip (`spip.md`)
**Stack** : SPIP 3.x/4.x

**Focus** :
- Squelettes (structure.html, content/, extra/)
- Boucles SPIP (ARTICLES, RUBRIQUES, etc.)
- Formulaires CVT (Créer Vérifier Traiter)
- Plugins custom
- Framework (ZPIP, Flavor, Flavor Starter)
- Performance boucles

**Usage** :
```
"Analyse approfondie SPIP"
"Audit squelettes"
"Inventaire boucles et formulaires"
```

---

### analyze-swiftui (`swiftui.md`)
**Stack** : SwiftUI (iOS/macOS/watchOS/tvOS/visionOS)

**Focus** :
- Views et Modifiers
- Architecture (MVVM, TCA - The Composable Architecture)
- State management (@Observable, ObservableObject)
- SwiftData vs Core Data
- Performance (excessive redraws, opaque types)
- Multi-platform support

**Usage** :
```
"Analyse approfondie SwiftUI"
"Audit architecture MVVM/TCA"
"Inventaire Views et Modifiers"
```

---

## 🚀 Workflows d'Utilisation

### Workflow 1 : Setup Nouveau Projet (avec analyzer)

```
01-spec-writer → spec.md
    ↓
10-analyze/[stack] (optionnel si audit technique détaillé)
    ↓
02-todo-generator → todo.md
    ↓
03-sync-local
    ↓
09-context-generator
```

**Commande** :
```
"Génère spec et todo, puis analyse approfondie Nuxt"
```

---

### Workflow 2 : Audit Technique Spécifique

```
"Analyse approfondie [Stack]" → 10-analyze/[stack]
```

**Use cases** :
- **Onboarding projet existant** : Comprendre composants custom, patterns
- **Migration** : Identifier composants remplaçables (ex: custom → Nuxt UI)
- **Audit technique** : Problèmes de performance, anti-patterns
- **Refactoring** : Opportunités d'optimisation

---

### Workflow 3 : Migration Framework → UI Library

**Exemple : Migration custom components → Nuxt UI**

```
10-analyze/nuxt
    ↓
[TODO de migration générée]
    ↓
02-todo-generator (intégrer TODO migration)
    ↓
04-task-runner (implémenter migration)
```

**Commande** :
```
"Analyse Nuxt et identifie les composants custom remplaçables par Nuxt UI"
```

---

## 📊 Structure d'Output

Tous les analyzers suivent une structure standardisée :

### Phase 1 : Détection de la stack
- Version et configuration
- Frameworks et dépendances
- Structure du projet
- Volumes (composants, pages, etc.)

### Phase 2 : Inventaire des composants
- Composants natifs du framework
- Composants custom
- Comptage des usages

### Phase 3 : Analyse des problèmes
- Problèmes de performance
- Anti-patterns spécifiques à la stack
- Problèmes SSR/hydration (si applicable)

### Phase 4 : TODO de migration/optimisation
- Composants remplaçables
- Optimisations recommandées
- Checklist d'actions priorisées

**Output** : Rapport markdown avec inventaire complet, problèmes identifiés, et TODO actionnable.

---

## 🛠️ Ajouter un Nouvel Analyzer

Pour créer un analyzer pour une nouvelle stack :

### 1. Structure du fichier

Créer `10-analyze/[stack-name].md` avec :

```markdown
---
name: analyze-[stack-name]
description: Analyse un projet [Stack] pour...
tools: View, Read, Grep, Glob, Bash, Write, MultiEdit, Task
model: sonnet
---

# Agent [Stack] Analyzer

Tu es un sous-agent spécialisé dans l'analyse de projets [Stack].

## Mission

Analyser exhaustivement un projet [Stack] pour...

---

## Phase 1 : Détection de la stack
[Détection version, config, structure]

## Phase 2 : Inventaire des composants
[Inventaire exhaustif]

## Phase 3 : Analyse des problèmes
[Anti-patterns, performance]

## Phase 4 : TODO de migration/optimisation
[Recommandations actionables]
```

### 2. Pattern de détection

Inclure des commandes bash spécifiques pour :
- Détecter la version (`package.json`, fichiers de config)
- Identifier les frameworks/libraries utilisés
- Compter les composants/fichiers

### 3. Focus spécifique à la stack

Identifier les points d'attention uniques :
- **Frameworks JS** : SSR, hydration, bundle size
- **CMS** : Templates, boucles, plugins
- **Mobile** : Architecture, multi-platform, state management

### 4. Documentation

Mettre à jour :
- `10-analyze/README.md` (cette page)
- `agents/Readme.md`
- `agents/CLAUDE.md`

---

## 📚 Documentation Parente

- **`../Readme.md`** : Vue d'ensemble de tous les agents (01-09 + 10-analyze/)
- **`../CLAUDE.md`** : Architecture complète du système d'agents
- **`/CLAUDE.md`** : Instructions globales du projet Woodman

---

## 🎯 Modèle Utilisé

Tous les analyzers utilisent **sonnet** :
- Tâche structurée (inventaire, comptage)
- Pas d'analyse architecturale complexe (déjà fait par 01-spec-writer)
- Performance et coût optimisés

---

## ✨ Bonnes Pratiques

### Pour l'utilisateur

1. **Utilisez 01-spec-writer d'abord** pour la vue d'ensemble
2. **Puis un analyzer** si vous avez besoin d'un audit technique approfondi
3. **Intégrez la TODO** générée dans votre roadmap

### Pour l'analyzer

1. **Soyez exhaustif** : Comptez tout, inventoriez tout
2. **Soyez spécifique** : Identifiez les problèmes propres à la stack
3. **Soyez actionable** : Proposez une TODO concrète avec priorités

---

_Woodman Agents · 10-analyze/ · Stack Analyzers_
