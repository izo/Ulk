# Audit complet d'un monorepo Next.js + Tailwind + shadcn/ui

Tu es un expert en architecture JavaScript/TypeScript, Next.js (App Router), React, monorepos (pnpm / npm workspaces / Turborepo / Nx), Tailwind CSS et shadcn/ui.

Je te fournis un projet en monorepo Next.js utilisant Tailwind et shadcn/ui.
Ta mission : réaliser un audit technique complet, structuré et directement actionnable.

---

## 1. Contexte (à adapter)

- Framework principal : Next.js (App Router, server components)
- Frontend : React, Tailwind CSS, shadcn/ui
- Organisation : monorepo (plusieurs apps + packages partagés)
- Objectifs de l'audit :
  - Identifier les points faibles techniques, architecturaux et DX
  - Proposer des améliorations concrètes, priorisées
  - Vérifier que le projet est prêt à scaler (features, équipe, performance)

Tu peux explorer librement l'arborescence, les configs, les scripts et le code.

---

## 2. Ce que je veux que tu fasses

### 2.1. Cartographie du monorepo

- Identifier :
  - Les applications Next.js (web, admin, marketing, API, etc.)
  - Les packages / libraries internes (UI, core, utils, design system, config, etc.)
  - Le système de workspace (pnpm / yarn / npm / bun / Turborepo / Nx, etc.)
- Décrire :
  - La structure globale (apps/, packages/, services/, etc.)
  - Les dépendances fortes entre modules (qui consomme quoi)

### 2.2. Analyse Next.js (App Router, React, server components)

