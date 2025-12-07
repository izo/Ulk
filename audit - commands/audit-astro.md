# Audit complet d'un projet Astro.js + Tailwind (+ shadcn/ui optionnel)

Tu es un expert en Astro.js, Tailwind CSS, shadcn/ui, TypeScript et en structuration de projets front modernes (SPA/MPA, islands, SSR/SSG) avec bonnes pratiques DX/CI/CD.

Je te fournis un projet basé sur Astro.js qui utilise Tailwind, et parfois shadcn/ui via des frameworks d'UI (React, Vue, Svelte, etc.).
Ta mission : réaliser un audit technique complet, structuré et directement actionnable.

---

## 1. Contexte (à adapter)

- Framework : Astro.js (pages/files routing, islands, SSR/SSG/Hybrid)
- Styling : Tailwind CSS
- UI components : shadcn/ui éventuellement (généralement côté React)
- Structure : projet simple ou monorepo (apps + packages partagés)
- Objectifs de l'audit :
  - Identifier les faiblesses techniques, architecturales, et de DX
  - Vérifier la bonne utilisation d'Astro (islands, rendu, content collections)
  - Proposer des améliorations concrètes, priorisées

Tu peux explorer librement l'arborescence du repo, `astro.config.*`, les intégrations, les scripts et le code.

---

## 2. Ce que je veux que tu fasses

### 2.1. Cartographie du projet (ou monorepo)

- Identifier :
  - L'application Astro principale (`src/pages`, `src/layouts`, `src/components`, `src/content`, etc.)
  - Éventuels sous-projets/apps (par ex. `apps/web`, `apps/docs`) et packages partagés (`packages/ui`, `packages/config`, etc.)
- Décrire :
  - La structure globale des dossiers
  - Le modèle d'organisation (par features, par type de fichier, par domaine)
  - Les intégrations Astro activées (`@astrojs/*`, framework adapters, etc.)

### 2.2. Analyse Astro.js (routing, rendu, islands, contenu)

- Vérifier :
  - `astro.config.*` :
    - Integrations (React, Vue, Svelte, Solid, Markdoc, MDX, Tailwind, etc.)
    - Adapter (SSR/Static/Edge)
    - Aliases, output, image, experimental éventuels
  - Structure de `src/` :
    - `src/pages`, `src/layouts`, `src/components`, `src/content`, `src/env.d.ts`
  - Modèle de rendu :
    - SSG pur, SSR, hybride (routes dynamiques, endpoints)
  - Utilisation des Astro Islands (`client:load`, `client:idle`, `client:only`, etc.)
- Identifier :
  - Anti-patterns :
    - Trop de client-side inutile (islands surdimensionnées)
    - Logique métier dans des composants d'UI
    - Mauvaise séparation layout / page / composant
    - Problèmes dans l'usage des content collections si elles existent
- Proposer :
  - Une organisation plus idiomatique Astro (pages simples, layouts réutilisables, islands ciblées)
  - Une stratégie claire SSG/SSR/hybride selon le type de contenu

### 2.3. Tailwind CSS & éventuellement shadcn/ui

- Vérifier :
  - Config Tailwind (`tailwind.config.*`, `postcss.config.*`, fichiers globaux de styles)
  - Places où Tailwind est utilisé (Astro components `.astro`, components React/Vue/Svelte, etc.)
  - Structure du design system :
    - Tokens de couleurs, typographie, spacing, radius, etc.
    - Classes utilitaires récurrentes vs composants abstraits
  - Si shadcn/ui est présent :
    - Organisation des composants (`components/ui/*`, etc.)
    - Cohérence avec Tailwind (thèmes, tokens, variantes)
    - Duplication ou divergence de styles entre shadcn/ui et le reste du projet
- Identifier :
  - Classes Tailwind redondantes ou incohérentes
  - Composants trop gros ou non factorisés
  - Incohérences visuelles (absence de design system clair)
- Proposer :
  - Une stratégie de design system (tokens, thèmes, composants de base)
  - Un plan pour rationaliser l'usage de Tailwind + shadcn/ui

### 2.4. Dépendances & qualité du code

