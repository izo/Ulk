---
title: "Woodman Agents VPS - Gestion Infrastructure"
description: "Agents pour gestion automatisée d'infrastructure VPS: sécurité, Docker, déploiement, monitoring, backups"
version: "2.0.0"
created: "2026-01-13T08:18:59.585Z"
tags: ["agents", "vps", "infrastructure", "devops", "automation"]
---

<div align="center">
  <img src="woodman.png" alt="Woodman Logo" width="150"/>
</div>

# 🖥️ Woodman Agents VPS

> Agents de gestion d'infrastructure automatisée

---

## 📋 Agents Core (00-16)

### 00. orchestrateur

**Description**: Coordinateur central pour tous les agents VPS

**Modèle**: `opus`

**Use cases**:
- Orchestration
- Routing requêtes
- Workflows multi-agents



> 📄 [Voir le fichier agent](../agents-vps/00-orchestrateur.md)

---

### 01. audit

**Description**: Audit santé serveur complet

**Modèle**: `sonnet`

**Use cases**:
- Health check
- Diagnostic
- État serveur



> 📄 [Voir le fichier agent](../agents-vps/01-audit.md)

---

### 02. securite

**Description**: Sécurité: SSH, firewall, fail2ban, hardening

**Modèle**: `opus`

**Use cases**:
- Hardening
- SSH
- Firewall



> 📄 [Voir le fichier agent](../agents-vps/02-securite.md)

---

### 03. reseau

**Description**: Réseau: DNS, reverse-proxy, TLS

**Modèle**: `sonnet`

**Use cases**:
- DNS
- Traefik
- Certificats TLS



> 📄 [Voir le fichier agent](../agents-vps/03-reseau.md)

---

### 04. docker

**Description**: Docker: compose, networking, volumes

**Modèle**: `sonnet`

**Use cases**:
- Docker setup
- Compose
- Volumes



> 📄 [Voir le fichier agent](../agents-vps/04-docker.md)

---

### 05. deploiement

**Description**: Déploiement: build, run, update, rollback, migrations

**Modèle**: `sonnet`

**Use cases**:
- Deploy
- Rollback
- Migrations



> 📄 [Voir le fichier agent](../agents-vps/05-deploiement.md)

---

### 06. cicd

**Description**: CI/CD: GitHub Actions, GitLab CI

**Modèle**: `sonnet`

**Use cases**:
- CI/CD setup
- Pipelines
- Automatisation



> 📄 [Voir le fichier agent](../agents-vps/06-cicd.md)

---

### 07. monitoring

**Description**: Monitoring: Uptime Kuma, Prometheus, Grafana

**Modèle**: `sonnet`

**Use cases**:
- Monitoring
- Alerting
- Dashboards



> 📄 [Voir le fichier agent](../agents-vps/07-monitoring.md)

---

### 08. backups

**Description**: Backups: rotation, testing, remote storage

**Modèle**: `sonnet`

**Use cases**:
- Backups
- Restore
- Remote storage



> 📄 [Voir le fichier agent](../agents-vps/08-backups.md)

---

### 09. couts-ressources

**Description**: Optimisation coûts et ressources: CPU, RAM, disk

**Modèle**: `sonnet`

**Use cases**:
- Optimisation
- Cost reduction
- Ressources



> 📄 [Voir le fichier agent](../agents-vps/09-couts-ressources.md)

---

### 10. incidents

**Description**: Troubleshooting: 502, 503, certificats, logs

**Modèle**: `sonnet`

**Use cases**:
- Troubleshooting
- Debug
- Incidents



> 📄 [Voir le fichier agent](../agents-vps/10-incidents.md)

---

### 11. migration

**Description**: Migration serveur: données, DNS, downtime minimal

**Modèle**: `opus`

**Use cases**:
- Migration
- DNS change
- Zero downtime



> 📄 [Voir le fichier agent](../agents-vps/11-migration.md)

---

### 12. documentation

**Description**: Documentation: runbooks, diagrammes techniques

**Modèle**: `sonnet`

**Use cases**:
- Runbooks
- Architecture docs
- Procedures



> 📄 [Voir le fichier agent](../agents-vps/12-documentation.md)

---

### 13. compliance

**Description**: Compliance: GDPR, audit trails, logs

**Modèle**: `sonnet`

**Use cases**:
- GDPR
- Compliance
- Audit logs



> 📄 [Voir le fichier agent](../agents-vps/13-compliance.md)

---

### 14. cleanup

**Description**: Cleanup: Docker, volumes orphelins, logs

**Modèle**: `sonnet`

**Use cases**:
- Cleanup
- Disk space
- Maintenance