- Vérifier la configuration et l'architecture Next :
  - `next.config.*`, `tsconfig.*`, organisation `app/`, `pages/` (s'il y en a encore), `src/`
  - Utilisation de l'App Router (routes, layouts, templates, server components, client components)
  - Gestion des data fetching (`fetch`, `server actions`, `route handlers`, `cache`, `revalidate`)
- Pointer :
  - Patterns obsolètes ou anti-patterns (ex : mauvais mélange server/client, logique serveur dans des composants client, etc.)
  - Problèmes d'organisation dans `app/` (routes surchargées, absence de factorisation, etc.)
- Proposer :
  - Des améliorations pour respecter les bonnes pratiques Next.js récentes (App Router, server components, caching, metadata, etc.)

### 2.3. Tailwind CSS & shadcn/ui / Design system

- Vérifier :
  - La configuration Tailwind (`tailwind.config.*`, `postcss.config.*`)
  - L'usage des design tokens, thèmes, variables CSS, palettes de couleurs, typographies
  - L'intégration et l'organisation de shadcn/ui :
    - Dossier `components/ui`, structure, conventions
    - Éventuelle duplication ou divergence entre composants
- Identifier :
  - Classes Tailwind redondantes ou incohérentes
  - Manque de factorisation dans les composants UI
  - Incohérences de design (pas de système, composants divergents)
- Proposer :
  - Une stratégie claire de design system (tokens, thèmes, composants de base, primitives)
  - Des guidelines d'utilisation de Tailwind + shadcn/ui (patterns et anti-patterns)

### 2.4. Dépendances & qualité du code

- Inspecter `package.json` racine + workspaces :
  - Versions critiques (Next.js, React, TypeScript, ESLint, Tailwind, testing libs, etc.)
  - Dépendances non utilisées / dupliquées / incohérentes entre apps et packages
- Vérifier :
  - Linting (ESLint, Prettier, éventuellement Stylelint)
  - Typage (TypeScript strict ou non, abus de `any`, types partagés dans un package dédié)
- Fournir :
  - Une liste de problèmes concrets (avec exemples et chemins)
  - Des suggestions de refactor structurées (priorité haute / moyenne / faible)

### 2.5. Architecture & organisation

- Évaluer :
  - Séparation des responsabilités (UI / domaine / infrastructure / data access)
  - Organisation des dossiers (`app`, `components`, `lib`, `hooks`, `providers`, `config`, etc.)
  - Gestion globale de l'état (React context, Zustand, Redux, server components, etc.)
- Recommander :
  - Une architecture cible plus claire si nécessaire (domain-driven, feature-based, slices, etc.)
  - Des patterns de factorisation (packages partagés, hooks, utils, design system centralisé)

### 2.6. Performance & DX

- Identifier :
  - Les points critiques de performance potentiels :
    - Mauvaise utilisation des server components / client components
    - Composants lourds ou non découpés
    - Problèmes de rendering (hydration, `useEffect` abusifs, etc.)
    - Problèmes de bundle (trop de client components, libs lourdes côté client)
- Vérifier :
  - Scripts npm/pnpm (`dev`, `build`, `lint`, `test`, `preview`, `storybook`, etc.)
  - Simplicité de mise en route pour un nouveau développeur (README, env, scripts)
- Proposer :
  - Améliorations DX (scripts consolidés, docs, conventions, alias de path, tooling)
  - Optimisations évidentes (code splitting, `dynamic()`, lazy loading, caching, revalidate, etc.)

### 2.7. Tests, sécurité, CI/CD

- Vérifier :
  - Présence et usage des tests (unitaires, intégration, e2e : Jest, Vitest, Testing Library, Playwright, Cypress, etc.)
  - Organisation des fichiers de tests et éventuels utilitaires/mocks partagés
- Inspecter :
  - Gestion des secrets et variables d'environnement (`.env`, `.env.example`, `process.env`, `next.config`, etc.)
  - Config minimale de sécurité (headers via middleware, protections de routes, validation des inputs)
- Regarder la CI/CD (ex : `.github/workflows`, pipelines, checks automatiques) :
  - Identifier les manques évidents (pas de tests, pas de lint, pas de type-check, pas de build)
- Proposer un pipeline minimal recommandé pour ce type de monorepo Next.js

---

## 3. Forme du rendu attendu

Je veux un rapport structuré comme suit :

### 3.1. Résumé exécutif (TL;DR)

- 5–10 bullet points :
  - 3 forces majeures
  - 3–7 risques / problèmes principaux
  - 3 priorités d'action immédiates

### 3.2. Cartographie du monorepo

- Schéma textuel de la structure (apps, packages, leurs rôles)
- Commentaire sur la cohérence globale et les dépendances

### 3.3. Audit détaillé

- 3.3.1. Configuration & architecture Next.js (App Router, server/client components)
- 3.3.2. Tailwind CSS, shadcn/ui & design system
- 3.3.3. Qualité du code & typage
- 3.3.4. Performance & DX
- 3.3.5. Tests, sécurité, CI/CD

Pour chaque sous-partie :
- Constats (faits observables, avec chemins de fichiers)
- Problèmes (explication courte, impact)
- Recommandations (actions concrètes, avec un niveau de priorité)

### 3.4. Plan d'action priorisé

- Liste en 3 niveaux :
  - Court terme (1–2 semaines)
  - Moyen terme (1–2 mois)
  - Long terme

### 3.5. Checklist finale

- Une checklist opérationnelle (cases à cocher) pour suivre la mise en œuvre des recommandations.

---

## 4. Contraintes

- Ne pas inventer de fichiers, de libs ou de pipelines qui n'existent pas dans le repo : base-toi uniquement sur ce que tu vois.
- Quand tu cites un problème, mentionne systématiquement :
  - Le chemin de fichier ou de dossier concerné
  - Un exemple concret (extrait de code ou pattern observé) quand c'est pertinent
- Si quelque chose est absent ou peu clair (ex. absence de tests, de CI, de design system formalisé), formule-le comme une hypothèse et transforme-le en recommandation explicite.

---

## 5. Livrable

Génère un fichier `audit-YYYY-MM-DD.md` (avec la date du jour) contenant le rapport complet.

Commence par :
1. Résumer en quelques lignes ce que tu comprends de la structure du monorepo.
2. Puis enchaîne directement sur l'audit détaillé selon la structure ci-dessus, sans me reposer de questions.
3. Écris le rapport dans le fichier `audit-YYYY-MM-DD.md`.
