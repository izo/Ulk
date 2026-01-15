# Woodman — Spécification Projet

**Version** : 1.0.0
**Date** : 2026-01-03
**Statut** : Draft

---

## 1. Contexte et objectifs

### Contexte

**Woodman** est un dépôt personnel regroupant une collection de ressources documentaires et d'outils pour développeurs utilisant **Claude Code** et l'écosystème **Speckit**.

Le projet fonctionne comme un **monorepo de documentation** : plusieurs micro-composants indépendants cohabitent sans dépendances fortes entre eux.

### Objectifs

| Objectif | Description |
|----------|-------------|
| **Centraliser** | Rassembler en un lieu unique les références, cheatsheets et templates utiles au quotidien |
| **Documenter** | Fournir des guides de référence rapide pour Claude Code et Speckit |
| **Outiller** | Proposer des prompts d'audit et des templates réutilisables |
| **Publier** | Rendre accessible via GitHub Pages un cheatsheet interactif |

### Non-objectifs (explicites)

- Ce n'est **pas** un package npm à installer
- Ce n'est **pas** une application avec backend/BDD
- Ce n'est **pas** destiné à une distribution massive (usage personnel/pro)

---

## 2. Problème à résoudre

### Problème principal

Un développeur utilisant Claude Code doit jongler entre :
- La documentation officielle Anthropic
- Les références Speckit de GitHub
- Ses propres notes et templates

**Woodman** consolide ces ressources en un point d'accès unique.

### Problèmes secondaires

| Problème | Impact |
|----------|--------|
| Pas de cheatsheet unifié Claude Code + Speckit | Perte de temps à chercher les commandes |
| Templates d'audit dispersés | Incohérence dans les audits techniques |
| Pas de générateur de contexte LLM | Difficulté à onboarder une IA sur un projet |

---

## 3. Utilisateurs et cas d'usage

### Utilisateur principal

**Développeur solo** (toi-même) utilisant Claude Code au quotidien.

### Cas d'usage

| ID | Cas d'usage | Fréquence |
|----|-------------|-----------|
| UC-01 | Consulter rapidement un raccourci Claude Code | Quotidien |
| UC-02 | Copier une commande Speckit | Hebdomadaire |
| UC-03 | Lancer un audit technique sur un projet | Ponctuel |
| UC-04 | Générer un contexte LLM pour un nouveau projet | Ponctuel |
| UC-05 | Partager le cheatsheet via URL | Ponctuel |

---

## 4. Portée (in / out)

### In scope (v1.0)

- Cheatsheet Claude Code + Speckit (génération + publication)
- Templates d'audit (Astro, Next.js, Nuxt, Swift, Tauri)
- Manifeste Scribe (concept documenté)
- Templates Speckit de base
- Déploiement GitHub Pages automatique

### Out of scope

- CLI installable (`npm install -g woodman`)
- Interface de recherche dans le cheatsheet
- Génération automatique du `llm.txt` (Scribe non implémenté)
- Versioning des templates d'audit
- Tests automatisés
- Internationalisation (EN)

---

## 5. Architecture et choix techniques

### Structure du dépôt

```
Woodman/
├── cheatheet/                    # Générateur de cheatsheet
│   ├── generate-unified-docs.js   # Script Node.js
│   ├── index.html                       # Interface web (Nord theme)
│   ├── woodman.md                       # Document généré
│   ├── woodman.png                      # Logo principal
│   └── woodman-mini.png                 # Favicon
│
├── sifrei - scribe/              # Concept Scribe (non implémenté)
│   ├── manifeste.md                     # Vision du projet
│   └── scribe.md                        # Prompt de génération
│
├── audit - commands/             # Templates d'audit
│   ├── audit-astro.md
│   ├── audit-next.md
│   ├── audit-nuxt.md
│   ├── audit-swift.md
│   └── audit-tauri.md
│
├── .claude/commands/             # Commandes slash Speckit
│   ├── speckit.specify.md
│   ├── speckit.plan.md
│   ├── speckit.tasks.md
│   ├── speckit.implement.md
│   └── ...
│
├── .specify/                     # Configuration Speckit
│   ├── templates/
│   └── memory/
│
├── .github/workflows/
│   └── deploy.yml                # CI/CD GitHub Pages
│
└── spec.md                       # Ce document
```

### Choix techniques