> 📄 [Voir le fichier agent](../agents-vps/14-cleanup.md)

---

### 15. environnements

**Description**: Gestion environnements: prod/staging/test isolation

**Modèle**: `sonnet`

**Use cases**:
- Environments
- Isolation
- Multi-env



> 📄 [Voir le fichier agent](../agents-vps/15-environnements.md)

---

### 16. installateur

**Description**: Magic installer: 30+ services (Ollama, PostgreSQL, Grafana, etc.)

**Modèle**: `sonnet`

**Use cases**:
- One-click install
- Service setup
- Auto-config

**Services supportés**: Ollama, PostgreSQL, MySQL, MongoDB, Redis, et 6 autres...

> 📄 [Voir le fichier agent](../agents-vps/16-installateur.md)

---


## 🔄 Patterns d'Orchestration

### Séquentiel
```
01-audit → 02-securite → 04-docker → 05-deploiement → 07-monitoring
```

### Parallèle
```
08-backups + 12-documentation + 14-cleanup → Consolidation
```

### Conditionnel
```
01-audit → [si problème] → 10-incidents → Résolution
```

### Rollback
```
05-deploiement → [si échec] → Rollback automatique
```

---

## ⚡ 16-installateur: Magic Installer

L'agent **16-installateur** est un installateur "magique" qui peut configurer **30+ services** en une commande :

### AI/ML
- Ollama, Stable Diffusion, ComfyUI

### Databases
- PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch

### Storage
- Minio, Nextcloud, Seafile

### Monitoring
- Grafana, Prometheus, Portainer, Uptime Kuma

### Messaging
- RabbitMQ, Kafka, NATS

### CMS
- WordPress, Ghost, Discourse, GitLab

**Capacité**: Une seule commande automatise :
- docker-compose configuration
- Variables d'environnement
- Traefik setup (reverse-proxy + TLS)
- Lancement du service
- Vérification fonctionnelle
- Génération documentation

---

## 🎯 Niveaux de Validation

| Niveau | Type | Actions | Validation |
|--------|------|---------|------------|
| 🟢 **Info** | Lecture seule | Audit, status, logs | Aucune |
| 🟡 **Standard** | Réversible | Config, restart | Aucune |
| 🟠 **Important** | Config critique | Modif réseau, TLS | Confirmation simple |
| 🔴 **Critique** | Destructif | Suppression, migration | Confirmation explicite |

---

## 🔄 Workflows Types

### Setup Serveur Neuf
```
01-audit → 02-securite → 03-reseau → 04-docker → 06-cicd → 07-monitoring → 08-backups
```

### Déploiement Application
```
01-audit → 04-docker (verify) → 05-deploiement → 07-monitoring (setup alerts)
```

### Troubleshooting Incident
```
10-incidents (diagnostic) → [fix] → 07-monitoring (verify) → 12-documentation (runbook)
```

### Migration Serveur
```
01-audit (source) → 08-backups (full) → 11-migration → 03-reseau (DNS) → Validation
```

### Maintenance Régulière
```
14-cleanup → 09-couts-ressources → 08-backups (rotation) → 12-documentation (update)
```

---

## 🎯 Commandes Rapides

### Audit & Diagnostic
- `"Audit santé serveur"`
- `"État Docker complet"`
- `"Diagnostic réseau"`

### Sécurité
- `"Hardening serveur"`
- `"Setup fail2ban"`
- `"Audit certificats TLS"`

### Déploiement
- `"Déploie avec docker-compose"`
- `"Rollback dernière version"`
- `"Setup pipeline CI/CD"`

### Monitoring
- `"Setup Uptime Kuma"`
- `"Configure alertes"`
- `"Dashboard Grafana"`

### Backups
- `"Backup complet maintenant"`
- `"Test restore dernier backup"`
- `"Setup rotation 7-30-12"`

### Magic Installer
- `"Installe PostgreSQL"`
- `"Installe Grafana + Prometheus"`
- `"Setup Ollama pour LLM"`

---

## 📊 Modèles par Complexité

| Catégorie | Agents | Modèle |
|-----------|--------|--------|
| **Orchestration** | 00 | opus |
| **Sécurité** | 02 | opus |
| **Migration** | 11 | opus |
| **Tous les autres** | 01, 03-10, 12-16 | sonnet |

---

## 🔗 Ressources

- **Référence Claude Code**: [woodman.html](woodman.html)
- **Patterns Boris**: [boris-bible.html](boris-bible.html)
- **Agents Software**: [agents-software.html](agents-software.html)

---

*Document généré avec <img src="woodman-mini.png" alt="🪵" width="16" height="16" style="vertical-align: middle;"/> Woodman v2.0.0*
