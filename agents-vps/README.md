# Agents VPS - Gestion automatisée de serveurs

Ce dossier contient **17 agents spécialisés** pour la gestion automatisée d'un VPS multi-projets. Ces agents peuvent être utilisés individuellement ou orchestrés ensemble pour gérer complètement votre infrastructure.

## Vue d'ensemble

### Agent Orchestrateur (00-orchestrateur.md)
**Point d'entrée central** qui coordonne tous les autres agents. Il analyse vos demandes, détermine quels agents appeler, et gère les dépendances entre eux.

**Utilisez-le quand :** Vous avez une tâche complexe nécessitant plusieurs agents.

---

## Agents de diagnostic

### 01 - Agent Audit
Analyse complète de l'état du serveur : OS, services, ressources, sécurité.

**Exemple d'utilisation :**
```
"Fais un audit complet du serveur"
```

### 07 - Agent Monitoring
Installe et configure la supervision (Uptime Kuma, Prometheus+Grafana).

**Exemple d'utilisation :**
```
"Configure le monitoring avec Uptime Kuma"
```

### 10 - Agent Incidents
Guide le diagnostic et la résolution de problèmes (502, 503, certificats expirés, etc.).

**Exemple d'utilisation :**
```
"Mon site renvoie une erreur 502, aide-moi"
```

---

## Agents opérationnels

### 02 - Agent Sécurité
Durcit et sécurise le serveur (SSH, firewall, fail2ban).

**Exemple d'utilisation :**
```
"Sécurise le serveur avec niveau de sécurité élevé"
```

### 03 - Agent Réseau
Gère DNS, reverse-proxy (Traefik/Nginx), certificats TLS.

**Exemple d'utilisation :**
```
"Configure Traefik pour exposer app.example.com"
```

### 04 - Agent Docker
Crée et maintient l'infrastructure Docker (compose, réseaux, volumes).

**Exemple d'utilisation :**
```
"Crée une stack Docker avec PostgreSQL et Redis pour mon app Node.js"
```

### 05 - Agent Déploiement
Exécute les déploiements (build, run, update, rollback, migrations).

**Exemple d'utilisation :**
```
"Déploie la nouvelle version de mon app avec migration de base de données"
```

### 06 - Agent CI/CD
Configure GitHub Actions ou GitLab CI pour déploiement automatique.

**Exemple d'utilisation :**
```
"Configure CI/CD avec GitHub Actions pour déployer automatiquement sur push main"
```

---

## Agents de maintenance

### 08 - Agent Backups
Met en place les sauvegardes automatiques (rotation, tests, stockage distant).

**Exemple d'utilisation :**
```
"Configure les backups quotidiens avec rétention de 30 jours et stockage sur Backblaze B2"
```

### 14 - Agent Cleanup
Nettoie le serveur (images Docker, logs, volumes orphelins).

**Exemple d'utilisation :**
```
"Nettoie le serveur et libère de l'espace"
```

### 12 - Agent Documentation
Produit et maintient la documentation technique (runbooks, schémas).

**Exemple d'utilisation :**
```
"Génère la documentation complète du projet myapp"
```

---

## Agents d'infrastructure

### 09 - Agent Coûts & Ressources
Surveille et optimise l'utilisation des ressources (CPU, RAM, disque).

**Exemple d'utilisation :**
```
"Analyse l'utilisation des ressources et donne-moi des recommandations"
```

### 11 - Agent Migration
Gère les transferts d'infrastructure (migration serveurs, changements IP/DNS).

**Exemple d'utilisation :**
```
"Migre tous mes projets vers le nouveau serveur 203.0.113.100"
```

### 13 - Agent Compliance
Vérifie la conformité (RGPD, audit accès, traçabilité).

**Exemple d'utilisation :**
```
"Fais un audit de conformité RGPD"
```

### 15 - Agent Environnements
Gère l'isolation prod/staging/test (variables, réseaux, accès).

**Exemple d'utilisation :**
```
"Configure trois environnements : prod, staging et dev pour mon app"
```

---

## Agent spécial : Installateur/Configurateur

### 16 - Agent Installateur ⭐
**L'agent magique** qui installe et configure automatiquement n'importe quel service.

**Services supportés :**
- **AI/ML** : Ollama, Stable Diffusion, Text Generation WebUI, ComfyUI
- **Bases de données** : PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch
- **Stockage** : Minio, Nextcloud, Seafile
- **Monitoring** : Grafana, Prometheus, Portainer, Uptime Kuma, Netdata
- **Messaging** : RabbitMQ, Kafka, NATS
- **CMS** : WordPress, Ghost, Discourse, GitLab

