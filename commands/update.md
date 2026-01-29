---
description: 'Met à jour ulk vers la dernière version depuis GitHub'
---

# ulk Update

Met à jour les commandes ulk vers la dernière version.

## Instructions

Exécute cette commande bash pour mettre à jour :

```bash
curl -fsSL https://raw.githubusercontent.com/izo/ulk/main/install-remote.sh | bash
```

## Version actuelle

Pour voir la version installée :

```bash
cat ~/.claude/commands/ulk/.version 2>/dev/null || echo "Version inconnue"
```

## Vérification

Après la mise à jour, vérifie que tout fonctionne :

```bash
ls ~/.claude/commands/ulk/agents/
```
