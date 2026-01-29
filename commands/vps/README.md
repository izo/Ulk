# ulk VPS Commands

Agents spécialisés pour la gestion et la configuration de serveurs VPS multi-projets.

## Commandes disponibles

### Point d'entrée
| Commande | Description |
|----------|-------------|
| `/ulk:vps:orchestrateur` | Coordonne tous les agents VPS, analyse les demandes et délègue |

### Diagnostic
| Commande | Description |
|----------|-------------|
| `/ulk:vps:audit` | Analyse complète de l'état du serveur (OS, services, ressources, sécurité) |
| `/ulk:vps:monitoring` | Configure et supervise les services |
| `/ulk:vps:incidents` | Diagnostique et résout les problèmes |

### Opérations
| Commande | Description |
|----------|-------------|
| `/ulk:vps:docker` | Gère l'infrastructure conteneurisée (docker-compose, réseaux, volumes) |
| `/ulk:vps:deploiement` | Exécute les déploiements applicatifs |
| `/ulk:vps:cicd` | Configure l'intégration et déploiement continus |
| `/ulk:vps:reseau` | Gère DNS, reverse-proxy et certificats TLS |

### Maintenance
| Commande | Description |
|----------|-------------|
| `/ulk:vps:backups` | Planifie et vérifie les sauvegardes |
| `/ulk:vps:cleanup` | Maintient le serveur propre |
| `/ulk:vps:documentation` | Produit et met à jour la documentation |
| `/ulk:vps:compliance` | Vérifie la conformité et la sécurité |

### Infrastructure
| Commande | Description |
|----------|-------------|
| `/ulk:vps:securite` | Durcit et sécurise le serveur |
| `/ulk:vps:couts-ressources` | Optimise l'utilisation des ressources |
| `/ulk:vps:migration` | Gère les transferts d'infrastructure |
| `/ulk:vps:environnements` | Isole et configure prod/staging/test |

### Installation
| Commande | Description |
|----------|-------------|
| `/ulk:vps:installateur` | Installation complète d'un nouveau serveur |

## Scénarios courants

### Nouveau serveur
```
/ulk:vps:audit → /ulk:vps:securite → /ulk:vps:docker → /ulk:vps:reseau → /ulk:vps:deploiement
```

### Nouveau projet
```
/ulk:vps:orchestrateur "Déployer un projet Node.js avec PostgreSQL"
```

### Incident production
```
/ulk:vps:incidents → /ulk:vps:monitoring → /ulk:vps:documentation
```

### Maintenance hebdomadaire
```
/ulk:vps:backups + /ulk:vps:cleanup + /ulk:vps:audit
```

## Niveaux de validation

Les agents utilisent un système de validation par niveau de risque :

- 🟢 **Info** : Lecture seule, aucune validation
- 🟡 **Standard** : Modifications réversibles, aucune validation
- 🟠 **Important** : Modifications de configuration, confirmation simple
- 🔴 **Critique** : Suppressions/migrations/accès, confirmation explicite

## Prérequis

- Accès SSH au serveur avec clé ou mot de passe
- Permissions sudo sur le serveur cible
- Linux (Debian/Ubuntu recommandé, CentOS/RHEL supporté)