| Aspect | Choix | Justification |
|--------|-------|---------------|
| **Génération** | Node.js vanilla | Pas de dépendances, exécutable partout |
| **Rendu HTML** | marked.js (CDN) | Léger, pas de build nécessaire |
| **Thème** | Nord + IBM Plex | Esthétique cohérente, dark/light auto |
| **Hébergement** | GitHub Pages | Gratuit, intégré au repo |
| **CI/CD** | GitHub Actions | Déploiement automatique sur push |

### Contraintes techniques actuelles

| Contrainte | Détail |
|------------|--------|
| Espaces dans noms de dossiers | Choix esthétique assumé, peut poser problème en CLI |
| Fichiers dupliqués racine/cheatheet | `index.html`, `woodman.md` doivent être à la racine pour GitHub Pages |
| Pas de package.json | Pas de gestion de dépendances formelle |

---

## 6. UX / Parcours clés

### Parcours 1 : Consulter le cheatsheet en ligne

```
1. Utilisateur → https://izo.github.io/Woodman/
2. Chargement index.html
3. Fetch woodman.md
4. Rendu markdown → HTML (marked.js)
5. Navigation via scroll + bouton "Retour en haut"
```

**États importants :**
- Loading (affichage logo + message)
- Loaded (contenu rendu)
- Error (fichier non trouvé)

### Parcours 2 : Régénérer le cheatsheet

```
1. Modifier generate-unified-docs.js
2. Exécuter : node cheatheet/generate-unified-docs.js
3. Commit + push vers main
4. GitHub Actions déclenche le déploiement
5. Site mis à jour (~2-3 min)
```

### Parcours 3 : Utiliser un template d'audit

```
1. Ouvrir le fichier audit-*.md correspondant
2. Copier le contenu
3. Coller dans une session Claude Code
4. Claude exécute l'audit sur le projet courant
```

---

## 7. Données et modèles

### Données statiques

Le projet ne manipule que des **fichiers statiques** :

| Type | Format | Localisation |
|------|--------|--------------|
| Contenu cheatsheet | Markdown + YAML frontmatter | `cheatheet/woodman.md` |
| Templates audit | Markdown | `audit - commands/*.md` |
| Templates Speckit | Markdown | `.specify/templates/*.md` |
| Configuration | YAML (dans frontmatter) | Embarqué dans les `.md` |

### Modèle de source (dans le générateur)

```javascript
{
  name: "Claude Code Official",
  url: "https://awesomeclaude.ai/code-cheatsheet",
  description: "Cheatsheet interactif officiel",
  maintainer: "awesomeclaude.ai"
}
```

### Pas de base de données

Aucune persistance dynamique. Tout est versionné dans Git.

---

## 8. Sécurité, performance, observabilité

### Sécurité

| Aspect | État | Recommandation |
|--------|------|----------------|
| Secrets | Aucun secret dans le repo | ✅ OK |
| Dépendances | CDN externes (marked.js, fonts) | Risque faible, acceptable |
| Permissions GH Actions | `contents: read`, `pages: write` | ✅ Minimal requis |

### Performance

| Aspect | État | Recommandation |
|--------|------|----------------|
| Taille page | ~50KB (HTML + MD + assets) | ✅ Acceptable |
| Temps chargement | <2s | ✅ OK |
| Images | Logo 1.8MB (woodman.png) | ⚠️ Optimiser (compresser en WebP) |

### Observabilité

| Aspect | État |
|--------|------|
| Analytics | Aucun |
| Logs | Console browser uniquement |
| Monitoring | Aucun |

---

## 9. Risques, hypothèses, inconnues

### Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| CDN marked.js indisponible | Faible | Page cassée | Héberger localement |
| Espaces dans dossiers cassent scripts | Moyenne | CI/CD KO | Renommer ou échapper |
| Contenu cheatsheet obsolète | Moyenne | Info incorrecte | Mise à jour régulière |
| Logo trop lourd ralentit chargement | Faible | UX dégradée | Optimiser images |

### Hypothèses

- Le site GitHub Pages est correctement configuré (Source: GitHub Actions)
- Les fichiers `index.html` et `woodman.md` sont à la racine du repo pour le déploiement
- L'utilisateur principal a accès en écriture au repo

### Inconnues

- Le workflow `deploy.yml` référence des fichiers racine mais ils semblent être dans `cheatheet/` — vérifier la structure réelle de déploiement
- Scribe : abandonné ou en attente d'implémentation ?
- Constitution Speckit : template vide, à remplir ?