- Inspecter `package.json` (et éventuellement ceux d'un monorepo) :
  - Versions critiques (Astro, TypeScript, Tailwind, frameworks d'UI, libs de tests, etc.)
  - Dépendances non utilisées, dupliquées ou incohérentes
- Vérifier :
  - Linting (ESLint, Prettier) et éventuels configs pour Astro (`eslint-plugin-astro`, etc.)
  - Typage TypeScript :
    - Mode strict ou non
    - Types partagés, types implicites `any`
- Fournir :
  - Une liste de problèmes concrets avec chemins de fichiers
  - Des recommandations de rationalisation des dépendances et du typage (priorité haute / moyenne / faible)

### 2.5. Contenu, data & intégrations

- Vérifier :
  - Utilisation des Content Collections (`src/content/config.*`, collections, schémas)
  - Gestion des contenus markdown/MDX
  - Intégrations externes :
    - APIs, fetch côté serveur / client
    - CMS (headless), data loaders, endpoints Astro
- Identifier :
  - Couplages trop forts entre composants et sources de données
  - Manque de typage pour les contenus (zod / schema / content collections)
- Proposer :
  - Un modèle plus propre pour la gestion du contenu (content collections typées, services de données, etc.)
  - Des patterns pour séparer UI et data logic

### 2.6. Performance & DX

- Performance :
  - Taille des pages et des islands
  - Usage du client-side (scripts, bundles JS) là où du pur HTML statique serait possible
  - Optimisation d'images (Astro assets, `<Image />`, etc.)
- DX :
  - Scripts npm/pnpm (`dev`, `build`, `preview`, `lint`, `test`, etc.)
  - Simplicité de démarrage pour un nouveau dev (README, `.env`, scripts)
  - Aliases de chemins, organisation des imports
- Proposer :
  - Optimisations (réduction JS client, islandisation plus fine, usage des composants Astro natifs)
  - Améliorations DX (scripts consolidés, docs, conventions de dossier)

### 2.7. Tests, sécurité, CI/CD

- Tests :
  - Présence de tests unitaires / d'intégration / e2e (Vitest, Playwright, Cypress, etc.)
  - Organisation des tests (dossiers, utilitaires, mocks)
- Sécurité :
  - Gestion des secrets et variables d'environnement (`.env`, `.env.example`, usage dans Astro)
  - Validation côté serveur (endpoints Astro, routes dynamiques)
- CI/CD :
  - Workflows (`.github/workflows`, pipelines GitLab/Autres) :
    - Lint, type-check, tests, build
    - Déploiement (Vercel, Netlify, autres)
- Proposer :
  - Un pipeline minimal recommandé pour un projet Astro (lint + type-check + tests + build)
  - Des priorités pour introduire ou renforcer les tests et la sécurité

---

## 3. Forme du rendu attendu

Je veux un rapport structuré comme suit :

### 3.1. Résumé exécutif (TL;DR)

- 5–10 bullet points :
  - 3 forces majeures
  - 3–7 problèmes / risques principaux
  - 3 priorités d'action immédiates

### 3.2. Cartographie du projet

- Description textuelle de la structure (apps, packages éventuels, dossiers clés)
- Commentaire sur la cohérence globale et le design de l'architecture

### 3.3. Audit détaillé

- 3.3.1. Astro.js : config, routing, rendu, islands
- 3.3.2. Tailwind & shadcn/ui : design system, cohérence visuelle
- 3.3.3. Dépendances, typage & qualité du code
- 3.3.4. Contenu, data & intégrations
- 3.3.5. Performance, DX, tests, sécurité & CI/CD

Pour chaque sous-partie :
- Constats (faits observables, avec chemins de fichiers)
- Problèmes (explication courte + impact)
- Recommandations (actions concrètes avec priorité : haute / moyenne / faible)

### 3.4. Plan d'action priorisé

- Court terme (1–2 semaines)
- Moyen terme (1–2 mois)
- Long terme

### 3.5. Checklist finale

- Une checklist opérationnelle (cases à cocher) pour suivre la mise en œuvre des recommandations.

---

## 4. Contraintes

- Ne pas inventer de fichiers, de libs ou de pipelines : base-toi uniquement sur ce qui existe dans le repo.
- Quand tu signales un problème, mentionne systématiquement :
  - Le chemin de fichier ou de dossier concerné
  - Un exemple concret (extrait de code ou config) si pertinent
- Si un élément est absent (tests, CI, design system explicite, content collections) :
  - Note-le comme **constat**
  - Transforme-le en **recommandation** explicite.

---

## 5. Livrable

Génère un fichier `audit-YYYY-MM-DD.md` (avec la date du jour) contenant le rapport complet.

Commence par :
1. Résumer en quelques lignes ce que tu comprends de la structure globale du projet Astro.
2. Enchaîne directement sur l'audit détaillé selon la structure ci-dessus, sans me reposer de questions.
3. Écris le rapport dans le fichier `audit-YYYY-MM-DD.md`.
