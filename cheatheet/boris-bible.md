---
title: "Boris Bible - Patterns Pratiques Claude Code"
description: "Comment Boris Cherny (créateur de Claude Code) utilise Claude Code en production"
version: "2.0.0"
created: "2026-01-13T08:18:59.585Z"
author: "Boris Cherny"
handle: "@boris_cherny"
tags: ["boris-bible", "claude-code", "best-practices", "patterns", "workflow"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 📖 Boris Bible

> Comment Boris Cherny (créateur de Claude Code) utilise Claude Code

**Par**: [@boris_cherny](https://twitter.com/boris_cherny)

---

## 📌 Introduction

Je suis Boris et j'ai créé Claude Code. Beaucoup de gens m'ont demandé comment j'utilise Claude Code, donc je voulais partager un peu mon setup.

Mon setup est peut-être étonnamment *vanilla* ! Claude Code fonctionne très bien out of the box, donc personnellement je ne le personnalise pas beaucoup. Il n'y a pas **une seule bonne façon** d'utiliser Claude Code : nous le construisons intentionnellement de manière à ce que vous puissiez l'utiliser, le personnaliser et le bidouiller comme vous le souhaitez.

---

## 🎯 Les 13 Patterns

### 1. Parallel Terminal Sessions

**Catégorie**: productivity

5 Claude instances parallèles avec tabs numérotés 1-5

**Implémentation**: Utiliser notifications système pour savoir quand Claude a besoin d'input





---

### 2. Web & Mobile Sessions

**Catégorie**: productivity

5-10 sessions sur claude.ai/code + sessions iOS

**Implémentation**: Hand-off entre terminal et web via &, ou --teleport





---

### 3. Opus 4.5 with Thinking

**Catégorie**: model-selection

Opus 4.5 pour tout : meilleur tool use, moins d'itérations

**Implémentation**: Même si plus lent, résultat final plus rapide grâce à moins de steering





---

### 4. Shared CLAUDE.md

**Catégorie**: documentation

CLAUDE.md partagé dans git, toute l'équipe contribue

**Implémentation**: Ajouter à CLAUDE.md quand Claude fait une erreur → ne la refait plus



> 💡 **Agents associés**: [agents/01-spec-writer](agents-software.html#01-spec-writer), [agents/03-sync-local](agents-software.html#03-sync-local)

---

### 5. Code Review Integration

**Catégorie**: workflow

@.claude sur PRs pour enrichir CLAUDE.md

**Implémentation**: /install-github-action - version de Compounding Engineering



> 💡 **Agents associés**: [agents/05-code-auditor](agents-software.html#05-code-auditor)

---

### 6. Plan Mode

**Catégorie**: workflow

Démarrer avec shift+tab deux fois

**Implémentation**: Itérer sur le plan jusqu'à satisfaction, puis auto-accept mode



> 💡 **Agents associés**: [agents/01-spec-writer](agents-software.html#01-spec-writer), [agents/02-todo-generator](agents-software.html#02-todo-generator)

---

### 7. Slash Commands

**Catégorie**: automation

Commandes pour inner-loop workflows répétitifs

**Implémentation**: Stocker dans .claude/commands/, versionner dans git

**Exemple**: /commit-push-pr avec inline bash pour pre-compute git status



---

### 8. Subagents

**Catégorie**: automation

Agents réutilisables pour workflows communs

**Implémentation**: code-simplifier, verify-app pour tâches post-PR



> 💡 **Agents associés**: [agents/05-code-auditor](agents-software.html#05-code-auditor), [agents/06-a11y-auditor](agents-software.html#06-a11y-auditor), [agents/07-perf-auditor](agents-software.html#07-perf-auditor)

---

### 9. PostToolUse Hook for Formatting

**Catégorie**: automation

Hook pour formater le code généré par Claude

**Implémentation**: Gère les 10% finaux pour éviter erreurs de formatage en CI





---

### 10. Permissions Management

**Catégorie**: security

Pre-allow commandes bash sûres via /permissions

**Implémentation**: Stocker dans .claude/settings.json partagé avec équipe





---

### 11. Tool Integration

**Catégorie**: integration

MCP servers pour intégrations externes

**Implémentation**: Slack, BigQuery, Sentry via MCP - config dans .mcp.json



> 💡 **Agents associés**: [agents/08-external-sync](agents-software.html#08-external-sync)

---

### 12. Long-Running Tasks

**Catégorie**: productivity

Background agents pour tâches longues

**Implémentation**: Stop hooks, ralph-wiggum plugin, --permission-mode=dontAsk





---

### 13. Verification Loop

**Catégorie**: quality

Donner à Claude un moyen de vérifier son travail

**Implémentation**: Feedback loop = 2-3x amélioration qualité. Exemple: tests Chrome extension



> 💡 **Agents associés**: [agents/05-code-auditor](agents-software.html#05-code-auditor), [agents/06-a11y-auditor](agents-software.html#06-a11y-auditor), [agents/07-perf-auditor](agents-software.html#07-perf-auditor)

---


## 🎬 Workflow Complet Recommandé

### Setup Matin
1. **Terminal**: 5 sessions Claude (tabs 1-5)
2. **Web**: 5-10 sessions sur claude.ai/code
3. **Mobile**: 2-3 sessions iOS App

### Développement
1. **Plan Mode** (shift+tab x2) - Définir le plan
2. **Iteration** - Raffiner jusqu'à satisfaction
3. **Auto-accept** (shift+tab) - Laisser Claude implémenter
4. **Hooks** - PostToolUse formate automatiquement
5. **Subagents** - code-simplifier, verify-app pour polish

### Code Review
1. Tag @.claude sur PRs pour enrichir CLAUDE.md
2. GitHub Action ajoute automatiquement à CLAUDE.md
3. Compounding Engineering: Le projet s'améliore constamment

### Vérification (🔑 Pattern le plus important)
- Donner à Claude un moyen de **vérifier son travail**
- Feedback loop = **2-3x amélioration qualité**
- Exemple: Tests Chrome extension automatiques

---

## 📊 Impact des Patterns

| Pattern | Impact Productivité | Impact Qualité | Effort Setup |
|---------|-------------------|---------------|--------------|
| Parallel Sessions | ⭐⭐⭐ | ⭐⭐ | Facile |
| Opus 4.5 | ⭐⭐⭐ | ⭐⭐⭐ | Trivial |
| Shared CLAUDE.md | ⭐⭐ | ⭐⭐⭐ | Moyen |
| Plan Mode | ⭐⭐⭐ | ⭐⭐⭐ | Trivial |
| Slash Commands | ⭐⭐⭐ | ⭐⭐ | Moyen |
| Subagents | ⭐⭐ | ⭐⭐⭐ | Difficile |
| PostToolUse Hook | ⭐⭐ | ⭐⭐⭐ | Moyen |
| Permissions | ⭐⭐ | ⭐⭐ | Facile |
| Tool Integration | ⭐⭐⭐ | ⭐⭐ | Difficile |
| **Verification Loop** | ⭐⭐⭐ | ⭐⭐⭐ | **Critique** |

---

## 🔗 Ressources

- **Documentation officielle**: [code.claude.com/docs](https://code.claude.com/docs)
- **Référence Claude Code**: [woodman.html](woodman.html)
- **Agents Woodman**: [agents-software.html](agents-software.html)

---

## 💬 Citation Clé

> *"Probably the most important thing to get great results out of Claude Code -- give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."*
>
> — Boris Cherny, créateur de Claude Code

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v2.0.0*
