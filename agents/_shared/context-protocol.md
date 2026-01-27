# Protocole de contexte inter-agents

> Ce fichier définit comment les orchestrateurs transmettent le contexte aux sous-agents
> pour éviter les analyses redondantes et économiser des tokens.

---

## Problème

Quand un orchestrateur (18, 19, 20, 25, 27) lance plusieurs agents en séquence,
chaque agent re-scanne le projet depuis zéro :

```
spec-writer  → scan projet (10K tokens)
code-auditor → RE-scan projet (10K tokens)  ← GASPILLAGE
perf-auditor → RE-scan projet (10K tokens)  ← GASPILLAGE
a11y-auditor → RE-scan projet (10K tokens)  ← GASPILLAGE
```

**Coût du gaspillage : 30K+ tokens par orchestration.**

---

## Solution : bloc CONTEXTE PROJET

Après le premier agent (typiquement spec-writer), l'orchestrateur extrait un résumé structuré
et le transmet à tous les agents suivants via leur prompt.

### Format du bloc contexte

```
CONTEXTE PROJET:
- Stack: [framework principal]
- Langages: [liste]
- DB: [type si applicable]
- Fichiers source: [nombre]
- Lignes de code: [nombre approximatif]
- Structure: [dossiers principaux]
- Tests: [framework de test si détecté]
- CI/CD: [oui/non + outil]
- Points critiques connus: [liste courte des issues spec-writer]
```

### Exemple concret

```
CONTEXTE PROJET:
- Stack: Nuxt 3 + Nitro
- Langages: TypeScript, Vue 3 SFC
- DB: PostgreSQL via Prisma
- Fichiers source: 142
- Lignes de code: ~18500
- Structure: src/{components,pages,server,composables,stores}
- Tests: Vitest + Playwright
- CI/CD: GitHub Actions
- Points critiques connus: auth fragile, pas de cache API, bundle 450KB
```

---

## Règles pour les orchestrateurs

### 1. Collecter le contexte après Phase 1

Après que spec-writer (ou le premier agent) termine :

```
1. Lire spec.md généré
2. Extraire : stack, langages, structure, métriques
3. Construire le bloc CONTEXTE PROJET
4. L'injecter dans le prompt de chaque agent suivant
```

### 2. Prompt enrichi pour les sous-agents

```
Task tool → subagent_type: "code-auditor"
Prompt: "Audit code complet. CONTEXTE PROJET:
- Stack: Nuxt 3 + Nitro
- Langages: TypeScript, Vue 3
- DB: PostgreSQL via Prisma
- Fichiers source: 142
- Structure: src/{components,pages,server,composables}
- Points critiques: auth fragile, bundle 450KB.
Sauter la phase de reconnaissance, commencer directement l'audit."
```

### 3. Parallélisation des agents indépendants

Certains agents sont indépendants et peuvent être lancés en parallèle :

```
SÉQUENTIEL (dépendances) :
  spec-writer (01) → nécessaire pour le contexte initial

PARALLÈLE (indépendants, même input) :
  code-auditor (05)  ─┐
  perf-auditor (07)   ├── Tous lisent spec.md + code source
  a11y-auditor (06)  ─┘

SÉQUENTIEL (dépend des résultats) :
  todo-generator (02) → consolide les findings de tous les audits
```

**Gains estimés :**
- Temps d'exécution : -40% (parallélisation)
- Tokens : -30% (pas de re-scan)

---

## Règles pour les sous-agents

### Quand le bloc CONTEXTE PROJET est présent

1. **SAUTER** la phase de reconnaissance / cartographie
2. **UTILISER** les informations du bloc directement
3. **COMMENCER** par la phase d'audit / analyse
4. **NE PAS** relancer les commandes de détection de stack

### Quand le bloc CONTEXTE PROJET est absent

1. Exécuter toutes les phases normalement
2. L'agent fonctionne en mode autonome (standalone)

---

## Protocole de résultats

Chaque agent doit produire un résumé structuré de ses résultats pour que
l'orchestrateur puisse les agréger dans le rapport consolidé :

```
RÉSULTATS [NOM-AGENT]:
- Score global: X/10
- Findings critiques: N
- Findings totaux: N
- Fichier rapport: docs/audits/audit-[type]-YYYYMMDD.md
- Résumé: [2-3 phrases]
```

L'orchestrateur utilise ces résumés pour :
1. Construire le rapport consolidé
2. Décider du verdict GO/NO-GO (pre-release)
3. Prioriser les tâches dans todo.md
