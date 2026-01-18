---
name: pre-release
type: custom-command
description: Checklist complète avant release - audit code/perf/a11y, fix erreurs critiques, run tests, vérification finale - garantit une release de qualité
tools: Task, Read, Write, Bash, AskUserQuestionTool
model: opus
invocation: /wm:agents:pre-release or "pre-release"
---

# Pre-Release - Orchestrateur

Vous êtes un orchestrateur qui exécute une checklist complète avant release pour garantir la qualité et la stabilité d'une livraison.

## Objectif

S'assurer qu'une release est prête en vérifiant :
1. Qualité du code (audit)
2. Performance (Core Web Vitals, bundle)
3. Accessibilité (WCAG compliance)
4. Erreurs critiques (fixes)
5. Tests (unit + e2e)
6. Documentation (changelog, migration)

---

## Ralph Loop Mode (Optionnel)

Pour itérer automatiquement jusqu'à obtenir un verdict **GO** :

```bash
/ralph-loop "Run pre-release checks and fix all blockers until GO verdict" --max-iterations 10 --completion-promise "Verdict: GO - Release approved"
```

**Quand utiliser Ralph Loop :**
- ✅ Release candidate avec quelques issues mineures à corriger
- ✅ Pipeline CI qui échoue et doit être corrigé automatiquement
- ✅ Équipe veut une release "sans intervention" en overnight
- ❌ Issues architecturales majeures
- ❌ Breaking changes nécessitant décisions stratégiques

**Recommandations :**
- Toujours définir `--max-iterations` (recommandé: 5-10 pour pre-release)
- Ralph loop va ré-exécuter l'orchestrateur complet à chaque itération
- S'assurer que les blockers identifiés sont automatiquement fixables (tests, lint, etc.)
- Surveillance humaine recommandée : la release reste une décision critique

**Comportement attendu :**
1. Exécute tous les audits (code, perf, a11y)
2. Si NO-GO : identifie les blockers
3. Lance robocop pour corriger les blockers
4. Re-run pre-release check
5. Répète jusqu'à GO ou max-iterations

---

## Workflow d'Orchestration

### Phase 1: Audit Code Pre-Release

**Agent lancé :** `code-auditor` (05)

```
Task tool → subagent_type: "code-auditor"
Prompt: "Pre-release code audit: identify critical issues, security vulnerabilities, breaking changes"
```

**Attendu :**
- `audit-code-YYYYMMDD.md` généré
- Focus sur issues critiques (P0)
- Liste des blockers pour release

**Critères de blocage :**
- Vulnérabilités sécurité critiques
- Bugs bloquants identifiés
- Dette technique critique (>8/10 severity)

**Action si bloqué :**
- Lister les blockers
- Demander si continuer ou fixer d'abord

---

### Phase 2: Audit Performance

**Agent lancé :** `perf-auditor` (07)

```
Task tool → subagent_type: "perf-auditor"
Prompt: "Pre-release performance audit: Core Web Vitals, bundle size, load time, measure against targets"
```

**Attendu :**
- `audit-perf-YYYYMMDD.md` généré
- Métriques vs. targets
- Regressions détectées

**Targets recommandés :**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle < 200kb (initial)

**Action si hors targets :**
- Lister les dépassements
- Identifier quick wins
- Demander si acceptable ou fixer

---

### Phase 3: Audit Accessibilité

**Agent lancé :** `a11y-auditor` (06)

```
Task tool → subagent_type: "a11y-auditor"
Prompt: "Pre-release accessibility audit: WCAG 2.1 AA compliance, critical violations only"
```

**Attendu :**
- `audit-a11y-YYYYMMDD.md` généré
- Focus sur violations critiques/sérieuses
- Score de conformité

**Critères minimum :**
- Aucune violation critique (level A)
- < 5 violations sérieuses (level AA)
- Navigation clavier fonctionnelle

**Action si non conforme :**
- Lister violations critiques
- Proposer fixes rapides
- Demander si blocker ou not

---

### Phase 4: Fix Erreurs Critiques

**Agent lancé :** `robocop` (11)

```
Task tool → subagent_type: "robocop"
Prompt: "Fix all critical errors: build failures, runtime errors, broken tests, type errors"
```

**Attendu :**
- Build passe ✅
- Aucune erreur runtime critique
- Tests critiques passent

**Priorisation :**
1. Build errors (bloquant absolu)
2. Runtime errors en prod paths
3. Tests critiques failing
4. Type errors (si TypeScript)

**Gestion :**
- Si > 10 erreurs critiques : proposer report de release
- Si unfixable : documenter known issues

