---
description: 'Met à jour Woodman vers la dernière version depuis GitHub'
---

# Woodman Update

Met à jour les commandes Woodman vers la dernière version.

## Instructions

Exécute cette commande bash pour mettre à jour :

```bash
curl -fsSL https://raw.githubusercontent.com/izo/Woodman/main/install-remote.sh | bash
```

## Version actuelle

Pour voir la version installée :

```bash
cat ~/.claude/commands/woodman/.version 2>/dev/null || echo "Version inconnue"
```

## Vérification

Après la mise à jour, vérifie que tout fonctionne :

```bash
ls ~/.claude/commands/woodman/agents/
```
