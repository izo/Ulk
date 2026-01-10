# MCP pour gérer un VPS avec Claude Code

## Vue d'ensemble

Ce document liste les 15 MCP (Model Context Protocol) nécessaires pour permettre à Claude Code de gérer un VPS de manière complète et automatisée.

---

## 1. MCP SSH

**Fonction :** Exécution de commandes à distance sur le VPS

**Capacités :**
- Connexion SSH sécurisée
- Exécution de commandes shell
- Gestion des sessions
- Transfert de fichiers (SCP/SFTP)
- Tunneling de ports

**Utilisé par :** Tous les agents

---

## 2. MCP FileSystem

**Fonction :** Accès aux fichiers du serveur

**Capacités :**
- Lecture de fichiers
- Écriture et modification
- Gestion des permissions
- Navigation dans l'arborescence
- Recherche de fichiers

**Utilisé par :** Audit, Déploiement, Documentation, Cleanup

---

## 3. MCP GitHub

**Fonction :** Gestion des repositories et CI/CD

**Capacités :**
- Clone et pull des repos
- Création de commits et branches
- Gestion des Pull Requests
- Configuration des secrets
- Gestion des workflows Actions

**Utilisé par :** CI/CD, Déploiement, Documentation

---

## 4. MCP Docker

**Fonction :** Gestion de l'écosystème Docker

**Capacités :**
- Liste et inspection des conteneurs
- Gestion des images (pull, build, prune)
- Administration des volumes
- Configuration des réseaux
- Logs des conteneurs

**Utilisé par :** Docker, Déploiement, Monitoring, Cleanup

---

## 5. MCP Process

**Fonction :** Contrôle des processus système

**Capacités :**
- Liste des processus actifs
- Informations détaillées (PID, CPU, RAM)
- Arrêt/relance de processus
- Gestion des services systemd
- Analyse de la charge

**Utilisé par :** Audit, Incidents, Monitoring

---

## 6. MCP Network

**Fonction :** Inspection et configuration réseau

**Capacités :**
- Liste des ports ouverts
- Règles firewall (UFW, iptables)
- Connexions actives
- Configuration des interfaces
- Tests de connectivité

**Utilisé par :** Audit, Sécurité, Réseau, Incidents

---

## 7. MCP System Info

**Fonction :** Informations système complètes

**Capacités :**
- Détails OS et kernel
- Utilisation CPU et RAM
- Espace de stockage
- Uptime et load average
- Versions des logiciels installés

**Utilisé par :** Audit, Coûts & Ressources, Monitoring

---

## 8. MCP Logs

**Fonction :** Accès et analyse des logs

**Capacités :**
- Logs systemd/journald
- Logs des conteneurs Docker
- Logs reverse-proxy (Nginx, Traefik)
- Logs applicatifs
- Recherche et filtrage

**Utilisé par :** Audit, Incidents, Monitoring, Compliance

---

## 9. MCP Secrets

**Fonction :** Gestion sécurisée des credentials

**Capacités :**
- Stockage chiffré des secrets
- Gestion des clés SSH
- Tokens API et mots de passe
- Rotation des secrets
- Injection dans les environnements

**Utilisé par :** CI/CD, Déploiement, Environnements, Compliance

---

## 10. MCP Backups

**Fonction :** Gestion des sauvegardes

**Capacités :**
- Création de sauvegardes
- Listing des backups existants
- Restauration de données
- Vérification d'intégrité
- Transfert vers stockage distant

**Utilisé par :** Backups, Migration, Incidents

---

## 11. MCP Monitoring

**Fonction :** Supervision et métriques

**Capacités :**
- Lecture des métriques (Prometheus)
- État des alertes actives
- Healthchecks des services
- Historique des incidents
- Dashboards et rapports

**Utilisé par :** Monitoring, Incidents, Coûts & Ressources

---

## 12. MCP Scheduler

**Fonction :** Gestion des tâches planifiées

**Capacités :**
- Configuration cron
- Tâches systemd timers
- Automatisations périodiques
- Historique des exécutions
- Gestion des erreurs de scheduling

**Utilisé par :** Backups, Cleanup, Monitoring

---

## 13. MCP DNS

**Fonction :** Gestion des enregistrements DNS

**Capacités :**
- Création/modification d'enregistrements
- Gestion des zones
- Configuration A, AAAA, CNAME, TXT
- Vérification de propagation
- Intégration Cloudflare/autres providers

**Utilisé par :** Réseau, Migration, Déploiement

---

## 14. MCP Reverse Proxy

**Fonction :** Gestion du reverse-proxy

**Capacités :**
- Configuration Traefik / Caddy / Nginx
- Gestion des routes et backends
- Certificats TLS automatiques
- Middlewares (auth, rate-limit)
- Load balancing

**Utilisé par :** Réseau, Déploiement, Sécurité

---

## 15. MCP Cloud Provider

**Fonction :** Interaction avec l'hébergeur VPS

**Capacités :**
- Création de snapshots
- Redémarrage du serveur
- Gestion des IP (flottantes, failover)
- Pare-feu cloud
- Monitoring provider
- Scaling et resize

**Utilisé par :** Migration, Incidents, Backups, Coûts & Ressources

---

## Matrice Agents / MCP

| Agent | SSH | FS | GitHub | Docker | Process | Network | SysInfo | Logs | Secrets | Backups | Monitor | Sched | DNS | Proxy | Cloud |
|-------|-----|----|----|--------|---------|---------|---------|------|---------|---------|---------|-------|-----|-------|-------|
| Audit | ✓ | ✓ | | | ✓ | ✓ | ✓ | ✓ | | | | | | | |
| Sécurité | ✓ | ✓ | | | ✓ | ✓ | | | | | | | | | |
| Réseau | ✓ | | | | | ✓ | | | | | | | ✓ | ✓ | |
| Docker | ✓ | ✓ | | ✓ | | | | | | | | | | | |
| Déploiement | ✓ | ✓ | ✓ | ✓ | | | | | | | | | | | |
| CI/CD | | | ✓ | | | | | | ✓ | | | | | | |
| Monitoring | ✓ | | | ✓ | | | | ✓ | | | ✓ | | | | |
| Backups | ✓ | ✓ | | | | | | | | ✓ | | ✓ | | | |
| Coûts | | | | ✓ | | | ✓ | | | | ✓ | | | | |
| Incidents | ✓ | | | ✓ | ✓ | ✓ | | ✓ | | | | | | | |
| Migration | ✓ | | | ✓ | | | | | | ✓ | | | ✓ | | ✓ |
| Documentation | | ✓ | ✓ | | | | | | | | | | | | |
| Compliance | ✓ | ✓ | | | | | | ✓ | ✓ | | | | | | |
| Cleanup | ✓ | ✓ | | ✓ | | | | | | | | ✓ | | | |
| Environnements | | ✓ | | ✓ | | ✓ | | | ✓ | | | | | | |
