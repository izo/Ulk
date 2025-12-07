# Audit complet d'un monorepo Next.js + Tauri (desktop)

Tu es un expert en architecture JavaScript/TypeScript, **Next.js (App Router)**, **React**, **Tailwind/shadcn/ui** (si présents), **monorepos** (pnpm / npm workspaces / Turborepo / Nx) et en développement **Tauri** (Rust + frontend web, multi-plateforme).

Je te fournis un projet en **monorepo** qui contient :
- une ou plusieurs apps **Next.js** pour le web,
- une app **Tauri** pour le desktop (macOS / Windows / Linux),
- éventuellement des packages partagés (UI, core, utils…).

Ta mission : réaliser un **audit technique complet**, structuré et actionnable.

---

## 1. Contexte (à adapter)

- Web : Next.js (App Router de préférence, React server components)
- Desktop : Tauri (Rust + frontend basé sur une app web / Next)
- Organisation : monorepo (apps + packages partagés)
- Objectifs de l'audit :
  - Identifier les faiblesses techniques, architecturales et DX
  - Vérifier l'architecture spécifique web + desktop (Next + Tauri)
  - Proposer un plan d'amélioration et de durcissement (perf, sécurité, packaging, DX)

---

## 2. Ce que je veux que tu fasses

### 2.1. Cartographie du monorepo

- Identifier précisément :
  - Les apps Next.js (`apps/web`, `apps/admin`, etc.)
  - L'app Tauri (`apps/desktop`, `src-tauri`, etc.)
  - Les packages / libraries partagés (`packages/ui`, `packages/core`, `packages/config`, etc.)
  - Le système de workspace (pnpm / yarn / npm / bun / Turborepo / Nx, etc.)
- Produire :
  - Une vue d'ensemble de la structure (`apps/`, `packages/`, `src-tauri/`, etc.)
  - Un schéma textuel des dépendances (qui dépend de quoi, notamment entre Next et Tauri)

### 2.2. Analyse Next.js (App Router, frontend web)

- Vérifier :
  - `next.config.*`, `tsconfig.*`, structure `app/` (et `pages/` si legacy)
  - Gestion des **server components / client components**
  - Data fetching (`fetch`, `server actions`, `route handlers`, `revalidate`, `cache`)
- Identifier :
  - Anti-patterns (logique serveur dans des composants client, sur-utilisation de `useEffect`, etc.)
  - Problèmes de structure dans `app/` (routes trop grosses, composants monolithiques, absence de factorisation)
- Proposer :
  - Des améliorations Next.js modernes (App Router idiomatique, gestion du cache, `metadata`, `layout`, etc.)

Si Tailwind / shadcn/ui sont présents :
- Vérifier Tailwind (`tailwind.config.*`) et l'organisation du design system.
- Vérifier l'intégration de shadcn/ui (`components/ui`, duplication, cohérence visuelle).
- Proposer une organisation plus propre (tokens, thèmes, composants de base).

### 2.3. Analyse Tauri (Rust, backend desktop, sécurité)

- Inspecter la structure Tauri :
  - Dossier `src-tauri/`, fichiers `tauri.conf.json` (ou équivalent), code Rust (`src/main.rs`, modules Rust, commands).
- Vérifier :
  - La manière dont l'UI est fournie à Tauri :
    - Build Next exporté puis servi dans Tauri
    - Ou mode dev avec serveur Next local
  - Les **commands Tauri** (API Rust exposée au frontend) :
    - Responsabilités de chaque command
    - Gestion des erreurs
    - Typage et sérialisation
- Analyser la **sécurité Tauri** :
  - Permissions fichier / OS (file system, shell, notifications, etc.)
  - Capabilities activées / désactivées
  - Vérifier s'il y a des accès trop larges (file system root, shell sans contrôle, etc.)
- Regarder :
  - Configuration de l'updater (si présent)
  - Gestion multi-plateforme (ciblage macOS / Windows / Linux)
- Proposer :
  - Durcissement de la surface d'attaque (réduction des permissions, validation d'inputs, patterns de sécurité Tauri)
  - Organisation plus claire du code Rust (modules, séparation des domaines, tests éventuels)

### 2.4. Intégration Next.js ↔ Tauri

- Expliquer comment l'app Next est utilisée par Tauri :
  - Est-ce le même code UI pour web et desktop ?
  - Y a-t-il des adaptations spécifiques desktop (menus, raccourcis, intégrations OS) ?
- Identifier :
  - Le partage de code entre apps web et desktop (components, hooks, services, stores)
  - Les éventuelles duplications inutiles (UI ou logique dupliquée entre web et desktop)
- Vérifier :
  - La gestion des chemins, URLs, assets, routes quand l'app tourne dans Tauri
  - La manière dont les commands Tauri sont consommées côté frontend (hook dédié, SDK maison, etc.)
