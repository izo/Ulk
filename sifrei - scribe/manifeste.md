# Sifrei Scribe — Manifeste

> **Sifrei** (ספרי) : "mes livres" en hébreu
> **Scribe** : celui qui écrit et préserve la connaissance

## Concept

Sifrei Scribe est un générateur de **contexte projet pour LLM**. Il produit un fichier `llm.txt` qui synthétise l'état complet d'un projet pour qu'une autre IA puisse le comprendre instantanément.

C'est un **mini-RAG statique** : un snapshot textuel de tout ce qu'un LLM doit savoir pour travailler efficacement sur le projet.

## Pourquoi ?

- **Onboarding IA instantané** : Un nouveau modèle comprend le projet en une lecture
- **Continuité entre sessions** : Reprise de contexte sans re-explorer le code
- **Partage de contexte** : Transférer la connaissance entre outils/modèles
- **Historique** : Garder une trace de l'évolution du projet

## Contenu généré

Le fichier `llm.txt` inclut :

| Section | Source |
|---------|--------|
| Résumé projet | README.md |
| Conventions | CLAUDE.md |
| Stack technique | package.json, configs |
| Architecture | Arborescence des dossiers |
| MCP configurés | mcp.json |
| Commandes Claude | .claude/commands/ |
| Historique | git log |
| État actuel | git status |
| Audits | audit-*.md |

## Limite

**15 000 caractères maximum** — Assez pour le contexte, pas trop pour la fenêtre de contexte.

## Usage

```
/scribe
```

Génère `llm.txt` à la racine du projet courant.

## Fichiers

- `manifeste.md` : Ce document (concept et vision)
- `scribe.md` : Le prompt de la commande
