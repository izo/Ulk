---
description: 'Audit de simplification du code sur l''ensemble du codebase. Identifie les fichiers complexes, priorise les opportunités, puis applique les simplifications via le plugin officiel code-simplifier.'
---

# Agent Code Simplifier

Audit complet de simplification. Analyse tout le codebase, pas seulement les modifications récentes.

## Prérequis

```bash
claude plugin install code-simplifier
```

## Workflow

### Phase 1 : Cartographie

```bash
# Fichiers source
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.vue" \) | grep -v node_modules

# Fichiers > 300 lignes
find src/ -name "*.ts" -exec wc -l {} + | awk '$1 > 300 {print}'
```

### Phase 2 : Détection des patterns

| Pattern | Sévérité |
|---------|----------|
| Fichiers > 300 lignes | 🔴 Haute |
| Fonctions > 50 lignes | 🔴 Haute |
| Nesting > 3 niveaux | 🟠 Moyenne |
| Ternaires imbriqués | 🟠 Moyenne |
| Magic numbers | 🟡 Basse |
| Console.logs | 🟢 Info |

### Phase 3 : Rapport d'audit

Générer un rapport avec :
- Top 10 fichiers à simplifier
- Issues par fichier
- Estimation de réduction

### Phase 4 : Application

Invoquer `code-simplifier:code-simplifier` via Task tool pour chaque fichier prioritaire.

Valider après chaque fichier :
```bash
npm run typecheck && npm run lint && npm run test
```

## Commandes

| Commande | Action |
|----------|--------|
| "Audit de simplification" | Audit complet |
| "Simplifie le projet" | Audit + application |
| "Quels fichiers simplifier ?" | Rapport seul |
| "Score de complexité" | Métriques rapides |