- Proposer :
  - Des patterns plus propres pour partager la logique (packages partagés, adapter layer pour Tauri, etc.)
  - Une stratégie claire pour différencier les comportements web vs desktop (feature flags, environment, helpers)

### 2.5. Dépendances & qualité du code (monorepo global)

- Inspecter `package.json` racine + workspaces :
  - Cohérence des versions (React, Next, TypeScript, Tailwind, test libs)
  - Dépendances inutilisées, dupliquées, ou mal positionnées (devDependencies vs dependencies)
- Vérifier :
  - Linting JS/TS (ESLint), formatage (Prettier), éventuellement Stylelint
  - Typage TypeScript (mode strict ou non, usage de `any`, types partagés via un package dédié)
- Côté Rust :
  - Vérifier `Cargo.toml`, dépendances Rust, structure des modules
- Fournir :
  - Une liste de problèmes concrets avec chemins (JS/TS + Rust)
  - Des recommandations de rationalisation des dépendances et du typage

### 2.6. Architecture, performance & DX

- Architecture :
  - Évaluer la séparation des responsabilités (UI, domaine, accès données, platform layer Tauri)
  - Organisation des dossiers : `app`, `components`, `lib`, `hooks`, `packages/*`, `src-tauri/src/*`
- Performance :
  - Côté Next : server vs client components, taille des bundles, dynamic imports, cache, revalidate
  - Côté Tauri : éventuels hotspots (commands lourdes, IO synchrones, blocages, etc.)
- DX :
  - Scripts npm/pnpm pour dev, build, lint, test, build Tauri, release
  - Simplicité de mise en route (README, .env, scripts unifiés)
- Proposer :
  - Améliorations DX (scripts unifiés, alias, docs, tooling pour build/release Tauri)
  - Optimisations évidentes (code splitting, lazy, gestion du cache côté Next, refactor commands Rust lourdes)

### 2.7. Tests, sécurité globale, CI/CD

- Tests :
  - JS/TS : Jest/Vitest, Testing Library, Playwright/Cypress, etc.
  - Rust : tests unitaires sur les modules critiques
  - Organisation des tests dans le monorepo
- Sécurité :
  - Gestion des secrets (`.env`, `.env.example`, variables pour Tauri, Next runtime env)
  - Validation des données côté Tauri (inputs des commands, accès file system)
- CI/CD :
  - Vérifier les workflows (`.github/workflows`, pipelines GitLab ou autres) :
    - Lint, type-check, tests, build Next, build Tauri
    - Process de release desktop (signatures, notarisation macOS, packaging Windows, etc. si présent)
- Proposer :
  - Un pipeline minimal recommandé pour ce type de monorepo Next + Tauri (lint, test, build, release)

---

## 3. Forme du rendu attendu

Je veux un rapport structuré comme suit :

### 3.1. Résumé exécutif (TL;DR)

- 5–10 bullet points :
  - 3 forces majeures
  - 3–7 risques / problèmes principaux
  - 3 priorités d'action immédiates

### 3.2. Cartographie du monorepo

- Description textuelle de la structure (apps web, app desktop, packages, src-tauri)
- Commentaire sur la cohérence globale et le partage de code

### 3.3. Audit détaillé

- 3.3.1. Next.js (architecture, App Router, front web)
- 3.3.2. Tauri (Rust, sécurité, packaging)
- 3.3.3. Intégration Next ↔ Tauri (partage de code, API, UX)
- 3.3.4. Dépendances, qualité du code & typage (JS/TS + Rust)
- 3.3.5. Performance, DX, tests, sécurité, CI/CD

Pour chaque sous-partie :
- Constats (faits observables, avec chemins de fichiers)
- Problèmes (explication courte + impact)
- Recommandations (actions concrètes avec priorité : haute / moyenne / faible)

### 3.4. Plan d'action priorisé

- Court terme (1–2 semaines)
- Moyen terme (1–2 mois)
- Long terme

### 3.5. Checklist finale

- Une checklist opérationnelle de points à cocher pour suivre la mise en œuvre.

---

## 4. Contraintes

- Ne pas inventer de fichiers, librairies ou pipelines : base-toi uniquement sur ce qui existe dans le repo.
- Quand tu signales un problème, mentionne :
  - Le chemin de fichier/dossier concerné
  - Un exemple concret (extrait de code, configuration) quand c'est utile
- Si un élément est absent (tests, CI, durcissement Tauri, doc) :
  - Note-le comme **constat**
  - Transforme-le en **recommandation** explicite.

---

## 5. Livrable

Génère un fichier `audit-YYYY-MM-DD.md` (avec la date du jour) contenant le rapport complet.

Commence par :
1. Résumer en quelques lignes ce que tu comprends de la structure globale (apps, packages, Tauri).
2. Enchaîne directement sur l'audit détaillé selon la structure ci-dessus, sans me reposer de questions.
3. Écris le rapport dans le fichier `audit-YYYY-MM-DD.md`.