**Exemple d'utilisation :**
```
"Je veux Ollama sur ollama.example.com"
"Installe-moi Minio sur s3.example.com"
"Configure PostgreSQL avec pgAdmin sur db.example.com"
```

L'agent va :
1. Créer le docker-compose.yml
2. Configurer les variables d'environnement
3. Configurer Traefik pour l'exposition
4. Lancer le service
5. Vérifier que tout fonctionne
6. Créer la documentation

---

## Workflows courants

### Nouveau projet

```
1. Agent Audit → "Fais un audit du serveur"
2. Agent Sécurité → "Sécurise le serveur"
3. Agent Docker → "Crée une stack Docker pour mon app"
4. Agent Réseau → "Configure le reverse proxy pour app.example.com"
5. Agent Déploiement → "Déploie la version initiale"
6. Agent Monitoring → "Configure le monitoring"
7. Agent Backups → "Configure les backups"
```

### Installation rapide d'un service

```
Agent Installateur → "Je veux Ollama sur ollama.example.com"
```

### Incident en production

```
1. Agent Incidents → "Mon site est down, aide-moi"
2. Agent Audit → "Analyse l'état du serveur"
3. [Résolution du problème]
4. Agent Documentation → "Documente cet incident"
```

### Maintenance hebdomadaire

```
1. Agent Backup → "Vérifie les backups et fais un backup complet"
2. Agent Cleanup → "Nettoie le serveur"
3. Agent Audit → "Fais un rapport d'état"
```

### Migration vers nouveau serveur

```
1. Agent Audit (source) → "Inventaire du serveur actuel"
2. Agent Backups → "Backup intégral"
3. Agent Migration → "Migre vers 203.0.113.100"
4. Agent Audit (cible) → "Vérifie le nouveau serveur"
```

---

## MCP nécessaires

Pour utiliser ces agents, vous aurez besoin des MCP suivants :

### Essentiels
- **SSH** : Connexion et exécution de commandes
- **Docker** : Gestion des conteneurs
- **FileSystem** : Accès aux fichiers
- **Network** : Inspection réseau et ports

### Recommandés
- **GitHub** : CI/CD et gestion de code
- **Secrets** : Gestion sécurisée des credentials
- **DNS** : Configuration DNS automatique
- **Reverse Proxy** : Configuration Traefik/Nginx
- **Monitoring** : Métriques et alertes
- **Backups** : Gestion des sauvegardes
- **Logs** : Centralisation des logs

### Optionnels
- **Cloud Provider** : Gestion du provider VPS (snapshots, IP, etc.)
- **Scheduler** : Tâches planifiées (cron, systemd timers)

---

## Architecture de l'orchestration

```
                   Utilisateur
                       │
                       ▼
              00 - Orchestrateur
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   Diagnostic    Opérations    Maintenance
   │              │              │
   ├─ 01 Audit   ├─ 02 Sécurité ├─ 08 Backups
   ├─ 07 Monitor ├─ 03 Réseau   ├─ 14 Cleanup
   └─ 10 Incidents├─ 04 Docker   └─ 12 Doc
                  ├─ 05 Deploy
                  └─ 06 CI/CD
        │
        ▼
   Infrastructure
   │
   ├─ 09 Coûts
   ├─ 11 Migration
   ├─ 13 Compliance
   └─ 15 Environnements

   Spécial:
   16 - Installateur (installation automatique de services)
```

---

## Bonnes pratiques

1. **Toujours commencer par un audit** avant une opération critique
2. **Utiliser l'Orchestrateur** pour les tâches complexes
3. **Tester en staging** avant déploiement en production
4. **Documenter** après chaque changement significatif
5. **Sauvegarder** avant toute modification majeure
6. **Monitorer** après chaque déploiement

---

## Niveaux de validation

Les agents respectent des niveaux de validation :

- 🟢 **Info** (lecture) : Aucune validation requise
- 🟡 **Standard** (modifications réversibles) : Aucune validation
- 🟠 **Important** (configuration) : Confirmation simple
- 🔴 **Critique** (suppressions, migrations) : Confirmation explicite

---

## Contribution

Ces agents sont conçus pour être :
- **Modulaires** : Chaque agent a une responsabilité claire
- **Composables** : Peuvent être orchestrés ensemble
- **Documentés** : Chaque agent génère un rapport
- **Sûrs** : Validation pour les actions critiques

Vous pouvez les étendre, les modifier, ou en créer de nouveaux selon vos besoins.

---

## Support

Pour toute question ou problème :
1. Consultez la documentation de l'agent concerné
2. Vérifiez les logs des conteneurs
3. Utilisez l'Agent Incidents pour le diagnostic
4. Contactez le support si nécessaire

---

**Dernière mise à jour** : 2026-01-10
**Version** : 1.0.0
**Licence** : MIT