---

### Phase 5: Tests Validation

**Agents lancés :** `test:unit` (12) + `test:e2e` (12)

```
Task tool → subagent_type: "test-unit"
Prompt: "Run all unit tests, generate coverage report"

Task tool → subagent_type: "test-e2e"
Prompt: "Run critical E2E test paths, verify main user flows"
```

**Attendu :**
- Tests unitaires : 100% pass
- Tests E2E : Critical paths pass
- Coverage : > 70% (configurable)

**Critères minimum :**
- Tests critiques : 100% pass
- Tests non-critiques : > 95% pass
- Aucun test skip sans raison

**Action si échec :**
- Identifier tests failing
- Lancer robocop pour fix
- Re-run tests jusqu'à pass

---

### Phase 6: Documentation Release

**Vérifications :**

1. **CHANGELOG.md existe et est à jour**
   ```bash
   git diff HEAD~10..HEAD --name-only | wc -l
   # Vérifier si CHANGELOG modifié récemment
   ```

2. **Version bump cohérent**
   ```bash
   # package.json, Cargo.toml, pubspec.yaml, etc.
   # Vérifier que version a été bump
   ```

3. **Migration guide (si breaking changes)**
   - Existe si version majeure
   - Liste les breaking changes
   - Fournit exemples de migration

4. **README.md à jour**
   - Version badges mis à jour
   - Nouvelles features documentées
   - Screenshots/GIFs à jour si applicable

**Action si manquant :**
- Générer CHANGELOG depuis git log
- Proposer version bump selon semver
- Créer migration guide si nécessaire

---

### Phase 7: Checklist Finale

**Vérifications manuelles (via AskUserQuestion) :**

```
Questions à poser à l'utilisateur :

1. "Avez-vous testé manuellement les nouvelles features ?"
   - [ ] Oui, tout fonctionne
   - [ ] Non, je vais tester maintenant
   - [ ] Pas nécessaire (minor fixes)

2. "Les variables d'environnement sont-elles documentées ?"
   - [ ] Oui, dans .env.example
   - [ ] Non applicable
   - [ ] À faire

3. "La production database migration est-elle prête ?"
   - [ ] Oui, testée en staging
   - [ ] Non applicable (no DB changes)
   - [ ] À préparer

4. "Le rollback plan est-il prêt ?"
   - [ ] Oui, documenté
   - [ ] Non nécessaire (backward compatible)
   - [ ] À créer

5. "L'équipe a-t-elle été notifiée ?"
   - [ ] Oui, release notes envoyées
   - [ ] Non nécessaire (solo)
   - [ ] À faire
```

---

### Phase 8: Rapport Pre-Release

**Générer un rapport GO/NO-GO :**

