# Template de corrections pour les agents VPS restants

## Agents déjà corrigés ✅

Les agents suivants ont été entièrement corrigés avec:
- ✅ Section "MCP utilisés" → "Outils et capacités"
- ✅ Section "Dépendances" ajoutée
- ✅ Section "Rollback" (pour les agents critiques)

**Liste des agents corrigés:**
1. ✅ 00-orchestrateur.md
2. ✅ 01-audit.md
3. ✅ 02-securite.md (+ Rollback détaillé)
4. ✅ 03-reseau.md (+ Rollback détaillé)
5. ✅ 04-docker.md (+ Rollback détaillé)
6. ✅ 05-deploiement.md (+ Rollback déjà existant)
7. ✅ 06-cicd.md

## Agents restants à corriger

Les agents suivants nécessitent l'ajout de:
- 📝 Section "Outils et capacités" (à créer)
- 📝 Section "Dépendances" (à créer)

**Liste:**
- 07-monitoring.md
- 08-backups.md
- 09-couts-ressources.md
- 10-incidents.md
- 11-migration.md
- 12-documentation.md
- 13-compliance.md
- 14-cleanup.md
- 15-environnements.md
- 16-installateur.md

## Template à insérer

Pour chaque agent restant, insérer après le titre principal et avant "## Responsabilités":

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- [Description spécifique de ce que fait l'agent avec Bash]
- [Commandes principales utilisées]
- [Interactions système]

Outils Claude Code utilisés :
- `Bash` : Exécution de commandes shell et système
- `Read` : Lecture de fichiers de configuration
- `Write` : Création de rapports et fichiers
- `AskUserQuestionTool` : Questions à l'utilisateur pour clarification

## Dépendances

**Prérequis** :
- [Lister les agents dont celui-ci dépend]
- [Lister les outils système requis]
- [Lister les accès nécessaires]

**Cet agent doit être exécuté APRÈS** :
- [Agents prérequis]

**Agents qui dépendent de celui-ci** :
- [Agents qui utilisent celui-ci]

**⚠️ IMPORTANT** :
- [Notes importantes spécifiques à l'agent]
```

## Exemples spécifiques par agent

### 07-monitoring.md

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- **Installation monitoring** : Installation et configuration d'Uptime Kuma, Prometheus, Grafana
- **Configuration alertes** : Setup de notifications (email, Slack, webhooks)
- **Tests monitoring** : Vérification que les services sont surveillés

Outils Claude Code utilisés :
- `Bash` : docker-compose up, configuration services monitoring
- `Write` : Création de docker-compose.yml pour Uptime Kuma, Prometheus, Grafana
- `AskUserQuestionTool` : Choix de la solution (Uptime Kuma vs Prometheus/Grafana)

## Dépendances

**Prérequis** :
- 🔗 Agent Docker (04) : Docker installé et réseaux créés
- 🔗 Agent Réseau (03) : Pour exposer les dashboards via HTTPS
- 🔗 Services déployés à surveiller

**Cet agent surveille** :
- Les applications déployées par l'Agent Déploiement (05)
- Les services installés par l'Agent Installateur (16)
```

### 08-backups.md

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- **Backups bases de données** : pg_dump, mysqldump, mongodump
- **Backups volumes Docker** : tar, rsync des volumes
- **Stockage distant** : Upload vers S3, Backblaze B2, rsync distant
- **Rotation** : Suppression des anciens backups selon la rétention

Outils Claude Code utilisés :
- `Bash` : Scripts de backup, cron, docker exec
- `Write` : Création de backup.sh, restore.sh, crontabs
- `AskUserQuestionTool` : Fréquence, rétention, stockage distant

## Dépendances

**Prérequis** :
- 🔗 Agent Docker (04) : Pour backup des volumes et bases de données conteneurisées
- 🔗 Services à sauvegarder (PostgreSQL, MySQL, MongoDB, etc.)
- ✅ Stockage distant configuré (S3, B2, ou serveur distant)

**Cet agent protège** :
- Les données de toutes les applications déployées
- Utilisé AVANT l'Agent Déploiement (05) pour backup pré-déploiement
```

### 09-couts-ressources.md

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- **Analyse ressources** : top, htop, docker stats, df, free
- **Optimisation** : Limites Docker, nettoyage, compression
- **Alertes** : Scripts de surveillance de saturation

Outils Claude Code utilisés :
- `Bash` : Commandes de monitoring système et Docker
- `Write` : Scripts d'alerte, rapports d'analyse
- `AskUserQuestionTool` : Seuils d'alerte, limites souhaitées

## Dépendances

**Prérequis** :
- 🔗 Agent Audit (01) recommandé : Baseline des ressources
- 🔗 Agent Docker (04) : Pour appliquer les limites de ressources
- 🔗 Agent Monitoring (07) : Pour alertes automatiques

**Cet agent optimise** :
- L'utilisation des ressources de tous les conteneurs
- Recommande des upgrades ou downgrades de VPS
```

### 10-incidents.md

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- **Diagnostic** : Analyse de logs, état des services, réseau
- **Résolution** : Redémarrage services, nettoyage, correction configs
- **Documentation** : Post-mortem des incidents

Outils Claude Code utilisés :
- `Bash` : docker logs, systemctl, journalctl, diagnostic réseau
- `Write` : Rapports d'incident, post-mortem
- `AskUserQuestionTool` : Description du problème observé

## Dépendances

**Prérequis** :
- 🔗 Agent Audit (01) : Pour comparer état actuel vs état normal
- 🔗 Agent Monitoring (07) : Accès aux logs et métriques

**Cet agent utilise** :
- Tous les autres agents pour diagnostiquer et résoudre
```

### 16-installateur.md

```markdown
## Outils et capacités

Cet agent utilise principalement le tool `Bash` pour :
- **Installation services** : Création de docker-compose.yml pour 30+ services
- **Configuration** : Setup des variables d'environnement, secrets
- **Déploiement** : Lancement des services via docker-compose
- **Documentation** : Génération de README par service

Outils Claude Code utilisés :
- `Bash` : docker-compose up, configuration services
- `Write` : docker-compose.yml, .env, README.md par service
- `AskUserQuestionTool` : Service souhaité, domaine, configuration

## Dépendances

**Prérequis OBLIGATOIRES** :
- 🔗 Agent Docker (04) : Docker et réseaux doivent exister
- 🔗 Agent Réseau (03) : Traefik doit être configuré pour exposer les services
- 🔗 Agent Sécurité (02) : Firewall configuré

**Cet agent installe** :
- 30+ services pré-configurés (Ollama, Minio, PostgreSQL, etc.)
- Configuration automatique de l'exposition HTTPS
```

## Actions requises

1. Pour chaque agent restant, ajouter les deux sections en suivant le template
2. Adapter les descriptions aux spécificités de chaque agent
3. Vérifier les dépendances en se référant au workflow de l'orchestrateur
4. Tester que les sections s'intègrent bien dans le document

## Note

Les agents 07-16 n'avaient PAS de section "MCP utilisés" à l'origine. Il faut donc CRÉER les sections "Outils et capacités" + "Dépendances" de toutes pièces, en suivant le pattern des agents déjà corrigés (01-06).
