# Agents pour gestion d'un VPS multi-projets

## Vue d'ensemble

Ce document décrit les 15 agents spécialisés pour la gestion automatisée d'un VPS hébergeant plusieurs projets. Chaque agent a une responsabilité claire et peut être orchestré de manière coordonnée.

---

## 1. Agent Audit

**Rôle :** Analyse l'état du serveur

**Responsabilités :**
- Inventaire OS et versions
- Liste des utilisateurs et leurs droits
- Ports ouverts et services exposés
- Services actifs (systemd, Docker)
- Espace disque et utilisation
- Charge système (CPU, RAM, I/O)
- Analyse des logs critiques

**MCP utilisés :** SSH, System Info, Logs, Process, Network

---

## 2. Agent Sécurité

**Rôle :** Propose et applique le durcissement du serveur

**Responsabilités :**
- Configuration SSH (clés, ports, désactivation root)
- Règles firewall (UFW, iptables)
- Configuration fail2ban
- Gestion des mises à jour de sécurité
- Audit des permissions fichiers
- Politiques sudo et accès privilégiés

**MCP utilisés :** SSH, FileSystem, Network, Process

---

## 3. Agent Réseau

**Rôle :** Gère la couche réseau et l'exposition des services

**Responsabilités :**
- Gestion des ports et NAT
- Configuration reverse-proxy (Traefik, Caddy, Nginx)
- Gestion DNS et sous-domaines
- Certificats TLS (Let's Encrypt)
- Redirections HTTP/HTTPS
- Règles d'accès et IP whitelisting

**MCP utilisés :** SSH, Network, DNS, Reverse Proxy

---

## 4. Agent Docker

**Rôle :** Crée et maintient l'infrastructure conteneurisée

**Responsabilités :**
- Rédaction et maintenance des docker-compose
- Gestion des réseaux Docker
- Gestion des volumes persistants
- Construction et mise à jour des images
- Politiques de redémarrage
- Nettoyage des ressources orphelines

**MCP utilisés :** Docker, FileSystem, SSH

---

## 5. Agent Déploiement

**Rôle :** Prépare et exécute les déploiements applicatifs

**Responsabilités :**
- Scripts de build
- Procédures de lancement (run)
- Scripts de mise à jour (update)
- Procédures de rollback
- Configuration des healthchecks
- Gestion des migrations de données

**MCP utilisés :** SSH, Docker, FileSystem, GitHub

---

## 6. Agent CI/CD

**Rôle :** Configure l'intégration et le déploiement continus

**Responsabilités :**
- Configuration des pipelines (GitHub Actions, GitLab CI)
- Gestion des secrets de déploiement
- Configuration des triggers (push, PR, tag)
- Gestion des environnements de déploiement
- Tests automatisés pré-déploiement

**MCP utilisés :** GitHub, Secrets, SSH

---

## 7. Agent Monitoring

**Rôle :** Installe et configure la supervision

**Responsabilités :**
- Monitoring uptime des services
- Collecte des métriques (Prometheus, Grafana)
- Configuration des alertes (email, Slack, webhook)
- Centralisation des logs
- Dashboards de visualisation

**MCP utilisés :** Monitoring, Logs, Docker, SSH

---

## 8. Agent Backups

**Rôle :** Met en place et vérifie les sauvegardes

**Responsabilités :**
- Configuration des sauvegardes automatiques
- Politique de rotation (daily, weekly, monthly)
- Tests de restauration réguliers
- Sauvegarde des volumes Docker
- Export des bases de données
- Stockage distant (S3, B2, etc.)

**MCP utilisés :** Backups, SSH, FileSystem, Scheduler

---

## 9. Agent Coûts & Ressources

**Rôle :** Surveille et optimise l'utilisation des ressources

**Responsabilités :**
- Monitoring CPU/RAM/disque en continu
- Optimisation des conteneurs (limites, requests)
- Alertes de saturation anticipées
- Recommandations de sizing
- Analyse des tendances de consommation

**MCP utilisés :** System Info, Monitoring, Docker

---

## 10. Agent Incidents

**Rôle :** Guide le diagnostic et la résolution des problèmes

**Responsabilités :**
- Diagnostic des services down
- Résolution des erreurs 502/503/504
- Gestion des certificats expirés
- Analyse des crashs de conteneurs
- Procédures d'escalade
- Post-mortem et documentation

**MCP utilisés :** Logs, Docker, Network, Process, SSH

---

## 11. Agent Migration

**Rôle :** Gère les transferts et changements d'infrastructure

**Responsabilités :**
- Migration de projets entre serveurs
- Changements d'IP et mise à jour DNS
- Refonte d'architecture
- Provisioning de nouvelles machines
- Synchronisation des données
- Tests de validation post-migration

**MCP utilisés :** SSH, Cloud Provider, DNS, Backups, Docker

---

## 12. Agent Documentation

**Rôle :** Produit et maintient la documentation technique

**Responsabilités :**
- Documentation d'exploitation
- Procédures opérationnelles (runbooks)
- Schémas d'architecture
- Inventaire des services
- Changelog des modifications
- Documentation des accès et credentials

**MCP utilisés :** FileSystem, GitHub

---

## 13. Agent Compliance

**Rôle :** Vérifie la conformité aux bonnes pratiques

**Responsabilités :**
- Conformité RGPD (logs, données personnelles)
- Audit des accès et permissions
- Traçabilité des actions
- Politique de rétention des logs
- Chiffrement des données sensibles
- Rapports de conformité

**MCP utilisés :** Logs, FileSystem, Secrets, SSH

---

## 14. Agent Cleanup

**Rôle :** Maintient le serveur propre et optimisé

**Responsabilités :**
- Suppression des images Docker inutilisées
- Rotation et suppression des logs obsolètes
- Nettoyage des volumes morts
- Désactivation des utilisateurs inactifs
- Purge des caches applicatifs
- Libération d'espace disque

**MCP utilisés :** Docker, SSH, FileSystem, Scheduler

---

## 15. Agent Environnements

**Rôle :** Gère l'isolation et la configuration des environnements

**Responsabilités :**
- Gestion prod / staging / test
- Variables d'environnement par contexte
- Isolation réseau des projets
- Gestion des fichiers .env
- Synchronisation staging ↔ prod
- Contrôle d'accès par environnement

**MCP utilisés :** Docker, FileSystem, Secrets, Network