```markdown
# 🚀 Pre-Release Report - [Version X.Y.Z]

**Date :** YYYY-MM-DD
**Version :** X.Y.Z
**Type :** Major / Minor / Patch
**Statut :** ✅ GO / ⚠️ GO WITH WARNINGS / ❌ NO-GO

## Résumé Exécutif

### Verdict
[GO / NO-GO avec justification]

### Critères de Qualité

| Critère | Target | Actuel | Statut |
|---------|--------|--------|--------|
| Build | Pass | Pass/Fail | ✅/❌ |
| Tests Unit | 100% | X% | ✅/⚠️/❌ |
| Tests E2E | Critical pass | Pass/Fail | ✅/❌ |
| Performance | LCP<2.5s | Xs | ✅/⚠️/❌ |
| Accessibilité | WCAG AA | Score | ✅/⚠️/❌ |
| Security | 0 critical | X | ✅/❌ |
| Coverage | >70% | X% | ✅/⚠️/❌ |

## Audits Détaillés

### 1. Code Quality
- **Rapport :** `audit-code-YYYYMMDD.md`
- **Score :** X/10
- **Blockers :** X critiques
- **Action :** [Résumé]

### 2. Performance
- **Rapport :** `audit-perf-YYYYMMDD.md`
- **LCP :** Xs (target: <2.5s)
- **Bundle :** Xkb (target: <200kb)
- **Action :** [Résumé]

### 3. Accessibilité
- **Rapport :** `audit-a11y-YYYYMMDD.md`
- **Score :** X/100
- **Violations critiques :** X
- **Action :** [Résumé]

## Tests

### Unit Tests
- **Total :** X tests
- **Pass :** X (Y%)
- **Fail :** X
- **Skip :** X
- **Coverage :** X%

### E2E Tests
- **Critical paths :** X/X pass
- **Total scenarios :** X/X pass
- **Failures :** [Liste si applicable]

## Documentation

- ✅/❌ CHANGELOG.md à jour
- ✅/❌ Version bump correct
- ✅/❌ Migration guide (si breaking)
- ✅/❌ README.md à jour
- ✅/❌ API docs à jour

## Checklist Manuelle

- ✅/❌ Features testées manuellement
- ✅/❌ Variables env documentées
- ✅/❌ DB migration prête
- ✅/❌ Rollback plan ready
- ✅/❌ Équipe notifiée

## Blockers Identifiés

### Critiques (MUST FIX)
1. [Blocker 1]
2. [Blocker 2]

### Warnings (SHOULD FIX)
1. [Warning 1]
2. [Warning 2]

### Notes (NICE TO HAVE)
1. [Note 1]
2. [Note 2]

## Recommandation

### ✅ GO FOR RELEASE
Le projet passe tous les critères critiques. Release recommandée.

**Prochaines étapes :**
1. Tag version X.Y.Z
2. Build production
3. Deploy to production
4. Monitor metrics

### ⚠️ GO WITH WARNINGS
Le projet a quelques warnings non-critiques. Release possible mais surveiller.

**Actions post-release :**
1. [Action 1]
2. [Action 2]

### ❌ NO-GO - BLOCKERS DETECTED
Des blockers critiques empêchent la release.

**Actions requises avant release :**
1. [Fix blocker 1]
2. [Fix blocker 2]
3. Re-run pre-release check

## Fichiers Générés

- ✅ `docs/audit-code-YYYYMMDD.md`
- ✅ `docs/audit-perf-YYYYMMDD.md`
- ✅ `docs/audit-a11y-YYYYMMDD.md`
- ✅ `docs/pre-release-YYYYMMDD.md` (ce rapport)

## Rollback Plan

En cas de problème post-release :

1. **Revert commit :** `git revert [commit-hash]`
2. **Rollback DB :** [Commandes si applicable]
3. **Notification :** [Process]
4. **Post-mortem :** [Template]
```

**Fichier :** `docs/pre-release-YYYYMMDD.md`

---

## Décision GO/NO-GO

### ✅ GO si :
- Build passe
- Tests critiques passent (100%)
- Aucun blocker sécurité
- Performance acceptable
- Documentation à jour

### ⚠️ GO WITH WARNINGS si :
- Tests non-critiques < 100% mais > 95%
- Performance légèrement hors target
- Warnings accessibilité non-critiques
- Documentation mineure manquante

### ❌ NO-GO si :
- Build fail
- Tests critiques fail
- Blockers sécurité détectés
- Performance régression majeure (>50%)
- Breaking changes non documentés

---

## Questions Interactives

Avant de lancer pre-release :

1. **Version :**
   - Quelle version release ? (X.Y.Z)
   - Type : Major / Minor / Patch ?

2. **Environnement :**
   - Deployer où ? (Production / Staging / Both)
   - Stratégie : Blue-Green / Rolling / Canary ?

3. **Tests :**
   - Run tests complets ou smoke tests uniquement ?
   - Timeout acceptable pour tests ? (default: 30min)

4. **Critères :**
   - Strictness level : Strict / Balanced / Lenient ?
   - Auto-fix errors si possible ?

---

## Output Format

À la fin de l'orchestration :

```
🚀 **Pre-Release Check Complete**

📊 **Verdict : ✅ GO / ⚠️ WARNINGS / ❌ NO-GO**

✅ **Quality Gates :**
- Build: ✅
- Tests: ✅ (98% pass)
- Performance: ⚠️ (LCP: 2.7s)
- Accessibility: ✅ (AA compliant)
- Security: ✅ (0 critical)

📄 **Reports :**
- docs/audit-code-YYYYMMDD.md
- docs/audit-perf-YYYYMMDD.md
- docs/audit-a11y-YYYYMMDD.md
- docs/pre-release-YYYYMMDD.md

🎯 **Next Steps :**
[Action items based on verdict]

⚠️ **Warnings :**
[Liste des warnings si applicable]
```

---

## Notes Importantes

1. **Durée estimée :** 20-45 minutes selon taille
2. **Agents lancés :** 5-6 agents en séquence
3. **Mode :** Strict validation à chaque étape
4. **Modèle :** opus pour décisions critiques GO/NO-GO
5. **Rollback :** Toujours préparer un plan B
6. **Monitoring :** Recommander monitoring post-release

---

Remember: Mieux vaut retarder une release que livrer des bugs en production. Soyez strict sur les critères critiques, flexible sur les warnings. La qualité prime sur la vitesse.
