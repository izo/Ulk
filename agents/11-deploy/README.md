# Deploy Agents

Agents de déploiement automatisé vers différentes plateformes.

---

## 🎯 Mission

Ces agents automatisent le déploiement complet d'applications vers diverses plateformes cloud et services d'hébergement.

---

## 🚀 Agents Disponibles

### deploy-vercel (`vercel.md`)
**Plateforme** : Vercel

**Focus** :
- Auto-configuration projet
- Variables d'environnement
- Preview deployments automatiques
- Production deployments
- Custom domains

**Frameworks supportés** :
- Next.js (natif)
- Nuxt, Astro, SvelteKit
- Sites statiques

**Usage** :
```
"Déploie sur Vercel"
"Configure Vercel avec mes variables d'env"
```

---

### deploy-netlify (`netlify.md`)
**Plateforme** : Netlify

**Focus** :
- Configuration site
- Netlify Functions (serverless)
- Forms et Identity
- Redirects et headers
- Split testing

**Frameworks supportés** :
- Tous frameworks JavaScript
- Sites statiques
- JAMstack

**Usage** :
```
"Déploie sur Netlify"
"Configure Netlify Functions"
```

---

### deploy-cloudflare (`cloudflare.md`)
**Plateforme** : Cloudflare Pages & Workers

**Focus** :
- Cloudflare Pages (sites)
- Cloudflare Workers (edge functions)
- KV (key-value storage)
- D1 (SQLite distribué)
- R2 (object storage)

**Avantages** :
- 300+ datacenters (ultra-rapide)
- Gratuit : 100k requêtes/jour
- Zero cold starts

**Usage** :
```
"Déploie sur Cloudflare Pages"
"Crée un Cloudflare Worker"
```

---

### deploy-docker (`docker.md`)
**Plateforme** : Docker / Containers

**Focus** :
- Génération Dockerfile optimisé
- Multi-stage builds
- docker-compose.yml
- Push vers registries (Docker Hub, GHCR, ECR)
- Health checks

**Cas d'usage** :
- Base pour Kubernetes
- Docker Swarm
- Railway, Render, Fly.io
- Self-hosted

**Usage** :
```
"Dockerise cette application"
"Crée docker-compose avec PostgreSQL"
```

---

### deploy-aws (`aws.md`)
**Plateforme** : Amazon Web Services

**Stratégies** :
- **S3 + CloudFront** : Sites statiques
- **ECS Fargate** : Applications containerisées
- **Elastic Beanstalk** : Applications full-stack
- **Lambda** : Serverless functions

**Configuration** :
- ACM certificates (SSL)
- Route 53 (DNS)
- CloudWatch (monitoring)
- IAM roles

**Usage** :
```
"Déploie sur AWS S3 + CloudFront"
"Configure ECS Fargate"
```

---

## 🔄 Workflows d'Utilisation

### Workflow 1 : Déploiement Simple

```
"Déploie sur [plateforme]" → 11-deploy/[plateforme]
```

**Exemple** :
```
"Déploie sur Vercel"
→ deploy-vercel détecte framework
→ Configure automatiquement
→ Déploie en production
```

---

### Workflow 2 : Setup Complet Nouveau Projet

```
01-spec-writer
    ↓
02-todo-generator
    ↓
04-task-runner (implémenter)
    ↓
11-deploy/[plateforme] (déployer)
```

**Commande** :
```
"Développe ce projet puis déploie sur Netlify"
```

---

### Workflow 3 : Multi-Platform Deploy

```
"Déploie sur Vercel ET configure Docker"
→ deploy-vercel (production)
→ deploy-docker (self-hosted backup)
```

**Use case** : Production sur Vercel, staging sur serveur Docker

---

### Workflow 4 : CI/CD Integration

```
11-deploy/[plateforme] génère config CI/CD
    ↓
.github/workflows/deploy.yml
    ↓
Auto-deploy sur push main
```

---

## 📊 Comparaison des Plateformes

| Plateforme | Gratuit | Edge Network | Serverless | Database | Best For |
|------------|---------|--------------|------------|----------|----------|
| **Vercel** | ✅ Généreux | ✅ Global | ✅ Edge Functions | ❌ | Next.js, frontend |
| **Netlify** | ✅ Généreux | ✅ Global | ✅ Functions | ❌ | JAMstack, forms |
| **Cloudflare** | ✅ Très généreux | ✅ 300+ POPs | ✅ Workers | ✅ D1, KV | Performance, edge |
| **Docker** | ✅ Libre | ❌ Self-hosted | ❌ | ✅ Compose | Flexibilité totale |
| **AWS** | ⚠️ Limité | ✅ CloudFront | ✅ Lambda | ✅ RDS, DynamoDB | Enterprise, scale |

---

## 🎯 Choisir la Bonne Plateforme

### Sites Statiques / JAMstack
→ **Vercel** (Next.js) ou **Netlify** (autres)
- Build automatique sur push
- CDN global
- Gratuit pour petits sites

### Edge Computing / Performance Critique
→ **Cloudflare**
- Latence minimale (300+ datacenters)
- Workers ultra-rapides
- Gratuit jusqu'à 100k req/jour

### Applications Containerisées
→ **Docker** → **AWS ECS** ou **Railway**
- Contrôle total
- Compose multi-services
- Portable

### Enterprise / Scale
→ **AWS**
- Infrastructure complète
- Services managés (RDS, S3, etc.)
- Support professionnel

---

## 💡 Bonnes Pratiques

### 1. Environment Variables
```bash
# Jamais dans le code
API_KEY=abc123  # ❌

# Toujours via la plateforme
vercel env add API_KEY      # ✅
netlify env:set API_KEY     # ✅
```

### 2. Preview Deployments
- Vercel : Automatique sur PR
- Netlify : Deploy previews
- Cloudflare : Branch deployments

### 3. Monitoring
- Vercel Analytics
- Netlify Analytics
- CloudWatch (AWS)
- Self-hosted : Prometheus + Grafana

### 4. Rollback Strategy
```bash
# Vercel
vercel rollback <deployment-url>

# Netlify
netlify rollback

# Docker
docker tag my-app:v1.0.0 my-app:latest
```

---

## 🔧 Configuration Commune

### .env.example
```bash
# Public
NEXT_PUBLIC_API_URL=https://api.example.com

# Private (server-side only)
DATABASE_URL=postgresql://...
API_SECRET_KEY=...
```

### netlify.toml / vercel.json
Configuration déclarative pour :
- Build commands
- Redirects
- Headers
- Functions

### Dockerfile
Multi-stage build pour :
- Taille image réduite
- Sécurité (non-root user)
- Optimisation layers

---

## 🚀 Quick Start

**1. Nouveau projet :**
```
"Analyse ce projet et déploie sur Vercel"
→ 01-spec-writer détecte stack
→ 11-deploy/vercel configure et déploie
```

**2. Projet existant :**
```
"Dockerise et déploie sur AWS ECS"
→ 11-deploy/docker crée images
→ 11-deploy/aws configure ECS
```

**3. Multi-platform :**
```
"Setup Vercel pour prod et Docker pour staging"
→ deploy-vercel (production)
→ deploy-docker (staging local)
```

---

## 📚 Documentation Parente

- **`../Readme.md`** : Vue d'ensemble de tous les agents
- **`../CLAUDE.md`** : Architecture complète du système
- **`/CLAUDE.md`** : Instructions globales Woodman

---

_Woodman Agents · 11-deploy/ · Automated Deployment_