---

## 10. Roadmap proposée

### Vision

Transformer Woodman d'une **collection de fichiers** en un **toolkit documenté et maintenable** pour l'écosystème Claude Code.

### Phases

| Phase | Objectif | Critère de succès |
|-------|----------|-------------------|
| **v1.0** | Stabiliser l'existant | Déploiement fiable, structure claire |
| **v1.1** | Enrichir le contenu | Audits complets, cheatsheet à jour |
| **v1.2** | Améliorer l'UX | Recherche, navigation, mobile |
| **v2.0** | Étendre | Scribe fonctionnel, CLI optionnel |

---

## TODO (priorisée)

### 🔴 Maintenant (bloquants, indispensables)

| # | Action | Fichier(s) concerné(s) |
|---|--------|------------------------|
| 1 | **Vérifier la structure de déploiement** : les fichiers `index.html` et `woodman.md` doivent être à la racine pour GitHub Pages, or ils semblent être dans `cheatheet/` | `cheatheet/` → racine |
| 2 | **Corriger le workflow si nécessaire** : `deploy.yml` exécute `node generate-unified-docs.js` mais le fichier est dans `cheatheet/` | `.github/workflows/deploy.yml` |
| 3 | **Optimiser le logo** : `woodman.png` fait 1.8 MB, le convertir en WebP ou compresser | `woodman.png` |

### 🟠 Court terme (1-2 semaines)

| # | Action | Fichier(s) concerné(s) |
|---|--------|------------------------|
| 4 | **Ajouter un README à la racine** pointant vers les différents composants | `README.md` (nouveau) |
| 5 | **Compléter la constitution Speckit** avec les vrais principes du projet | `.specify/memory/constitution.md` |
| 6 | **Mettre à jour le contenu du cheatsheet** avec les dernières fonctionnalités Claude Code | `cheatheet/generate-unified-docs.js` |
| 7 | **Ajouter les templates d'audit manquants** (Swift, Tauri sont vides ?) | `audit - commands/` |

### 🟡 Moyen terme (1-2 mois)

| # | Action | Fichier(s) concerné(s) |
|---|--------|------------------------|
| 8 | **Implémenter Scribe** : créer le script de génération `llm.txt` | `sifrei - scribe/scribe.js` (nouveau) |
| 9 | **Ajouter une table des matières** dynamique dans le cheatsheet HTML | `cheatheet/index.html` |
| 10 | **Renommer les dossiers** pour supprimer les espaces (optionnel si CLI utilisée) | `sifrei-scribe/`, `audit-commands/` |
| 11 | **Ajouter un package.json** pour formaliser les scripts | `package.json` (nouveau) |

### 🟢 Nice-to-have

| # | Action | Fichier(s) concerné(s) |
|---|--------|------------------------|
| 12 | **Ajouter une recherche** dans le cheatsheet (Algolia DocSearch ou Pagefind) | `cheatheet/index.html` |
| 13 | **Créer une CLI** `npx woodman audit astro` pour lancer les audits | `cli/` (nouveau) |
| 14 | **Internationaliser** en anglais | Tous les `.md` |
| 15 | **Ajouter des tests** pour le générateur | `cheatheet/generate-claude-cheatsheet.test.js` |
| 16 | **Publier sur npm** (si demande externe) | `package.json` |

---

## Annexes

### A. Commandes utiles

```bash
# Générer le cheatsheet localement
node cheatheet/generate-unified-docs.js

# Servir localement (Python)
python3 -m http.server 8000

# Servir localement (Node)
npx http-server -p 8000

# Déclencher manuellement le déploiement
gh workflow run deploy.yml
```

### B. Liens

| Ressource | URL |
|-----------|-----|
| Site déployé | https://izo.github.io/Woodman/ |
| Repo GitHub | https://github.com/izo/Woodman |
| Claude Code docs | https://docs.anthropic.com/claude-code |
| Speckit | https://github.com/github/spec-kit |

### C. Historique des décisions

| Date | Décision | Raison |
|------|----------|--------|
| 2025-11 | Choix du thème Nord | Esthétique sobre, support dark/light |
| 2025-11 | Polices IBM Plex | Lisibilité, cohérence avec outils dev |
| 2025-11 | Espaces dans noms de dossiers | Choix esthétique assumé |

---

*Document généré le 2026-01-03 — Woodman v1.0.0*
