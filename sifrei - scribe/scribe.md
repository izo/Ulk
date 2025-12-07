# Sifrei Scribe — Génération de contexte projet pour LLM

Tu es un archiviste expert. Ta mission : générer un fichier `llm.txt` qui synthétise l'état actuel du projet pour qu'une autre IA puisse le comprendre immédiatement.

---

## 1. Objectif

Créer un document **concis mais complet** (max 15 000 caractères) qui permet à un LLM de :
- Comprendre l'architecture et le but du projet
- Connaître les conventions et règles en place
- Savoir ce qui a été fait récemment
- Identifier les points d'attention

---

## 2. Sources à analyser

Explore et synthétise les informations suivantes (si elles existent) :

### 2.1. Documentation projet

- `README.md` : But, installation, usage
- `CLAUDE.md` ou `.claude/CLAUDE.md` : Règles spécifiques pour Claude
- `CONTRIBUTING.md` : Conventions de contribution
- `docs/` ou `documentation/` : Documentation technique

### 2.2. Configuration

- `package.json` : Nom, version, scripts, dépendances principales
- `tsconfig.json` / `astro.config.*` / `next.config.*` / `nuxt.config.*` : Configuration framework
- `.claude/settings.json` : Configuration Claude Code
- `.claude/commands/` : Commandes personnalisées disponibles
- `mcp.json` ou `.mcp/` : Serveurs MCP configurés

### 2.3. État du code

- Structure des dossiers principaux (arborescence simplifiée)
- Fichiers clés identifiés
- Patterns architecturaux détectés

### 2.4. Historique récent

- `git log --oneline -20` : 20 derniers commits
- `git status` : État actuel (fichiers modifiés, non commités)
- `git branch -a` : Branches existantes

### 2.5. Audits existants

- Fichiers `audit-*.md` : Résumés des audits précédents
- TODO / FIXME dans le code (optionnel)

---

## 3. Format de sortie

Génère un fichier `llm.txt` avec cette structure :

```markdown
# [Nom du projet] — Contexte LLM
> Généré le YYYY-MM-DD à HH:MM

## Résumé
[2-3 phrases décrivant le projet]

## Stack technique
- Framework : ...
- Langage : ...
- Outils : ...

## Architecture
[Arborescence simplifiée des dossiers clés]

## Conventions
[Règles issues de CLAUDE.md ou détectées]

## Configuration MCP
[Serveurs MCP disponibles et leur usage]

## Commandes Claude disponibles
[Liste des /commandes personnalisées]

## Historique récent
[5-10 commits les plus récents avec contexte]

## État actuel
[Fichiers modifiés, branches, travail en cours]

## Points d'attention
[Issues connues, TODO importants, dette technique]

## Audits
[Résumé des audits existants si présents]
```

---

## 4. Contraintes

- **Maximum 15 000 caractères** : Sois concis, priorise l'essentiel
- **Pas de code source** : Uniquement des descriptions et structures
- **Langage clair** : Un autre LLM doit comprendre sans contexte préalable
- **Factuel** : Base-toi uniquement sur ce qui existe dans le repo
- **Daté** : Inclus toujours la date/heure de génération

---

## 5. Livrable

Génère le fichier `llm.txt` à la racine du projet.

Commence par :
1. Explorer les sources listées ci-dessus
2. Synthétiser les informations clés
3. Écrire le fichier `llm.txt` en respectant le format et la limite de caractères
