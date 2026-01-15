# Woodman VPS Commands

Agents spécialisés pour la gestion et la configuration de serveurs VPS multi-projets.

## Commandes disponibles

### Point d'entrée
| Commande | Description |
|----------|-------------|
| `/wm:vps:orchestrateur` | Coordonne tous les agents VPS, analyse les demandes et délègue |

### Diagnostic
| Commande | Description |
|----------|-------------|
| `/wm:vps:audit` | Analyse complète de l'état du serveur (OS, services, ressources, sécurité) |
| `/wm:vps:monitoring` | Configure et supervise les services |
| `/wm:vps:incidents` | Diagnostique et résout les problèmes |

### Opérations
| Commande | Description |
|----------|-------------|
| `/wm:vps:docker` | Gère l'infrastructure conteneurisée (docker-compose, réseaux, volumes) |
| `/wm:vps:deploiement` | Exécute les déploiements applicatifs |
| `/wm:vps:cicd` | Configure l'intégration et déploiement continus |
| `/wm:vps:reseau` | Gère DNS, reverse-proxy et certificats TLS |

### Maintenance
| Commande | Description |
|----------|-------------|
| `/wm:vps:backups` | Planifie et vérifie les sauvegardes |
| `/wm:vps:cleanup` | Maintient le serveur propre |
| `/wm:vps:documentation` | Produit et met à jour la documentation |
| `/wm:vps:compliance` | Vérifie la conformité et la sécurité |

### Infrastructure
| Commande | Description |
|----------|-------------|
| `/wm:vps:securite` | Durcit et sécurise le serveur |
| `/wm:vps:couts-ressources` | Optimise l'utilisation des ressources |
| `/wm:vps:migration` | Gère les transferts d'infrastructure |
| `/wm:vps:environnements` | Isole et configure prod/staging/test |

### Installation
| Commande | Description |
|----------|-------------|
| `/wm:vps:installateur` | Installation complète d'un nouveau serveur |

## Scénarios courants

### Nouveau serveur
```
/wm:vps:audit → /wm:vps:securite → /wm:vps:docker → /wm:vps:reseau → /wm:vps:deploiement
```

### Nouveau projet
```
/wm:vps:orchestrateur "Déployer un projet Node.js avec PostgreSQL"
```

### Incident production
```
/wm:vps:incidents → /wm:vps:monitoring → /wm:vps:documentation
```

### Maintenance hebdomadaire
```
/wm:vps:backups + /wm:vps:cleanup + /wm:vps:audit
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
