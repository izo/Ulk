# Audit complet d'un monorepo Nuxt 4

Tu es un expert en architecture JavaScript/TypeScript, Nuxt 3/4, monorepos (pnpm / npm workspaces / Turborepo / Nx) et bonnes pratiques DX/CI/CD.

Je te fournis un projet en monorepo Nuxt 4.
Ta mission : réaliser un audit technique complet, structuré et actionnable.

---

## 1. Contexte (à adapter)

- Framework principal : Nuxt 4 (Vue 3, Nitro)
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
  - Les applications Nuxt (front, back, admin, etc.)
  - Les packages / libraries internes (UI, core, utils, API, design system…)
  - Le système de workspace (pnpm / yarn / npm / bun / Turborepo / Nx, etc.)
- Décrire en quelques lignes :
  - La structure globale (`apps/`, `packages/`, `services/`, etc.)
  - Les dépendances fortes entre modules

### 2.2. Analyse Nuxt 4 / Vue 3

- Vérifier la configuration Nuxt principale :
  - `nuxt.config.*`, modules, plugins, middlewares, `runtimeConfig`
  - Organisation des pages/routeurs, layout, composables
- Pointer :
  - Patterns obsolètes
  - Mauvaise utilisation du composable (ex : `useAsyncData`, `useState`, `server/api`)
  - Mélange SSR/CSR problématique
- Proposer des améliorations Nuxt 4 idiomatiques.

### 2.3. Dépendances & qualité du code

- Inspecter `package.json` racine + workspaces :
  - Versions critiques (Nuxt, Vue, Nitro, TypeScript, ESLint, Vite, Vitest, Playwright, etc.)
  - Dépendances non utilisées / dupliquées / incohérentes entre packages
- Vérifier :
  - Linting (ESLint, Prettier, Stylelint, etc.)
  - Typage (TypeScript strict ou non, `any` abusifs, types partagés)
- Donner :
  - Une liste de problèmes concrets
  - Des suggestions de refactor structurées (par priorité : haute / moyenne / faible)

### 2.4. Architecture & organisation

- Évaluer :
  - Séparation des responsabilités (UI / domaine / infrastructure)
  - Gestion des stores (Pinia, composables, autres)
  - Organisation des dossiers (`components`, `composables`, `server`, `plugins`, `utils`, etc.)
- Recommander :
  - Une architecture cible plus claire si nécessaire
  - Des patterns pour la factorisation (packages partagés, composables réutilisables, design system, etc.)

### 2.5. Performance & DX

- Identifier rapidement les points critiques de performance potentiels :
  - Rendering SSR/CSR, usage des middlewares, appels réseau, gros bundles
- Vérifier :
  - Scripts npm/pnpm (`dev`, `build`, `lint`, `test`, `preview`, `storybook`, etc.)
  - Simplicité de mise en route du projet pour un nouveau dev
- Proposer :
  - Améliorations DX (scripts, docs, conventions, tooling)
  - Optimisations évidentes (mise en cache, splitting, lazy loading, etc.)

### 2.6. Tests, sécurité, CI/CD

- Vérifier la présence et l'usage :
  - De tests unitaires / d'intégration / end-to-end
  - De mocks ou utilitaires de test partagés
- Vérifier :
  - Gestion des secrets (`env`, `.env.example`, `runtimeConfig`, etc.)
  - Config minimale de sécurité (headers, rate limiting côté Nitro, etc. si applicable)
- Regarder la CI/CD si des fichiers sont présents (`.github/workflows`, etc.) et :
  - Identifier les manques évidents
  - Proposer un pipeline minimal recommandé pour ce type de monorepo Nuxt 4

---

## 3. Forme du rendu attendu

Je veux un rapport structuré comme suit :

### 3.1. Résumé exécutif (TL;DR)

- 5–10 bullet points max :
  - 3 forces majeures
  - 3–7 risques / problèmes principaux
  - 3 priorités d'action immédiates

### 3.2. Cartographie du monorepo

- Schéma textuel de la structure (apps, packages, liens)
- Commentaire sur la cohérence globale

### 3.3. Audit détaillé

- 3.3.1. Configuration Nuxt 4
- 3.3.2. Architecture et organisation du code
- 3.3.3. Qualité du code & typage
- 3.3.4. Performance & DX
- 3.3.5. Tests, sécurité, CI/CD

Pour chaque sous-partie :
- Constats (faits observables, avec chemins de fichiers)
- Problèmes (explication courte)
- Recommandations (actions concrètes, idéalement avec ordre de priorité)

### 3.4. Plan d'action priorisé

- Liste en 3 niveaux :
  - Court terme (1–2 semaines)
  - Moyen terme (1–2 mois)
  - Long terme

### 3.5. Checklist finale

- Une checklist opérationnelle (cases à cocher) pour suivre la mise en œuvre de tes recommandations.

---

## 4. Contraintes

- Ne pas inventer des fichiers ou outils qui n'existent pas dans le repo : base-toi uniquement sur ce que tu vois.
- Quand tu cites un problème, mentionne systématiquement :
  - Le chemin de fichier ou de dossier concerné
  - Un extrait ou un exemple concret quand c'est pertinent
- Si quelque chose n'est pas clair (ex. absence de tests ou de CI), formule-le comme une hypothèse et propose une recommandation.

---

## 5. Livrable

Génère un fichier `audit-YYYY-MM-DD.md` (avec la date du jour) contenant le rapport complet.

Commence par :
1. Résumer en quelques lignes ce que tu comprends de la structure du monorepo.
2. Puis enchaîne directement sur l'audit détaillé selon la structure ci-dessus, sans me reposer de questions.
3. Écris le rapport avec une liste de taches complete dans le fichier `audit-YYYY-MM-DD.md`.
