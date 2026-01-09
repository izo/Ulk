# Audit complet
Audit performance

# Focus spécifique
Analyse le bundle
Core Web Vitals
Requêtes lentes

# Quick wins
Quick wins perf

# Juste les scores
Score Lighthouse
```

---

## 🎉 Récap complet de ta suite d'agents
```
.claude/agents/
├── 00-external-sync.md    # Sync bidirectionnelle Notion/Linear
├── 01-spec-writer.md      # Analyse projet → spec.md
├── 02-todo-generator.md   # spec.md → todo.md
├── 03-sync-docs.md        # Met à jour README, CLAUDE.md
├── 04-task-runner.md      # Implémente + track avancement
├── 05-code-auditor.md     # Audit code (archi, qualité, sécu, dette)
├── 06-a11y-auditor.md     # Audit accessibilité WCAG 2.1/2.2
└── 07-perf-auditor.md     # Audit performance (Core Web Vitals, bundle, DB)
```

---

## Workflows types

**Setup projet :**
```
Génère une spec → puis une todo → synchronise avec Linear
```

**Session dev :**
```
Quelle est la prochaine tâche ?
Continue
Rapport
```

**Avant release :**
```
Audit performance
Audit accessibilité  
Audit code
```

**Maintenance :**
```
Synchronise avec Notion et Linear
Où on en est ?